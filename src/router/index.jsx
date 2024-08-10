import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Auth from "./../pages/auth/index";
import MyMails from "../pages/my-mails";
import CreateMails from "../pages/create-mail";
import AllMails from "../pages/all-mails";
import User from "./../pages/user/index";
import AllUsers from "../pages/all-users";

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
        path: "/all-mails",
        element: <AllMails />,
      },
      {
        path: "/users",
        element: <AllUsers />,
      },
      {
        path: "/users/:id",
        element: <User />,
      },
    ],
  },
]);
