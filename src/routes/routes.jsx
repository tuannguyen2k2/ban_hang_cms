import { Routes, BrowserRouter, Route, Outlet } from "react-router-dom";

import AppNavigate from "../modules/main/AppNavigate";

import routes from ".";
import MainLayout from "../modules/main/MainLayout";

const routesArray = Object.values(routes);

const AppRoutes = () => {
  const renderRoute = (route) => {
    const Component = route.component;
    return (
      <Route
        key={route.path || "not-found"}
        path={route.path}
        index={route.index}
        element={
          <MainLayout>
            <Component>
              <Outlet />
            </Component>
          </MainLayout>
        }
      />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppNavigate />}>{routesArray.map(renderRoute)}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
