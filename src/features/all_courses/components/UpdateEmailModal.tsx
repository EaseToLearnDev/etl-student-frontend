import Button from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { useNavigate } from "react-router";
import cn from "../../../utils/classNames";
import { MdClose } from "react-icons/md";

interface UpdateEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateEmailModal = ({ isOpen, onClose }: UpdateEmailModalProps) => {
  const navigate = useNavigate();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" className="p-4">
      <div className="relative w-full p-2 px-4">
        <h5 className="!font-bold">Update Email</h5>
        <h6 className="mt-4">
          To continue with your course purchase, please update your email
          address in your profile.
        </h6>
        {/* Action buttons */}
        <div className="flex justify-end mt-7">
          <div className="flex gap-4 items-center">
            <Button
              onClick={() => {
                navigate("/profile");
              }}
            >
              Update Email ID
            </Button>
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

export default UpdateEmailModal;
