// Constants
import { learningRules, competitiveRules } from "../../../shared/constants";

type SmartLearningInstructionsProps = {
  learningMode: string;
  hideTitle?: boolean;
};

/**
 * SmartLearningInstructions component displays instructions based on the selected learning mode.
 */
const SmartLearningInstructions = ({
  learningMode,
  hideTitle = false,
}: SmartLearningInstructionsProps) => {

  return learningMode === "learning" ? (
    <div className="flex flex-col gap-3">
      {!hideTitle && <h5 className="font-semibold">Learning Mode Instruction</h5>}
      <div className="flex flex-col text-[14px] font-medium tracking-[var(--ls-01)]">
        <p>
          Welcome to Learning Mode, your dedicated practice space designed to
          help you learn at your own pace and build confidence before taking
          real-time tests.
        </p>
        <p>Here's what makes Learning Mode special:</p>
        <ol
          type="a"
          className="list-[lower-alpha] list-inside flex flex-col gap-4 mt-4"
        >
          {learningRules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ol>
        <p>
          This mode is perfect for building strong foundations, reviewing
          mistakes, and learning through practice - all without pressure.
        </p>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-3">
      {!hideTitle && <h5 className="font-semibold">Competitive Mode Instruction</h5>}
      <div className="flex flex-col text-[14px] font-medium tracking-[var(--ls-01)]">
        <p>
          The clock has been set at server and count down timer at the top right
          corner of the screen will display left out time to closure from where
          you can monitor time you have to complete the exam.
        </p>
        <ol
          type="a"
          className="list-[lower-alpha] list-inside flex flex-col gap-4 mt-4"
        >
          {competitiveRules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SmartLearningInstructions;
