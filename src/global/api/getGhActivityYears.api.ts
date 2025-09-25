import { makeRequest } from "../../utils/http";


interface GhActivityYearsTypes {
    loginId: string;
    token: string;
    studentId: number;
    courseId: number;
}

export const getGhActivityYearsAPI = async ({
    loginId,
    token,
    studentId,
    courseId,
}: GhActivityYearsTypes) => {

    const payload = {
        studentId,
        courseId,
    }

    const res = await makeRequest('post', '/get-activity-years', payload, {
        headers: {
            loginId,
            token,
            device: "web",
        },
    })

    return res?.data?.obj ?? null;
}
