import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    visualizer({
      open: true, // Automatically opens the visualizer in your browser
    }),
  ],
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
