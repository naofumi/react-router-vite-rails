import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const railsEnv = process.env.RAILS_ENV || 'development'

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    assetsDir: "assets",
    // Set to true if you want sourcemaps in your build.
    sourcemap: (["test", "development"].indexOf(railsEnv) !== -1) ? true : false,
  },
  // As also defined in react-router.config.ts, this tells Vite that
  // the app is served from the "/react/" sub-path.
  base: "/react/",

  // These are settings for the dev server.
  server: {
    // In production and preview mode, the API server (Rails) and the assets
    // will be served from the same port number (typically 80 for production and 3000 for preview).
    //
    // However, when using the vite development server, assets will be served from port 5173,
    // and the API server will be on port 3000 (Rails default).
    // The use of different ports complicates CORS settings and cookie handling.
    //
    // To work around this, Vite provides a proxy mode that can receive API requests
    // on port (5173) and forward them to the Rails server (port 3000).
    // From the browser's viewpoint, all communications including API requests to the Rails server
    // will now happen on port 5173, so CORS will no longer be necessary.
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
        //
        // Also see `frontend/app/utilities/proxy.ts` for how we handle this inside React.
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
