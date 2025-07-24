// Icons
import {
  PiChartBarFill,
  PiInfo,
  PiNoteFill,
  PiTimerFill,
} from "react-icons/pi";

// Types
import { type NormalizedTest } from "../utils/normalizeTestData";

// Hooks
import useIsMobile from "../../../hooks/useIsMobile";

// Utils
import { capitalizeWords } from "../../../utils";

// Components
import Button from "../../../components/Button";

type TestCardProps = {
  test: NormalizedTest;
  infoClickHandler?: () => void;
};
/**
 * TestCard component displays details of a test including name, time, questions,
 * marks, difficulty, and progress. It also provides actions to start, resume, or view results.
 *
 * Props:
 * - test - The test data to display.
 * - infoClickHandler - Optional handler for info icon click (mobile only).
 */
const TestCard = ({ test, infoClickHandler }: TestCardProps) => {
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-5 lg:justify-between">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h5>{test?.title}</h5>
            {isMobile ? (
              <div
                className="cursor-pointer w-[24px] h-[24px] flex justify-center items-center"
                onClick={infoClickHandler}
              >
                <PiInfo size={20} />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <PiTimerFill size={16} />
              <span>Time : {test?.time}min</span>
            </div>
            <div className="flex items-center gap-1">
              <PiNoteFill size={16} />
              <span>Questions : {test?.questions}</span>
            </div>
            <div className="flex items-center gap-1">
              <PiChartBarFill size={16} />
              <span>Marks : {test?.marks}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { heading: "Difficulty Level", value: test?.difficulty },
            {
              heading: "Your progress",
              value: capitalizeWords(
                test?.progress
                  ? test?.progress?.split("_").join(" ")
                  : ""
              ),
            },
          ].map((stat) => (
            <div
              key={stat.heading}
              className="w-full lg:w-fit flex items-center gap-2 px-3 py-1.5 border-1 rounded-full border-[var(--border-primary)]"
            >
              <div className="w-[4px] h-[4px] rounded-full bg-[var(--text-primary)]" />
              <span>
                {stat.heading} - {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      {test?.progress === "not_started" && test?.marks ? (
        <div className="flex flex-col gap-2 justify-center items-center">
          <h5>
            {test?.score}/{test?.marks}
          </h5>
          <Button className="min-w-[120px]">View Result</Button>
        </div>
      ) : test?.progress === "not_started" && !test?.marks ? (
        <div>
          <Button className="min-w-[120px]">Start Now</Button>
        </div>
      ) : (
        <Button className="min-w-[120px]">Resume</Button>
      )}
    </div>
  );
};

export default TestCard;
