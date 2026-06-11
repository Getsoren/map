import { Box, Theme, useTheme } from "@getsoren/design-system";
import { isString } from "@getsoren/react-utils";

const BLACK = "#000000";
const WHITE = "#FFFFFF";

export const variantMarkerColor = {
  default: "#181A1C",
  primary: "#3F83F8",
  secondary: "#9C27B0",
  success: "#4CAF50",
  warning: "#FF9800",
} as const;

export type VariantMarker = keyof typeof variantMarkerColor;

type ThemeColorPath = `${keyof Theme["palette"]}.${string}`;
type ThemeColor = string | ((theme: Theme) => string) | ThemeColorPath;

interface MarkerProps {
  variant?: string | keyof typeof variantMarkerColor;
  color?: ThemeColor;
  size?: number;
  type?: string;
  mode?: "light" | "dark";
}

const isPredefinedVariant = (v: string): v is VariantMarker => v in variantMarkerColor;

const Markers = ({ color, variant, type, size = 28, mode }: MarkerProps) => {
  const theme = useTheme();
  const isDark = (mode ?? theme.palette.mode) === "dark";
  const centerColor = isDark ? WHITE : BLACK;
  const defaultColor = isDark ? variantMarkerColor.default : WHITE;
  const borderSize = Math.max(3, Math.round(size * 0.25));

  const resolvedColor = (() => {
    if (type === "dropOff") {
      return "#4e85e1";
    }

    if (variant && isPredefinedVariant(variant)) {
      return variant === "default" ? defaultColor : variantMarkerColor[variant];
    }

    if (!color) {
      return defaultColor;
    }

    if (typeof color === "function") {
      return color(theme);
    }

    if (isString(color) && color.includes(".")) {
      const [paletteKey, shade] = color.split(".") as [keyof Theme["palette"], string];
      const paletteSection = theme.palette[paletteKey];

      if (paletteSection && typeof paletteSection === "object" && shade in paletteSection) {
        return (paletteSection as Record<string, string>)[shade];
      }
    }

    return color;
  })();

  return (
    <Box
      component="div"
      style={{
        backgroundColor: centerColor,
        border: `${borderSize}px solid ${resolvedColor}`,
        borderRadius: "50%",
        boxShadow: "0 0 4px rgba(0,0,0,0.3)",
        height: size,
        width: size,
      }}
    />
  );
};

export default Markers;
