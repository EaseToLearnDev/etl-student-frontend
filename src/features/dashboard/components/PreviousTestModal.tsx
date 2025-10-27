import { MdClose } from "react-icons/md";
import { Modal } from "../../../components/Modal";
import cn from "../../../utils/classNames";
import { usePrevTestStore } from "../../shared/hooks/usePrevTestStore";
import Button from "../../../components/Button";
import { pushToDataLayer } from "../../../utils/gtm";
import { gtmEvents } from "../../../utils/gtm-events";

interface PreviousTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResume: () => void;
}
const continue_test_button_id = "continue_test_button_id";
const cancel_previous_test_modal_id = "cancel_previous_test_modal_id";
const PreviousTestModal = ({
  isOpen,
  onClose,
  onResume,
}: PreviousTestModalProps) => {
  const prevRunningTest = usePrevTestStore((s) => s.prevRunningTest);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" className="p-4">
      <div className="relative w-full p-2 px-4">
        <h3 className="font-semibold text-lg mb-2">Resume Previous Test</h3>
        <div className="flex flex-col gap-2 mt-6">
          <div className="flex flex-col gap-1">
            <h5>{prevRunningTest?.testName}</h5>
          </div>
          <p className="text-[var(--text-secondary)]">
            You have an unfinished test session. Would you like to continue
            where you left off?
          </p>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end mt-8">
          <div className="flex gap-4 items-center">
            <Button
              id={continue_test_button_id}
              onClick={() => {
                pushToDataLayer({
                  event: gtmEvents.continue_test_button_click,
                });
                onResume();
              }}
            >
              Continue Test
            </Button>
            <Button
              // id={cancel_previous_test_modal_id}
              style="secondary"
              onClick={() => {
                // pushToDataLayer({
                //   event: gtmEvents.cancel_previous_test_modal_click,
                // });

                onClose();
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <div
        onClick={onClose}
        className={cn(
          "fixed top-5 right-5 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
          " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full",
        )}
      >
        <MdClose size={20} />
      </div>
    </Modal>
  );
};

export default PreviousTestModal;
