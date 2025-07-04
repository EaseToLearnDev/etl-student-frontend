// Constants
import { competitiveRules } from "../../../shared/constants";

// Utils
import { capitalizeWords } from "../../../../utils";


type TopicTestInstructionsProps = {
  topicName: string;
};

/**
 * Renders the instructions for a topic test, including the topic name,
 * a general instruction about the timer, and a list of competitive rules.
 *
 * @param {TopicTestInstructionsProps} props - The props for the component.
 * @param {string} props.topicName - The name of the topic for which the test instructions are displayed.
 *
 * @returns {JSX.Element} The rendered TopicTestInstructions component.
 */
const TopicTestInstructions = ({ topicName }: TopicTestInstructionsProps) => {
  return (
    <div>
      <h5>{capitalizeWords(topicName)}</h5>
      <div className="mt-[30px] flex flex-col gap-3">
        <p className="font-semibold">Topic Test Instruction</p>
        <div className="flex flex-col text-[14px] font-medium tracking-[var(--ls-01)]">
          <p>
            The clock has been set at server and count down timer at the top
            right corner of the screen will display left out time to closure
            from where you can monitor time you have to complete the exam
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
    </div>
  );
};

export default TopicTestInstructions;
