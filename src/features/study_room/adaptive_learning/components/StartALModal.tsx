import { MdClose } from "react-icons/md";
import { Modal } from "../../../../components/Modal";
import cn from "../../../../utils/classNames";
import { useALStore } from "../hooks/useALStore";
import Button from "../../../../components/Button";
import SmartLearningInstructions from "../../smart_learning/components/SmartLearningInstructions";

interface StartALModalProps {
  onStart: () => void;
}

const StartALModal = ({ onStart }: StartALModalProps) => {
  const topic = useALStore((s) => s.getSelectedTopic());
  const showStartTestModal = useALStore((s) => s.showStartTestModal);
  const setShowStartTestModal = useALStore((s) => s.setShowStartTestModal);
  return (
    <Modal
      isOpen={showStartTestModal}
      onClose={() => setShowStartTestModal(false)}
      size="lg"
      className="p-4"
    >
      <div className="relative p-2 h-full max-h-[70dvh] max-h-[70dvh] overflow-y-hidden">
        {/* Header */}
        <div className="w-full h-full max-h-[90px] bg-[var(--surface-bg-secondary)] flex justify-between gap-2 px-4 py-2">
          <div className="flex flex-col gap-1">
            <h3>Adaptive Learning</h3>
            <h6 className="text-ellipsis line-clamp-2">{topic?.topicName}</h6>
          </div>
          <div
            onClick={() => setShowStartTestModal(false)}
            className={cn(
              "w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
              "text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
            )}
          >
            <MdClose size={20} />
          </div>
        </div>

        <div className="mt-5 h-full max-h-[300px] flex-1 overflow-y-auto border border-[var(--border-primary)] rounded-lg p-4">
          <SmartLearningInstructions
            learningMode={"Learning Session"}
            hideTitle
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-7">
          <div className="flex gap-4 items-center">
            <Button onClick={onStart}>Start Now</Button>
            <Button
              style="secondary"
              onClick={() => setShowStartTestModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StartALModal;
