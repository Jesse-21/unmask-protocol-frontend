
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // Use relative base path to ensure assets load correctly in any environment
  base: './',
  server: {
    host: "::",
    port: "8080",
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    // Ensure build succeeds even with warnings
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          ui: ['sonner', 'lucide-react'],
        },
      },
    },
    target: ['es2015', 'edge88', 'firefox78', 'chrome87', 'safari13'],
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve("./src"),
      },
      {
        find: "lib",
        replacement: resolve("lib"),
      },
    ],
  },
});
