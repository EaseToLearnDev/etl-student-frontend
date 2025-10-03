import { PiWarningFill } from "react-icons/pi";
import { Modal } from "../../../../components/Modal";
import { useContentLimitStore } from "../hooks/useContentLimitStore";
import Button from "../../../../components/Button";
import { Navigate, useNavigate } from "react-router";
import { useStudentStore } from "../../../shared/hooks/useStudentStore";

const LimitReachedModal = () => {
  const navigate = useNavigate();
  const isLimitReachedModalOpen = useContentLimitStore(
    (s) => s.isLimitReachedModalOpen
  );
  const setIsLimitReachedmodalOpen = useContentLimitStore(
    (s) => s.setIsLimitReachedmodalOpen
  );
  const activeCourse = useStudentStore((s) => s.activeCourse);
  return (
    <Modal
      isOpen={isLimitReachedModalOpen}
      onClose={() => setIsLimitReachedmodalOpen(false)}
      className="p-4"
      size="lg"
    >
      <div className="relative w-full p-2 px-4">
        <div className="flex flex-col items-center gap-1 text-center">
          <PiWarningFill size={40} className="text-red-500" />
          <h4>Limit Exceeded</h4>
        </div>
        <div className="flex flex-col gap-1 mt-7">
          <h6 className="text-[var(--text-secondary)]">
            You have reached maximum limit in your current package. Kindly
            upgrade to access the content.
          </h6>
        </div>
        <div className="flex justify-end mt-7">
          <div className="flex gap-4 items-center">
            <Button
              onClick={() =>
                navigate(`/selectcourse?cid=${activeCourse?.courseId}`)
              }
            >
              Upgrade
            </Button>
            <Button
              style="secondary"
              onClick={() => setIsLimitReachedmodalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LimitReachedModal;
