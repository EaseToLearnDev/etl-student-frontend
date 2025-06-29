type SmartLearningInstructionsProps = {
  learningMode: string;
};

/**
 * SmartLearningInstructions component displays instructions based on the selected learning mode.
 * 
 * Props:
 * - learningMode: string - Determines whether to show "learning" or "competitive" instructions.
 * 
 * The component renders a set of instructions tailored for either Learning Mode or Competitive Mode.
 * - Learning Mode: Focuses on self-paced learning, hints, and study support.
 * - Competitive Mode: Focuses on exam rules, navigation, and answer submission.
 */
const SmartLearningInstructions = ({
  learningMode,
}: SmartLearningInstructionsProps) => {
  const rules = {
    competitive: [
      "Click answer option buttons to select your answer.",
      "To change an answer, simply click the desired option button.",
      "Click on RESET button to deselect a chosen answer.",
      "Click on SAVE & NEXT to save the answer before moving to the next question. The next question will automatically be displayed.",
      "Click on SKIP to move to the next question without saving the current question.",
      "Click on MARK FOR REVIEW to review your answer at later stage.",
      "Make sure you click on SAVE & NEXT button everytime you want to save your answer.",
      "To go to a question, click on the question number on the right side of the screen.",
      "The color coded diagram on the right side of the screen shows the status of the questions",
      "you have not visited question no 2.",
      "you have not answered question no 3.",
      "you have answered question no 4.",
      "you have marked the question no. 5 for review.",
      "you have answered & marked for review of question no. 6.",
      "Candidate will be allowed to Shuffle between sections and questions anytime during the examination as per their convenience.",
      "Candidate can change their response of attempted answers anytime during the examination slot time by clicking another answer which candidates wants to change.",
      "All the answered questions(saved or marked) will be considered for calculating the final score.",
      "Do Not PRESS any keyboard key once the exam is started.This will LOCK your exam. You can connect with the exam invigilator to unlock and continue giving the exam.",
      "Do Not CLICK on the SUBMIT Button unless you have completed the exam.In case you click SUBMIT button, you will not be permitted to continue.",
    ],
    learning: [
      "No Time Limit - Take your time to understand each question without the pressure of a ticking clock.",
      "Up to 3 Hints - Stuck on a question? You can request up to three helpful hints to guide you in the right direction.",
      "Ask for Study Material - Need to revise before answering? Instantly access relevant study resources for better clarity.",
      "Get Help from TONY - Our smart AI assistant, TONY, is always here to help you understand tough concepts or provide learning support.",
    ],
  };
  return learningMode === "learning" ? (
    <div className="flex flex-col gap-3">
      <h5 className="font-semibold">Learning Mode Instruction</h5>
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
          {rules.learning.map((rule, index) => (
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
      <h5 className="font-semibold">Competitive Mode Instruction</h5>
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
          {rules.competitive.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SmartLearningInstructions;
