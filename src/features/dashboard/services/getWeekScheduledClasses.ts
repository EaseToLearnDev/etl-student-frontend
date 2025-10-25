import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { getWeekClasses } from "../apis/getWeekClassses.api";

export const getWeekScheduledClasses = async () => {
  const { studentData } = useStudentStore.getState();

  if (!studentData) return null;

  const { loginId, token, schools } = studentData;

  if (!schools) return null;

  const classId = schools[0].classId;

  if (!classId) return null;

  try {
    const data = await getWeekClasses({ loginId, token, classId });
    return data;
  } catch (error) {
    console.error("Failed to fetch Week Class Tests", error);
    return null;
  }
};
