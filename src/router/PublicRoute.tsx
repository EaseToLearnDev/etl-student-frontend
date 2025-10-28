// React
import { Navigate } from "react-router-dom";

// Hooks
import { useStudentStore } from "../features/shared/hooks/useStudentStore";

/**
 * Redirects authenticated students to the home page, otherwise renders children.
 */
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const studentData = useStudentStore((state) => state.studentData);

  if (!studentData?.token) {
    return children;
  } else {
    if (studentData?.courses && studentData?.courses?.length > 0) {
      return <Navigate to="/" replace />;
    } else {
      return <Navigate to="/selectyourcourse" replace />;
    }
  }
};

export default PublicRoute;
