import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function htmlSeoPlugin() {
  return {
    name: "html-seo-from-content",
    transformIndexHtml(html) {
      const site = JSON.parse(
        readFileSync(resolve("src/content/site.json"), "utf8"),
      );
      const profile = JSON.parse(
        readFileSync(resolve("src/content/profile.json"), "utf8"),
      );
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.name,
        jobTitle: profile.title,
        url: site.seo.ogUrl,
        sameAs: [profile.github],
      };

      return html
        .replaceAll("__SEO_TITLE__", escapeHtml(site.seo.title))
        .replaceAll("__SEO_DESCRIPTION__", escapeHtml(site.seo.description))
        .replaceAll("__SEO_KEYWORDS__", escapeHtml(site.seo.keywords))
        .replaceAll(
          "__SEO_AUTHOR__",
          escapeHtml(`${profile.name}, ${profile.displayName}`),
        )
        .replaceAll("__SEO_OG_TITLE__", escapeHtml(site.seo.ogTitle))
        .replaceAll(
          "__SEO_OG_DESCRIPTION__",
          escapeHtml(site.seo.ogDescription),
        )
        .replaceAll("__SEO_OG_URL__", escapeHtml(site.seo.ogUrl))
        .replaceAll("__SEO_OG_SITE_NAME__", escapeHtml(site.seo.ogSiteName))
        .replaceAll("__SEO_JSON_LD__", JSON.stringify(jsonLd));
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const isProdEnv = mode === "production";
  const OUT_DIR = isProdEnv ? "build/" + env.VITE_CHAT_VARIABLE : "build";

  return {
    server: {
      host: "::",
      port: "8080",
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), htmlSeoPlugin()],
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
