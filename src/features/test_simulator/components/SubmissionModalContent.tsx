// Icons
import { MdClose } from "react-icons/md";

// Utils
import cn from "../../../utils/classNames";
import Button from "../../../components/Button";

interface SubmissionModalContentProps {
  onSubmit: () => void;
  onClose: () => void;
}

const SubmissionModalContent = ({
  onSubmit,
  onClose,
}: SubmissionModalContentProps) => {
  return (
    <div className="relative p-2 px-4">
      <div className="flex flex-col gap-4">
        <h5 className="!font-bold">Submit Test</h5>
        <h6>
          Are you sure you want to submit your test? You won't be able to make
          changes after submission.
        </h6>
      </div>
      <div className="flex justify-end mt-7">
        <div className="flex gap-4 items-center">
          <Button onClick={onSubmit}>Submit Session</Button>
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

export default SubmissionModalContent;
