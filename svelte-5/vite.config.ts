import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    proxy: {
      "/xxx": {
        target: "https://unpkg.com/svelte@5.22.0/src",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/xxx/, ""),
      },

      // "/svelte/internal/disclose-version": {
      //   target:
      //     "https://unpkg.com/svelte@5.22.0/src/internal/disclose-version.js",
      //   changeOrigin: true,
      //   secure: false,
      // },

      // "/svelte/internal/flags/legacy": {
      //   target: "https://unpkg.com/svelte@5.22.0/src/internal/flags/legacy.js",
      // },

      // "/svelte/internal/client":
      //   "https://unpkg.com/svelte@5.22.0/src/internal/client/index.js",
    },
  },
});

/*

      //   -> http://localhost:4567/foo
*/
