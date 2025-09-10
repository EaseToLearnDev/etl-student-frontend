import { useStudentStore } from "../../shared/hooks/useStudentStore";

/**
 * Checks if the student's profile is complete by verifying required fields.
 */
export const isProfileComplete = () => {
  const { studentData } = useStudentStore.getState();

  if (!studentData) return false;

  const { studentName, emailId, phoneNo } = studentData;

  if (!studentName || !emailId || !phoneNo) return false;

  return true;
};
