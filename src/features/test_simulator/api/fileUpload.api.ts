import { makeRequest } from "../../../utils/http";

interface UploadData {
    loginId: string;
    token: string;
    data: FormData
}

export const uploadFile = async ({
    loginId,
    token,
    data
}: UploadData) => {
    const res = await makeRequest("post", "/student-subjective-tempfile-upload", data, {
        headers: {
            'Content-Type': 'multipart/mixed',
            loginId: loginId,
            token: token,
            device: "web",
        },
    })

    return res?.data ?? null;
}
