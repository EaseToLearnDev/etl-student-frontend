import { Navigate, Route, Routes } from "react-router";

// Route
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// Layout
import HydrogenLayout from "../layouts/hydrogen/components/MainLayout";

// Features
import NotFound from "../shared/NotFound";
import Settings from "../features/settings";
import ChildLayout from "../layouts/child-layout/ChildLayout";
import SMTopicListPage from "../features/study_room/study_material/pages/SMTopicListPage";
import SLTopicListPage from "../features/study_room/smart_learning/pages/SLTopicListPage";
import TopicListPage from "../features/exam_room/topic_test/pages/TopicListPage";
import TestSimulator from "../features/test_simulator/pages/TestSimulator";
import TopicTestListPage from "../features/exam_room/topic_test/pages/TopicTestListPage";
import MockTestListPage from "../features/exam_room/mock_test/pages/MockTestListPage";

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

        <Route
          path="study-room"
          element={<Navigate to="/study-room/study-material" replace />}
        />
        <Route path="study-room/study-material" element={<SMTopicListPage />} />
        <Route path="study-room/smart-learning" element={<SLTopicListPage />} />

        <Route
          path="exam-room"
          element={<Navigate to="/exam-room/topic-test" replace />}
        />
        <Route path="exam-room/topic-test" element={<TopicListPage />} />
        <Route
          path="exam-room/topic-test/:subject"
          element={<TopicListPage />}
        />
        <Route
          path="exam-room/topic-test/:subject/:topic"
          element={<TopicTestListPage />}
        />
        <Route path="exam-room/mock-test" element={<MockTestListPage />} />
        <Route path="exam-room/class-test" element={<>Class Test</>} />

        <Route path="report" element={<>Reports & Analytics</>} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="test-simulator" element={<TestSimulator />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
