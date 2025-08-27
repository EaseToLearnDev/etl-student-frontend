import { useState } from "react";
import { Modal } from "../../../components/Modal";
import { useFeedbackStore } from "../../../global/hooks/useFeedbackStore";
import Select from "../../../components/Select";
import cn from "../../../utils/classNames";
import { MdClose } from "react-icons/md";

const FeedbackModal = () => {
  const showFeedbackModal = useFeedbackStore((s) => s.showFeedbackModal);
  const setShowFeedbackModal = useFeedbackStore((s) => s.setShowFeedbackModal);
  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number | null>(
    null
  );
  const [isTypeSelectionOpen, setIsTypeSelectionOpen] =
    useState<boolean>(false);

  return (
    <Modal
      isOpen={showFeedbackModal}
      onClose={() => setShowFeedbackModal(false)}
      size="md"
      className="p-4"
    >
      <div className="relative p-2 px-4">
        <h5>Student Feedback</h5>
        <Select
          items={[]}
          isOpen={isTypeSelectionOpen}
          onSelect={setSelectedTypeIndex}
          onToggle={() => setIsTypeSelectionOpen((prev) => !prev)}
          selectedIndex={selectedTypeIndex ?? 0}
          type="Feedback Type"
        />
        <div
          onClick={() => setShowFeedbackModal(false)}
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

export default FeedbackModal;
