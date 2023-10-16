import "./global.css";

import { ViteReactSSG } from "vite-react-ssg";
import { getRoutes } from "./utils/routes";

export const createRoot = ViteReactSSG(
  // react-router-dom data routes
  { routes: getRoutes() },
  // function to have custom setups
  ({}) => {
    // do something.
  }
);
