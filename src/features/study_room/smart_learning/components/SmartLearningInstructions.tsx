// Constants
import { competitiveRules } from "../../../shared/constants";
import type { ModeType } from "../sl.types";
import { LearningSessionInstructions } from "./LearningSessionInstructions";

type SmartLearningInstructionsProps = {
  learningMode: ModeType;
  hideTitle?: boolean;
};

/**
 * SmartLearningInstructions component displays instructions based on the selected learning mode.
 */
const SmartLearningInstructions = ({
  learningMode,
  hideTitle = false,
}: SmartLearningInstructionsProps) => {
  return learningMode === "Learning Session" ? (
    <div className="flex flex-col gap-3">
      {!hideTitle ? (
        <>
          <h6 className="font-semibold">Instructions</h6>
          <p>
            This mode is perfect for building strong foundations, reviewing
            mistakes, and learning through practice — all without pressure.
          </p>
        </>
      ) : (
        <LearningSessionInstructions />
      )}
    </div>
  ) : (
    <div className="flex flex-col gap-3">
      {!hideTitle ? (
        <>
          <h6 className="font-semibold">Instructions</h6>
          <p>
            This mode simulates real exam conditions, helping you practice under
            timed pressure and assess your performance against a competitive
            benchmark. Use this mode to sharpen your accuracy, speed, and
            decision-making skills.
          </p>
        </>
      ) : (
        <div className="flex flex-col text-[14px] font-medium tracking-[var(--ls-01)]">
          <p>
            The clock has been set at the server, and the countdown timer in the
            top-right corner of the screen will display the remaining time to
            completion. Keep track of it to ensure you finish the exam within
            the allotted time.
          </p>
          <ol
            type="a"
            className="list-[lower-alpha] list-inside flex flex-col gap-4 mt-4 mb-4"
          >
            {competitiveRules.map((rule, index) => (
              <li
                key={index}
                className="flex items-start gap-2 rounded-lg bg-[var(--surface-bg-hover)] text-[var(--text-primary)]"
              >
                <p className="text-[var(--sb-ocean-bg-active)]">
                  {String.fromCharCode(97 + index)}.
                </p>
                <p className="flex-1">{rule}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default SmartLearningInstructions;
