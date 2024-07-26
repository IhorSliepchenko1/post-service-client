import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Auth from "./../pages/auth/index";
import MyMails from "../pages/my-mails";
import CreateMails from "../pages/create-mail";
import AllMails from "../pages/all-mails";
import UsersAll from "./../components/users-all/index";

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
        element: <UsersAll />,
      },
      {
        path: "/users/:id",
        element: <UsersAll />,
      },
    ],
  },
]);
