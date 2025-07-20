// Components
import Button from "../../../components/Button";
import StatusGroup from "./StatusGroup";
import SectionWiseQuestionList from "./SectionWiseQuestionList";
import cn from "../../../utils/classNames";

const QuestionNavigator = ({ className }: any) => {
  return (
    <div
      className={cn(
        "relative min-w-[200px] max-w-[300px] mx-auto flex flex-col gap-5 h-full",
        className
      )}
    >
      <SectionWiseQuestionList className="mb-[350px]" />

      <div className="fixed bottom-0 left-0 right-0 h-[300px] max-h-[400px] flex flex-col justify-center items-center gap-5 bg-[var(--surface-bg-primary)]">
        <div className="flex flex-col gap-5 w-full max-w-[350px] p-5">
          <div className="flex flex-col gap-3">
            <Button>Submit</Button>
            <Button style="secondary">End Session</Button>
          </div>
          <StatusGroup />
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigator;
