import { RouteRecord } from "vite-react-ssg";

async function defaultToComponent(routePromise: Promise<any>) {
  const routeModule = await routePromise;

  return { ...routeModule, Component: routeModule.default };
}

function withLayout(children: RouteRecord[]) {
  return {
    path: "/",
    lazy: () => defaultToComponent(import("../pages/layout")),
    children,
  } as RouteRecord;
}

export const getRoutes = () => {
  return [
    withLayout([
      {
        index: true,
        lazy: () => defaultToComponent(import("../pages/page")),
      },
      {
        path: "/docs/:id",
        lazy: () => defaultToComponent(import("../pages/docs/[id]/page")),
      },
      {
        path: "/guides/:folder/:id",
        lazy: () => defaultToComponent(import("../pages/guides/[id]/page")),
      },
    ]),
  ] as RouteRecord[];
};
