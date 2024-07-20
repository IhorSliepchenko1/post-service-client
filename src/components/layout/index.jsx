import ProtectedRoute from "../../utils/protected";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <ProtectedRoute>
      <div className="flex max-w-screen-xl mx-auto mt-10">
        <div className="flex-2 p-4">{/* <NavBar /> */}</div>
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
