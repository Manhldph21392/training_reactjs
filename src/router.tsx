import { createBrowserRouter } from "react-router-dom";
import HomePage from "./modules/auth/pages/HomePage";
import LoginForm from "./modules/auth/components/LoginForm";
import WebsiteLayout from "./modules/auth/pages/WebsiteLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WebsiteLayout />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
]);
