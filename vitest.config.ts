/// <reference types="vitest" />
import { alias } from "./alias";
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
    setupFiles: 'src/setupTests.js',
  },
  resolve: {
    alias,
  },
});
