import { Box, Button, keyframes, Paper, Typography } from "@getsoren/design-system";
import GitHubIcon from "@mui/icons-material/GitHub";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import packageJson from "../../../package.json";

// --- Subtle shimmer for the title ---
const shimmer = keyframes`
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
`;

// --- Fade-in animation ---
const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const Hero = () => {
  return (
    <Box
      sx={{
        animation: `${fadeIn} 0.8s ease-out`,
        mb: 12,
        overflow: "hidden",
        pb: 12,
        position: "relative",
        pt: 10,
        textAlign: "center",
      }}
    >
      {/* --- Glass reflection glow --- */}
      <Box
        sx={{
          "&::after": {
            bottom: "-20%",
            content: '""',
            filter: "blur(100px)",
            height: 300,
            position: "absolute",
            right: "20%",
            width: 500,
          },
          "&::before": {
            content: '""',
            filter: "blur(100px)",
            height: 300,
            left: "25%",
            position: "absolute",
            top: "-10%",
            width: 500,
          },
          inset: 0,
          position: "absolute",
          zIndex: 0,
        }}
      />

      {/* --- Hero content --- */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        {/* Small badge */}
        <Paper
          variant="outlined"
          sx={{
            backdropFilter: "blur(6px)",
            background: "rgba(0,122,255,0.08)",
            borderColor: "rgba(0,198,255,0.4)",
            borderRadius: 9999,
            color: "#00BFFF",
            display: "inline-block",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 0.4,
            mb: 3,
            px: 2,
            py: 0.5,
            textTransform: "uppercase",
          }}
        >
          React Library
        </Paper>

        {/* Title */}
        <Typography
          variant="h2"
          fontWeight={800}
          sx={{
            animation: `${shimmer} 8s linear infinite`,
            background: "linear-gradient(90deg,#00C6FF,#007AFF,#00C6FF)",
            backgroundSize: "200% 100%",
            color: "transparent",
            fontSize: { md: 56, xs: 42 },
            mb: 2,
            textShadow: "0 0 20px rgba(0,198,255,0.25)",
            WebkitBackgroundClip: "text",
          }}
        >
          @getsoren/map
        </Typography>

        {/* Description */}
        <Typography
          variant="h6"
          sx={{
            color: "rgba(230, 230, 230, 0.85)",
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: 720,
            mb: 5,
            mx: "auto",
          }}
        >
          Simplify complex geospatial tasks with a single React component — render markers, routes, and GeoJSON layers, compute travel-time
          areas and optimal paths, or find nearest markers effortlessly with a unified, declarative API.
        </Typography>

        {/* CTA buttons */}
        <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
          <Button
            variant="contained"
            color="primary"
            size="large"
            component="a"
            href="https://www.npmjs.com/package/@getsoren/map"
            target="_blank"
            startIcon={<RocketLaunchIcon />}
            sx={{
              boxShadow: "0 0 15px rgba(0,198,255,0.25)",
              fontSize: 16,
              fontWeight: 600,
              px: 3,
              py: 1.2,
            }}
          >
            Install via npm
          </Button>

          <Button
            variant="outlined"
            color="primary"
            size="large"
            component="a"
            href="https://github.com/Tracktor/map"
            target="_blank"
            startIcon={<GitHubIcon />}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(0,198,255,0.08)",
                borderColor: "rgba(0,198,255,0.6)",
              },
              borderColor: "rgba(0,198,255,0.4)",
              fontSize: 16,
              fontWeight: 600,
              px: 3,
              py: 1.2,
            }}
          >
            View on GitHub
          </Button>
        </Box>

        {/* Version tag */}
        <Typography
          variant="body2"
          sx={{
            color: "rgba(180,180,180,0.6)",
            mt: 4,
          }}
        >
          Open source & community-driven • version {packageJson.version}
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
