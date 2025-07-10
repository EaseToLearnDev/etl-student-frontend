import Button from "../../../components/Button";
import useDarkModeStore from "../../../store/useDarkModeStore";

const ActiveQuestionPanel = () => {
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);
  const options = ["Option 1", "Option 2", "Option 2", "Option 3"];

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-10">
        <div className="h-full flex flex-col gap-4">
          <h5 className="text-[24px]">Question - 1</h5>
          <h6>
            {
              "Let U = {10, 11, 12, 13, 14, 15, 16, 17}, A = {10, 11, 12} and B = {12, 14, 16} then find the value of (A U B )’"
            }
          </h6>
        </div>
        <div className="flex flex-col gap-5">
          {options?.map((option, index) => (
            <div key={index} className="flex items-center gap-4">
              <label className="flex items-center gap-4 cursor-pointer w-full">
                <input
                  name="option"
                  type="radio"
                  value={option}
                  className="appearance-none w-[14px] h-[14px] border-1 border-[var(--border-primary)] rounded-full outline-none transition-all duration-200 ease-in-out checked:bg-[var(--sb-ocean-bg-active)] checked:border-none checked:w-[16px] checked:h-[16px]"
                />
                <p className="select-none">{option}</p>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-y-4 justify-center lg:justify-between items-center">
        <div className="flex items-center gap-3">
          <Button style="secondary">Previous</Button>
          <Button style="secondary">Next</Button>
        </div>
        <div className="flex items-center gap-3">
          <Button style="neutral">Mark for Review</Button>
          <Button style="neutral">Clear</Button>
          <Button style="neutral" onClick={toggleDarkMode}>
            Save & Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActiveQuestionPanel;
