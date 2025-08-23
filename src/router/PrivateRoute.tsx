
// React
import { Navigate } from "react-router-dom";

// Hooks
import { useStudentStore } from "../features/shared/hooks/useStudentStore";

/**
 * Protects routes by redirecting unauthenticated users to the login page.
 */
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const {studentData} = useStudentStore.getState();

  return studentData?.token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
