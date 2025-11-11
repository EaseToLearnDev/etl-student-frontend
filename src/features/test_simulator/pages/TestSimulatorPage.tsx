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
import { getActiveCourseAccessStatus } from "../../../global/services/upgrade";
import { LuLock } from "react-icons/lu";
import SubjectiveMediaModal from "../components/SubjectiveMediaModal";
import AdaptiveTestSimulator from "../components/AdaptiveTestSimulator";
import { usePageTracking } from "../../../hooks/usePageTracking";
import { pushToDataLayer } from "../../../utils/gtm";
import { gtmEvents } from "../../../utils/gtm-events";

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

  const isSubjectiveTest = useTestStore((s) => s.isSubjectiveTest);
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

  const AssessmentMode = useTestStore(s => s.testConfig?.assessmentMode)

  const testMode = useTestStore((s) => s.testMode);
  const setMode = useTestStore((s) => s.setMode);

  const showToast = useToastStore((s) => s.showToast);
  const toastData = useToastStore((s) => s.toastData);

  const loading = useLoadingStore((s) => s.loading);
  const setLoading = useLoadingStore((s) => s.setLoading);

  const { hasExited, reEnter, exit } = useFullscreenProtection(
    features?.fullScreenEnabled ?? false
  );

  const status = getActiveCourseAccessStatus();

  usePageTracking(`${mode}_test_page_visit`);
  
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
      isSubjectiveTest,
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
    if (mode !== "adaptive") {
      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [mode]);

  const ManageTestSubmit = () => {
    switch (mode) {
      case "guest":
        setShowGuestTestSubmitModal(true);
        break;
      case "registered":
        handleTestSubmit(navigate);
        break;
      default:
        break;
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
        icon={<LuLock className="w-24 h-24" />}
        buttonText={status === "upgrade" ? "Upgrade" : "Home"}
        onClick={() =>
          navigate(
            status === "upgrade"
              ? `/selectcourse?cid=${activeCourse?.courseId}`
              : "/"
          )
        }
        className="min-h-screen"
      />
    );
  }

  if (
    testError?.id === "question_limit_reached" ||
    testError?.id === "internal_server_error"
  ) {
    return (
      <EmptyState
        title={testError.message}
        icon={<LuLock className="w-24 h-24" />}
        buttonText={"Go Back!"}
        onClick={() => navigate(-1)}
        className="min-h-screen"
      />
    );
  }

  return (
    <>
      {/* Conditional rendering based on mode */}
      {mode === "adaptive" ? (
        <AdaptiveTestSimulator />
      ) : !isMobile ? (
        <DesktopTestSimulator />
      ) : (
        <MobileTestSimulator />
      )}

      {/* Submission Modal */}
      <Modal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        size="lg"
        className="p-4"
      >
        <SubmissionModalContent
          onSubmit={() =>{ 
            pushToDataLayer({event: gtmEvents.test_simulator_submit_now_button_click,
            id: "submit_now_button_click"
            });
            handleTestSubmit(navigate)}}
          onContinueLater={() =>{ 
            pushToDataLayer({event: gtmEvents.test_simulator_save_and_continue_button_click,
            id: "continue_later_button_click"
            });
            handleContinueLater(navigate)}}
          onClose={() => { 
            pushToDataLayer({event: gtmEvents.test_simulator_cancel_button_click,
            id: "cancel_button_click"
            });
            setIsSubmissionModalOpen(false)}}
          AssessmentMode={AssessmentMode}
          hideOnContinueLater={
            testData?.testType === 4 || testData?.testType === 5 ? true : false
          }
        />
      </Modal>

      {/* Auto Submission Modal */}
      <Modal
        isOpen={isTestEndedModalOpen}
        onClose={() => undefined}
        size="lg"
        className="p-4"
      >
        <TestEndedModalContent onSubmit={()=>{
          pushToDataLayer({event: gtmEvents.test_simulator_auto_submit_button_click,
          id: "auto_submit_button_click"
          })
          ManageTestSubmit()}} />
      </Modal>

      {/* Fullscreen Exit Modal */}
      <Modal
        size="lg"
        className="p-4"
        isOpen={mode !== "review" && hasExited}
        onClose={reEnter}
      >
        <FullScreenExitModalContent
          onSubmit={()=>{
            pushToDataLayer({event: gtmEvents.test_simulator_fullscreen_submit_button_click,
            id: "fullscreen_submit_button_click"
            });
            ManageTestSubmit()}}
          onReEnter={()=>{
            pushToDataLayer({event: gtmEvents.test_simulator_fullscreen_reEnter_button_click,
            id: "fullscreen_reEnter_button_click"
            });
            reEnter()}}
        />
      </Modal>

      {/* AI help Modal */}
      <AiHelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      {/* Teacher Support Modal */}
      <TeacherSupportModal />

      {/* Switch Section Modal */}
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

      {/* Subjective Media Modal */}
      <SubjectiveMediaModal />

      {/* Guest Submit Modal */}
      <GuestTestSubmitModal />

      {/* Toast  */}
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
