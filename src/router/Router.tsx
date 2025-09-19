// React
import { Navigate, Route, Routes, useLocation } from "react-router";
import { useEffect } from "react";

// Constants
import tabTitles from "./tabTitles";

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
// import OnboardingPage from "../features/onboarding/pages/OnboardingPage";
import TopicTestPage from "../features/exam_room/topic_test/pages/TopicTestPage";
import { PermissionRedirect } from "./PermissionRedirect";
import ProfilePage from "../features/profile/pages/ProfilePage";
import SettingsPage from "../features/settings/pages/SettingsPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import PaymentsPage from "../features/payments/pages/PaymentsPage";
import AllCoursesPage from "../features/all_courses/pages/AllCoursesPage";
import StudentReport from "../features/report/pages/StudentReport";
import { LearningSessionOverview } from "../features/report/pages/LearningSessionOverview";
import { TestAnalyticsOverview } from "../features/report/pages/TestAnalyticsOverview";
import TestWizard from "../components/TestWizard";
import ForgetPasswordPage from "../features/auth/forgetPassword/pages/ForgetPasswordPage";
import LoginDirectPage from "../features/auth/login/pages/LoginDirectPage";
import SelectYourCoursePage from "../features/all_courses/pages/SelectYourCoursePage";
import LogoutPage from "../features/auth/logout/pages/LogoutPage";

/**
 * Main application router component that defines all routes and their layouts.
 */
const Router = () => {
  const location = useLocation();
  useEffect(() => {
    const matchedKey = Object.keys(tabTitles).find((key) =>
      location.pathname.includes(key)
    );
    if (!matchedKey) {
      // TODO: HANDLE WHITELABELING
      document.title = "Ease To Learn";
    } else {
      document.title = tabTitles[matchedKey];
    }
  }, [location.pathname]);

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
        path="/logindirect"
        element={
          <PublicRoute>
            <LoginDirectPage />
          </PublicRoute>
        }
      />
      <Route
        path="/forget-password"
        element={
          <PublicRoute>
            <ForgetPasswordPage />
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
      {/* <Route
        path="/onboarding"
        element={
          <PrivateRoute>
            <OnboardingPage />
          </PrivateRoute>
        }
      /> */}
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
              to="/smart-learning"
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

        <Route path="report" element={<StudentReport />} />
        <Route path="selectcourse" element={<AllCoursesPage />} />

        <Route path="settings" element={<SettingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route
          path="learning-testanalytics"
          element={<LearningSessionOverview />}
        />
        <Route path="testanalytics" element={<TestAnalyticsOverview />} />
      </Route>
      <Route
        path="test-simulator"
        element={<TestSimulatorPage mode="registered" />}
      />
      <Route
        path="guest-testsimulator"
        element={<TestSimulatorPage mode="guest" />}
      />
      <Route path="testview" element={<TestSimulatorPage mode="review" />} />
      <Route path="guest-testbegin" element={<TestWizard />} />
      <Route path="selectyourcourse" element={<SelectYourCoursePage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
