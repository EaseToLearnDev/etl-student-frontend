import { makeRequest } from "../../../utils/http";

interface UpdateFtueLevelTypes {
    loginId: string;
    token: string;
    studentId: number;
    ftue?: number;
}

export const updateFtueLevelAPI = async ({
    loginId,
    token,
    studentId,
    ftue
}: UpdateFtueLevelTypes) => {
    const res = await makeRequest(
        'put',
        '/student-profile/update-ftue',
        {
            studentId,
            ftue
        },
        {
            headers: {
                loginId,
                token,
                device: "web",
            },
        }
    );

    return res?.data ?? null;
};