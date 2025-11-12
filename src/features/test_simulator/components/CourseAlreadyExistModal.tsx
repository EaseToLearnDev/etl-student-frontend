import { useNavigate } from "react-router";
import Button from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { useGuestStore } from "../../../global/hooks/useGuestStore";
import useTestStore from "../store/useTestStore";

const CourseAlreadyExistModal = () => {
  const openCourseAlreadyExistModal = useGuestStore(
    (state) => state.openCourseAlreadyExistModal
  );
  const setOpenCourseAlreadyExistModal = useGuestStore(
    (state) => state.setOpenCourseAlreadyExistModal
  );
  const testData = useTestStore((state) => state.testData);

  const navigate = useNavigate();

  if (!testData) return null;
  const { courseId, testName } = testData;

  return (
    <Modal
      isOpen={openCourseAlreadyExistModal}
      onClose={() => setOpenCourseAlreadyExistModal(false)}
      size="md"
    >
      <div className="flex flex-col gap-3 justify-center text-center">
        <h5 className="text-[var(--sb-valencia-bg-active)]">
          You have already attempted the free trial for {testName}
        </h5>
        <h5>Please Upgrade your account to give more tests</h5>
        <div className="flex gap-4 justify-center mt-2">
          <Button
            style="primary"
            onClick={() => navigate(`/selectcourse?cid=${courseId}`)}
          >
            Upgrade
          </Button>
          <Button style="secondary" onClick={() => navigate("/")}>
            Home
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CourseAlreadyExistModal;
