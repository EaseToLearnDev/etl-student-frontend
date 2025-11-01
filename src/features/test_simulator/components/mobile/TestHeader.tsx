// Store
import useTestStore from "../../store/useTestStore";

// Components
import Button from "../../../../components/Button";
import useTestTimerStore from "../../store/useTestTimerStore";
import { getTimeFromSeconds } from "../../../../utils";
import { useGuestStore } from "../../../../global/hooks/useGuestStore";
import cn from "../../../../utils/classNames";

/**
 * Renders the header section for the test simulator on mobile devices.
 */
const TestHeader = () => {
  // const testTitle = useTestStore((state) => state.testData?.testName) || "";
  const setIsSubmissionModalOpen = useTestStore(
    (state) => state.setIsSubmissionModalOpen,
  );
  const { correctResponseEnabled } = useTestStore((s) => s.features);
  const isExpired = useTestTimerStore((state) => state.isExpired);
  const isRunning = useTestTimerStore((state) => state.isRunning);
  const timerEnabled = useTestStore((state) => state.features.timerEnabled);
  const remainingSec = useTestTimerStore((state) => state.remainingSec);
  const formattedTime = getTimeFromSeconds(remainingSec);

  const setShowGuestTestSubmitModal = useGuestStore(
    (s) => s.setShowGuestTestSubmitModal,
  );
  const testMode = useTestStore((s) => s.testMode);

  return (
    <div
      className={cn(
        "flex items-center gap-4 py-2 px-4",
        timerEnabled ? "justify-between" : "justify-end",
      )}
    >
      {/* Test Title */}
      {/* <h5 className="!font-semibold text-ellipsis line-clamp-2 flex-1">{testTitle}</h5> */}

      {/* Timer */}
      {timerEnabled && (
        <div className="flex flex-col items-center mt-1">
          {isRunning ? (
            <span className="text-center">Time Remaining</span>
          ) : (
            <></>
          )}
          <div className="text-center">
            <h3>{isExpired ? "Time's Up" : isRunning ? formattedTime : ""}</h3>
          </div>
        </div>
      )}

      {/* Submit Button */}
      {!correctResponseEnabled && (
        <div className="flex items-center gap-2">
          <Button
            onClick={() =>
              testMode === "guest"
                ? setShowGuestTestSubmitModal(true)
                : setIsSubmissionModalOpen(true)
            }
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default TestHeader;
