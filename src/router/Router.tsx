// React
import { Navigate, Route, Routes } from "react-router";

// Route
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// Layout
import HydrogenLayout from "../layouts/hydrogen/components/MainLayout";

// Pages
import NotFound from "../global/NotFound";
import StudyMaterialsPage from "../features/study_room/study_material/pages/StudyMaterialsPage";
import SmartLearningPage from "../features/study_room/smart_learning/pages/SmartLearningPage";
import TestSimulatorPage from "../features/test_simulator/pages/TestSimulatorPage";
import MockTestPage from "../features/exam_room/mock_test/pages/MockTestPage";
import ClassTestPage from "../features/exam_room/class_test/pages/ClassTestPage";
import LoginPage from "../features/auth/login/pages/LoginPage";
import SignupPage from "../features/auth/signup/pages/SignupPage";
import OnboardingPage from "../features/onboarding/pages/OnboardingPage";
import TopicTestPage from "../features/exam_room/topic_test/pages/TopicTestPage";
import { PermissionRedirect } from "./PermissionRedirect";
import ProfilePage from "../features/profile/pages/ProfilePage";
import SettingsPage from "../features/settings/pages/SettingsPage";
import ReportLearningSessionPage from "../features/report/pages/ReportLearningSessionPage";
import ReportOverviewPage from "../features/report/pages/ReportOverviewPage";
import ReportClassTestPage from "../features/report/pages/ReportClassTestPage";
import ReportTopicTestPage from "../features/report/pages/ReportTopicTestPage";
import ReportMockTestPage from "../features/report/pages/ReportMockTestPage";
import ReportCompetitiveSessionPage from "../features/report/pages/ReportCompetitiveSessionPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import PaymentsPage from "../features/payments/pages/PaymentsPage";
import AllCoursesPage from "../features/all_courses/pages/AllCoursesPage";

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
        <Route path="dashboard" element={<DashboardPage />} />

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
        <Route
          path="study-room/study-material"
          element={<StudyMaterialsPage />}
        />
        <Route
          path="study-room/smart-learning"
          element={<SmartLearningPage />}
        />

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
          element={
            <PermissionRedirect
              to="/report/overview"
              parentId="report"
              parentPath="report"
            />
          }
        />
        <Route path="report/overview" element={<ReportOverviewPage />} />
        <Route path="report/learning" element={<ReportLearningSessionPage />} />
        <Route
          path="report/competitive"
          element={<ReportCompetitiveSessionPage />}
        />
        <Route path="report/topic-test" element={<ReportTopicTestPage />} />
        <Route path="report/mock-test" element={<ReportMockTestPage />} />
        <Route path="report/class-test" element={<ReportClassTestPage />} />

        <Route path="selectcourse" element={<AllCoursesPage />} />

        <Route path="settings" element={<SettingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="payments" element={<PaymentsPage />} />
      </Route>
      <Route path="test-simulator" element={<TestSimulatorPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
