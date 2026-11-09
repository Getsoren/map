import { describe, expect, test } from "bun:test";
import mapboxgl from "mapbox-gl";
import { resolveMapCenter } from "@/utils/resolveMapCenter";

const LYON = { latitude: 45.764, longitude: 4.8357 };
const PARIS = { latitude: 48.8566, longitude: 2.3522 };

describe("resolveMapCenter", () => {
  test.each([
    ["a [lng, lat] array", [4.8357, 45.764]],
    ["a { lng, lat } object", { lat: 45.764, lng: 4.8357 }],
    ["a { lon, lat } object", { lat: 45.764, lon: 4.8357 }],
    ["a LngLat instance", new mapboxgl.LngLat(4.8357, 45.764)],
  ])("reads %s", (_, center) => {
    expect(resolveMapCenter(center)).toEqual(LYON);
  });

  test("keeps a [0, 0] center, which is a valid position", () => {
    expect(resolveMapCenter([0, 0])).toEqual({ latitude: 0, longitude: 0 });
  });

  test.each([
    ["no center", undefined],
    ["an empty array", []],
    ["NaN coordinates", [Number.NaN, Number.NaN]],
    ["a latitude out of range", { lat: 91, lng: 2 }],
  ])("falls back to Paris with %s", (_, center) => {
    expect(resolveMapCenter(center)).toEqual(PARIS);
  });
});
