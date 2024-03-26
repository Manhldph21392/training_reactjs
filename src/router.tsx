import { createBrowserRouter } from "react-router-dom";
import WebsiteLayout from "./modules/auth/pages/WebsiteLayout";
import LoginPage from "./modules/auth/pages/LoginPage";
import RegisterPage from "./modules/auth/pages/RegisterPage";
import ListData from "./modules/auth/pages/ListData";
import HomePage from "./modules/auth/pages/HomePage";
import AddProductPage from "./modules/auth/pages/AddProductPage";
import UpdateProduct from "./modules/auth/pages/UpdateProductPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WebsiteLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
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
  {
    path: "/add-product",
    element: <AddProductPage />,
  },
  {
    path:"/update-product/:idProduct",element: <UpdateProduct/>
  }
]);
