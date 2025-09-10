import type { Error } from "../../shared/types";
import type {
  Features,
  SimulatorMode,
  TestConfig,
  TestData,
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
  setMode: (mode: string) => void
) => {
  // Test Configuration Setup
  const { testConfig, error } = handleTestConfigSetup({ params: params });

  // Save Possible Error
  if (error) setError(error);

  // Fetch test details
  if (testConfig) {
    setTestConfig(testConfig);
    setMode(mode)
    const data = (await loadTestDetails({
      testConfig,
      mode,
    })) as TestData | null;
    if (data) setTestData(data);

    let features;
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
        };

        break;
      case "review":
        features = {
          correctResponseEnabled: true,
          showDynamicStatusEnabled: false,
          timerEnabled: false,
          fullScreenEnabled: false,
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
      mode === "review" ||
      (testConfig?.testType === 1 && testConfig?.assessmentMode === "beginner")
    ) {
      setIsAiFeatureEnabled(true);
    } else {
      features.fullScreenEnabled = true;
    }

    setFeatures(features);

    if (mode === "guest" || mode === "registered") {
      startQuestionTimer();
    }
  }
};
