import { Navigate, Route, Routes } from "react-router";

// Route
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// Layout
import HydrogenLayout from "../layouts/hydrogen/components/MainLayout";

// Features
import NotFound from "../shared/NotFound";
import Settings from "../features/settings";
import SubjectListPage from "../features/shared/pages/SubjectListPage";
import ChildLayout from "../layouts/child-layout/ChildLayout";
import SMTopicListPage from "../features/study_room/study_material/pages/SMTopicListPage";
import SLTopicListPage from "../features/study_room/smart_learning/pages/SLTopicListPage";

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
        <Route path="studymaterial" element={<SubjectListPage />} />
        <Route path="studymaterial/:subject" element={<SMTopicListPage />} />
        <Route path="smartlearning" element={<SubjectListPage />} />
        <Route path="smartlearning/:subject" element={<SLTopicListPage />} />
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
