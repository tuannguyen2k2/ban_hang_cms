import { Routes, BrowserRouter, Route } from "react-router-dom";

import AppNavigate from "../modules/main/AppNavigate";

import routes from ".";

const routesArray = Object.values(routes);

const AppRoutes = () => {
  const renderRoute = (route) => {
    return (
      <Route
        key={route.path || "not-found"}
        path={route.path}
        index={route.index}
        Component={route.component}
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
