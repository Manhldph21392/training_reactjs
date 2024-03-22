import { createBrowserRouter } from "react-router-dom";
import WebsiteLayout from "./modules/auth/pages/WebsiteLayout";
import LoginPage from "./modules/auth/pages/LoginPage";
import RegisterPage from "./modules/auth/pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WebsiteLayout />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
]);
