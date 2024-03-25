import { createBrowserRouter } from "react-router-dom";
import WebsiteLayout from "./modules/auth/pages/WebsiteLayout";
import LoginPage from "./modules/auth/pages/LoginPage";
import RegisterPage from "./modules/auth/pages/RegisterPage";
import ListData from "./modules/auth/pages/ListData";

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
  {
    path: "list-data",
    element: <ListData />,
  },
]);
