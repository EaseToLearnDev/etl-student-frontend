// Types
import type { NormalizedTest } from "../utils/normalizeTestData";

// Icons
import {
  PiChartBarFill,
  PiInfo,
  PiNoteFill,
  PiTimerFill,
} from "react-icons/pi";

// Hooks
import useIsMobile from "../../../hooks/useIsMobile";

// Components
import Button from "../../../components/Button";
import { pushToDataLayer } from "../../../utils/gtm";
import { gtmEvents } from "../../../utils/gtm-events";

interface TestCardProps {
  test: NormalizedTest;
  infoClickHandler?: () => void;
  onClickHandler?: (test: NormalizedTest) => void;
};
/**
 * TestCard component displays details of a test including name, time, questions,
 * marks, difficulty, and progress. It also provides actions to start, resume, or view results.
 */
const Start_topic_test_button_id = "start_topic_test_button_id"
const TestCard = ({
  test,
  infoClickHandler,
  onClickHandler,
}: TestCardProps) => {
  const isMobile = useIsMobile();
  const eventType = test.event;

  console.log("Event Type:", eventType); // Debugging line
  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 p-5 lg:justify-between border-1 border-[var(--border-secondary)] hover:bg-[var(--surface-bg-secondary)] rounded-lg transition-colors duration-100 ease-in">
      <div className="flex flex-col gap-5 w-full">
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
      </div>
      <Button 
      id={test.eventId}
      className="min-w-[120px]" onClick={() => {
        pushToDataLayer({
          event: gtmEvents[eventType as keyof typeof gtmEvents],
          test_name: test.title,
          test_id: test.id
        });
        onClickHandler?.(test);

      }}
      >
        Start
      </Button>
    </div>
  );
};

export default TestCard;
