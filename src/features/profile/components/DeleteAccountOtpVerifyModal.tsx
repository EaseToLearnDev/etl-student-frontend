import { Modal } from "../../../components/Modal";
import logout from "../../../utils/logout";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { useProfileStore } from "../hooks/useProfileStore";
import { handleDeleteRequest } from "../services/handleDeleteRequest";
import { handleVerifyOtpAccountDeleteRequest } from "../services/handleVerifyOtpAccountDeleteRequest";
import VerifyOtpContent from "./VerifyOtpContent";

const DeleteAccountOtpVerifyModal = () => {
  const studentData = useStudentStore((s) => s.studentData);
  const setStudentData = useStudentStore((s) => s.setStudentData);
  const deleteAccountToken = useProfileStore((s) => s.deleteAccountToken);
  const setDeleteAccountToken = useProfileStore((s) => s.setDeleteAccountToken);
  const deleteError = useProfileStore((s) => s.deleteError);
  const setDeleteError = useProfileStore((s) => s.setDeleteError);

  if (!studentData) return null;

  const handleVerifyDeleteOtp = async (otp: string) => {
    const res = await handleVerifyOtpAccountDeleteRequest({
      deleteAccountToken,
      otp,
    });
    if (res) {
      setStudentData({ ...studentData, deleteFlag: 1 });
      logout();
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
        onResend={() => handleDeleteRequest()}
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
