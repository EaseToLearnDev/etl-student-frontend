// React
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

// Hooks & Stores
import useIsMobile from "../../../hooks/useIsMobile";
import useTestTimerStore from "../store/useTestTimerStore";
import useTestStore from "../store/useTestStore";

// Layouts and Components
import MobileTestSimulator from "../components/mobile/MobileTestSimulator";
import DesktopTestSimulator from "../components/desktop/DesktopTestSimulator";
import { Modal } from "../../../components/Modal";
import SubmissionModalContent from "../components/SubmissionModalContent";
import AiHelpModal from "../components/AiHelpModal";
import { useAiStore } from "../store/useAiStore";
import { handleTestSubmit } from "../services/handleTestSubmit";
import { handleContinueLater } from "../services/handleContinueLater";
import type { SimulatorMode } from "../test_simulator.types";
import TestEndedModalContent from "../components/TestEndedModalContent";
import FullScreenExitModalContent from "../components/FullSrcreenModal";
import TeacherSupportModal from "../components/TeacherSupportModal";
import { setupTest } from "../services/setupTest";
import { useFullscreenProtection } from "../store/useFullScreenProtection";
import { Toast } from "../../../components/Toast";
import SwitchSectionModal from "../components/SwitchSectionModal";
import { ToastType } from "../../shared/types";

const TestSimulatorPage = ({ mode }: { mode: SimulatorMode }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);

  const setTestData = useTestStore((s) => s.setTestData);
  const testError = useTestStore((s) => s.testError);
  const setTestConfig = useTestStore((s) => s.setTestConfig);
  const setTestError = useTestStore((s) => s.setTestError);
  const startQuestionTimer = useTestStore((s) => s.startQuestionTimer);
  const stopQuestionTimer = useTestStore((s) => s.stopQuestionTimer);
  const features = useTestStore((s) => s.features);
  const setFeatures = useTestStore((s) => s.setFeatures);

  const isSubmissionModalOpen = useTestStore((s) => s.isSubmissionModalOpen);
  const setIsSubmissionModalOpen = useTestStore(
    (s) => s.setIsSubmissionModalOpen
  );

  const isSwitchSectionModalOpen = useTestStore(
    (s) => s.isSwitchSectionModalOpen
  );
  const setIsSwitchSectionModalOpen = useTestStore(
    (s) => s.setIsSwitchSectionModalOpen
  );
  const pendingQuestion = useTestStore((s) => s.pendingQuestion);
  const setPendingQuestion = useTestStore((s) => s.setPendingQuestion);
  const setCurrentQuestion = useTestStore((s) => s.setCurrentQuestion);

  const isTestEndedModalOpen = useTestTimerStore((s) => s.isTestEndedModalOpen);

  const setIsHelpModalOpen = useAiStore((s) => s.setIsHelpModalOpen);
  const isHelpModalOpen = useAiStore((s) => s.isHelpModalOpen);
  const startTestTimer = useTestTimerStore((s) => s.startTestTimer);
  const stopTestTimer = useTestTimerStore((s) => s.stopTestTimer);
  const setIsAiFeatureEnabled = useAiStore((s) => s.setIsAiFeatureEnabled);

  const reset = useTestStore((s) => s.reset);
  const resetAi = useAiStore((s) => s.reset);

  const { hasExited, reEnter } = useFullscreenProtection(
    features?.fullScreenEnabled ?? false
  );

  useEffect(() => {
    setupTest(
      params,
      mode,
      setTestError,
      setTestConfig,
      setTestData,
      setFeatures,
      startTestTimer,
      setIsAiFeatureEnabled,
      startQuestionTimer
    );
    return () => {
      if (features?.timerEnabled) {
        stopTestTimer();
      }
      stopQuestionTimer();
      reset();
      resetAi();
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
          onSubmit={() => handleTestSubmit(navigate)}
          onContinueLater={() => handleContinueLater(navigate)}
          onClose={() => setIsSubmissionModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isTestEndedModalOpen}
        onClose={() => undefined}
        size="lg"
        className="p-4"
      >
        <TestEndedModalContent onSubmit={() => handleTestSubmit(navigate)} />
      </Modal>

      <Modal size="lg" className="p-4" isOpen={hasExited} onClose={reEnter}>
        <FullScreenExitModalContent
          onSubmit={() => handleTestSubmit(navigate)}
          onReEnter={reEnter}
        />
      </Modal>

      <AiHelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
      <TeacherSupportModal />
      <SwitchSectionModal
        isOpen={isSwitchSectionModalOpen}
        onClose={() => setIsSwitchSectionModalOpen(false)}
        onPrimaryClick={() => {
          setCurrentQuestion(pendingQuestion);
          startTestTimer(pendingQuestion?.sectionTime ?? 0);
          setPendingQuestion(null);
          setIsSwitchSectionModalOpen(false);
        }}
      />

      {testError?.message && (
        <Toast
          title={testError?.severity}
          description={testError?.message}
          key={testError.id}
          duration={2000}
          type={ToastType.WARNING}
          onExpire={() => setTestError(null)}
        />
      )}
    </>
  );
};

export default TestSimulatorPage;
