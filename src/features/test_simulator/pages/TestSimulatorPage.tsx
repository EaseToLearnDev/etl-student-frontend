// React
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

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
import { useAiStore } from "../store/useAiStore";
import { handleTestSubmit } from "../services/handleTestSubmit";
import { handleContinueLater } from "../services/handleContinueLater";

const TestSimulatorPage = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

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
  const setIsHelpModalOpen = useAiStore((s) => s.setIsHelpModalOpen);
  const isHelpModalOpen = useAiStore((s) => s.isHelpModalOpen);
  const startTestTimer = useTestTimerStore((s) => s.startTestTimer);
  const stopTestTimer = useTestTimerStore((s) => s.stopTestTimer);
  const setIsAiFeatureEnabled = useAiStore((s) => s.setIsAiFeatureEnabled);

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

        if (
          testConfig?.assessmentMode === "advance" ||
          testConfig?.testType !== 1
        ) {
          startTestTimer(data?.remainingTime ?? 0);
        }
        if (testConfig?.testType === 1) {
          setIsAiFeatureEnabled(true);
        }

        startQuestionTimer();
      }
    };

    setupTest();

    return () => {
      stopQuestionTimer();
      if (
        testConfig?.assessmentMode === "advance" ||
        testConfig?.testType !== 1
      ) {
        stopTestTimer();
      }
    };
  }, []);

  // useEffect(() => {
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     event.preventDefault();
  //     event.returnValue = ""; // Required for Chrome to trigger the confirmation dialog
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  return (
    <>
      {testError?.id === "not_found" ? (
        <h1>TEST NOT FOUND!</h1>
      ) : !isMobile ? (
        <DesktopTestSimulator mode="test" />
      ) : (
        <MobileTestSimulator mode="test" />
      )}
      <Modal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        size="lg"
        className="p-4"
      >
        <SubmissionModalContent
          onSubmit={() => handleTestSubmit(navigate)}
          onContinueLater={() => handleContinueLater(navigate)}
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
