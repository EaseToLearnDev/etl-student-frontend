import { MdClose } from "react-icons/md";
import Badge from "../../../../components/Badge";
import Button from "../../../../components/Button";
import Tabs from "../../../../components/Tabs";
import cn from "../../../../utils/classNames";
import { Theme } from "../../../../utils/colors";
import type { ModeType } from "../sl.types";
import SmartLearningInstructions from "./SmartLearningInstructions";
import { useState } from "react";

interface SLTestModalContentProps {
  mode: ModeType;
  topicName: string;
  onClose: () => void;
}
const SLTestModalContent = ({
  mode,
  topicName,
  onClose,
}: SLTestModalContentProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [options, setOptions] = useState<Record<string, number>>({
    totalQuestion: -1,
    totalTime: -1,
    markCorrectAns: -1,
    markIncorrectAns: -1,
    markNotAttempted: -1,
  });

  const fields = [
    {
      id: "totalQuestion",
      label: "Total Question",
    },
    {
      id: "totalTime",
      label: "Total Time",
    },
    {
      id: "markCorrectAns",
      label: "Mark for Correct Answers",
    },
    {
      id: "markIncorrectAns",
      label: "Mark for Incorrect Answers",
    },
    {
      id: "markNotAttempted",
      label: "Mark for Questions Not Attempted",
    },
  ];

  return (
    <div className="relative p-2 px-4">
      <div className="w-full flex flex-col gap-2">
        <Badge
          theme={Theme.Neutral}
          style="outline"
          className="w-fit border-1 !border-[var(--border-primary)] !font-semibold"
        >
          <span>
            {mode === "learning" ? "Learning Mode" : "Competitive Mode"}
          </span>
        </Badge>
        <h5>{topicName || "Characteristic of Living Organism"}</h5>
      </div>
      {mode === "competitive" ? (
        <div className="w-full flex justify-center items-center mt-7">
          <Tabs
            tabs={["Options", "Instructions"]}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
            containerClassName="border-2 border-[var(--border-primary)]"
            tabClassName="w-[100px] sm:w-[150px]"
          />
        </div>
      ) : (
        <></>
      )}

      {/* Tab Content */}
      <div className="mt-5 min-h-[300px] max-h-[500px] overflow-y-auto border-1 border-[var(--border-primary)] rounded-lg p-4">
        {selectedIndex === 0 && mode === "competitive" ? (
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {fields.map((field) => (
              <div key={field.id} className="flex flex-col gap-1">
                <label
                  htmlFor={field.id}
                  className="!font-medium text-[var(--text-secondary)]"
                >
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.id}
                  className={cn(
                    "flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
                    "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
                  )}
                  value={options[field.id] >= 0 ? options[field.id] : ""}
                  onChange={(e) =>
                    setOptions((v) => ({
                      ...v,
                      [field.id]: Number(e.target.value) ?? -1,
                    }))
                  }
                />
              </div>
            ))}
          </form>
        ) : (
          <SmartLearningInstructions learningMode={mode} hideTitle />
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex justify-end mt-7">
        <div className="flex gap-4 items-center">
          <Button>Start Session</Button>
          <Button style="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
      <div
        onClick={onClose}
        className={cn(
          "fixed top-5 right-5 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
          " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
        )}
      >
        <MdClose size={20} />
      </div>
    </div>
  );
};

export default SLTestModalContent;
