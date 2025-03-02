import {
  index,
  route,
  layout,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("./layouts/default.tsx", [
    route("sessions/new", "routes/sessions/new.tsx"),
    route("sessions/:id", "routes/sessions/delete.tsx"),
    route("posts", "routes/posts/home.tsx"),
    route("posts/new", "routes/posts/new.tsx"),
    route("privates", "routes/privates/home.tsx"),
    route("fixtures", "routes/fixtures/home.tsx"),
  ]),
] satisfies RouteConfig;
