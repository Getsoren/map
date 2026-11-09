import { isArray } from "@getsoren/react-utils";
import type { LngLatLike } from "mapbox-gl";
import { isValidLatitude, isValidLongitude } from "@/types/isValidMarker";

export type MapCenter = LngLatLike | number[];

const FALLBACK_CENTER = { latitude: 48.8566, longitude: 2.3522 };

const toLngLatPair = (center: MapCenter): [unknown, unknown] => {
  if (isArray(center)) {
    return [center[0], center[1]];
  }

  return ["lon" in center ? center.lon : center.lng, center.lat];
};

/**
 * Converts every format accepted by the `center` prop to the view state expected by react-map-gl.
 * A missing or out-of-range center falls back to Paris, as mapbox-gl throws on invalid coordinates.
 */
export const resolveMapCenter = (center?: MapCenter): { latitude: number; longitude: number } => {
  if (!center) {
    return FALLBACK_CENTER;
  }

  const [longitude, latitude] = toLngLatPair(center);

  return isValidLongitude(longitude) && isValidLatitude(latitude) ? { latitude, longitude } : FALLBACK_CENTER;
};
