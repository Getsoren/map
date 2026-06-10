import { render } from "@testing-library/react";
import { beforeEach, describe, expect, mock, test } from "bun:test";
import FitBounds from "@/features/Bounds/FitsBounds";

const flyTo = mock();
const fitBounds = mock();

/** Minimal LngLatBounds stand-in: enough for extend/isEmpty/corner accessors used by FitBounds */
class FakeLngLatBounds {
  coords: [number, number][] = [];

  extend(coord: [number, number]) {
    this.coords.push(coord);
    return this;
  }

  isEmpty() {
    return this.coords.length === 0;
  }

  getSouthWest() {
    return { toArray: () => [Math.min(...this.coords.map(([lng]) => lng)), Math.min(...this.coords.map(([, lat]) => lat))] };
  }

  getNorthEast() {
    return { toArray: () => [Math.max(...this.coords.map(([lng]) => lng)), Math.max(...this.coords.map(([, lat]) => lat))] };
  }
}

mock.module("mapbox-gl", () => ({
  __esModule: true,
  default: { LngLatBounds: FakeLngLatBounds },
}));

mock.module("react-map-gl", () => ({
  __esModule: true,
  useMap: () => ({ current: { fitBounds, flyTo } }),
}));

const TWO_MARKERS = [
  { id: "a", lat: 45.75, lng: 4.85 },
  { id: "b", lat: 45.76, lng: 4.86 },
];

const ONE_MARKER = [{ id: "a", lat: 45.75, lng: 4.85 }];

describe("🧭 FitBounds", () => {
  beforeEach(() => {
    flyTo.mockClear();
    fitBounds.mockClear();
  });

  test("multiple markers → fitBounds without maxZoom key when prop is omitted (regression: explicit undefined breaks mapbox camera)", () => {
    render(<FitBounds markers={TWO_MARKERS} />);

    expect(fitBounds).toHaveBeenCalledTimes(1);
    const options = fitBounds.mock.calls[0][1];
    expect("maxZoom" in options).toBe(false);
  });

  test("multiple markers → fitBounds receives maxZoom when provided", () => {
    render(<FitBounds markers={TWO_MARKERS} maxZoom={13} />);

    expect(fitBounds).toHaveBeenCalledTimes(1);
    expect(fitBounds.mock.calls[0][1].maxZoom).toBe(13);
  });

  test("single marker → flyTo keeps default zoom 14 when maxZoom is omitted", () => {
    render(<FitBounds markers={ONE_MARKER} />);

    expect(flyTo).toHaveBeenCalledTimes(1);
    expect(flyTo.mock.calls[0][0].zoom).toBe(14);
    expect(fitBounds).not.toHaveBeenCalled();
  });

  test("single marker → flyTo zoom is capped by maxZoom", () => {
    render(<FitBounds markers={ONE_MARKER} maxZoom={12} />);

    expect(flyTo).toHaveBeenCalledTimes(1);
    expect(flyTo.mock.calls[0][0].zoom).toBe(12);
  });
});
