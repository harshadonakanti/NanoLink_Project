import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./RootLayout.jsx";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../src/routing/routeTree.js";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: { queryClient, store },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
