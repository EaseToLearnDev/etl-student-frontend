// src/components/SupportSection.tsx
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import cn from "../../../utils/classNames";
import Button from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { useFeedbackStore } from "../../../global/hooks/useFeedbackStore";
import { submitStudentFeedback } from "../../../global/services/submitStudentFeedback";
import { pushToDataLayer } from "../../../utils/gtm";
import { gtmEvents } from "../../../utils/gtm-events";

interface SupportSectionProps {
  className?: string;
}

const SupportSection = ({ className = "" }: SupportSectionProps) => {
  const subject = useFeedbackStore((state) => state.subject);
  const details = useFeedbackStore((s) => s.details);
  const setSubject = useFeedbackStore((state) => state.setSubject);
  const setDetails = useFeedbackStore((s) => s.setDetails);
  const [openSupportModal, setOpenSupportModal] = useState<boolean>(false);
  const Contact_Support_Button_Click = "contact_support_button_id";
  const send_support_button_id = "send_support_button_id";

  return (
    <div className={cn("w-full", className)}>
      <h5>Support</h5>
      <p className="mt-2 text-[var(--text-tertiary)]">
        Have any questions or need help? Feel free to reach out to our support
        team anytime.
      </p>
      <Button
        id={Contact_Support_Button_Click}
        style="secondary"
        className="mt-6"
        onClick={() => {
          pushToDataLayer({
            event: gtmEvents.contact_support_button_click,
          });

          setOpenSupportModal(true);
        }}
      >
        <EnvelopeIcon className="h-5 w-5" />
        Contact Support
      </Button>

      <Modal
        size="md"
        isOpen={openSupportModal}
        onClose={() => setOpenSupportModal(false)}
        className="p-4"
      >
        <div className="relative p-2 px-4">
          <h5>Contact Support</h5>
          <div className="flex flex-col gap-1 mt-4">
            <label
              htmlFor="Subject"
              className="!font-medium text-[var(--text-secondary)]"
            >
              Subject*
            </label>
            <input
              name="subject"
              placeholder="Enter subject"
              className={cn(
                "flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
                "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
              )}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <label className="!font-medium text-[var(--text-secondary)]">
              Tell us your query
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Enter your query"
              className={cn(
                "resize-none w-full flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
                "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
              )}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end mt-4">
            <div className="flex gap-4 items-center">
              <Button
              id={send_support_button_id}
                style="primary"
                disabled={!subject.trim()}
                onClick={() => {
                  pushToDataLayer({
                    event: gtmEvents.send_support_button_click,
                  });
                  submitStudentFeedback({
                    type: "Other",
                    subject: subject,
                    details: details,
                  });
                  setOpenSupportModal(false);
                }}
              >
                <PiPaperPlaneTiltFill size={16} />
                Send
              </Button>
              <Button
                style="secondary"
                onClick={() => setOpenSupportModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
        <div
          onClick={() => setOpenSupportModal(false)}
          className={cn(
            "fixed top-5 right-5 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
            " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
          )}
        >
          <MdClose size={20} />
        </div>
      </Modal>
    </div>
  );
};

export default SupportSection;
