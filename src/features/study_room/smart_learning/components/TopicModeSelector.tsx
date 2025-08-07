// Store
// import { useSLStore } from "../store/useSLStore";

// Components
import Button from "../../../../components/Button";
import TopicProgressChart from "./topic-progress-chart/TopicProgressChart";
import SmartLearningInstructions from "./SmartLearningInstructions";
import type { TopicType } from "../../../shared/types";
import type { ModeType } from "../sl.types";

interface TopicModeSelectorProps {
  selectedTopic: TopicType;
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
    <div className="flex flex-col w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="!font-semibold text-[var(--text-primary)]">
          {selectedTopic?.topicName}
        </h5>
      </div>

      {/* Progress section */}
      <div className="flex flex-col items-center gap-5 mt-5">
        <h6 className="text-center font-semibold">Topic Progress</h6>
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

      <div className="flex flex-col gap-3 mt-6 overflow-y-auto min-h-[100px] max-h-[500px] scrollbar-thin">
        <SmartLearningInstructions learningMode={mode} />
      </div>
      <div className="px-[10px] py-[20px] mt-auto">
        <Button
          className="w-full"
          style="primary"
          onClick={onClickHandler}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default TopicModeSelector;
