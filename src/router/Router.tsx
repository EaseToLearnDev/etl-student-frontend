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
import TopicListPage from "../features/exam_room/topic_test/pages/TopicListPage";
import TopicTestListPage from "../features/exam_room/topic_test/pages/TopicTestListPage";
import SubjectReport from "../features/reports_and_analytics/components/SubjectReport";

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
        <Route path="study-material" element={<SubjectListPage />} />
        <Route path="study-material/:subject" element={<SMTopicListPage />} />
        <Route path="smart-learning" element={<SubjectListPage />} />
        <Route path="smart-learning/:subject" element={<SLTopicListPage />} />
        <Route path="topic-test" element={<SubjectListPage />} />
        <Route path="topic-test/:subject" element={<TopicListPage />} />
        <Route path="topic-test/:subject/:topic" element={<TopicTestListPage />} />
        <Route path="select-mocktest" element={<>Exam Test</>} />
        <Route path="select-classtest" element={<>Class Test</>} />
        <Route path="report" element={<SubjectReport />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
