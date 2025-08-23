import { Navigate, Route, Routes } from "react-router";

// Route
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// Layout
import HydrogenLayout from "../layouts/hydrogen/components/MainLayout";

// Pages
import NotFound from "../shared/NotFound";
import StudyMaterials from "../features/study_room/study_material/pages/StudyMaterials";
import SmartLearning from "../features/study_room/smart_learning/pages/SmartLearning";
import TestSimulator from "../features/test_simulator/pages/TestSimulator";
import MockTestList from "../features/exam_room/mock_test/pages/MockTestList";
import ClassTestPage from "../features/exam_room/class_test/ClassTest";
import ReportAnalytics from "../features/reports_and_analytics/pages/ReportAnalytics";
import OverallPerformanceReport from "../features/reports_and_analytics/pages/OverallPerformanceReport";
import MockTestAnalytics from "../features/reports_and_analytics/pages/MockTestAnalytics";
import Login from "../features/auth/login/pages/Login";
import Signup from "../features/auth/signup/pages/Signup";
import Onboarding from "../features/onboarding/pages/Onboarding";
import TopicTestTreeView from "../features/exam_room/topic_test/pages/TopicTestTreeView";
import { PermissionRedirect } from "./PermissionRedirect";
import Settings from "../features/settings";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/onboarding"
        element={
          <PrivateRoute>
            <Onboarding />
          </PrivateRoute>
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

        {/* Calculate study room default route  */}
        <Route
          path="study-room"
          element={
            <PermissionRedirect
              to="/study-material"
              parentId="studyRoom"
              parentPath="study-room"
            />
          }
        />
        <Route path="study-room/study-material" element={<StudyMaterials />} />
        <Route path="study-room/smart-learning" element={<SmartLearning />} />

        {/* Calculate exam room default route  */}
        <Route
          path="exam-room"
          element={
            <PermissionRedirect
              to="/topic-test"
              parentId="examRoom"
              parentPath="exam-room"
            />
          }
        />
        <Route path="exam-room/topic-test" element={<TopicTestTreeView />} />
        <Route path="exam-room/mock-test" element={<MockTestList />} />
        <Route path="exam-room/class-test" element={<ClassTestPage />} />

        <Route
          path="report"
          element={<Navigate to="/report/overview" replace />}
        />
        <Route path="report/overview" element={<ReportAnalytics />} />
        <Route
          path="report/overview/performance"
          element={<OverallPerformanceReport />}
        />
        <Route
          path="report/overview/performance/:subject"
          element={<OverallPerformanceReport />}
        />
        <Route path="report/mock-test" element={<MockTestAnalytics />} />

        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="test-simulator" element={<TestSimulator />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
