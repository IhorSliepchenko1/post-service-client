import ProtectedRoute from "../../utils/protected";
import NavBar from "../nav-bar";
import UserInfo from "../user-info";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <ProtectedRoute>
      <NavBar />
      <div className="flex justify-between layout-container">
        <UserInfo />
        <Outlet />
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
