import { useStudentStore } from "../features/store/useStudentStore";

const logout = () => {
  const { reset } = useStudentStore.getState();
  reset();
  window.location.href = "/student";
};

export default logout;
