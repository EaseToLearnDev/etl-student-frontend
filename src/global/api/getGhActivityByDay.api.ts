import { makeRequest } from "../../utils/http";


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

    const payload = {
        studentId,
        courseId,
        date
    }


    const res = await makeRequest('post', '/get-activity-by-day', payload, {
        headers: {
            loginId,
            token,
            device: "web",
        },
    })

    return res?.data?.obj ?? null;
}
