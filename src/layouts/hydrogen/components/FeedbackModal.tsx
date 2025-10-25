import { useEffect, useState } from "react";
import { Modal } from "../../../components/Modal";
import { useFeedbackStore } from "../../../global/hooks/useFeedbackStore";
import Select from "../../../components/Select";
import cn from "../../../utils/classNames";
import { MdClose } from "react-icons/md";
import { getFeedbackTypes } from "../../../global/services/getFeedbackTypes";
import Button from "../../../components/Button";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { submitStudentFeedback } from "../../../global/services/submitStudentFeedback";
import { useToastStore } from "../../../global/hooks/useToastStore";
import { pushToDataLayer } from "../../../utils/gtm";
import { gtmEvents } from "../../../utils/gtm-events";

const FeedbackModal = () => {
  const showFeedbackModal = useFeedbackStore((s) => s.showFeedbackModal);
  const feedbackTypes = useFeedbackStore((s) => s.feedbackTypes);
  const typeIdx = useFeedbackStore((s) => s.typeIdx);
  const setTypeIdx = useFeedbackStore((s) => s.setTypeIdx);
  const subject = useFeedbackStore((s) => s.subject);
  const setSubject = useFeedbackStore((s) => s.setSubject);
  const details = useFeedbackStore((s) => s.details);
  const reset = useFeedbackStore((s) => s.reset);
  const setDetails = useFeedbackStore((s) => s.setDetails);
  const setFeedbackTypes = useFeedbackStore((s) => s.setFeedbackTypes);
  const setShowFeedbackModal = useFeedbackStore((s) => s.setShowFeedbackModal);
  const resetToast = useToastStore((s) => s.resetToast);
  const Send_feedback_button_id = "send_feedback_button_id";

  const [isTypeSelectionOpen, setIsTypeSelectionOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFeedbackTypes();
      if (data) {
        setFeedbackTypes(data);
      }
    };
    if (showFeedbackModal) {
      fetchData();
    } else {
      reset();
    }
  }, [showFeedbackModal]);

  return (
    <Modal
      isOpen={showFeedbackModal}
      onClose={() => {
        pushToDataLayer({
          event: gtmEvents.cancel_feedback_modal_click,
          id: "cancel_feedback_modal_id",
        });
        setShowFeedbackModal(false);
      }}
      size="md"
      className="p-4"
    >
      <div className="relative w-full p-2 px-4">
        <h5>Student Feedback</h5>
        <div className="w-full flex flex-col gap-2 mt-4">
          <label
            className="!font-medium text-[var(--text-secondary)]"
            htmlFor="feedback-type"
          >
            Feedback Type
          </label>
          <Select
            type="Feedback Type"
            items={feedbackTypes?.map((type) => type.title) || []}
            isOpen={isTypeSelectionOpen}
            onSelect={setTypeIdx}
            onToggle={() => setIsTypeSelectionOpen((prev) => !prev)}
            selectedIndex={typeIdx}
            className="!w-full h-[50px] "
            dropdownClassName="!bg-[var(--surface-bg-tertiary)] !w-[440px]"
            dropdownItemClassName="hover:bg-[var(--surface-bg-secondary)]"
          />
          <div className="flex flex-col gap-1">
            <label
              htmlFor="Subject"
              className="!font-medium text-[var(--text-secondary)]"
            >
              Subject<sup>*</sup>
            </label>
            <input
              name="subject"
              className={cn(
                "flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
                "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
              )}
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="!font-medium text-[var(--text-secondary)]"
            >
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter description"
              rows={4}
              className={cn(
                "resize-none flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
                "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
              )}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
          </div>
        </div>
        {/* Action buttons */}
        <div className="flex justify-end mt-7">
          <div className="flex gap-4 items-center">
            <Button
            id= {Send_feedback_button_id}
              disabled={!subject.trim()}
              onClick={() => {
                pushToDataLayer({
                  event: gtmEvents.send_feedback_button_click,
                });
                submitStudentFeedback({
                  type: feedbackTypes ? feedbackTypes[typeIdx].title : "",
                  subject: subject,
                  details: details,
                });
                resetToast();
                setShowFeedbackModal(false);
              }}
            >
              <PiPaperPlaneTiltFill size={16} /> Send
            </Button>
            <Button
              style="secondary"
              onClick={() => {
                pushToDataLayer({
                  event: gtmEvents.cancel_feedback_modal_click,
                  id: "cancel_feedback_modal_id",
                });
                setShowFeedbackModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
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
