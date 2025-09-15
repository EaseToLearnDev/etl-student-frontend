import { useProfileStore } from "../hooks/useProfileStore";
import { handleDeleteStudentAccount } from "./handleDeleteStudentAccount";

export const handleDeleteRequest = async () => {
  const {
    setDeleteAccountProgress,
    setDeleteAccountToken,
    setDeleteError,
    setConfirmDeleteOpen,
  } = useProfileStore.getState();

  try {
    setDeleteAccountProgress(true);
    const res = await handleDeleteStudentAccount();
    if (res.responseTxt === "success") {
      setDeleteAccountToken(res?.obj?.token);
    }
  } catch (error) {
    setDeleteError(`Delete Request Failed: ${error}`);
  } finally {
    setDeleteAccountProgress(false);
    setConfirmDeleteOpen(false);
  }
};
