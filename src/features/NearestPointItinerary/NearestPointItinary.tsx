import { memo, useEffect, useRef, useState } from "react";
import RenderFeatures from "@/components/FeatureCollection/FeatureCollection";
import Itinerary from "@/features/Itinerary/Itinerary";
import MapboxService from "@/services/Mapbox";
import OSRMService from "@/services/OSRM";
import type { FindNearestMarkerParams, NearestResult } from "@/types/MapViewProps";

/**
 * Renders either:
 * - A precomputed itinerary (GeoJSON Feature) if available, or
 * - Dynamically computes the nearest point + its itinerary
 */
const NearestPointItinerary = ({
  origin,
  maxDistanceMeters,
  destinations,
  onNearestFound,
  initialNearestResults,
  itineraryLineStyle,
  profile = "driving",
  engine = "OSRM",
}: FindNearestMarkerParams) => {
  /** Local state storing computed or precomputed nearest results */
  const [allResults, setAllResults] = useState<NearestResult[]>(initialNearestResults ?? []);

  /** Used to detect changes and avoid unnecessary onNearestFound calls */
  const lastResultsRef = useRef<NearestResult[] | null>(null);

  /**
   * Sync internal state if the parent updates initialNearestResults
   * (useful when restoring precomputed results or after removal actions)
   */
  useEffect(() => {
    if (initialNearestResults) {
      setAllResults(initialNearestResults);
    }
  }, [initialNearestResults]);

  /**
   * Fetch nearest results only when no initial results are provided
   */
  useEffect(() => {
    const controller = new AbortController();

    // Skip fetching if parent already provided results
    if (initialNearestResults?.length) {
      return;
    }

    // Defensive checks
    if (!origin || origin.length !== 2 || !destinations?.length) {
      setAllResults([]);
      return;
    }

    setAllResults([]);

    const formattedDestinations = destinations.map((m) => ({
      coords: [m.lng, m.lat] as [number, number],
      id: m.id,
    }));

    const service = engine === "OSRM" ? OSRMService : MapboxService;

    service
      .findNearest(origin, formattedDestinations, profile, maxDistanceMeters)
      .then((results) => setAllResults(results ?? []))
      .catch(() => setAllResults([]));

    return () => controller.abort();
  }, [origin, maxDistanceMeters, destinations, profile, engine, initialNearestResults?.length]);

  /**
   * Notify parent when nearest results change
   * (to avoid infinite loops, compare previous vs new results)
   */
  useEffect(() => {
    const last = lastResultsRef.current;
    const hasChanged =
      !last ||
      last.length !== allResults.length ||
      last.some((r, i) => r.id !== allResults[i]?.id || r.distance !== allResults[i]?.distance);

    if (hasChanged) {
      onNearestFound?.(allResults);
      lastResultsRef.current = allResults;
    }
  }, [allResults, onNearestFound]);

  const nearest = allResults[0];
  if (!nearest) {
    return null;
  }

  /**
   * If the nearest result includes a precomputed itinerary (GeoJSON Feature),
   * render the full feature instead of computing a new itinerary
   */
  if (nearest.routeFeature) {
    return <RenderFeatures features={nearest.routeFeature} />;
  }

  /** Otherwise compute the itinerary dynamically */
  return <Itinerary from={origin} to={nearest.point} profile={profile} engine={engine} itineraryLineStyle={itineraryLineStyle} />;
};

export default memo(NearestPointItinerary);
