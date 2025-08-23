
// React
import { Navigate, Route, Routes } from "react-router";

// Route
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// Layout
import HydrogenLayout from "../layouts/hydrogen/components/MainLayout";

// Pages
import NotFound from "../shared/NotFound";
import StudyMaterialsPage from "../features/study_room/study_material/pages/StudyMaterialsPage";
import SmartLearningPage from "../features/study_room/smart_learning/pages/SmartLearningPage";
import TestSimulatorPage from "../features/test_simulator/pages/TestSimulatorPage";
import MockTestPage from "../features/exam_room/mock_test/pages/MockTestPage";
import ClassTestPage from "../features/exam_room/class_test/pages/ClassTestPage";
import ReportAnalytics from "../features/reports_and_analytics/pages/ReportAnalytics";
import OverallPerformanceReport from "../features/reports_and_analytics/pages/OverallPerformanceReport";
import MockTestAnalytics from "../features/reports_and_analytics/pages/MockTestAnalytics";
import LoginPage from "../features/auth/login/pages/LoginPage";
import SignupPage from "../features/auth/signup/pages/SignupPage";
import OnboardingPage from "../features/onboarding/pages/OnboardingPage";
import TopicTestPage from "../features/exam_room/topic_test/pages/TopicTestPage";
import { PermissionRedirect } from "./PermissionRedirect";
import ProfilePage from "../features/profile/pages/ProfilePage";
import SettingsPage from "../features/settings/pages/SettingsPage";

/**
 * Main application router component that defines all routes and their layouts.
 */
const Router = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />
      <Route
        path="/onboarding"
        element={
          <PrivateRoute>
            <OnboardingPage />
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
        <Route path="study-room/study-material" element={<StudyMaterialsPage />} />
        <Route path="study-room/smart-learning" element={<SmartLearningPage />} />

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
        <Route path="exam-room/topic-test" element={<TopicTestPage />} />
        <Route path="exam-room/mock-test" element={<MockTestPage />} />
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

        <Route path="settings" element={<SettingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="test-simulator" element={<TestSimulatorPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
