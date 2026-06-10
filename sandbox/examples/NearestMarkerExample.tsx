import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
} from "@getsoren/design-system";
import { WarningAmberRounded } from "@mui/icons-material";
import { useMemo, useState } from "react";
import type { ProjectionSpecification } from "react-map-gl";
import nearestPreCompute from "sandbox/examples/pre-compute/nearestPreCompute";
import MapSidebar from "sandbox/features/MapSideBar";
import Navbar from "sandbox/features/Navbar";
import ThemeSwitch from "sandbox/features/ThemeSwitch";
import MapView from "@/features/MapView/MapView";
import { Engine } from "@/types/MapViewProps";

const predefinedOrigins = [
  { coords: [2.3522, 48.8566], id: "origin-paris", name: "Paris (origin)" },
  { coords: [4.8357, 45.764], id: "origin-lyon", name: "Lyon (origin)" },
  { coords: [-0.5792, 44.8378], id: "origin-bordeaux", name: "Bordeaux (origin)" },
  { coords: [5.375, 43.2965], id: "origin-marseille", name: "Marseille (origin)" },
  { coords: [1.4442, 43.6047], id: "origin-toulouse", name: "Toulouse (origin)" },
];

const predefinedDestinations = [
  { id: 1, lat: 50.6292, lng: 3.0573, name: "Lille" },
  { id: 2, lat: 43.2965, lng: 5.375, name: "Marseille" },
  { id: 3, lat: 44.8378, lng: -0.5792, name: "Bordeaux" },
  { id: 4, lat: 45.764, lng: 4.8357, name: "Lyon" },
  { id: 5, lat: 43.6047, lng: 1.4442, name: "Toulouse" },
  { id: 6, lat: 43.6108, lng: 3.8767, name: "Montpellier" },
  { id: 7, lat: 43.7102, lng: 7.262, name: "Nice" },
  { id: 8, lat: 47.2184, lng: -1.5536, name: "Nantes" },
  { id: 9, lat: 48.5734, lng: 7.7521, name: "Strasbourg" },
  { id: 10, lat: 49.2583, lng: 4.0317, name: "Reims" },
  { id: 11, lat: 47.322, lng: 5.0415, name: "Dijon" },
  { id: 12, lat: 45.7833, lng: 3.0833, name: "Clermont-Ferrand" },
];

const engines = ["OSRM", "Mapbox"] as const;

const NearestMarkerExample = () => {
  const [projection, setProjection] = useState<ProjectionSpecification>({ name: "mercator" });
  const [profile, setProfile] = useState<"driving" | "walking" | "cycling">("driving");
  const [cooperativeGestures, setCooperativeGestures] = useState(true);
  const [doubleClickZoom, setDoubleClickZoom] = useState(true);
  const [origins, setOrigins] = useState([predefinedOrigins[0]]);
  const [searchRadius, setSearchRadius] = useState(3_000_000);
  const [nearestId, setNearestId] = useState<number | null>(null);
  const [nearestInfo, setNearestInfo] = useState<{ name: string; distance: number } | null>(null);
  const [engine, setEngine] = useState<Engine>("OSRM");
  const [showIntroModal, setShowIntroModal] = useState(true);

  const [filteredDestinations, setFilteredDestinations] = useState(predefinedDestinations);

  const originMarker = useMemo(
    () =>
      origins.map((o, index) => ({
        id: `origin-${index}`,
        lat: o.coords[1],
        lng: o.coords[0],
        popup: o.name,
        variant: "success",
      })),
    [origins],
  );

  const destinationMarkers = filteredDestinations.map((m) => ({
    color: m.id === nearestId ? "#2563eb" : "#f59e0b",
    id: m.id,
    lat: m.lat,
    lng: m.lng,
    popup: `🎯 ${m.name}`,
  }));

  const filteredInitialNearest = useMemo(() => {
    return nearestPreCompute.filter((r) => filteredDestinations.some((d) => d.id === r.id));
  }, [filteredDestinations]);
  const allMarkers = useMemo(() => [...destinationMarkers, ...originMarker], [originMarker, destinationMarkers]);

  return (
    <>
      <Navbar />
      <Stack direction="row" sx={{ height: "100vh", overflow: "hidden", width: "100vw" }}>
        <Box sx={{ flex: 1 }}>
          <MapView
            square
            key={`${cooperativeGestures}-${doubleClickZoom}-${projection.name}-${engine}-${profile}`}
            markers={allMarkers}
            cooperativeGestures={cooperativeGestures}
            doubleClickZoom={doubleClickZoom}
            projection={projection}
            fitBounds
            height="100%"
            width="100%"
            findNearestMarker={{
              destinations: filteredDestinations,
              engine: engine,
              initialNearestResults: filteredInitialNearest,
              itineraryLineStyle: {
                color: "#2563eb",
                opacity: 0.8,
                width: 2,
              },
              maxDistanceMeters: searchRadius,
              onNearestFound: (allResult) => {
                const nearestElement = allResult[0] || {};
                const { id, distance } = nearestElement;
                console.log("Nearest results:", { allResult });
                setNearestId(id as number);
                const info = filteredDestinations.find((d) => d.id === id);

                if (info) {
                  setNearestInfo({ distance: Math.round(distance), name: info.name });
                }
              },
              origin: (origins.at(-1)?.coords as [number, number]) ?? predefinedOrigins[0].coords,
              profile: profile,
            }}
            onMapClick={(_lng, _lat, clickedMarker) => {
              if (clickedMarker?.id && typeof clickedMarker.id === "number") {
                setFilteredDestinations((prev) => prev.filter((d) => d.id !== clickedMarker.id));

                if (clickedMarker.id === nearestId) {
                  setNearestId(null);
                  setNearestInfo(null);
                }
              }
            }}
          />
          <ThemeSwitch />
        </Box>

        <MapSidebar>
          <Button
            variant="outlined"
            onClick={() => setFilteredDestinations(predefinedDestinations)}
            disabled={filteredDestinations.length === predefinedDestinations.length}
          >
            Reset destinations
          </Button>

          <Typography variant="body2" color="text.secondary">
            Engine
          </Typography>
          <Select value={engine} onChange={(e) => setEngine(e.target.value as Engine)} size="small">
            {engines.map((eng) => (
              <MenuItem key={eng} value={eng}>
                {eng}
              </MenuItem>
            ))}
          </Select>

          <Typography variant="body2" color="text.secondary">
            Origin
          </Typography>
          <Select
            value={origins.at(-1)?.id ?? ""}
            onChange={(e) => {
              const newOrigin = predefinedOrigins.find((o) => o.id === e.target.value);
              if (!newOrigin) {
                return;
              }

              setOrigins([newOrigin]);

              setFilteredDestinations((prev) => {
                const lastOrigin = origins.at(-1);

                const cleaned = prev.filter((d) => d.lat !== newOrigin.coords[1] || d.lng !== newOrigin.coords[0]);

                if (lastOrigin) {
                  const wasAlreadyIn = cleaned.some((d) => d.lat === lastOrigin.coords[1] && d.lng === lastOrigin.coords[0]);
                  if (!wasAlreadyIn) {
                    const nextId = cleaned.length ? Math.max(...cleaned.map((d) => d.id)) + 1 : 1;

                    return [
                      ...cleaned,
                      {
                        id: nextId,
                        lat: lastOrigin.coords[1],
                        lng: lastOrigin.coords[0],
                        name: lastOrigin.name.replace(" (origin)", ""),
                      },
                    ];
                  }
                }

                return cleaned;
              });

              setNearestId(null);
              setNearestInfo(null);
            }}
            size="small"
          >
            {predefinedOrigins.map((o) => (
              <MenuItem key={o.id} value={o.id}>
                {o.name}
              </MenuItem>
            ))}
          </Select>

          <Typography variant="body2" color="text.secondary">
            Profile
          </Typography>
          <Select value={profile} onChange={(e) => setProfile(e.target.value as "driving" | "walking" | "cycling")} size="small">
            <MenuItem value="driving">🚗 Driving</MenuItem>
            <MenuItem value="walking">🚶 Walking</MenuItem>
            <MenuItem value="cycling">🚴 Cycling</MenuItem>
          </Select>

          <Typography variant="body2" color="text.secondary">
            Interactions
          </Typography>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="body2">Cooperative gestures</Typography>
              <Switch checked={cooperativeGestures} onChange={(e) => setCooperativeGestures(e.target.checked)} />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="body2">Double click zoom</Typography>
              <Switch checked={doubleClickZoom} onChange={(e) => setDoubleClickZoom(e.target.checked)} />
            </Stack>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Projection
          </Typography>
          <Select
            value={projection.name}
            onChange={(e) => setProjection({ name: e.target.value as ProjectionSpecification["name"] })}
            size="small"
          >
            <MenuItem value="mercator">Mercator</MenuItem>
            <MenuItem value="globe">Globe</MenuItem>
            <MenuItem value="albers">Albers</MenuItem>
            <MenuItem value="equalEarth">Equal Earth</MenuItem>
            <MenuItem value="equirectangular">Equirectangular</MenuItem>
            <MenuItem value="naturalEarth">Natural Earth</MenuItem>
          </Select>

          <FormControl size="small">
            <InputLabel>Max distance (m)</InputLabel>
            <Select value={searchRadius} label="Max distance (m)" onChange={(e) => setSearchRadius(Number(e.target.value))}>
              <MenuItem value={10000}>10 km</MenuItem>
              <MenuItem value={50000}>50 km</MenuItem>
              <MenuItem value={100000}>100 km</MenuItem>
              <MenuItem value={500000}>500 km</MenuItem>
              <MenuItem value={1000000}>1000 km</MenuItem>
              <MenuItem value={3000000}>∞ (no limit)</MenuItem>
            </Select>
          </FormControl>

          {nearestInfo && (
            <Box>
              <Typography variant="body2" fontWeight="bold">
                Nearest destination:
              </Typography>
              <Typography variant="body2">{nearestInfo.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {(nearestInfo.distance / 1000).toFixed(1)} km away
              </Typography>
            </Box>
          )}

          <Stack direction="column" spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              🟢 Origin = green
            </Typography>
            <Typography variant="caption" color="text.secondary">
              🟠 Destination = orange
            </Typography>
            <Typography variant="caption" color="text.secondary">
              🔵 Nearest = blue
            </Typography>
          </Stack>
        </MapSidebar>
      </Stack>

      <Dialog
        open={showIntroModal}
        onClose={() => setShowIntroModal(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            "@keyframes fadeInScale": {
              from: { opacity: 0, transform: "scale(0.95)" },
              to: { opacity: 1, transform: "scale(1)" },
            },
            animation: "fadeInScale 0.35s ease-out",
            backgroundColor: "background.paper",
            borderRadius: 3,
            boxShadow: 6,
            p: 2,
            textAlign: "center",
          },
        }}
      >
        <DialogContent>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
            <WarningAmberRounded color="warning" fontSize="large" />
            <Typography variant="h6" fontWeight={700}>
              Quick tip
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Click on any{" "}
            <Box component="span" sx={{ fontWeight: 600 }}>
              destination
            </Box>{" "}
            point to remove it from the map.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button variant="contained" onClick={() => setShowIntroModal(false)} sx={{ minWidth: 100 }}>
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NearestMarkerExample;
