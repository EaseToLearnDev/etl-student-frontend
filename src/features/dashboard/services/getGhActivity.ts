import type { ITransformedGhData } from "../utils/transformNormalizeGhData";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { getGhActivityAPI } from "../apis/getGhActivity.api";

export const getGhActivity = async (year: number | null, setLoadingGhActivity: any) => {
    const { studentData, activeCourse } = useStudentStore.getState();
    const { setLoading } = useLoadingStore.getState();

    if (!studentData || !activeCourse) return null;

    const { loginId, token } = studentData;
    const courseId = activeCourse?.courseId;
    const studentId = studentData?.studentId;

    if (!loginId || !token || !courseId || !studentId) return null;

    setLoadingGhActivity(true);

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
        setLoadingGhActivity(false);
    }
}