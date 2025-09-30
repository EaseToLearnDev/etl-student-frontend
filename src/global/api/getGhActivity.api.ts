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

    const params = new URLSearchParams({
        studentId: studentId.toString(),
        courseId: courseId.toString(),
    })

    if(year) {
        params.append('year', year.toString());
    }

    const res = await makeRequest('get', `/get-activity?${params.toString()}`, null, {
        headers: {
            loginId,
            token,
            device: "web",
        },
    })

    return res?.data?.obj ?? null;
}
