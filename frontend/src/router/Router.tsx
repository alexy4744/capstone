import { createBrowserRouter } from "react-router-dom";

import { RequireAuth } from "./guards/RequireAuth";
import { RequireNoAuth } from "./guards/RequireNoAuth";

import { ForgotPassword, Login, Register } from "../pages/auth";
import HomePage from "../pages/Home";
import AnswerPage from "../pages/AnswerPage";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <RequireNoAuth />,
        children: [
          {
            path: "forgot-password",
            element: <ForgotPassword />,
          },
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
        children: [
          {
            path: "",
            element: <HomePage />
          },
          {
            path: "questions/:id",
            element: <AnswerPage />
          }
        ],
      },
    ],
  },
]);
