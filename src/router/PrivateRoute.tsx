import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  // const token = localStorage.getItem("token");
  const token = "abc"

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
