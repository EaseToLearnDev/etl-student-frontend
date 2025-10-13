import Button from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { useProfileStore } from "../hooks/useProfileStore";
import { handleDeleteRequest } from "../services/handleDeleteRequest";
import { pushToDataLayer } from "../../../utils/gtm";
import { gtmEvents } from "../../../utils/gtm-events";

const ConfirmDeleteAccount = () => {
  const confirmDeleteOpen = useProfileStore((s) => s.confirmDeleteOpen);
  const deleteAccountProgress = useProfileStore((s) => s.deleteAccountProgress);
  const setConfirmDeleteOpen = useProfileStore((s) => s.setConfirmDeleteOpen);
  const delete_account_button_click = "delete_account_button_id";

  return (
    <Modal
      isOpen={confirmDeleteOpen}
      onClose={() => setConfirmDeleteOpen(false)}
      size="md"
      className="p-4"
    >
      <div className="text-center">
        <h5 className="mb-5">Are you sure you want to delete your account?</h5>
        <div className="flex justify-center gap-4">
          <Button
            id={delete_account_button_click}
            onClick={() => {
              pushToDataLayer({
                event: gtmEvents.delete_account_button_click,
              });

              handleDeleteRequest();
            }}
            style="primary"
            className="hover:bg-[var(--sb-valencia-bg-hover)] focus:ring-[var(--sb-valencia-bg-active)] bg-[var(--sb-valencia-bg-active)] hover:text-white"
          >
            {deleteAccountProgress ? "Loading..." : "I Agree"}
          </Button>
          <Button onClick={() => setConfirmDeleteOpen(false)} style="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteAccount;
