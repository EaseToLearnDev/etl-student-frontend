import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true, // Automatically opens the visualizer in your browser
    }),
  ],
  base: '/student',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router", "react-router-dom"],
          charts: ["chart.js", "react-chartjs-2", "recharts"],
          icons: ["react-icons"],
          state: ["zustand"],
          utils: ["axios", "clsx", "tailwind-merge"],
        },
      },
    },
  },
});
