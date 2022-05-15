import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const path = require("path");
// eslint-disable-next-line import/no-unresolved
import Icons from "unplugin-icons/vite";
import { alias } from "./alias";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias,
  },
  plugins: [react(), Icons({ compiler: "jsx", jsx: "react" })],
});
