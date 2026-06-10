import { Box, IconButton, Typography } from "@getsoren/design-system";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import type { ReactNode } from "react";
import { useState } from "react";

interface MapSidebarProps {
  title?: string;
  children: ReactNode;
}

const MapSidebar = ({ title, children }: MapSidebarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          backdropFilter: "blur(10px)",
          borderLeft: { md: "1px solid rgba(0,198,255,0.15)", xs: "none" },
          boxShadow: "0 0 20px rgba(0,198,255,0.05)",
          color: "text.primary",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: { md: "100%", xs: "100vh" },
          p: 2.5,
          position: { md: "relative", xs: "fixed" },
          right: 0,
          top: 0,
          transform: {
            md: "none",
            xs: open ? "translateX(0)" : "translateX(100%)",
          },
          transition: "transform 0.3s ease-in-out",
          width: { md: 300, xs: 280 },
          zIndex: 20,
        }}
      >
        {/* Close button (mobile) */}
        <Box sx={{ display: { md: "none", xs: "flex" }, justifyContent: "flex-end" }}>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "rgba(255,255,255,0.7)" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {title && (
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              textAlign: { md: "left", xs: "center" },
            }}
          >
            {title}
          </Typography>
        )}
        {children}
      </Box>

      <Box
        sx={{
          "&:hover": {
            background: "rgba(25, 28, 33, 0.95)",
            boxShadow: "0 0 12px rgba(0,198,255,0.3)",
          },
          alignItems: "center",
          backdropFilter: "blur(10px)",
          background: "rgba(15, 17, 20, 0.9)",
          borderLeft: "1px solid rgba(0,198,255,0.1)",
          borderRadius: "8px 0 0 8px",
          boxShadow: "0 0 8px rgba(0,198,255,0.15)",
          color: "#00C6FF",
          cursor: "pointer",
          display: { md: "none", xs: "flex" },
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
          position: "fixed",
          right: 0,
          top: 0,
          transition: "background 0.25s ease-in-out, box-shadow 0.25s ease-in-out",
          width: 36,
          zIndex: 15,
        }}
        onClick={() => setOpen(true)}
      >
        <MenuIcon fontSize="small" />
      </Box>
    </>
  );
};

export default MapSidebar;
