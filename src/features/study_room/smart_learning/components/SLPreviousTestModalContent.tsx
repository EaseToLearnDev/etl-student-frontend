// Icons
import { PiWarningFill } from "react-icons/pi";
import { MdClose } from "react-icons/md";

// Utils
import cn from "../../../../utils/classNames";

// Components
import Button from "../../../../components/Button";

interface SLPreviousTestModalContentProps {
  testName: string;
  onStart: () => void;
  onResume: () => void;
  onClose: () => void;
}

const SLPreviousTestModalContent = ({
  testName,
  onStart,
  onResume,
  onClose,
}: SLPreviousTestModalContentProps) => {
  return (
    <div className="relative p-2 px-4">
      <div className="flex flex-col items-center gap-1 text-center">
        <PiWarningFill size={24} className="text-red-500" />
        <h4>Warning</h4>
      </div>
      <div className="flex flex-col gap-1 mt-7">
        <h5>{testName}</h5>
        <h6>
          We found an incomplete session in our records. Would you like to
          resume your previous session or start a new one?
        </h6>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-end mt-7">
        <div className="flex gap-4 items-center">
          <Button onClick={onStart}>Start New</Button>
          <Button onClick={onResume} style="secondary">Resume</Button>
          <Button style="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
      <div
        onClick={onClose}
        className={cn(
          "fixed top-5 right-5 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
          " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
        )}
      >
        <MdClose size={20} />
      </div>
    </div>
  );
};

export default SLPreviousTestModalContent;
