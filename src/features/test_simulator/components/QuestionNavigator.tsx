import Button from "../../../components/Button";
import cn from "../../../utils/classNames";

const QuestionNavigator = () => {
  return (
      <div className="min-w-[200px] max-w-[300px] mx-auto flex flex-col gap-5">
        <div className="flex flex-col items-center justify-center gap-5">
          <h6>Physics</h6>
          <div className="grid grid-cols-4 xl:grid-cols-5 gap-3">
            {Array.from({ length: 15 }, (_, i) => (
              <button
                key={i}
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
        <div className="flex flex-col gap-3">
          <Button>Submit</Button>
          <Button style="secondary">End Session</Button>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <div className="w-[20px] h-[20px] rounded-full bg-[var(--sb-sakura-bg-active)]" />
              <p className="text-nowrap">Not Visited</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[20px] h-[20px] rounded-full bg-[var(--sb-valencia-bg-active)]" />
              <p className="text-nowrap">Un-attempted</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <div className="w-[20px] h-[20px] rounded-full bg-[var(--sb-ocean-bg-active)]" />
              <p className="text-nowrap">Attempted</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[20px] h-[20px] rounded-full bg-[var(--sb-sunglow-bg-active)]" />
              <p className="text-nowrap">Need Help</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default QuestionNavigator;
