import Button from "../../../components/Button";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { useProfileStore } from "../hooks/useProfileStore";
import ConfirmDeleteAccount from "./ConfirmDeleteAccount";
import DeleteAccountOtpVerifyModal from "./DeleteAccountOtpVerifyModal";

const AccountRemovalSection = () => {
  const studentData = useStudentStore((s) => s.studentData);
  const setConfirmDeleteOpen = useProfileStore((s) => s.setConfirmDeleteOpen);

  return (
    <div className="mt-10 pt-5 border-t border-[var(--border-primary)]">
      <h3 className="text-[var(--sb-valencia-bg-active)]">Account Removal</h3>
      <p className="text-[var(--text-secondary)] mt-1 mb-4">
        Once you delete your account, all your data and access to our services
        will be permanently removed. This action cannot be undone. Please
        proceed with caution.
      </p>

      {studentData?.deleteFlag ? (
        <p className="text-[var(--sb-valencia-bg-active)]">
          Your account deletion process has started. It will be deleted in a few
          hours automatically.
        </p>
      ) : (
        <Button
          onClick={() => setConfirmDeleteOpen(true)}
          style="secondary"
          className="hover:bg-[var(--sb-valencia-bg-active)] hover:text-white"
        >
          Delete Account
        </Button>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmDeleteAccount />

      {/* OTP Verify Modal for Account Deletion */}
      <DeleteAccountOtpVerifyModal />
    </div>
  );
};

export default AccountRemovalSection;
