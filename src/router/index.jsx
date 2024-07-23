import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Auth from "./../pages/auth/index";
import MyMails from "../pages/my-mails";
import CreateMails from "../pages/create-mail";

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
        element: <MyMails />,
      },
      {
        path: "/create-mails",
        element: <CreateMails />,
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
