import { Navigate } from "react-router-dom";
import { useStudentStore } from "../features/store/useStudentStore";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const {studentData} = useStudentStore.getState();

  return studentData?.token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
