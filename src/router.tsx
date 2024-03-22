import { createBrowserRouter } from "react-router-dom";
import WebsiteLayout from "./modules/auth/pages/WebsiteLayout";
import Register from "./modules/auth/components/RegisterForm";
import LoginPage from "./modules/auth/pages/LoginPage";

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
    element: <Register />,
  },
]);
