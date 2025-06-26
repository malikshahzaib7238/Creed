import React from "react";
import ReactDOM from "react-dom/client";

import App from "./pages/App";
import AboutPage from "./pages/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test from "./pages/Test";

import IntroWrapper from "./components/IntroWrapper";
const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <IntroWrapper />,
    },
    {
      path: "/about",
      element: <AboutPage />
    },
    {
      path: "/test",
      element: <Test/>
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
