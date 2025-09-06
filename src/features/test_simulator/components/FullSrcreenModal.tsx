// Utils
import Button from "../../../components/Button";
import useTestTimerStore from "../store/useTestTimerStore";
import { getTimeFromSeconds } from "../../../utils";

interface FullScreenExitModalContentProps {
  onReEnter: () => void;
  onSubmit: () => void;
  remainingChances: number;
}

const FullScreenExitModalContent = ({
  onReEnter,
  onSubmit,
  remainingChances,
}: FullScreenExitModalContentProps) => {
  const remainingSec = useTestTimerStore((s) => s.remainingSec);
  const isExpired = useTestTimerStore((s) => s.isExpired);

  const formattedTime = getTimeFromSeconds(remainingSec);

  return (
    <div className="relative p-2 px-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-4">
          <h5 className="!font-bold">Full Screen Exited</h5>
          <h6 className="text-[var(--text-secondary)]">
            You have exited full screen mode. Please re-enter or submit now.
          </h6>
          <h6 className="text-[var(--text-secondary)]"> 
            If you press Escape or leave the tab more than 3 times the test will auto-submit.
          </h6>
          <h6 className="text-[var(--text-secondary)]">
            Remaining chances: {remainingChances}.
          </h6>
        </div>

        <div className="min-w-[120px] text-right">
            {isExpired ? "Time-Up" : formattedTime}
        </div>
      </div>

      <div className="flex justify-end mt-7 gap-4">
        <Button onClick={onReEnter} style="secondary">
          Resume
        </Button>
        <Button onClick={onSubmit}>Submit Now</Button>
      </div>
    </div>
  );
};

export default FullScreenExitModalContent;