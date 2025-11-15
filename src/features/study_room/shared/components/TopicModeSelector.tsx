import { useEffect, useState } from "react";

// Hooks
import { useSharedLearningStore } from "../hooks/useSharedLearningStore";

// Components
import Button from "../../../../components/Button";
import TopicProgressChart from "../../smart_learning/components/topic-progress-chart/TopicProgressChart";
import SmartLearningInstructions from "../../smart_learning/components/SmartLearningInstructions";
import Select from "../../../../components/Select";
// import type { ModeType } from "../sl.types";
// import Tabs from "../../../../components/Tabs";
// import { pushToDataLayer } from "../../../../utils/gtm";
// import { gtmEvents } from "../../../../utils/gtm-events";

interface TopicModeSelectorProps {
  topicName: string;
  lastSelfTestPercentage: number;
  barColor: string | null;
  onClickHandler: () => void;
}

/**
 * TopicModeSelector component allows users to start in either "Learning Mode" or "Competitive Mode" for a given topic.
 */
const TopicModeSelector = ({
  topicName,
  lastSelfTestPercentage,
  barColor,
  onClickHandler,
}: TopicModeSelectorProps) => {
  // const isLearning = mode === "learning";
  // const setMode = useSLStore((s) => s.setMode);
  const mode = useSharedLearningStore((s) => s.mode);
  const testOptions = useSharedLearningStore((s) => s.testOptions);
  const selectedTestOption = useSharedLearningStore((s) => s.selectedTestOption);
  const setSelectedTestOption = useSharedLearningStore((s) => s.setSelectedTestOption);
  // const selectedIndex = mode === "Learning Session" ? 0 : 1;
  const [isExamTypeSelectionOpen, setIsExamTypeSelectionOpen] = useState(false);
  const [selectedExamTypeIndex, setSelectedExamTypeIndex] = useState(
    selectedTestOption
      ? testOptions.findIndex(
          (opt) => opt.examType === selectedTestOption.examType
        )
      : 0
  );

  // Set Selected test options on Exam Type change
  useEffect(() => {
    setSelectedTestOption({ ...testOptions[selectedExamTypeIndex] });
  }, [selectedExamTypeIndex]);

  return (
    <div className="flex flex-col w-full h-full">
      {/* Mode selection section */}
      <div className="flex items-center justify-center">
        <h6 className="!font-semibold text-ellipsis line-clamp-2">
          {topicName}
        </h6>
      </div>
      {/* <div className="flex justify-center mt-3">
        <Tabs
          tabs={["Learning", "Competitive"]}
          selectedIndex={selectedIndex}
          onSelect={(index) => {
            const newMode = index === 0 ? "Learning Session" : "Competitive Session";
            setMode(newMode);

            const newEventType =
              newMode === "Learning Session" ? "learning_session" : "competitive_session";

            pushToDataLayer({
              event:
                gtmEvents[
                  `${newEventType}_button_click` as keyof typeof gtmEvents
                ],
              id: `${newEventType}_button_id`,
            });
          }}
          containerClassName="justify-center"
          tabClassName="px-3 py-2 text-[var(--text-secondary)] rounded-full hover:bg-[var(--sb-ocean-bg-disabled)] hover:text-[var(--sb-ocean-bg-active)] transition-all duration-200 nowrap"
          activeTabClassName="px-3 py-2 text-white bg-[var(--sb-ocean-bg-active)] rounded-full shadow-md"
        />
      </div> */}

      {/* Progress section */}
      <div className="flex flex-col items-center gap-5 mt-4">
        <p className="text-center font-semibold">Topic Progress</p>
        <TopicProgressChart
          progress={lastSelfTestPercentage ?? 0}
          barColor={barColor}
        />
      </div>

      {testOptions && testOptions.length > 1 && (
        <div className="mt-7">
          <Select
            isOpen={isExamTypeSelectionOpen}
            items={testOptions.map((option) => option.examType) as string[]}
            selectedIndex={selectedExamTypeIndex}
            type="Exam Type"
            onSelect={setSelectedExamTypeIndex}
            onToggle={() =>
              setIsExamTypeSelectionOpen(!isExamTypeSelectionOpen)
            }
            className="w-full"
            dropdownClassName="w-full"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 mt-3 overflow-y-auto min-h-[100px] max-h-[500px] pb-[50px] scrollbar-thin">
        <SmartLearningInstructions learningMode={mode} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 pb-4 px-4 flex justify-center items-center bg-[var(--surface-bg-primary)]">
        <Button className="w-full" style="primary" onClick={onClickHandler}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default TopicModeSelector;
