// Types
import Button from "../../../components/Button";
import type { ClassTest } from "../../../shared/types/classTest.types";
// Icons
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";

interface ClassTestCardProps {
  test: ClassTest;
  onStart?: (id: number) => void;
}

const ClassTestCard = ({ test, onStart }: ClassTestCardProps) => {
  return (
    <div className="shadow-sm hover:shadow-lg transition rounded-lg p-4 flex flex-col gap-4 border border-[var(--border-secondary)]">
      {/* Title */}
      <div>
        <p className="font-semibold">{test.testTitle}</p>
        <span className="text-[var(--text-secondary)]">
          {test.subject} • Class {test.className}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="h-5 w-5 text-[var(--text-tertiary)]" />
          <span className="text-[var(--text-secondary)]">
            {new Intl.DateTimeFormat("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(test.testDateTime))}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="h-5 w-5 text-[var(--text-secondary)]" />
          <span className="text-[var(--text-secondary)]">
            {test.totalTime} min • {test.totalQuestion} Questions
          </span>
        </div>
        <span className="text-[var(--text-secondary)]">
          Total Marks: {test.totalMark}
        </span>
      </div>

      {/* Action */}
      <Button
        style="primary"
        onClick={() => onStart?.(test.id)}
        className="mt-2"
      >
        Start Test
      </Button>
    </div>
  );
};

export default ClassTestCard;
