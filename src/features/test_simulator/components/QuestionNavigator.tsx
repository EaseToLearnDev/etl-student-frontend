// Utils
import cn from "../../../utils/classNames";

// Components
import Button from "../../../components/Button";
import StatusGroup from "./StatusGroup";

const QuestionNavigator = ({ data }: any) => {
  return (
    <div className="relative min-w-[200px] max-w-[300px] mx-auto flex flex-col gap-5 h-full">
      <div className="flex flex-col gap-5 pb-[150px] mb-[200px] overflow-y-auto scrollbar-hide">
        {data.obj[0]?.sectionSet?.map((section: any) => {
          const sectionQuestions = section.questionNumbers.map(
            ({ questionIndex, questionId }: any) => {
              const question = data.obj[0]?.questionSet?.find(
                (q: any) => q.questionId === questionId
              );
              return question ? { ...question, questionIndex } : null;
            }
          );

          return (
            <div className="w-full flex  flex-col gap-5">
              <h6 className="text-center">{section.sectionName}</h6>
              <div className="flex flex-wrap gap-3">
                {sectionQuestions.map((q, i) => (
                  <button
                    key={q.questionId}
                    className={cn(
                      "cursor-pointer min-w-[50px] min-h-[50px] max-w-[60px] max-h-[60px] rounded-[16px] flex justify-center items-center",
                      "border-1 border-[var(--border-primary)] hover:bg-[var(--surface-bg-secondary)] focus:bg-[var(--surface-bg-secondary)] active:bg-[var(--surface-bg-tertiary)]"
                    )}
                  >
                    <span>Q{i + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

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
