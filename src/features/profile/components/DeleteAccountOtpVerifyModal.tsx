import { Modal } from "../../../components/Modal";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { useProfileStore } from "../hooks/useProfileStore";
import { handleVerifyOtpAccountDeleteRequest } from "../services/handleVerifyOtpAccountDeleteRequest";
import VerifyOtpContent from "./VerifyOtpContent";

const DeleteAccountOtpVerifyModal = () => {
  const { studentData, setStudentData } = useStudentStore.getState();
  const {
    deleteAccountToken,
    setDeleteAccountToken,
    deleteError,
    setDeleteError,
  } = useProfileStore.getState();

  if (!studentData) return null;

  const handleVerifyDeleteOtp = async (otp: string) => {
    const res = await handleVerifyOtpAccountDeleteRequest({
      deleteAccountToken,
      otp,
    });
    if (res) {
      setStudentData({ ...studentData, deleteFlag: 1 });
    } else {
      setDeleteError("Invalid OTP. Please Try Again");
    }
  };
  return (
    <Modal
      isOpen={!!deleteAccountToken}
      onClose={() => setDeleteAccountToken("")}
      size="md"
    >
      <VerifyOtpContent
        onVerify={handleVerifyDeleteOtp}
        onCancel={() => setDeleteAccountToken("")}
      />
      {deleteError && (
        <p className="text-[var(--sb-valencia-bg-active)] mt-2">
          {deleteError}
        </p>
      )}
    </Modal>
  );
};

export default DeleteAccountOtpVerifyModal;
