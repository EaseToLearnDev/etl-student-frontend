import { useStudentStore } from "../../features/shared/hooks/useStudentStore";
import { getGhActivityByDayAPI } from "../api/getGhActivityByDay.api";

export const getGhActivityByDay = async (date: string | null, setLoadingGhActivityByDay: any) => {
    const { studentData, activeCourse } = useStudentStore.getState();

    if (!studentData || !activeCourse) return null;

    if(!date) return null;

    const { loginId, token } = studentData;
    const courseId = activeCourse?.courseId;
    const studentId = studentData?.studentId;

    if (!loginId || !token || !courseId || !studentId) return null;

    setLoadingGhActivityByDay(true);

    try {
        const data = (await getGhActivityByDayAPI({
            loginId,
            token,
            courseId,
            studentId,
            date
        })) as any;

        return data ?? null;
    }
    catch (error) {
        console.log("Failed to load gh activity list: ", error);
        return null;
    }
    finally {
        setLoadingGhActivityByDay(false);
    }
}