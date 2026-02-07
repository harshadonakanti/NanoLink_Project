import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../RootLayout.jsx";
import { homePageRoute } from "./homepage.js";
import { dashboardRoute } from "./dashboard.js";
import { authRoute } from "./auth.route.js";
export const rootRoute = createRootRoute({
  component: RootLayout,
});
export const routeTree = rootRoute.addChildren([
  homePageRoute,
  dashboardRoute,
  authRoute,
]); // You can add child routes here in the future
