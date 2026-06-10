import type { SxProps } from "@getsoren/design-system";
import type { Feature, FeatureCollection, GeoJsonProperties, LineString, Polygon } from "geojson";
import type { LngLatLike } from "mapbox-gl";
import type { ReactNode } from "react";
import type { ProjectionSpecification as ReactMapProjection } from "react-map-gl";
import type { RoutingProfile } from "@/services/core/interface";
import type { MarkerProps } from "@/types/MarkerProps";

/* -------------------------------------------------------------------------- */
/*                               Shared Types                                 */
/* -------------------------------------------------------------------------- */

export const engines = ["OSRM", "Mapbox"] as const;
export type Engine = (typeof engines)[number];

export const profiles = ["driving", "walking", "cycling"] as const;
export type Profile = (typeof profiles)[number];

export interface ItineraryLineStyle {
  color: string;
  width: number;
  opacity: number;
}

/* -------------------------------------------------------------------------- */
/*                             Feature: Isochrones                             */
/* -------------------------------------------------------------------------- */

export interface IsochroneProps {
  /** Origin coordinates: [lng, lat] */
  origin: [number, number];

  /** Routing mode for isochrone calculation */
  profile?: RoutingProfile;

  /** Time ranges in minutes for each generated isochrone */
  intervals?: number[];

  /** Callback fired once isochrone data is retrieved */
  onIsochroneLoaded?: (data: FeatureCollection<Polygon> | null) => void;
}

/* -------------------------------------------------------------------------- */
/*                              Feature: Itinerary                            */
/* -------------------------------------------------------------------------- */

export interface ItineraryParams {
  /** Start coordinate: [lng, lat] */
  from?: [number, number];

  /** End coordinate: [lng, lat] */
  to?: [number, number];

  /** Routing mode */
  profile?: Profile;

  /** Routing engine to use (OSRM or Mapbox) */
  engine?: Engine;

  /** Optional style override for the drawn itinerary line */
  itineraryLineStyle?: Partial<ItineraryLineStyle>;

  /** Precomputed GeoJSON route used instead of fetching dynamically */
  initialRoute?: Feature<LineString, GeoJsonProperties> | null;

  /** Callback fired when a route is computed or loaded */
  onRouteComputed?: (route: Feature<LineString, GeoJsonProperties> | null) => void;

  /** Optional label displayed along the route (ex: "12 min") */
  itineraryLabel?: ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                         Feature: Nearest Marker Search                      */
/* -------------------------------------------------------------------------- */

export interface NearestResult {
  id: number | string;
  /** Destination coordinate: [lng, lat] */
  point: [number, number];
  /** Straight-line or route distance in meters */
  distance: number;
  /** Optional precomputed itinerary route for this result */
  routeFeature?: Feature<LineString, GeoJsonProperties> | null;
}

export interface FindNearestMarkerParams {
  /** Origin coordinates: [lng, lat] */
  origin: [number, number];

  /** List of candidate destination markers */
  destinations: { id: string | number; lat: number; lng: number }[];

  /** Maximum allowed search distance in meters */
  maxDistanceMeters?: number;

  /** Routing profile for distance calculation */
  profile?: RoutingProfile;

  /** Fired with all nearest results whenever recalculated */
  onNearestFound?: (all: NearestResult[]) => void;

  /** Precomputed list of nearest results to avoid fetching again */
  initialNearestResults?: NearestResult[];

  /** Routing engine to use */
  engine?: Engine;

  /** Style override applied to the auto-generated itinerary */
  itineraryLineStyle?: Partial<ItineraryLineStyle>;
}

/* -------------------------------------------------------------------------- */
/*                               Map View Props                               */
/* -------------------------------------------------------------------------- */

export interface MapViewProps {
  /** Automatically fits map bounds to include all markers */
  fitBounds?: boolean;

  /** Padding used when applying fitBounds */
  fitBoundsPadding?: number;

  /** Maximum zoom level applied when fitting bounds; also caps the zoom used when flying to a single marker (default: 14) */
  fitBoundsMaxZoom?: number;

  /** Initial map center: [lng, lat] */
  center?: LngLatLike | number[];

  /** Mapbox style URL or ID */
  mapStyle?: string;

  /** Initial zoom level */
  zoom?: number;

  /** Max width of marker popups */
  popupMaxWidth?: string;

  /** Map container width */
  width?: number | string;

  /** Map container height */
  height?: number | string;

  /** Displays a loading skeleton on top of the map */
  loading?: boolean;

  /** Custom marker icon URL */
  markerImageURL?: string;

  /** Custom styles for the map container */
  containerStyle?: SxProps;

  /** Disables animation when fitting bounds */
  disableAnimation?: boolean;

  /** Duration of fitBounds animation in ms */
  fitBoundDuration?: number;

  /** Changing this key retriggers fitBounds animation */
  fitBoundsAnimationKey?: unknown;

  /** Forces a 1:1 ratio container size */
  square?: boolean;

  /** ID of the marker whose popup should auto-open */
  openPopup?: number | string;

  /** Opens popups on hover instead of click */
  openPopupOnHover?: boolean;

  /** List of markers rendered on the map */
  markers?: MarkerProps[];

  /**
   * Triggered when clicking on the map or a marker.
   * If a marker is clicked, the third argument contains the marker object.
   */
  onMapClick?: (lng: number, lat: number, clickedMarker?: MarkerProps | null) => void;

  /** Map UI theme */
  theme?: "dark" | "light";

  /** Map projection */
  projection?: ReactMapProjection;

  /** Base map layer */
  baseMapView?: "satellite" | "street";

  /** Enables touch-friendly gestures */
  cooperativeGestures?: boolean;

  /** Enables double-click zoom */
  doubleClickZoom?: boolean;

  /** Single or multiple GeoJSON features displayed on the map */
  features?: Feature | Feature[] | FeatureCollection;

  /** Configuration for displaying a single itinerary */
  itineraryParams?: ItineraryParams;

  /** Automatically find & display nearest destination marker */
  findNearestMarker?: FindNearestMarkerParams;

  /** Configuration for displaying isochrones */
  isochrone?: IsochroneProps;

  /**
   * Anchor position for markers
   * Default is "center"
   * */
  markerAnchor?: "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

  /**
   * Anchor position for popups
   * Default is "top"
   */
  popupAnchor?: "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
