import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { dependencies, name, peerDependencies } from "./package.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      fileName: (format) => {
        if (format === "es") {
          return "main.js";
        }
        if (format === "umd") {
          return "main.umd.cjs";
        }
        return "main.js";
      },
      formats: ["es", "umd"],
      name,
    },
    rolldownOptions: {
      external: [...Object.keys(dependencies), ...Object.keys(peerDependencies), "react/jsx-runtime", "react/jsx-dev-runtime"],
      output: {
        globals: {
          "@getsoren/design-system": "designSystem",
          "@mui/x-license": "muiXLicense",
          "mapbox-gl": "mapboxgl",
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  plugins: [
    dts({
      exclude: ["vite.config.ts", "sandbox"],
      tsconfigPath: "./tsconfig.app.json",
    }),
    // Mapbox requires CSS to be imported to render correctly (imported from provider)
    cssInjectedByJsPlugin(),
    react(),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") },
      { find: "sandbox", replacement: resolve(__dirname, "sandbox") },
    ],
    dedupe: ["react", "react-dom"],
  },
});
