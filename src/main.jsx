import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Felip from "./pages/Felipe.jsx";
import Home from "./pages/Home.jsx";
import { ProtectedRoute } from "./services/ProtectedRoutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Felip />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <Home />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
