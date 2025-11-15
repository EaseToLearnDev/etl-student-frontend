import type { Error, ToastData } from "../../shared/types";
import { Severity, ToastType } from "../../shared/types";
import {
  subjectiveTypes,
  type Features,
  type Question,
  type SimulatorMode,
  type TestConfig,
  type TestData,
} from "../test_simulator.types";
import { handleTestConfigSetup } from "./handleTestConfigSetup";
import { loadTestDetails } from "./loadTestDetails";

export const setupTest = async (
  params: URLSearchParams,
  mode: SimulatorMode,
  setError: (error: Error) => void,
  setTestConfig: (config: TestConfig) => void,
  setTestData: (data: TestData) => void,
  setFeatures: (features: Features) => void,
  startTestTimer: (timer: number) => void,
  setIsAiFeatureEnabled: (v: boolean) => void,
  startQuestionTimer: () => void,
  setMode: (mode: SimulatorMode) => void,
  setLoading: (loading: boolean) => void,
  setToast: (data: ToastData) => void,
  setCurrentQuestion: (question: Question | null) => void,
  isSubjectiveTest: boolean,
  isMobile: boolean
) => {
  // Test Configuration Setup
  const { testConfig, error } = handleTestConfigSetup({ params: params });

  // Save Possible Error
  if (error) setError(error);

  // Fetch test details
  if (testConfig) {
    setTestConfig(testConfig);
    setMode(mode);
    setLoading(true);
    const result = await loadTestDetails({
      testConfig,
      mode,
    });

    if (!result) {
      setToast({
        title: "Failed to load test details",
        description: "Try Again Later!!",
        type: ToastType.DANGER,
      });
      setLoading(false);
      return null;
    }

    const {
      data,
      error,
    }: {
      data: TestData | null;
      error: { id: string; message: string } | null;
    } = result;

    if (
      error?.id === "limit_reached" ||
      error?.id === "question_limit_reached" ||
      error?.id === "internal_server_error"
    ) {
      setError({
        id: error?.id,
        message: error.message,
        severity: Severity.Alert,
      });
      setLoading(false);
      return null;
    }

    if (data) setTestData(data);

    let features: Features;
    switch (mode) {
      case "guest":
      case "registered":
        features = {
          correctResponseEnabled: false,
          showDynamicStatusEnabled: true,
          timerEnabled:
            testConfig?.assessmentMode === "advance" ||
            testConfig?.testType !== 1,
          fullScreenEnabled: false,
          subjectiveMarksEditEnabled: false,
          markForReviewEnabled: true,
          supportEnabled: data?.testStatus !== 2,
        };

        break;
      case "review":
        features = {
          correctResponseEnabled: true,
          showDynamicStatusEnabled: false,
          timerEnabled: false,
          fullScreenEnabled: false,
          subjectiveMarksEditEnabled: data?.testStatus === 2,
          markForReviewEnabled: false,
          supportEnabled: data?.testStatus !== 2,
        };
        break;
      case "adaptive":
        features = {
          correctResponseEnabled: false,
          showDynamicStatusEnabled: false,
          timerEnabled: false,
          fullScreenEnabled: false,
          subjectiveMarksEditEnabled: false,
          markForReviewEnabled: false,
          supportEnabled: data?.testStatus !== 2,
        };
    }

    if (features?.timerEnabled) {
      if (data?.sectionLock === "Partially_Lock") {
        startTestTimer(data?.questionSet[0]?.sectionTime ?? 0);
      } else {
        startTestTimer(data?.remainingTime ?? 0);
      }
    }

    // Enable Ai if either smart learning - "learning session" or in review mode
    if (
      (testConfig?.testType === 1 &&
        testConfig?.assessmentMode === "beginner") ||
      ["review", "adaptive"].includes(mode)
    ) {
      setIsAiFeatureEnabled(true);
    }

    // I WILL REWRITE THIS SOON, PLEASE DON'T JUDGE :)
    /*
     * Enable full screen if smart learning competitive session or (topic,mock,class) test.
     * (Only if not subjective and not in mobile.)
     * */
    if (
      (mode !== "review" && testConfig?.assessmentMode === "advance") ||
      (testConfig?.testType && testConfig?.testType !== 1)
    ) {
      features.fullScreenEnabled =
        !isMobile && !isSubjectiveTest ? true : false;
    }

    // Is subjective marking is enabled, try to load first subjective question
    if (features.subjectiveMarksEditEnabled) {
      const firstSubjective = data?.questionSet?.find((q) =>
        subjectiveTypes.includes(q?.questionType)
      );

      if (firstSubjective) {
        setCurrentQuestion(firstSubjective);
      } else {
        // fallback case
        setCurrentQuestion(
          data?.questionSet[data?.lastQuestionIndex ?? 0] ?? null
        );
      }
    } else {
      // normal behaviour: start from lastQuestionIndex or zero
      setCurrentQuestion(
        data?.questionSet[data?.lastQuestionIndex || 0] ?? null
      );
    }

    setFeatures(features);

    // Start question timer only for guest and registered mode
    if (mode === "guest" || mode === "registered") {
      startQuestionTimer();
    }

    setLoading(false);
  }
};
