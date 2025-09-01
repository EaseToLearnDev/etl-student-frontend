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
import AiHelpModal from "../components/AiHelpModal";

const TestSimulatorPage = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const params = new URLSearchParams(location.search);

  const setTestData = useTestStore((s) => s.setTestData);
  const testError = useTestStore((s) => s.testError);
  const testConfig = useTestStore((s) => s.testConfig);
  const setTestConfig = useTestStore((s) => s.setTestConfig);
  const setTestError = useTestStore((s) => s.setTestError);
  const startQuestionTimer = useTestStore((s) => s.startQuestionTimer);
  const stopQuestionTimer = useTestStore((s) => s.stopQuestionTimer);

  const isSubmissionModalOpen = useTestStore((s) => s.isSubmissionModalOpen);
  const setIsSubmissionModalOpen = useTestStore(
    (s) => s.setIsSubmissionModalOpen
  );
  const setIsHelpModalOpen = useTestStore((s) => s.setIsHelpModalOpen);
  const isHelpModalOpen = useTestStore((s) => s.isHelpModalOpen);
  const startTestTimer = useTestTimerStore((s) => s.startTestTimer);
  const stopTestTimer = useTestTimerStore((s) => s.stopTestTimer);

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
          onSubmit={() => {}}
          onContinueLater={() => {}}
          onClose={() => setIsSubmissionModalOpen(false)}
        />
      </Modal>
      <AiHelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </>
  );
};

export default TestSimulatorPage;
