// Utils
import cn from "../../../../utils/classNames";

// Components
import SectionWiseQuestionList from "../SectionWiseQuestionList";

/**
 * Desktop-only question navigator sidebar component.
 * Displays section-wise question list with submit/end session controls and status indicators.
 */
const QuestionNavigator = ({ className }: any) => {
  return (
    <div
      className={cn(
        "relative min-w-[200px] max-w-[300px] mx-auto flex flex-col gap-5 h-full",
        className
      )}
    >
      <SectionWiseQuestionList className="mb-[350px]" />
    </div>
  );
};

export default QuestionNavigator;
