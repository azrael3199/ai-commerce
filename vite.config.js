import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import { configDotenv } from "dotenv";

configDotenv();

export default defineConfig({
  plugins: [react(), createHtmlPlugin()],
  server: {
    host: "localhost",
    port: 3000,
  },
  root: "src",
  build: {
    // Relative to the root
    outDir: "../public",
  },
  envDir: "./",
});
