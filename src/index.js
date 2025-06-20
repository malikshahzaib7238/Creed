import React from "react";
import ReactDOM from "react-dom/client";

import App from "./pages/App";
import AboutPage from "./pages/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/about",
      element: <AboutPage />
    }

  ]);

  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
        <Router />
  </React.StrictMode>
);
