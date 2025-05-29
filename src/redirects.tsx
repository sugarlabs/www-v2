import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

export const redirectMap: Record<string, string> = {
  '/go/Sugar_Labs/Donate': '/donate',
  '/booting-soas': '/bootablesoas',

  // Example redirects:
  // '/old-path-1': '/new-path-1',
  // '/old-section/*': '/new-section',  // wildcard redirect
};

export const redirectRoutes: RouteObject[] = Object.entries(redirectMap).map(
  ([from, to]) => ({
    path: from,
    element: <Navigate to={to} replace />,
  }),
);
