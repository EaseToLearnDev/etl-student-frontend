import { useInviteTeacherStore } from "../../../global/hooks/useInviteTeacherStore";
import { Modal } from "../../../components/Modal";
import { handleStudentInvite } from "../../../global/services/handleStudentInvite";
import cn from "../../../utils/classNames";
import Button from "../../../components/Button";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { MdClose } from "react-icons/md";
import { pushToDataLayer } from "../../../utils/gtm";
import { gtmEvents } from "../../../utils/gtm-events";

const InviteTeacherModal = () => {
  const showInviteTeacherModal = useInviteTeacherStore(
    (s) => s.showInviteTeacherModal
  );
  const teacherLoginId = useInviteTeacherStore((s) => s.teacherLoginId);
  const setTeacherLoginId = useInviteTeacherStore((s) => s.setTeacherLoginId);
  const setShowInviteTeacherModal = useInviteTeacherStore(
    (s) => s.setShowInviteTeacherModal
  );
  const invite_teacher_send_id = "invite_teacher_send_id";
  return (
    <Modal
      isOpen={showInviteTeacherModal}
      onClose={() => {
        setShowInviteTeacherModal(false);
        pushToDataLayer({
          event: gtmEvents.cancel_invite_teacher_send_button_click,
          id: "cancel_invite_teacher_send_id",
        });
      }}
      size="md"
      className="p-4"
    >
      <div className="relative p-2 px-4">
        <h5>Invite Teacher</h5>
        <div className="mt-4 flex flex-col gap-2">
          <label className="!font-medium text-[var(--text-secondary)]">
            Teacher User-ID / Email / Mobile
          </label>
          <input
            value={teacherLoginId}
            onChange={(e) => setTeacherLoginId(e.target.value)}
            className={cn(
              "w-full flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
              "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
            )}
            placeholder=" you@example.com"
          />
        </div>
        <div className="flex justify-end mt-4">
          <div className="flex gap-4 items-center">
            <Button
              id={invite_teacher_send_id}
              disabled={!teacherLoginId.trim()}
              style="primary"
              onClick={() => {
                handleStudentInvite({ teacherLoginId });
                pushToDataLayer({
                  event: gtmEvents.invite_teacher_send_button_click,
                });
                setShowInviteTeacherModal(false);
              }}
            >
              <PiPaperPlaneTiltFill size={16} />
              Invite
            </Button>
            <Button
              style="secondary"
              onClick={() => {
                setShowInviteTeacherModal(false);
                pushToDataLayer({
                  event: gtmEvents.cancel_invite_teacher_send_button_click,
                  id: "cancel_invite_teacher_send_id",
                });
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <div
        onClick={() => setShowInviteTeacherModal(false)}
        className={cn(
          "fixed top-5 right-5 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
          " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
        )}
      >
        <MdClose size={20} />
      </div>
    </Modal>
  );
};

export default InviteTeacherModal;
