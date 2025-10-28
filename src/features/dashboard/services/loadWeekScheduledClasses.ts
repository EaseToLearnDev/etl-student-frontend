import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { getWeekClasses } from "../apis/getWeekClassses.api";

export const loadWeekScheduledClasses = async () => {
  const { studentData } = useStudentStore.getState();
  const {setLoading} = useLoadingStore.getState()

  if (!studentData) return null;

  const { loginId, token, schools } = studentData;

  if (!schools) return null;

  const classId = schools[0].classId;

  if (!classId) return null;

  setLoading(true)
  try {
    const res = await getWeekClasses({ loginId, token, classId });
    if(res.message === "Classes not found"){
      return null
    }
    return res.obj;
  } catch (error) {
    console.error("Failed to fetch Week Class Tests", error);
    return null;
  } finally {
    setLoading(false)
  }
};
