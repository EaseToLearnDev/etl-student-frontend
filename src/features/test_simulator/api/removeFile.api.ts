import { makeRequest } from "../../../utils/http";

interface data {
    loginId: string;
    token: string;
    data: FormData
}

export const removeFile = async ({
    loginId,
    token,
    data
}: data) => {
    const res = await makeRequest("post", "/student-subjective-tempfile-remove", data, {
        headers: {
            'Content-Type': 'multipart/mixed',
            loginId: loginId,
            token: token,
            device: "web",
        },
    })

    return res?.data ?? null;
}
