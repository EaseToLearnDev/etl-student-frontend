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

    const params = new URLSearchParams({
        studentId: studentId.toString(),
        courseId: courseId.toString()
    })

    const res = await makeRequest('get', `/get-activity-years?${params.toString()}`, null, {
        headers: {
            loginId,
            token,
            device: "web",
        },
    })

    return res?.data?.obj ?? null;
}
