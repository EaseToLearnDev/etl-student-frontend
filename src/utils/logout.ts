// Hooks
import { useStudentStore } from "../features/shared/hooks/useStudentStore";

/**
 * Logs out the current student and redirects to the student login page.
 */
const logout = () => {
  const { reset } = useStudentStore.getState();
  reset();
  window.location.href = "/logout";
};

export default logout;
