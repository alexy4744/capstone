import { createBrowserRouter } from "react-router-dom";

import { RequireAuth } from "./guards/RequireAuth";
import { RequireNoAuth } from "./guards/RequireNoAuth";

import { Login, Register } from "../pages/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <RequireNoAuth />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        element: <RequireAuth />,
        children: [],
      },
    ],
  },
]);
