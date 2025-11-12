import { updateFtueLevelAPI } from "../apis/updateFtueLevel.api";
import { useStudentStore } from "../../shared/hooks/useStudentStore";

export const setFtueLevel = async (ftueLevel?: number) => {
    try {
        const {studentData} = useStudentStore.getState();

        if (!studentData) {
            console.error("Student data not found");
            return false;
        }

        // Call API to update FTUE level
        const response = await updateFtueLevelAPI({
            loginId: studentData.loginId,
            token: studentData.token,
            studentId: studentData.studentId,
            ftue: ftueLevel
        });

    } catch (error) {
        console.error("Error updating FTUE level:", error);
        return false;
    }
};