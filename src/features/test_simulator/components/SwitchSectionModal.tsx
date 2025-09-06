import { PiWarningFill } from "react-icons/pi";
import { Modal } from "../../../components/Modal";
import cn from "../../../utils/classNames";
import Button from "../../../components/Button";
import { MdClose } from "react-icons/md";

interface SwitchSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrimaryClick?: () => void;
}

const SwitchSectionModal = ({
  isOpen,
  onClose,
  onPrimaryClick,
}: SwitchSectionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" className="p-4">
      <div className="relative p-2 px-4">
        <div className="flex flex-col items-center gap-1 text-center">
          <PiWarningFill size={24} className="text-red-500" />
          <h4>Warning</h4>
        </div>
        <div className="flex flex-col gap-1 mt-7">
          <h6>
            Are you sure you want to switch section? You would not be able to go
            back to previous section after switching.
          </h6>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end mt-7">
          <div className="flex gap-4 items-center">
            <Button onClick={onPrimaryClick}>Switch Section</Button>
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
    </Modal>
  );
};

export default SwitchSectionModal;
