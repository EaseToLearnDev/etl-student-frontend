import { Navigate } from "react-router-dom";
import { useStudentStore } from "../features/store/useStudentStore";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const studentData = useStudentStore(state => state.studentData);

  return studentData?.token ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
