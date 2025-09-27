import { useStudentStore } from "../../features/shared/hooks/useStudentStore";
import { useLoadingStore } from "../../hooks/useLoadingStore";
import { getGhActivityYearsAPI } from "../api/getGhActivityYears.api";

export const getGhActivityYears = async (setLoadingGhActivityYears: any) => {
    const { studentData, activeCourse } = useStudentStore.getState();
    const { setLoading } = useLoadingStore.getState();

    if (!studentData || !activeCourse) return null;

    const { loginId, token } = studentData;
    const courseId = activeCourse?.courseId;
    const studentId = studentData?.studentId;

    if (!loginId || !token || !courseId || !studentId) return null;

    setLoadingGhActivityYears(true);

    try {
        const list = (await getGhActivityYearsAPI({
            loginId,
            token,
            courseId,
            studentId,
        })) as number[];

        return list ?? null;
    }
    catch (error) {
        console.log("Failed to load gh activity list: ", error);
        return null;
    }
    finally {
        setLoadingGhActivityYears(false);
    }
}