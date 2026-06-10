import { isArray, isNumber, isString } from "@getsoren/react-utils";
import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import mapboxgl from "mapbox-gl";
import { useEffect, useMemo, useRef } from "react";
import { useMap } from "react-map-gl";
import isValidMarker from "@/types/isValidMarker";
import { MarkerProps } from "@/types/MarkerProps";

interface FitBoundsProps {
  markers?: MarkerProps[];
  features?: FeatureCollection<Geometry, GeoJsonProperties> | Feature<Geometry> | Feature<Geometry>[];
  padding?: number;
  duration?: number;
  disableAnimation?: boolean;
  fitBounds?: boolean;
  animationKey?: unknown;
  openPopup?: boolean;
  maxZoom?: number;
}

/** Zoom level applied when flying to a single marker (mirrors the previous hardcoded behavior) */
const SINGLE_MARKER_ZOOM = 14;

const serializeKey = (key: unknown): string => {
  if (isString(key) || isNumber(key)) {
    return String(key);
  }
  return JSON.stringify(key);
};

const extractCoordsFromFeatures = (input?: FeatureCollection<Geometry> | Feature<Geometry> | Feature<Geometry>[]): [number, number][] => {
  if (!input) {
    return [];
  }

  const featuresArray: Feature<Geometry>[] = isArray(input) ? input : input.type === "FeatureCollection" ? input.features : [input];

  const coords: [number, number][] = [];

  for (const feature of featuresArray) {
    const geom = feature.geometry;

    if (geom.type === "Point") {
      coords.push(geom.coordinates as [number, number]);
    }

    if (geom.type === "LineString") {
      coords.push(...(geom.coordinates as [number, number][]));
    }

    if (geom.type === "Polygon") {
      coords.push(...(geom.coordinates[0] as [number, number][]));
    }
  }

  return coords.filter(([lng, lat]) => Number.isFinite(lng) && Number.isFinite(lat));
};

/**
 * FitBounds Component
 * -------------------
 * Automatically adjusts the map viewport to fit visible markers or GeoJSON features.
 *
 * Workflow:
 * 1. Collects coordinates from valid markers and/or GeoJSON features.
 * 2. Computes bounding box (`LngLatBounds`) for all visible points.
 * 3. Applies `map.fitBounds()` or `map.flyTo()` depending on the data (single vs multiple points).
 * 4. Reacts to changes via `animationKey` — prevents redundant animations on repeated renders.
 *
 * Props:
 * - `markers`: array of marker objects (`{ id, lat, lng }`) to fit into view.
 * - `features`: GeoJSON data (Feature, FeatureCollection, or array of Features).
 * - `padding`: padding (px) around fitted bounds (default: 50).
 * - `duration`: animation duration in ms (default: 1000).
 * - `maxZoom`: maximum zoom level applied when fitting bounds; also caps the single-marker zoom (default: 14).
 * - `disableAnimation`: disables map animations when true.
 * - `fitBounds`: whether bounds fitting is enabled.
 * - `animationKey`: dependency key to control when to re-run fitting logic.
 * - `openPopup`: if true, temporarily skips bounds updates to avoid interfering with popups.
 *
 * Dependencies:
 * - `react-map-gl` for Mapbox context.
 * - `mapbox-gl` for geometry calculations and view transitions.
 * - `isValidMarker` from local types — filters out invalid marker objects.
 * - `@getsoren/react-utils` helpers for type-safe checks.
 */
const FitBounds = ({
  markers = [],
  features,
  padding = 50,
  duration = 1000,
  disableAnimation,
  fitBounds = true,
  animationKey,
  openPopup,
  maxZoom,
}: FitBoundsProps) => {
  const { current: map } = useMap();
  const previousKey = useRef<string>("");

  const validMarkers = useMemo(() => markers.filter(isValidMarker), [markers]);
  const featureCoords = useMemo(() => extractCoordsFromFeatures(features), [features]);

  const bounds = useMemo(() => {
    const allPoints: [number, number][] = [
      ...validMarkers.map((m) => [Number(m.lng), Number(m.lat)] as [number, number]),
      ...featureCoords,
    ].filter(([lng, lat]) => Number.isFinite(lng) && Number.isFinite(lat)); // Filter out any coordinates that are not finite numbers (NaN, Infinity, undefined)

    if (allPoints.length === 0) {
      return null;
    }

    return allPoints.reduce((acc, [lng, lat]) => acc.extend([lng, lat]), new mapboxgl.LngLatBounds());
  }, [validMarkers, featureCoords]);

  /**
   * Main effect — Adjusts the map view dynamically to fit current markers or features.
   *
   * Runs when:
   * - map, bounds, or visible coordinates change
   * - `animationKey` changes (used to force a re-fit)
   * - popups open/close or animations are toggled
   *
   * Logic:
   * - Skips fitting if a popup is open or if the same key was already used.
   * - For a single marker → uses `flyTo()` with zoom.
   * - For multiple points → uses `fitBounds()` with padding and animation.
   */
  useEffect(() => {
    // Skip if popup is open — prevents unwanted map jumps
    if (openPopup) {
      previousKey.current = animationKey === undefined ? "__initial_skip__" : serializeKey(animationKey);
      return;
    }

    // Skip if map or bounds are missing, or fitting disabled
    if (!(map && fitBounds && bounds)) {
      return;
    }

    // Prevent re-running animation for the same key
    if (animationKey !== undefined) {
      const currentKey = serializeKey(animationKey);
      if (previousKey.current === currentKey) {
        return;
      }
      previousKey.current = currentKey;
    } else if (previousKey.current === "__initial_skip__") {
      return;
    }

    // Skip if bounds are empty
    if (bounds.isEmpty()) {
      return;
    }

    // If there's only one marker, fly directly to it
    if (validMarkers.length === 1 && featureCoords.length === 0) {
      const m = validMarkers[0];
      const lng = Number(m.lng);
      const lat = Number(m.lat);

      if (!(Number.isFinite(lng) && Number.isFinite(lat))) {
        return;
      }

      map.flyTo({
        center: [lng, lat],
        duration: disableAnimation ? 0 : duration,
        zoom: Math.min(SINGLE_MARKER_ZOOM, maxZoom ?? SINGLE_MARKER_ZOOM),
      });
      return;
    }

    // Fit all bounds with padding and optional animation
    map.fitBounds([bounds.getSouthWest().toArray(), bounds.getNorthEast().toArray()], {
      duration: disableAnimation ? 0 : duration,
      maxZoom,
      padding,
    });
  }, [map, bounds, padding, duration, disableAnimation, animationKey, fitBounds, validMarkers, featureCoords, openPopup, maxZoom]);

  return null;
};

export default FitBounds;
