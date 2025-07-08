// React
import { useState } from "react";

// Icons
import { FiUnlock } from "react-icons/fi";

// Store
import useTopicStore from "../../../shared/store/useTopicStore";

// Components
import Button from "../../../../components/Button";
import TopicProgressChart from "./topic-progress-chart/TopicProgressChart";
import SmartLearningInstructions from "./SmartLearningInstructions";


/**
 * TopicModeSelector component allows users to select between "Learning Mode" and "Competitive Mode" for a given topic.
 * 
 * - Displays the current topic name and progress using a progress chart.
 * - Shows a message indicating qualification for Competitive Mode.
 * - Provides buttons to switch between learning modes.
 * - Renders instructions relevant to the selected mode.
 * - Includes a "Continue" button to proceed.
 *
 * @component
 * @returns {JSX.Element} The rendered TopicModeSelector component.
 */
const TopicModeSelector = () => {
  // This data will come from API call
  const progressValue = 43;

  // Hooks
  const topic = useTopicStore((state) => state.topic);
  
  // States
  const [learningMode, setLearningMode] = useState("learning");
  const isLearning = learningMode === "learning";

  return (
    <div className="grid h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="!font-semibold text-[var(--text-primary)]">
          {topic?.topicName}
        </h5>
        <div className="flex gap-4">
          <FiUnlock size={20} className="cursor-pointer" />
        </div>
      </div>

      {/* Progress section */}
      <div className="relative mt-[30px] grid items-center">
        <h6 className="text-center font-semibold">Topic Progress</h6>
        <div className="absolute top-0 left-0 w-full mt-5 -z-50">
          <TopicProgressChart progress={progressValue} />
        </div>
        <h6 className="mt-[160px] font-semibold opacity-80 text-center text-[var(--text-secondary)]">
          You are qualified to Enter Competitive Mode.
        </h6>
      </div>
      {/* Mode selection section */}
      <div className="mt-5 flex flex-col md:flex-row md:flex-wrap items-center gap-[12px]">
        <Button
          className="flex-1 w-full md:min-w-[150px]"
          style={isLearning ? "primary" : "secondary"}
          onClick={() => {
            setLearningMode("learning");
          }}
        >
          Learning Mode
        </Button>
        <Button
          className="flex-1 w-full md:min-w-[150px]"
          style={!isLearning ? "primary" : "secondary"}
          onClick={() => {
            setLearningMode("competitive");
          }}
        >
          Competitive Mode
        </Button>
      </div>

      <div className="flex flex-col gap-3 mt-6 overflow-y-auto min-h-[100px] max-h-[500px] scrollbar-thin">
        <SmartLearningInstructions learningMode={learningMode} />
      </div>
      <div className="px-[10px] py-[20px]">
        <Button className="w-full" style="primary">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default TopicModeSelector;
