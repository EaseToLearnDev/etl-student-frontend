// React
import { useEffect } from "react";
import { useLocation } from "react-router";

// Hooks & Stores
import useIsMobile from "../../../hooks/useIsMobile";
import useTestTimerStore from "../store/useTestTimerStore";
import useTestStore from "../store/useTestStore";

// Services
import { handleTestConfigSetup } from "../services/handleTestConfigSetup";
import { loadTestDetails } from "../services/loadTestDetails";

// Layouts and Components
import MobileTestSimulator from "../components/mobile/MobileTestSimulator";
import DesktopTestSimulator from "../components/desktop/DesktopTestSimulator";
import { Modal } from "../../../components/Modal";
import SubmissionModalContent from "../components/SubmissionModalContent";
import ContinueLaterModalContent from "../components/ContinueLaterModalContent";

const TestSimulator = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const params = new URLSearchParams(location.search);

  const testData = useTestStore((state) => state.testData);
  const setTestData = useTestStore((state) => state.setTestData);
  const testError = useTestStore((state) => state.testError);
  const testConfig = useTestStore((state) => state.testConfig);
  const setTestConfig = useTestStore((state) => state.setTestConfig);
  const questionResponseMap = useTestStore(
    (state) => state.questionResponseMap
  );
  const setTestError = useTestStore((state) => state.setTestError);
  const startQuestionTimer = useTestStore((state) => state.startQuestionTimer);
  const stopQuestionTimer = useTestStore((state) => state.stopQuestionTimer);
  const isSubmissionModalOpen = useTestStore(
    (state) => state.isSubmissionModalOpen
  );
  const setIsSubmissionModalOpen = useTestStore(
    (state) => state.setIsSubmissionModalOpen
  );
  const isContinueLaterModalOpen = useTestStore(
    (state) => state.isContinueLaterModalOpen
  );
  const setIsContinueLaterModalOpen = useTestStore(
    (state) => state.setIsContinueLaterModalOpen
  );
  const startTestTimer = useTestTimerStore((state) => state.startTestTimer);
  const stopTestTimer = useTestTimerStore((state) => state.stopTestTimer);

  useEffect(() => {
    const setupTest = async () => {
      // Test Configuration Setup
      const { testConfig, error } = handleTestConfigSetup({ params: params });

      // Save Possible Error
      if (error) setTestError(error);

      // Fetch test details
      if (testConfig) {
        setTestConfig(testConfig);
        const data = await loadTestDetails({ testConfig });
        if (data) setTestData(data);

        if (testConfig?.assessmentMode === "advance") {
          startTestTimer(data?.remainingTime ?? 0);
        }

        startQuestionTimer();
      }
    };

    setupTest();

    return () => {
      stopQuestionTimer();
      if (testConfig?.assessmentMode === "advance") {
        stopTestTimer();
      }
    };
  }, []);

  return (
    <>
      {testError?.id === "not_found" ? (
        <h1>TEST NOT FOUND!</h1>
      ) : !isMobile ? (
        <DesktopTestSimulator />
      ) : (
        <MobileTestSimulator />
      )}
      <Modal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        size="lg"
        className="p-4"
      >
        <SubmissionModalContent
          onSubmit={undefined}
          onClose={() => setIsSubmissionModalOpen(false)}
        />
      </Modal>
      <Modal
        isOpen={isContinueLaterModalOpen}
        onClose={() => setIsContinueLaterModalOpen(false)}
        size="lg"
        className="p-4"
      >
        <ContinueLaterModalContent
          onSubmit={undefined}
          onClose={() => setIsContinueLaterModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default TestSimulator;
