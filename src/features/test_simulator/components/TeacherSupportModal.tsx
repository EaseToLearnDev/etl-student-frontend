import { Modal } from "../../../components/Modal";
import { MdClose } from "react-icons/md";
import cn from "../../../utils/classNames";
import { useTeacherSupportStore } from "../store/useTeacherSupportStore";
import Button from "../../../components/Button";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { useEffect } from "react";
import useTestStore from "../store/useTestStore";
import { handleSupportQuerySubmit } from "../services/handleSupportQuerySubmit";

const TeacherSupportModal = () => {
  const questionId = useTestStore((s) => s.getCurrentQuestion()?.questionId);
  const questionTypeLabel = useTestStore((s) => s.getCurrentQuestion()?.questionTypeLabel);
  const isModalOpen = useTeacherSupportStore(
    (s) => s.isTeacherSupportModalOpen
  );
  const setIsModalOpen = useTeacherSupportStore(
    (s) => s.setIsTeacherSupportModalOpen
  );
  const feedback = useTeacherSupportStore((s) => s.feedback);
  const setFeedback = useTeacherSupportStore((s) => s.setFeedback);
  const reset = useTeacherSupportStore((s) => s.reset);

  useEffect(() => {
    if (!isModalOpen) {
      reset();
    }
  }, [isModalOpen]);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      size="lg"
      className="p-4"
    >
      <div className="relative p-2 px-4">
        <div className="flex flex-col gap-4">
          <div className="sticky top-0 left-0 w-full bg-[var(--surface-bg-secondary)] flex justify-between items-center gap-4">
            <h5 className="!font-bold">Teacher Support</h5>
            <div
              onClick={() => setIsModalOpen(false)}
              className={cn(
                "size-10 aspect-square flex justify-center items-center cursor-pointer",
                " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
              )}
            >
              <MdClose size={20} />
            </div>
          </div>
        </div>

        {/* Main Body */}
        <div className="mt-4 flex flex-col gap-4">
          <p>
            Question Id: <b>{questionTypeLabel}</b>
          </p>
          <div className="flex flex-col gap-2">
            <textarea
              name="query"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className={cn(
                "resize-none flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
                "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
              )}
              placeholder="Please tell us your query..."
            ></textarea>
          </div>

          <div className="flex justify-end mt-2">
            <div className="flex gap-4 items-center">
              <Button
                onClick={() => {
                  handleSupportQuerySubmit(
                    setFeedback,
                    setIsModalOpen,
                    feedback,
                    questionId
                  );
                }}
                disabled={feedback.trim().length === 0}
              >
                <PiPaperPlaneTiltFill size={16} /> Send
              </Button>
              <Button style="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TeacherSupportModal;
