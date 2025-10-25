import type { Error } from "../../shared/types";
import { Severity } from "../../shared/types";
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
  setCurrentQuestion: (question: Question | null) => void,
  isMobile: boolean,
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
      setError({
        id: "unknown_error",
        message: "Failed to load test details.",
        severity: Severity.Alert,
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
        };

        break;
      case "review":
        features = {
          correctResponseEnabled: true,
          showDynamicStatusEnabled: false,
          timerEnabled: false,
          fullScreenEnabled: false,
          subjectiveMarksEditEnabled: data?.testStatus === 2 ? true : false,
        };
        break;
    }

    if (features?.timerEnabled) {
      if (data?.sectionLock === "Partially_Lock") {
        startTestTimer(data?.questionSet[0]?.sectionTime ?? 0);
      } else {
        startTestTimer(data?.remainingTime ?? 0);
      }
    }

    if (
      (testConfig?.testType === 1 &&
        testConfig?.assessmentMode === "beginner") ||
      mode === "review"
    ) {
      setIsAiFeatureEnabled(true);
    }

    if (
      (mode !== "review" && testConfig?.assessmentMode === "advance") ||
      (testConfig?.testType && testConfig?.testType !== 1)
    ) {
      features.fullScreenEnabled = !isMobile ? true : false;
    }

    // Is subjective marking is enabled, try to load first subjective question
    if (features.subjectiveMarksEditEnabled) {
      const firstSubjective = data?.questionSet?.find((q) =>
        subjectiveTypes.includes(q?.questionType),
      );

      if (firstSubjective) {
        setCurrentQuestion(firstSubjective);
      } else {
        // fallback case
        setCurrentQuestion(
          data?.questionSet[data?.lastQuestionIndex ?? 0] ?? null,
        );
      }
    } else {
      // normal behaviour: start from lastQuestionIndex or zero
      setCurrentQuestion(
        data?.questionSet[data?.lastQuestionIndex || 0] ?? null,
      );
    }

    setFeatures(features);
    setLoading(false);

    if (mode === "guest" || mode === "registered") {
      startQuestionTimer();
    }
  }
};
