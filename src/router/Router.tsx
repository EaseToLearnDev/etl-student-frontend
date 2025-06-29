import { Navigate, Route, Routes } from "react-router";

// Route
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// Layout
import HydrogenLayout from "../layouts/hydrogen/components/MainLayout";

// Features
import NotFound from "../shared/NotFound";
import Settings from "../features/settings";
import StudyMaterial from "../features/study_room/study_material/pages/SubjectsList";
import SubjectDetail from "../features/study_room/study_material/pages/SubjectDetail";
import ChildLayout from "../layouts/child-layout/ChildLayout";

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
        <Route path="dashboard" element={<ChildLayout />} />
        <Route path="studymaterial" element={<StudyMaterial />} />
        <Route path="studymaterial/:subject" element={<SubjectDetail />} />
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
