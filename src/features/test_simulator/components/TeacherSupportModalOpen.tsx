import { Modal } from "../../../components/Modal";
import { MdClose } from "react-icons/md";
import cn from "../../../utils/classNames";

interface TeacherSupportModalOpenProps {
  isOpen: boolean;
  onClose: () => void;
  questionId?: string;
}
const TeacherSupportModalOpen = ({
  isOpen,
  onClose,
  questionId
}: TeacherSupportModalOpenProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" className="p-4">
      <div className="flex flex-col gap-4">
        <div className="sticky top-0 left-0 w-full p-4 bg-[var(--surface-bg-secondary)] flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h5 className="!font-bold">Teacher Support</h5>
          </div>
          <div
            onClick={onClose}
            className={cn(
              "size-10 aspect-square flex justify-center items-center cursor-pointer",
              " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
            )}
          >
            <MdClose size={20} />
          </div>
        </div>

        {/* Main Body */}
        <div>
            <p>Question Id: {questionId}</p>
        </div>
      </div>
    </Modal>
  );
};

export default TeacherSupportModalOpen;
