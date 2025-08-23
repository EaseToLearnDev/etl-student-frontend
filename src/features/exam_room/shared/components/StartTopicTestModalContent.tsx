import { MdClose } from "react-icons/md";
import cn from "../../../../utils/classNames";
import {
  PiBookOpen,
  PiCheckCircle,
  PiClock,
  PiMedal,
  PiWarning,
} from "react-icons/pi";
import { FiTarget } from "react-icons/fi";
import Button from "../../../../components/Button";
import useDarkModeStore from "../../../../store/useDarkModeStore";

interface TestDetails {
  totalQuestions?: number;
  totalTime?: number;
  questionType?: string;
  marksCorrect?: number;
  marksIncorrect?: number;
  marksUnattempted?: number;
  totalMarks?: number;
}

interface StartTopicTestModalContentProps {
  testName: string;
  onClose: () => void;
  onStart: () => void;
  details: TestDetails;
}
export default function StartTopicTestModalContent({
  testName,
  onClose,
  onStart,
  details,
}: StartTopicTestModalContentProps) {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const rawFields = [
    {
      field: "Total Questions",
      value: details?.totalQuestions,
      icon: <PiBookOpen size={20} />,
    },
    {
      field: "Total Time",
      value: details?.totalTime ? `${details.totalTime} minutes` : null,
      icon: <PiClock size={20} />,
    },
    {
      field: "Total Marks",
      value: details?.totalMarks,
      icon: <PiMedal size={20} />,
    },
    {
      field: "Correct Answer",
      value: details?.marksCorrect,
      icon: <PiCheckCircle size={20} />,
    },
    {
      field: "Incorrect Answer",
      value: details?.marksIncorrect,
      icon: <PiWarning size={20} />,
    },

    {
      field: "Question Not Attempted",
      value: details?.marksUnattempted,
      icon: <FiTarget size={20} />,
    },
    {
      field: "Question Type",
      value: details?.questionType,
      icon: <FiTarget size={20} />,
    },
  ];

  // Only keep fields that actually have a value
  const fields = rawFields.filter(
    (f) => f.value !== undefined && f.value !== null
  );

  return (
    <div className="relative p-2 px-4">
      {/* Header */}
      <div className="flex justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h4>Test Configuration</h4>
          <h6>{testName}</h6>
        </div>
        <div
          onClick={onClose}
          className={cn(
            "w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
            "text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
          )}
        >
          <MdClose size={20} />
        </div>
      </div>

      {/* Test Fields */}
      <div className="grid grid-cols-2 gap-5 mt-7">
        {fields.map((f, i) => {
          const isLast = i === fields.length - 1;
          const isOdd = fields.length % 2 !== 0;

          return (
            <div
              key={f.field}
              className={cn(
                "w-full flex flex-col md:flex-row items-center gap-4 p-4",
                "bg-[var(--surface-bg-tertiary)] rounded-lg shadow-sm",
                isLast && isOdd ? "col-span-2" : ""
              )}
            >
              <div
                className={cn(
                  "flex w-[40px] h-[40px] aspect-square justify-center items-center rounded-md text-[var(--text-secondary)]",
                  darkMode
                    ? "bg-[var(--sb-neutral-bg-disabled)]/50"
                    : "bg-[var(--sb-neutral-bg-disabled)]"
                )}
              >
                <div>{f.icon}</div>
              </div>
              <div className="flex flex-col justify-center md:justify-start text-center md:text-left">
                <span>{f.field}</span>
                <h6>{f.value}</h6>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-7">
        <div className="flex gap-4 items-center">
          <Button onClick={onStart}>Start Now</Button>
          <Button style="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
