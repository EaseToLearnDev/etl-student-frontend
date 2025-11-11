// Icons
import { MdClose } from "react-icons/md";

// Utils
import cn from "../../../utils/classNames";
import Button from "../../../components/Button";
import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { LuLoader } from "react-icons/lu";
import type { AssessmentMode } from "../test_simulator.types";

interface SubmissionModalContentProps {
  onSubmit: () => void;
  onContinueLater: () => void;
  onClose: () => void;
  AssessmentMode?:AssessmentMode;
  hideOnContinueLater?: boolean;
}

const SubmissionModalContent = ({
  onSubmit,
  onContinueLater,
  onClose,
  AssessmentMode,
  hideOnContinueLater = false,
}: SubmissionModalContentProps) => {
  const loading = useLoadingStore((s) => s.loading);
  return (
    <div className="relative p-2 px-4">
      <div className="flex flex-col gap-4">
        <h5 className="!font-bold">Submit Test</h5>
        <h6 className="text-[var(--text-secondary)]">
          Click <b className="text-[var(--text-secondary)]">Submit Now</b> to
          finalize your session and view results, or{" "}
          <b className="text-[var(--text-secondary)]">Save & Continue Later</b>{" "}
          if you wish to pause and resume it later.
        </h6>
      </div>
      <div className="w-full flex justify-end mt-7">
        <div className="w-full flex flex-col test_submit_modal_action_buttons gap-2 md:gap-4 items-center">
          {loading ? (
            <Button className="w-full" disabled>
              <div className="flex justify-center items-center gap-2">
                <LuLoader className="animate-spin size-4" />
                <p className="text-[var(--text-secondary)]">Loading...</p>
              </div>
            </Button>
          ) : (
            <>
              <Button onClick={onSubmit} className="w-full flex-1">
                {AssessmentMode === "beginner"? "End Session": "Submit Now"}
              </Button>
              {!hideOnContinueLater ? (
                <Button
                  onClick={onContinueLater}
                  style="secondary"
                  className="w-full flex-1"
                >
                  Save & Continue Later
                </Button>
              ) : (
                <></>
              )}
            </>
          )}
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
