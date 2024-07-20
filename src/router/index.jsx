import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Auth from "./../pages/auth/index";
import Registration from "./../components/register/index";
import Main from "./../pages/main/index";

// PAGES

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "/mails",
        element: <h1>mails/:id</h1>,
      },
      {
        path: "users/:id",
        element: <h1>users</h1>,
      },
      {
        path: "users/all",
        element: <h1>users/all</h1>,
      },
    ],
  },
]);
