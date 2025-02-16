import type { Config } from "@react-router/dev/config";
import { rename, rm } from "fs/promises"

export default {
  // Config options...
  // For our React Router app, we will turn off Server-side render
  // use SPA mode!!
  ssr: false,
  // Move the client side of the React Router build to
  // the Ruby on Rails public folder.
  //
  // Since the files will be served statically by Rails,
  // the folder name will define the URL for the React Router app.
  //
  // In the current example, by moving the files into `public/react-router`,
  // the React Router app will be served from the `/react-router` sub-path.
  //
  // However, we want to manage the `index.html` file separately in terms of
  // browser caching and cookie management, so we change the name and serve
  // it through Rails controller actions.
  buildEnd: async () => {
    await rm("../public/react-router", { recursive: true, force: true })
    await rename("build/client/index.html", "build/client/react-router-index.html")
    await rename("build/client", "../public/react-router")
    await rm("build", { recursive: true, force: true })
  },
  // In the above, we decided to serve the React Router app from "/react-router/".
  // The basename options tell React Router to manage this when generating
  // link tags, for example.
  basename: "/react-router/"
} satisfies Config;
