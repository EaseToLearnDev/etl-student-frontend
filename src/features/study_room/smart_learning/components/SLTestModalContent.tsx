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
  testOptions: Record<string, number>;
  setTestOptions: (options: Record<string, number>) => void;
  onStart: () => void;
  onClose: () => void;
}
const SLTestModalContent = ({
  mode,
  topicName,
  testOptions,
  setTestOptions,
  onClose,
  onStart,
}: SLTestModalContentProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

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
      id: "marksCorrectAns",
      label: "Mark for Correct Answers",
    },
    {
      id: "marksIncorrectAns",
      label: "Mark for Incorrect Answers",
    },
    {
      id: "marksNotAttempted",
      label: "Mark for Questions Not Attempted",
    },
  ];

  return (
    <div className="relative p-2 px-4 max-h-[90vh] flex flex-col">
      {/* Header */}
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
        <h5 className="text-[var(--sb-ocean-bg-active)]">
          {topicName || "Characteristic of Living Organism"}
        </h5>
      </div>

      {/* Tabs */}
      {mode === "competitive" && (
        <div className="w-full flex justify-center items-center mt-2">
          <Tabs
            tabs={["Options", "Instructions"]}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
            activeTabClassName="bg-[var(--sb-ocean-bg-active)] text-white"
            tabClassName="w-[100px] sm:w-[150px] border-2 border-[var(--border-primary)]"
          />
        </div>
      )}

      {/* Scrollable Content */}
      <div className="mt-5 flex-1 overflow-y-auto border-1 border-[var(--border-primary)] rounded-lg p-4">
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
                  className="flex px-4 py-3 rounded-lg border border-[var(--border-secondary)] text-base"
                  value={testOptions[field.id] ?? 0}
                  onChange={(e) => {
                    const val = e.target.value;
                    const re = /^-?\d{0,2}(?:\.\d{0,6})?$/;

                    if (isNaN(Number(val))) return;

                    if (val === "" || re.test(val)) {
                      setTestOptions({
                        ...testOptions,
                        [field.id]: Number(val),
                      });
                    }
                  }}
                />
              </div>
            ))}
          </form>
        ) : (
          <SmartLearningInstructions learningMode={mode} hideTitle />
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-7">
        <div className="flex gap-4 items-center">
          <Button onClick={onStart}>Start Session</Button>
          <Button style="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>

      {/* Close Button */}
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
