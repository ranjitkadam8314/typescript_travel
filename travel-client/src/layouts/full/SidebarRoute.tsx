import * as React from "react";

import { Routes, Route } from "react-router-dom";

import adminRoutes from "../../shared/routes/adminRoutes";

import { useSelector } from "react-redux";
import { selectAuth } from "../../app/slices/authSlice";
interface ISidebarRouteProps {}

const SidebarRoute: React.FunctionComponent<ISidebarRouteProps> = (props) => {
  const loggedUser = useSelector(selectAuth);
  return (
    <>
      <React.Suspense>
        <Routes>
          {Array.isArray(adminRoutes) &&
            adminRoutes
              ?.filter(({ roles }) =>
                roles?.includes(loggedUser?.role as string)
              )
              .map(({ component, path, hasChildren, roles }, i) => (
                <Route
                  key={path + i}
                  element={component}
                  path={hasChildren ? `${path}/*` : path}
                />
              ))}
        </Routes>
      </React.Suspense>
    </>
  );
};

export default SidebarRoute;
