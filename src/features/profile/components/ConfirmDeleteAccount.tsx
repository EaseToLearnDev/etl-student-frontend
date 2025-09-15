import Button from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { useProfileStore } from "../hooks/useProfileStore";
import { handleDeleteRequest } from "../services/handleDeleteRequest";

const ConfirmDeleteAccount = () => {
  const confirmDeleteOpen = useProfileStore((s) => s.confirmDeleteOpen);
  const deleteAccountProgress = useProfileStore((s) => s.deleteAccountProgress);
  const setConfirmDeleteOpen = useProfileStore((s) => s.setConfirmDeleteOpen);
  
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
            onClick={handleDeleteRequest}
            style="primary"
            className="hover:bg-[var(--sb-valencia-bg-active)] hover:text-white"
          >
            {deleteAccountProgress ? "Loading..." : "Yes, Delete"}
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
