import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth.userData);

  if (!token) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
