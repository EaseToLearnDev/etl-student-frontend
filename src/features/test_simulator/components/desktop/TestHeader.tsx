// Store
import { getTimeFromSeconds } from "../../../../utils";
import useTestStore from "../../store/useTestStore";
import useTestTimerStore from "../../store/useTestTimerStore";

/**
 * Renders the test header for the desktop view, displaying the test title and a static timer.
 */
const TestHeader = () => {
  const testTitle = useTestStore((state) => state.testData?.testName) || "";
  const remainingSec = useTestTimerStore((state) => state.remainingSec);
  const isExpired = useTestTimerStore((state) => state.isExpired);
  const isRunning = useTestTimerStore((state) => state.isRunning);

  const formattedTime = getTimeFromSeconds(remainingSec);
  const { timerEnabled } = useTestStore((state) => state.features);

  return (
    <div className="flex justify-between">
      <div className="md:w-[60%] lg:w-[70%]">
      <h5 className="!font-semibold text-ellipsis line-clamp-2 flex-1">{testTitle}</h5>
      </div>
      <div className="hidden md:flex md:justify-center md:w-[40%] lg:w-[30%]">
        <h3>
          {timerEnabled
            ? isExpired
              ? "Time's Up"
              : isRunning
              ? formattedTime
              : ""
            : ""}
        </h3>
      </div>
    </div>
  );
};

export default TestHeader;
