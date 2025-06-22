import { Navigate, Route, Routes } from "react-router";
import PrivateRoute from "./PrivateRoute";
import HydrogenLayout from "../layouts/hydrogen/components/MainLayout";
import NotFound from "../shared/NotFound";
import PublicRoute from "./PublicRoute";
import Settings from "../features/settings";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <>
              <h1>Login Page</h1>
            </>
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HydrogenLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<>Dashboard</>} />
        <Route path="studymaterial" element={<>Study Material</>} />
        <Route path="smartlearning" element={<>Smart Learning</>} />
        <Route path="selecttopictest" element={<>Topic Test</>} />
        <Route path="selectmocktest" element={<>Exam Test</>} />
        <Route path="selectclasstest" element={<>Class Test</>} />
        <Route path="report" element={<>Reports & Analytics</>} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
