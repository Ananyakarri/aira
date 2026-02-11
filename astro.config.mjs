// @ts-check
import 'dotenv/config';
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import cloudProviderFetchAdapter from "@wix/cloud-provider-fetch-adapter";
import wix from "@wix/astro";
import monitoring from "@wix/monitoring-astro";
import react from "@astrojs/react";
import sourceAttrsPlugin from "@wix/babel-plugin-jsx-source-attrs";
import dynamicDataPlugin from "@wix/babel-plugin-jsx-dynamic-data";
import customErrorOverlayPlugin from "./vite-error-overlay-plugin.js";
import postcssPseudoToData from "@wix/postcss-pseudo-to-data";

const isBuild = process.env.NODE_ENV == "production";

console.log("WIX CLIENT:", process.env.WIX_CLIENT_ID);

// https://astro.build/config
export default defineConfig({
  output: "server",

  integrations: [
    {
      name: "framewire",
      hooks: {
        "astro:config:setup": ({ injectScript, command }) => {
          if (command === "dev") {
            injectScript(
              "page",
              `import loadFramewire from "framewire.js";
               loadFramewire(true);`
            );
          }
        },
      },
    },

    tailwind(),

    // ✅ Wix SDK Integration — FINAL FIXED VERSION
    wix({
      htmlEmbeds: isBuild,

      // 🔥 Disable OAuth backend runtime
      backendExtensions: false,

      // SDK auth is default when OAuth is disabled
    }),

    ...(isBuild ? [monitoring()] : []),

    react({
      babel: {
        plugins: [sourceAttrsPlugin, dynamicDataPlugin],
      },
    }),
  ],

  vite: {
    plugins: [customErrorOverlayPlugin()],
    css: !isBuild
      ? {
          postcss: {
            plugins: [postcssPseudoToData()],
          },
        }
      : undefined,
  },

  ...(isBuild && {
    adapter: cloudProviderFetchAdapter({}),
  }),

  devToolbar: {
    enabled: false,
  },

  image: {
    domains: ["static.wixstatic.com"],
  },

  server: {
    allowedHosts: true,
    host: true,
  },

  security: {
    checkOrigin: false,
  },
});
