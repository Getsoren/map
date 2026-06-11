import { Box, GlobalStyles, Skeleton, useTheme } from "@getsoren/design-system";
import { CSSProperties, memo, ReactElement, useEffect, useMemo, useRef, useState } from "react";
import MapboxMap, { MapRef, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { isArray, isNumber } from "@getsoren/react-utils";
import FeatureCollection from "@/components/FeatureCollection/FeatureCollection";
import EmptyState from "@/components/Layout/EmptyState";
import Markers from "@/components/Markers/Markers";
import mapboxGlobalStyles from "@/constants/globalStyle";
import FitBounds from "@/features/Bounds/FitsBounds";
import Isochrone from "@/features/Isochrone/Isochrone";
import Itinerary from "@/features/Itinerary/Itinerary";
import NearestPointItinerary from "@/features/NearestPointItinerary/NearestPointItinary";
import PopupContent from "@/features/PopupContent/PopupContent";
import isValidMarker from "@/types/isValidMarker";
import { MapViewProps } from "@/types/MapViewProps";
import getCoreMapOptions, { getBaseMapStyle } from "@/utils/getCoreMapOptions";

/**
 * MapView
 *
 * A high-level Mapbox wrapper component providing an opinionated, feature-rich map
 * ready for production use. It extends the native Mapbox map with several built-in
 * capabilities, allowing developers to display interactive maps with minimal setup.
 *
 * Key Features Included:
 *  • Marker rendering with support for:
 *      – Custom icons/components
 *      – Variants, colors, and hover/click interactions
 *      – Optional Tooltip content
 *  • Popup management (controlled or uncontrolled):
 *      – Open on click or on hover
 *      – Force opening a popup via the `openPopup` prop
 *  • Auto-fit bounds to markers and/or GeoJSON features
 *  • Route and navigation helpers:
 *      – Display an itinerary (supports OSRM or custom engines)
 *      – Compute and highlight the nearest marker to a given point
 *  • Isochrones support (time/distance areas around a point)
 *  • GeoJSON FeatureCollection rendering
 *
 * Additional Capabilities:
 *  • Theme-aware Mapbox base style (light/dark mode, customizable)
 *  • Fine-grained interaction configuration (gestures, double-click, zoom, projection…)
 *  • Built-in skeleton loader
 *  • Completely memoized (React.memo) to avoid unnecessary rerenders
 *  • Delayed marker rendering until the map is fully loaded to avoid layout issues
 *
 * Key Props:
 *  - `markers`: Array of map markers ({ id, lat, lng, IconComponent, Tooltip, ... })
 *  - `openPopup` / `openPopupOnHover`: Controls how popups are triggered
 *  - `fitBounds`: Automatically adapts the map viewport to visible markers/features
 *  - `itineraryParams`: Displays a route between two locations
 *  - `findNearestMarker`: Computes the closest marker to an origin and shows the route
 *  - `isochrone`: Fetches and draws an isochrone from an external service
 *  - `features`: Renders GeoJSON data on the map
 *
 * Example Usage:
 *  <MapView
 *    markers={[{ id: "1", lat: 48.8566, lng: 2.3522, Tooltip: <div>Paris</div> }]}
 *    onMapClick={(lng, lat, marker) => console.log(lng, lat, marker)}
 *    fitBounds
 *    itineraryParams={{ from, to, profile: "driving" }}
 *  />
 *
 * Notes:
 *  - Map rendering starts only after `onLoad` to avoid resize issues.
 *  - When `openPopup` changes, the corresponding marker popup updates accordingly.
 *  - Designed to provide a plug-and-play mapping solution while remaining extensible.
 */
const MapView = ({
  containerStyle,
  square,
  loading,
  height = 300,
  width = "100%",
  center = [2.3522, 48.8566],
  zoom = 5,
  popupMaxWidth,
  openPopup,
  openPopupOnHover,
  markers = [],
  fitBounds = true,
  fitBoundsPadding,
  fitBoundsMaxZoom,
  fitBoundDuration,
  fitBoundsAnimationKey,
  disableAnimation,
  mapStyle: baseMapStyle,
  onMapClick,
  baseMapView,
  cooperativeGestures = true,
  doubleClickZoom = true,
  projection,
  theme: themeOverride,
  features,
  itineraryParams,
  findNearestMarker,
  isochrone,
  markerAnchor,
  popupAnchor = "top",
}: MapViewProps): ReactElement => {
  const theme = useTheme();
  const mapRef = useRef<MapRef | null>(null);
  const [selected, setSelected] = useState<string | number | null>(openPopup ?? null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(false);

  const initialCenter = useMemo(() => {
    const [lng = 2.3522, lat = 48.8566] = isArray(center) ? center : [];
    return { latitude: lat, longitude: lng, zoom };
  }, [center, zoom]);

  const mapStyle = useMemo(
    () => baseMapStyle || getBaseMapStyle(baseMapView, themeOverride ?? theme.palette.mode),
    [baseMapView, baseMapStyle, themeOverride, theme.palette.mode],
  );

  const {
    style: coreStyle,
    cooperativeGestures: coopGestures,
    doubleClickZoom: dblZoom,
  } = getCoreMapOptions({
    baseMapView,
    cooperativeGestures,
    doubleClickZoom,
    mapStyle,
    projection,
    theme: themeOverride ?? theme.palette.mode,
  });

  const handleMarkerClick = (id: string | number, hasTooltip: boolean) => {
    if (!openPopupOnHover && hasTooltip) {
      setSelected(id);
    }
  };

  const handleMarkerHover = (id: string | number | null, hasTooltip?: boolean) => {
    if (openPopupOnHover) {
      setSelected(hasTooltip ? id : null);
    }
  };

  useEffect(() => {
    setSelected(openPopup ?? null);
  }, [openPopup]);

  const selectedMarker = useMemo(() => (selected ? (markers?.find((m) => m.id === selected) ?? null) : null), [selected, markers]);

  if (error) {
    return <EmptyState width={width} height={height} />;
  }

  return (
    <Box
      data-testid="mapbox-container"
      sx={{
        borderRadius: square ? 0 : 1,
        height,
        isolation: "isolate",
        overflow: "hidden",
        position: "relative",
        width,
        ...containerStyle,
      }}
    >
      <GlobalStyles styles={mapboxGlobalStyles} />

      {loading && (
        <Skeleton
          data-testid="skeleton-loader"
          width={width}
          height={height}
          variant={square ? "rectangular" : "rounded"}
          sx={{
            inset: 0,
            position: "absolute",
            zIndex: 2,
          }}
        />
      )}

      {!loading && (
        <MapboxMap
          ref={mapRef}
          cooperativeGestures={coopGestures}
          doubleClickZoom={dblZoom}
          mapStyle={coreStyle}
          projection={projection ? projection : "mercator"}
          onLoad={() => {
            setMapLoaded(true);
            mapRef.current?.resize();
          }}
          onError={() => {
            setError(true);
          }}
          initialViewState={initialCenter}
          style={{ height: "100%", width: "100%" }}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
          onClick={(e) => {
            const clickedMarker = markers.find((m) => {
              const { lng, lat } = e.lngLat;
              const dx = Math.abs(Number(m.lng ?? 0) - lng);
              const dy = Math.abs(Number(m.lat ?? 0) - lat);
              return dx < 0.01 && dy < 0.01;
            });

            onMapClick?.(e.lngLat.lng, e.lngLat.lat, clickedMarker ?? null);
          }}
        >
          {/* Markers - only rendered after map fully initialized */}
          {mapLoaded &&
            markers.filter(isValidMarker).map((marker) => {
              const size = typeof marker.size === "number" ? marker.size : undefined;
              const autoMarkerAnchor = marker.IconComponent && !markerAnchor ? "top-left" : "center";

              const iconComponent = (() => {
                if (!marker.IconComponent) {
                  return null;
                }

                const iconProps = { ...marker.iconProps };

                if (size) {
                  iconProps.width = size;
                  iconProps.height = size;
                }

                return <marker.IconComponent {...iconProps} />;
              })();

              const defaultMarker = marker.IconComponent ? null : (
                <Markers color={marker.color} variant={marker.variant} size={size} type={marker.type} />
              );

              const wrapperStyle: CSSProperties = {
                alignItems: "center",
                cursor: marker.Tooltip ? "pointer" : "default",
                display: "inline-flex",
                justifyContent: "center",
                ...(marker.IconComponent && !size ? {} : size ? { height: size, width: size } : {}),
              };

              return (
                <Marker
                  key={marker.id}
                  longitude={marker.lng}
                  latitude={marker.lat}
                  anchor={markerAnchor || autoMarkerAnchor}
                  style={marker.zIndex === undefined ? undefined : { zIndex: marker.zIndex }}
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    marker.id && handleMarkerClick(marker.id, Boolean(marker.Tooltip));
                    onMapClick?.(marker.lng, marker.lat, marker);
                    marker.onClick?.(marker);
                  }}
                >
                  <Box
                    component="div"
                    onMouseEnter={() => marker.id && handleMarkerHover(marker.id, Boolean(marker.Tooltip))}
                    onMouseLeave={() => handleMarkerHover(null)}
                    style={wrapperStyle}
                  >
                    {iconComponent || defaultMarker}
                  </Box>
                </Marker>
              );
            })}

          {/* Popup */}
          {mapLoaded && selectedMarker?.Tooltip && (
            <Popup
              longitude={isNumber(selectedMarker.lng) ? selectedMarker.lng : 0}
              latitude={isNumber(selectedMarker.lat) ? selectedMarker.lat : 0}
              anchor={popupAnchor}
              onClose={() => setSelected(null)}
              maxWidth={popupMaxWidth}
              closeOnClick={true}
              closeOnMove={false}
            >
              <Box sx={{ minHeight: 60, minWidth: 240 }}>
                <PopupContent>{selectedMarker.Tooltip}</PopupContent>
              </Box>
            </Popup>
          )}

          {itineraryParams && (
            <Itinerary
              from={itineraryParams.from}
              to={itineraryParams.to}
              profile={itineraryParams.profile}
              engine={itineraryParams.engine}
              itineraryLineStyle={itineraryParams.itineraryLineStyle}
              initialRoute={itineraryParams.initialRoute}
              onRouteComputed={itineraryParams.onRouteComputed}
              itineraryLabel={itineraryParams.itineraryLabel}
            />
          )}

          {findNearestMarker && (
            <NearestPointItinerary
              origin={findNearestMarker.origin}
              destinations={findNearestMarker.destinations}
              onNearestFound={findNearestMarker.onNearestFound}
              maxDistanceMeters={findNearestMarker.maxDistanceMeters}
              engine={findNearestMarker.engine}
              profile={findNearestMarker.profile}
              initialNearestResults={findNearestMarker.initialNearestResults}
              itineraryLineStyle={findNearestMarker.itineraryLineStyle}
            />
          )}

          {isochrone && (
            <Isochrone
              origin={isochrone.origin}
              profile={isochrone.profile}
              onIsochroneLoaded={isochrone.onIsochroneLoaded}
              intervals={isochrone.intervals}
            />
          )}

          {features && <FeatureCollection features={features} />}

          {fitBounds && (
            <FitBounds
              markers={markers}
              features={features}
              padding={fitBoundsPadding}
              maxZoom={fitBoundsMaxZoom}
              duration={disableAnimation ? 0 : fitBoundDuration}
              animationKey={fitBoundsAnimationKey}
              openPopup={!!openPopup}
            />
          )}
        </MapboxMap>
      )}
    </Box>
  );
};

export default memo(MapView);
