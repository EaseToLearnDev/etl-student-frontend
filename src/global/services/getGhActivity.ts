import type { ITransformedGhData } from "../../features/dashboard/utils/transformNormalizeGhData";
import { useStudentStore } from "../../features/shared/hooks/useStudentStore";
import { useLoadingStore } from "../../hooks/useLoadingStore";
import { getGhActivityAPI } from "../api/getGhActivity.api";

export const getGhActivity = async (year: number | null) => {
    const { studentData, activeCourse } = useStudentStore.getState();
    const { setLoading } = useLoadingStore.getState();

    if (!studentData || !activeCourse) return null;

    const { loginId, token } = studentData;
    const courseId = activeCourse?.courseId;
    const studentId = studentData?.studentId;

    if (!loginId || !token || !courseId || !studentId) return null;

    setLoading(true);

    try {
        const list = (await getGhActivityAPI({
            loginId,
            token,
            courseId,
            studentId,
            ...(year && {year})
        })) as ITransformedGhData[][];

        return list ?? null;
    }
    catch (error) {
        console.log("Failed to load gh activity list: ", error);
        return null;
    }
    finally {
        setLoading(false);
    }
}