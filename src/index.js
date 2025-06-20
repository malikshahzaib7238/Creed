import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutPage from "./About";
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
