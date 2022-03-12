import { Routes, Route, Navigate } from "react-router-dom";
import { PATH_DASHBOARD } from "routes/routes.paths";
import "antd/dist/antd.css";

import { appRoutes } from "routes/routes.routes";
import { Layout } from "./layout/index";

function App() {
  const renderRoutes = (routes: typeof appRoutes) =>
    routes.map((route) => (
      <Route key={route.path} path={route.path} element={route.component} />
    ));

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate replace to={PATH_DASHBOARD} />} />
          {renderRoutes(appRoutes)}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
