import Cookies from "js-cookie";
// Hooks
import { useStudentStore } from "../features/shared/hooks/useStudentStore";

/**
 * Logs out the current student and redirects to the student login page.
 */
const logout = () => {
  const { reset } = useStudentStore.getState();
  Cookies.remove("accountDetails");
  Cookies.remove("token");
  reset();
  window.location.href = "/";
};

export default logout;
