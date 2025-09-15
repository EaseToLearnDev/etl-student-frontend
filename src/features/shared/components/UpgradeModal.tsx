import { MdClose } from "react-icons/md";
import { Modal } from "../../../components/Modal";
import cn from "../../../utils/classNames";
import { useStudentStore } from "../hooks/useStudentStore";
import { PiWarningFill } from "react-icons/pi";
import Button from "../../../components/Button";
import { useNavigate } from "react-router";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const UpgradeModal = ({ isOpen, onClose }: UpgradeModalProps) => {
  const activeCourse = useStudentStore((s) => s.activeCourse);
  const navigate = useNavigate();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" className="p-4">
      <div className="relative w-full p-2 px-4">
        <div className="flex flex-col items-center gap-1 text-center">
          <PiWarningFill size={40} className="text-red-500" />
          <h4>Validity Expired</h4>
        </div>
        <div className="flex flex-col gap-1 mt-7">
          <h6 className="text-[var(--text-secondary)]">
            {activeCourse?.organisationName}'s validity has been finished. Renew
            your account to continue your practice.
          </h6>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end mt-7">
          <div className="flex gap-4 items-center">
            <Button
              onClick={() =>
                navigate(`/selectcourse?cid=${activeCourse?.courseId}`)
              }
            >
              Renew
            </Button>
            <Button style="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
        {/*         
        <h5 className="!font-bold">Validity Expired</h5>
        <h6>
          {activeCourse?.organisationName}'s validity has been finished. Renew
          your account to continue your practice.
        </h6> */}

        {/* Close Button */}
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

export default UpgradeModal;
