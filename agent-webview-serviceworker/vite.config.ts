import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  base: "/",
  publicDir: "static",
  build: {
    outDir: "dist",
    emptyOutDir: false,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    include: ["lit", "@lit/context", "@lit-labs/signals"],
  },
});
