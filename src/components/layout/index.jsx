import ProtectedRoute from "../../utils/protected";
import { Outlet } from "react-router-dom";
import NavBar from "../nav-bar";

const Layout = () => {
  return (
    <ProtectedRoute>
      <NavBar />
      <div className="flex flex-col max-w-screen-xl mt-10 container">
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <div className="flex-2 p-4">
          <div className="flex-col flex gap-5">MAILS</div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
