import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");
  const apiTarget = env.VITE_DEV_API_PROXY_TARGET || "http://127.0.0.1:8000";

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/dogs": {
          target: apiTarget,
          changeOrigin: true,
        },
        "/uploads": {
          target: apiTarget,
          changeOrigin: true,
        },
        "/calendar": {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
  };
});