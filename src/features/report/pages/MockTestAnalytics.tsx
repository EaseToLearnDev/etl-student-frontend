import { useNavigate } from "react-router";
import { Theme } from "../../../utils/colors";
import ScoreCard from "../components/ScoreCard";
import cn from "../../../utils/classNames";
import { MdArrowBack } from "react-icons/md";
import Button from "../../../components/Button";
import DesktopChildLayout from "../../../layouts/child-layout/components/DesktopChildLayout";

const dummyData = {
  scorecards: [
    {
      title: "Total Questions",
      value: 100,
    },
    {
      title: "Correct Answers",
      value: 70,
    },
    {
      title: "In - Correct Answers",
      value: 20,
    },
    {
      title: "Un-attempted Question",
      value: 10,
    },
  ],
};

const MockTestAnalytics = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col flex-grow">
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 px-5">
        <div className="w-full flex items-center gap-4">
          <div
            onClick={() => navigate(-1)}
            className={cn(
              "w-[34px] h-[34px] aspect-square flex justify-center items-center cursor-pointer",
              "border-1 border-[var(--border-primary)] rounded-full hover:bg-[var(--surface-bg-secondary)]"
            )}
          >
            <MdArrowBack size={20} className="text-[var(--text-primary)]" />
          </div>
          <h3 className="!font-bold items-end">
            Chemistry Mock Test 1 Reports
          </h3>
        </div>
        <div className="w-full md:w-fit flex justify-end items-center gap-4">
          <Button className="text-nowrap" style="secondary">
            <p>View Answers</p>
          </Button>
        </div>
      </div>
      <div className="mt-5 h-full overflow-y-auto overflow-x-hidden">
        <DesktopChildLayout
          primaryContent={
            <div className="flex flex-col gap-5 p-5 max-w-full">
              <div className="flex flex-col gap-5">
                <h5 className="!font-semibold">Performance Overview</h5>
                <div className="flex gap-4 flex-wrap">
                  {dummyData.scorecards?.map((card, index) => (
                    <ScoreCard
                      key={index}
                      theme={Theme.Ocean}
                      title={card.title}
                      value={card.value}
                      showBgColor={false}
                    />
                  ))}
                </div>
              </div>
              {/* Time Management Section */}
            </div>
          }
          isSecondaryHidden={true}
        />
      </div>
    </div>
  );
};

export default MockTestAnalytics;
