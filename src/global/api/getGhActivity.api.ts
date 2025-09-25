import { makeRequest } from "../../utils/http";


interface GhActivityTypes {
    loginId: string;
    token: string;
    studentId: number;
    courseId: number;
    year?: number;
}

export const getGhActivityAPI = async ({
    loginId,
    token,
    studentId,
    courseId,
    year
}: GhActivityTypes) => {

    const payload = {
        studentId,
        courseId,
        ...(year && { year })
    }


    const res = await makeRequest('post', '/get-activity', payload, {
        headers: {
            loginId,
            token,
            device: "web",
        },
    })

    return res?.data?.obj ?? null;
}
