import React from "react";
import {
  Account,
  CitiesList,
  CountriesList,
  Home,
  ServersList,
  Settings,
} from "./Screens/App";
import { Create, Import, Start } from "./Screens/Onboarding";
import AppLayout from "./layouts/AppLayout";
import ListLayout from "./layouts/ListLayout";
import OnboardingLayout from "./layouts/OnboardingLayout";
import { createBrowserRouter } from "react-router-dom";
import IndexLayout from "./layouts/IndexLayout";

const routes = [
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "countries",
        element: <ListLayout />,
        children: [
          {
            path: "",
            element: <CountriesList />,
          },
          {
            path: ":countryId/cities",
            element: <CitiesList />,
          },
          {
            path: ":countryId/cities/:cityId/servers",
            element: <ServersList />,
          },
        ],
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/onboarding",
    element: <OnboardingLayout />,
    children: [
      {
        path: "",
        element: <Start />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "import",
        element: <Import />,
      },
    ],
  },
  {
    path: "/",
    element: <IndexLayout />,
  },
];

const router = createBrowserRouter(routes);

export default router;
