import Button from "../../../components/Button";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { useProfileStore } from "../hooks/useProfileStore";
import ConfirmDeleteAccount from "./ConfirmDeleteAccount";
import DeleteAccountOtpVerifyModal from "./DeleteAccountOtpVerifyModal";
import { pushToDataLayer } from "../../../utils/gtm";
import { gtmEvents } from "../../../utils/gtm-events";

const AccountRemovalSection = () => {
  const studentData = useStudentStore((s) => s.studentData);
  const setConfirmDeleteOpen = useProfileStore((s) => s.setConfirmDeleteOpen);
  const delete_account_button_click = "delete_account_button_id";

  return (
    <div className="mt-6 pt-5 border-t border-[var(--border-primary)]">
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
        id={delete_account_button_click}
        style="secondary"
          className="hover:bg-[var(--sb-valencia-bg-active)] hover:text-white"
          onClick={() => 
            {
                pushToDataLayer({
                  event: gtmEvents.delete_account_button_click,
                });

            setConfirmDeleteOpen(true)
            }}
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
