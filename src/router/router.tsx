import { useRoutes, type RouteObject } from "react-router";
import { publicRoutes } from "./public";
import { privateRoutes } from "./private";
import { fallbackRoutes } from "./fallback";
import { ProtectedRoute } from "./guard/protectedRoute";
import { PublicRoute } from "./guard/publicRoute";
import { Footer, Layout, Nav } from "@/components";

export const AppRouter = () => {
  /** 
    Generates route configurations based on input routes, 
    optionally wrapping private routes with ProtectedRoute.
  **/
  const generateRouteConfig = (
    routes: Routes[],
    isPrivate = false,
  ): RouteObject[] => {
    return routes.map((route) => {
      // protected routes
      const routeObject: RouteObject = {
        path: route.path,
        element: isPrivate ? (
          <ProtectedRoute>{route.element}</ProtectedRoute>
        ) : (
          <PublicRoute>{route.element}</PublicRoute>
        ),
      };

      // Recursively handle & generate children routes
      if (route.children) {
        routeObject.children = generateRouteConfig(route.children, isPrivate);
      }

      return routeObject;
    });
  };

  const publicRouteObjects = generateRouteConfig(publicRoutes);
  const privateRouteObjects = generateRouteConfig(privateRoutes, true);
  const fallbackRouteObjects = generateRouteConfig(fallbackRoutes);

  const routes = [
    ...publicRouteObjects,
    ...privateRouteObjects,
    ...fallbackRouteObjects,
  ];

  const allRoutes = useRoutes(routes);
  const hiddenNavAndFooterRoutes: string[] = ["/login", "/register", "/verify"];
  const shouldShowNavAndFooter = !hiddenNavAndFooterRoutes.includes(
    location.pathname,
  );
  return (
    <>
      {shouldShowNavAndFooter && <Nav />}
      <Layout>{allRoutes}</Layout>
      {shouldShowNavAndFooter && <Footer />}
    </>
  );
};
