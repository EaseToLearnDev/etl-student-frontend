// Constants
import { competitiveRules } from "../../../shared/constants";

type TopicTestInstructionsProps = {
  title?: string;
  className?: string; 
};

/**
 * Renders the instructions for a topic test, including the topic name,
 * a general instruction about the timer, and a list of competitive rules.
 */
const TopicTestInstructions = ({ title, className }: TopicTestInstructionsProps) => {
  return (
    <div className={className}>
      <h5 className="text-[var(--text-primary )] border-b border-(--border-primary) pb-2 mb-4">
        Instructions
      </h5>

      {title && (
        <p className="font-semibold text-[var(--sb-ocean-bg-active)] mb-2">
          {title} Instructions
        </p>
      )}
      <div className="space-y-5">
        <div className="text-[var(--text-secondary)] leading-relaxed">
          <p>
            The clock has been set at the server, and the countdown timer at the
            top-right corner of the screen will display the remaining time until
            closure. You can monitor the time you have left to complete the
            exam.
          </p>
          <ol
            type="a"
            className="list-[lower-alpha] list-inside mt-3 space-y-2"
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
      </div>
    </div>
  );
};

export default TopicTestInstructions;
