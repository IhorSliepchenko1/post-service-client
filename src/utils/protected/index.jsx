import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth.jwt);

  if (!auth) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
