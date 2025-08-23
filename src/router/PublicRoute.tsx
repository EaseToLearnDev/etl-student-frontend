
// React
import { Navigate } from "react-router-dom";

// Hooks
import { useStudentStore } from "../features/shared/hooks/useStudentStore";

/**
 * Redirects authenticated students to the home page, otherwise renders children.
 */
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const studentData = useStudentStore(state => state.studentData);

  return studentData?.token ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
