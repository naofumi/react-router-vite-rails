import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    assetsDir: "assets",
    // Set to true if you want sourcemaps
    sourcemap: true,
  },
  // Like in react-router.config.ts, this tells Vite that
  // the app is served from the "/react-router/" sub-path.
  // Change this if you want to use a different sub-path name.
  base: "/react-router/",
  // These are settings for the dev server.
  //
  // In production, the React Router app will be served from
  // the Ruby on Rails "/public" server.
  // Therefore, the hostname and port will exactly match that
  // of the Rails server.
  // In development, however, we need a Vite dev server that will
  // run on a different port (default 5173).
  // This is necessary for DX features like Hot-Module-Replacement.
  server: {
    // In production, the API server (Rails) and the assets
    // will be served from the same port number (typically 80).
    // However, in development, assets will be served from the
    // Vite dev server on port 5173, and the API server will be on
    // port 3000 (Rails default).
    // To handle this, Vite server's proxy mode can receive API requests
    // on its port (5173) and forward this to the Rails server (port 3000).
    proxy: {
      // Any requests starting with "/api" will be forwarded according to
      // the following rules.
      "/api": {
        // The requests will be forward to the Rails server on
        // "http://localhost:3000"
        target: "http://localhost:3000",
        // In our case, our Rails server does not serve APIs on "/api".
        // Instead, a request for Posts is handled by "http://localhost:3000/posts".
        // Therefore, we strip the "/api" prefix from the request path before
        // sending it to Rails.
        //
        // Note that if the Rails server has a dedicated namespace for APIs,
        // then you can just use that instead of "/api", and the following
        // rewrite rule will not be necessary.
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
