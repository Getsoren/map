import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@getsoren/design-system";
import HomeIcon from "@mui/icons-material/Home";
import { useMemo, useState } from "react";
import type { ProjectionSpecification } from "react-map-gl";
import MapSidebar from "sandbox/features/MapSideBar";
import Navbar from "sandbox/features/Navbar";
import ThemeSwitch from "sandbox/features/ThemeSwitch";
import { VariantMarker, variantMarkerColor } from "@/components/Markers/Markers";
import MapView from "@/features/MapView/MapView";
import { MarkerProps } from "@/types/MarkerProps";

const MAX_MARKERS = 1000;
const DEFAULT_MARKERS = 150;

const TooltipExample = ({ name }: { name: string }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">Hello world</Typography>
      <Typography variant="body2">I m a tooltip {name}</Typography>
    </CardContent>
  </Card>
);

const ReactMarkerExample = ({ name }: { name: string }) => (
  <Paper elevation={2} sx={{ borderRadius: 5, p: 1 }}>
    <Stack direction="row" spacing={1} alignItems="center">
      <Avatar size="small">
        <HomeIcon fontSize="small" />
      </Avatar>
      <Typography variant="h6" pr={0.5}>
        {name}
      </Typography>
      <Chip label={name} size="xSmall" variant="outlined-rounded" color="warning" />
    </Stack>
  </Paper>
);

const randomOffset = () => (Math.random() - 0.5) * 0.01;

const generateMarkers = (
  count: number,
  variant: "default" | "primary" | "secondary" | "success" | "warning" | undefined = "default",
): MarkerProps[] =>
  Array.from({ length: count }, (_, i) => {
    const markerId = i + 1;
    const id = `${markerId}`;
    const baseLat = 48.844039;
    const baseLng = 2.489326;
    const lat = baseLat + randomOffset();
    const lng = baseLng + randomOffset();
    const isWorksite = i % 2 === 0;

    return {
      id,
      lat,
      lng,
      name: `marker ${String.fromCharCode(65 + (i % 26))}${i}`,
      onClick: (element) => {
        console.log(`Marker ${id} clicked`, element);
      },
      ...(isWorksite
        ? {
            Tooltip: <TooltipExample name={`tooltip-${id}`} />,
            type: "worksite",
            variant: variant,
          }
        : {
            IconComponent: ReactMarkerExample,
            iconProps: { name: `icon-${i}` },
            Tooltip: <TooltipExample name={`tooltip-${id}`} />,
            type: "agency",
          }),
    };
  });

const MarkersExample = () => {
  const [baseMapView, setBaseMapView] = useState<"street" | "satellite">("street");
  const [cooperativeGestures, setCooperativeGestures] = useState(true);
  const [doubleClickZoom, setDoubleClickZoom] = useState(true);
  const [projection, setProjection] = useState<ProjectionSpecification>({
    name: "mercator",
  });
  const [visibleMarkerCount, setVisibleMarkerCount] = useState(DEFAULT_MARKERS);
  const [openPopupId, setOpenPopupId] = useState<string>("");
  const [openPopupOnHover, setOpenPopupOnHover] = useState(false);
  const [markerVariant, setMarkerVariant] = useState<VariantMarker>("default");

  const handleMapClick = (lng: number, lat: number): void => {
    console.log("Map clicked at:", { lat, lng });
  };

  const markers = useMemo(() => generateMarkers(visibleMarkerCount, markerVariant), [visibleMarkerCount, markerVariant]);

  return (
    <>
      <Navbar />
      <Stack direction="row" sx={{ height: "100vh", overflow: "hidden", width: "100vw" }}>
        {/* 🗺️ Map */}
        <Box sx={{ flex: 1 }}>
          <MapView
            square
            key={`${cooperativeGestures}-${doubleClickZoom}-${projection}-${projection}`}
            openPopup={openPopupId}
            markers={markers}
            height="100%"
            width="100%"
            onMapClick={handleMapClick}
            baseMapView={baseMapView}
            cooperativeGestures={cooperativeGestures}
            doubleClickZoom={doubleClickZoom}
            projection={projection}
            openPopupOnHover={openPopupOnHover}
          />

          <ThemeSwitch />
        </Box>

        {/* ⚙️ Sidebar panel */}
        <MapSidebar>
          {/* Base map style */}
          <Typography variant="body2" color="text.secondary">
            Base Map View
          </Typography>
          <Select value={baseMapView} onChange={(e) => setBaseMapView(e.target.value)} size="small">
            <MenuItem value="street">Street</MenuItem>
            <MenuItem value="satellite">Satellite</MenuItem>
          </Select>

          {/* Marker count */}
          <Typography variant="body2" color="text.secondary">
            Number of markers ({visibleMarkerCount})
          </Typography>
          <Slider min={1} max={MAX_MARKERS} value={visibleMarkerCount} onChange={(_, v) => setVisibleMarkerCount(v as number)} />

          {/* Popup ID */}
          <Typography variant="body2" color="text.secondary">
            Open popup
          </Typography>
          <TextField placeholder="Marker ID e.g. 10" size="small" value={openPopupId} onChange={(e) => setOpenPopupId(e.target.value)} />

          {/* Interactions */}
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

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="body2">Open popup on hover</Typography>
              <Switch checked={openPopupOnHover} onChange={(e) => setOpenPopupOnHover(e.target.checked)} />
            </Stack>

            {/* Marker color */}
            <Typography variant="body2" color="text.secondary">
              Marker color
            </Typography>
            <Select value={markerVariant} onChange={(e) => setMarkerVariant(e.target.value as VariantMarker)} size="small">
              {Object.entries(variantMarkerColor).map(([key, color]) => (
                <MenuItem key={key} value={key}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        backgroundColor: color,
                        borderRadius: "50%",
                        height: 16,
                        width: 16,
                      }}
                    />
                    <Typography variant="body2">{key}</Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </Stack>

          {/* Projection */}
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
        </MapSidebar>
      </Stack>
    </>
  );
};

export default MarkersExample;
