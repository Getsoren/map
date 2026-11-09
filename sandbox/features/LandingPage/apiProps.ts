export interface PropsChild {
  prop: string;
  type: string;
  default: string;
  description: string;
}

export interface PropsItem {
  prop: string;
  type: string;
  default: string;
  description: string;
  children?: PropsChild[];
}

export interface PropsGroup {
  group: string;
  items: PropsItem[];
}

export const propsData: PropsGroup[] = [
  {
    group: "Core Map Settings",
    items: [
      {
        default: "[2.3522, 48.8566]",
        description: "Initial map center coordinates, as [lng, lat] or a { lng, lat } object.",
        prop: "center",
        type: "LngLatLike | number[]",
      },
      {
        default: "5",
        description: "Initial zoom level. Higher values zoom in closer.",
        prop: "zoom",
        type: "number",
      },
      {
        default: '"mapbox://styles/mapbox/streets-v12"',
        description: "Mapbox style URL or style ID for the base map rendering.",
        prop: "mapStyle",
        type: "string",
      },
      {
        default: '"street"',
        description: "Selects the base map view mode: street (default) or satellite.",
        prop: "baseMapView",
        type: '"street" | "satellite"',
      },
      {
        default: '"light"',
        description: "Controls the UI theme of the map. Affects colors, layers and UI styling.",
        prop: "theme",
        type: '"light" | "dark"',
      },
      {
        default: '"mercator"',
        description: "Projection mode used to render the map (e.g. mercator, globe, albers).",
        prop: "projection",
        type: "ReactMapProjection",
      },
      {
        default: '"100%"',
        description: "Width of the map container. Accepts number (px) or CSS units.",
        prop: "width",
        type: "number | string",
      },
      {
        default: "300",
        description: "Height of the map container. Accepts number (px) or CSS units.",
        prop: "height",
        type: "number | string",
      },
      {
        default: "false",
        description: "Forces a 1:1 aspect ratio. Height is matched to width.",
        prop: "square",
        type: "boolean",
      },
      {
        default: "-",
        description: "Custom styles applied to the root map container.",
        prop: "containerStyle",
        type: "SxProps",
      },
    ],
  },

  {
    group: "User Interaction",
    items: [
      {
        default: "true",
        description: "Improves UX on touch devices by requiring two-finger pan.",
        prop: "cooperativeGestures",
        type: "boolean",
      },
      {
        default: "true",
        description: "Toggles zoom on double-click interaction.",
        prop: "doubleClickZoom",
        type: "boolean",
      },
      {
        default: "-",
        description: "Triggered when the map or a marker is clicked. Provides coordinates and clicked marker if any.",
        prop: "onMapClick",
        type: "(lng: number, lat: number, clickedMarker?: MarkerProps | null) => void",
      },
    ],
  },

  {
    group: "Markers & Popups",
    items: [
      {
        default: "[]",
        description: "List of markers to render on the map.",
        prop: "markers",
        type: "MarkerProps[]",
      },
      {
        default: "-",
        description: "Custom URL for a default marker icon. Overrides default marker graphic if provided.",
        prop: "markerImageURL",
        type: "string",
      },
      {
        default: "-",
        description: "ID of the marker whose popup should open when the map loads.",
        prop: "openPopup",
        type: "number | string",
      },
      {
        default: "false",
        description: "Automatically opens a marker popup when hovering over it.",
        prop: "openPopupOnHover",
        type: "boolean",
      },
      {
        default: '"300px"',
        description: "Maximum width of popups. Accepts any valid CSS width unit.",
        prop: "popupMaxWidth",
        type: "string",
      },
    ],
  },

  {
    group: "Fit Bounds",
    items: [
      {
        default: "true",
        description: "Automatically adjusts map bounds to include all markers and/or features.",
        prop: "fitBounds",
        type: "boolean",
      },
      {
        default: "undefined",
        description: "Extra padding (in px) added around bounds when fitting.",
        prop: "fitBoundsPadding",
        type: "number",
      },
      {
        default: "false",
        description: "Disables the animation when applying bounds.",
        prop: "disableAnimation",
        type: "boolean",
      },
      {
        default: "500",
        description: "Duration in milliseconds of the fitBounds animation.",
        prop: "fitBoundDuration",
        type: "number",
      },
      {
        default: "-",
        description: "Changing this value programmatically retriggers fitBounds.",
        prop: "fitBoundsAnimationKey",
        type: "unknown",
      },
    ],
  },

  {
    group: "GeoJSON Layers",
    items: [
      {
        default: "-",
        description: "Single or multiple GeoJSON features rendered on the map.",
        prop: "features",
        type: "Feature | Feature[] | FeatureCollection",
      },
    ],
  },

  {
    group: "Routing",
    items: [
      {
        children: [
          { default: "-", description: "Start coordinate in [lng, lat].", prop: "from", type: "[number, number]" },
          { default: "-", description: "End coordinate in [lng, lat].", prop: "to", type: "[number, number]" },
          { default: '"driving"', description: "Transportation mode.", prop: "profile", type: '"driving" | "walking" | "cycling"' },
          { default: '"OSRM"', description: "Routing engine used to compute the route.", prop: "engine", type: '"OSRM" | "Mapbox"' },
          {
            default: "-",
            description: "Customizes the route line style.",
            prop: "itineraryLineStyle",
            type: "Partial<ItineraryLineStyle>",
          },
          {
            default: "null",
            description: "Use a precomputed route instead of fetching one.",
            prop: "initialRoute",
            type: "Feature<LineString> | null",
          },
          {
            default: "-",
            description: "Callback fired when route is loaded or recalculated.",
            prop: "onRouteComputed",
            type: "(route: Feature<LineString> | null) => void",
          },
          { default: "-", description: "Optional label displayed on or near the route.", prop: "itineraryLabel", type: "ReactNode" },
        ],
        default: "-",
        description: "Configuration options for computing and rendering a route on the map.",
        prop: "itineraryParams",
        type: "ItineraryParams",
      },
    ],
  },

  {
    group: "Nearest Marker",
    items: [
      {
        children: [
          { default: "-", description: "Origin coordinate in [lng, lat].", prop: "origin", type: "[number, number]" },
          {
            default: "[]",
            description: "List of candidate markers to compare.",
            prop: "destinations",
            type: "{ id: string | number; lat: number; lng: number }[]",
          },
          { default: "-", description: "Limits max search distance for nearest marker.", prop: "maxDistanceMeters", type: "number" },
          {
            default: '"driving"',
            description: "Transport mode for distance calculation.",
            prop: "profile",
            type: '"driving" | "walking" | "cycling"',
          },
          {
            default: "-",
            description: "Callback fired whenever nearest result(s) update.",
            prop: "onNearestFound",
            type: "(results: NearestResult[]) => void",
          },
          {
            default: "-",
            description: "Provide precomputed nearest results to avoid API call.",
            prop: "initialNearestResults",
            type: "NearestResult[]",
          },
          { default: '"OSRM"', description: "Routing engine used for distance calculation.", prop: "engine", type: '"OSRM" | "Mapbox"' },
          {
            default: "-",
            description: "Line style override applied to auto-generated route.",
            prop: "itineraryLineStyle",
            type: "Partial<ItineraryLineStyle>",
          },
        ],
        default: "-",
        description: "Automatically identifies and displays the nearest marker to a given origin.",
        prop: "findNearestMarker",
        type: "FindNearestMarkerParams",
      },
    ],
  },

  {
    group: "Isochrones",
    items: [
      {
        children: [
          { default: "-", description: "Center coordinate for isochrone generation.", prop: "origin", type: "[number, number]" },
          {
            default: '"driving"',
            description: "Transport mode used to compute isochrone.",
            prop: "profile",
            type: '"driving" | "walking" | "cycling"',
          },
          { default: "[10, 20, 30]", description: "Time ranges (in minutes) for isochrone rings.", prop: "intervals", type: "number[]" },
          {
            default: "-",
            description: "Callback triggered when isochrone data is loaded.",
            prop: "onIsochroneLoaded",
            type: "(data: FeatureCollection<Polygon> | null) => void",
          },
        ],
        default: "-",
        description: "Displays travel-time polygons based on origin and profile.",
        prop: "isochrone",
        type: "IsochroneProps",
      },
    ],
  },

  {
    group: "Loading",
    items: [
      {
        default: "false",
        description: "Shows a skeleton overlay while the map loads.",
        prop: "loading",
        type: "boolean",
      },
    ],
  },
];
