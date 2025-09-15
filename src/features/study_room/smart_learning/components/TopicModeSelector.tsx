// Store
// import { useSLStore } from "../store/useSLStore";

// Components
import Button from "../../../../components/Button";
import TopicProgressChart from "./topic-progress-chart/TopicProgressChart";
import SmartLearningInstructions from "./SmartLearningInstructions";
import type { Topic } from "../../../shared/types";
import type { ModeType } from "../sl.types";

interface TopicModeSelectorProps {
  selectedTopic: Topic;
  lastSelfTestPercentage: number;
  mode: ModeType;
  setMode: (mode: ModeType) => void;
  onClickHandler: () => void;
}

/**
 * TopicModeSelector component allows users to start in either "Learning Mode" or "Competitive Mode" for a given topic.
 */
const TopicModeSelector = ({
  selectedTopic,
  lastSelfTestPercentage,
  mode,
  setMode,
  onClickHandler,
}: TopicModeSelectorProps) => {
  const isLearning = mode === "learning";

  return (
    <div className="relative flex flex-col w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-center">
        <h6 className="!font-semibold text-center">
          {selectedTopic?.topicName}
        </h6>
      </div>

      {/* Progress section */}
      <div className="flex flex-col items-center gap-5 mt-5">
        <p className="text-center font-semibold">Topic Progress</p>
        <TopicProgressChart progress={lastSelfTestPercentage ?? 0} />
      </div>
      {/* Mode selection section */}
      <div className="mt-5 flex flex-col md:flex-row md:flex-wrap items-center gap-[12px]">
        <Button
          className="flex-1 w-full md:min-w-[150px]"
          style={isLearning ? "primary" : "secondary"}
          onClick={() => {
            setMode("learning");
          }}
        >
          Learning Mode
        </Button>
        <Button
          className="flex-1 w-full md:min-w-[150px]"
          style={!isLearning ? "primary" : "secondary"}
          onClick={() => {
            setMode("competitive");
          }}
        >
          Competitive Mode
        </Button>
      </div>

      <div className="flex flex-col gap-3 mt-6 overflow-y-auto min-h-[100px] max-h-[500px] pb-[50px] scrollbar-thin">
        <SmartLearningInstructions learningMode={mode} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center bg-[var(--surface-bg-primary)]">
        <Button className="w-full" style="primary" onClick={onClickHandler}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default TopicModeSelector;
