import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Ensure that react-quill is listed as an external dependency if needed
    exclude: ["react-quill"],
  },
});
