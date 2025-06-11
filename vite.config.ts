import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import mdx from "@mdx-js/rollup"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mdx()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
