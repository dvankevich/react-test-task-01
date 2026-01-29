import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Icons from "unplugin-icons/vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    react(),
    Icons({
      compiler: "jsx",
      autoInstall: true,
    }),
    cssInjectedByJsPlugin(),
  ],
});
