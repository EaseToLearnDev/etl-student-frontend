// React
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

// Types
import type { SimulatorMode } from "../test_simulator.types";
import { ToastType } from "../../shared/types";

// Services
import { handleTestSubmit } from "../services/handleTestSubmit";
import { handleContinueLater } from "../services/handleContinueLater";
import { setupTest } from "../services/setupTest";

// Hooks & Stores
import useIsMobile from "../../../hooks/useIsMobile";
import useTestTimerStore from "../store/useTestTimerStore";
import useTestStore from "../store/useTestStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { useAiStore } from "../store/useAiStore";
import { useFullscreenProtection } from "../store/useFullScreenProtection";
import { useGuestStore } from "../../../global/hooks/useGuestStore";
import { useToastStore } from "../../../global/hooks/useToastStore";
import { useLoadingStore } from "../../../hooks/useLoadingStore";

// Layouts and Components
import MobileTestSimulator from "../components/mobile/MobileTestSimulator";
import DesktopTestSimulator from "../components/desktop/DesktopTestSimulator";
import { Modal } from "../../../components/Modal";
import SubmissionModalContent from "../components/SubmissionModalContent";
import AiHelpModal from "../components/AiHelpModal";
import TestEndedModalContent from "../components/TestEndedModalContent";
import FullScreenExitModalContent from "../components/FullSrcreenModal";
import TeacherSupportModal from "../components/TeacherSupportModal";
import { Toast } from "../../../components/Toast";
import SwitchSectionModal from "../components/SwitchSectionModal";
import { GuestTestSubmitModal } from "../components/GuestTestSubmitModal";
import { Spinner } from "../../../components/Spinner";
import EmptyState from "../../../components/EmptyState";

/**
 * TestSimulatorPage component for rendering the test simulator UI.
 * Handles test setup, modals, and submission logic.
 */
const TestSimulatorPage = ({ mode }: { mode: SimulatorMode }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);

  const activeCourse = useStudentStore((s) => s.activeCourse);

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

  const setShowGuestTestSubmitModal = useGuestStore(
    (s) => s.setShowGuestTestSubmitModal
  );
  const testData = useTestStore((s) => s.testData);

  const testMode = useTestStore((s) => s.testMode);
  const setMode = useTestStore((s) => s.setMode);

  const showToast = useToastStore((s) => s.showToast);
  const toastData = useToastStore((s) => s.toastData);

  const loading = useLoadingStore((s) => s.loading);
  const setLoading = useLoadingStore((s) => s.setLoading);

  const { hasExited, reEnter, exit } = useFullscreenProtection(
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
      startQuestionTimer,
      setMode,
      setLoading,
      setCurrentQuestion,
      isMobile
    );
    return () => {
      if (features?.timerEnabled) {
        stopTestTimer();
      }
      stopQuestionTimer();
      reset();
      resetAi();
      exit();
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // Required for Chrome to trigger the confirmation dialog
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const ManageTestSubmit = () => {
    if (testMode === "guest") {
      setShowGuestTestSubmitModal(true);
    } else {
      handleTestSubmit(navigate);
    }
  };

  if (loading && !testData) {
    return <Spinner description="Please Wait!" />;
  }

  if (testError?.id === "limit_reached") {
    return (
      <EmptyState
        title="Limit Reached!"
        description={testError.message}
        buttonText={"Upgrade"}
        onClick={() => navigate(`/selectcourse?cid=${activeCourse?.courseId}`)}
        className="min-h-screen"
      />
    );
  }

  return (
    <>
      {!isMobile ? <DesktopTestSimulator /> : <MobileTestSimulator />}
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
        <TestEndedModalContent onSubmit={ManageTestSubmit} />
      </Modal>

      <Modal size="lg" className="p-4" isOpen={hasExited} onClose={reEnter}>
        <FullScreenExitModalContent
          onSubmit={ManageTestSubmit}
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

      <GuestTestSubmitModal />

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

      {showToast && toastData && <Toast {...toastData} key={toastData.title} />}
    </>
  );
};

export default TestSimulatorPage;
