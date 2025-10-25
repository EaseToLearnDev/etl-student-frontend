import { makeRequest } from "../../../utils/http";


interface GhActivityByDayTypes {
    loginId: string;
    token: string;
    studentId: number;
    courseId: number;
    date: string;
}

export const getGhActivityByDayAPI = async ({
    loginId,
    token,
    studentId,
    courseId,
    date
}: GhActivityByDayTypes) => {

    const params = new URLSearchParams({
        studentId: studentId.toString(),
        courseId: courseId.toString(),
        date
    })

    const res = await makeRequest('get', `/get-activity-by-day?${params.toString()}`, null, {
        headers: {
            loginId,
            token,
            device: "web",
        },
    })

    return res?.data?.obj ?? null;
}
