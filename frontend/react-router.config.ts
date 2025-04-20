import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // For our React Router app, we will turn off Server-side render and use SPA mode.
  ssr: false,
  // We serve the React Router app from the "/react/" path.
  // The basename option tells React Router to manage this when generating
  // Link tags, for example.
  basename: "/react/"
} satisfies Config;
