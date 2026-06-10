import { Box, Stack, Switch, useTheme } from "@getsoren/design-system";
import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { useThemeMode } from "sandbox/context/ThemeProvider";

const ThemeSwitch = () => {
  const { themeMode, toggleTheme } = useThemeMode();
  const isDark = themeMode === "dark";
  const theme = useTheme();

  return (
    <Box
      sx={{
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(4px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        animation: "fadeIn 0.25s ease",
        bottom: 16,
        left: 16,
        p: 1,
        position: "absolute",
        zIndex: 100,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          backgroundColor: theme.palette.background.default,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          px: 2,
          py: 1,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          {isDark ? (
            <DarkModeRounded fontSize="small" sx={{ color: "text.secondary" }} />
          ) : (
            <LightModeRounded fontSize="small" sx={{ color: "text.secondary" }} />
          )}
        </Stack>

        <Switch
          checked={isDark}
          onChange={toggleTheme}
          sx={{
            "& .MuiSwitch-thumb": {
              backgroundColor: isDark ? "#facc15" : "#0ea5e9",
              transition: "background-color 0.3s ease",
            },
            "& .MuiSwitch-track": {
              backgroundColor: isDark ? "#475569" : "#d1d5db",
              opacity: 1,
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default ThemeSwitch;
