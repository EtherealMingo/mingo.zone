import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import { tmpdir } from "os";

import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // 加载 .env 文件
  const env = loadEnv(mode, process.cwd(), "");

  const isProdEnv = mode === "production";
  const PUBLIC_PATH = isProdEnv
    ? env.VITE_PUBLIC_PATH + "/" + env.VITE_CHAT_VARIABLE
    : env.VITE_PUBLIC_PATH;
  const OUT_DIR = isProdEnv ? "build/" + env.VITE_CHAT_VARIABLE : "build";

  return {
    server: {
      host: "::",
      port: "8080",
      hmr: {
        overlay: false,
      },
    },
    plugins: [react()],
    base: "/",
    build: {
      outDir: OUT_DIR,
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
        {
          find: "lib",
          replacement: resolve(__dirname, "lib"),
        },
      ],
    },
  };
});
