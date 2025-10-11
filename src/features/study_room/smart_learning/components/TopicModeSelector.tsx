// Store
// import { useSLStore } from "../store/useSLStore";

// Components
import Button from "../../../../components/Button";
import TopicProgressChart from "./topic-progress-chart/TopicProgressChart";
import SmartLearningInstructions from "./SmartLearningInstructions";
import type { ModeType } from "../sl.types";
import Tabs from "../../../../components/Tabs";

interface TopicModeSelectorProps {
  topicName: string;
  lastSelfTestPercentage: number;
  mode: ModeType;
  barColor: string | null;
  setMode: (mode: ModeType) => void;
  onClickHandler: () => void;
}

/**
 * TopicModeSelector component allows users to start in either "Learning Mode" or "Competitive Mode" for a given topic.
 */
const TopicModeSelector = ({
  topicName,
  lastSelfTestPercentage,
  mode,
  barColor,
  setMode,
  onClickHandler,
}: TopicModeSelectorProps) => {
  // const isLearning = mode === "learning";
  const selectedIndex = mode === "Learning Session" ? 0 : 1;

  return (
    <div className="relative flex flex-col w-full h-full">
      {/* Mode selection section */}
      <h6 className="!font-semibold text-ellipsis line-clamp-2 text-center pb-2">
        {topicName}
      </h6>
      <div className="flex justify-center my-4">
        <Tabs
          tabs={["Learning", "Competitive"]}
          selectedIndex={selectedIndex}
          onSelect={(index) =>
            setMode(index === 0 ? "Learning Session" : "Competitive Session")
          }
          containerClassName="justify-center"
          tabClassName="px-3 py-2 text-[var(--text-secondary)] rounded-full hover:bg-[var(--sb-ocean-bg-disabled)] hover:text-[var(--sb-ocean-bg-active)] transition-all duration-200 nowrap"
          activeTabClassName="px-3 py-2 text-white bg-[var(--sb-ocean-bg-active)] rounded-full shadow-md"
        />
      </div>

      {/* Progress section */}
      <div className="flex flex-col items-center gap-5 mt-4">
        <p className="text-center font-semibold">Topic Progress</p>
        <TopicProgressChart progress={lastSelfTestPercentage ?? 0} barColor={barColor} />
      </div>

      <div className="flex flex-col gap-3 mt-6 overflow-y-auto min-h-[100px] max-h-[500px] pb-[50px] scrollbar-thin">
        <SmartLearningInstructions learningMode={mode} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center bg-[var(--surface-bg-primary)]">
        <Button className="w-full" style="primary" onClick={onClickHandler}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default TopicModeSelector;
