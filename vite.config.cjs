
const { resolve } = require("path");
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");

// https://vitejs.dev/config/
module.exports = defineConfig({
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
        replacement: resolve(__dirname, "./src"),
      },
      {
        find: "lib",
        replacement: resolve(__dirname, "lib"),
      },
    ],
  },
});
