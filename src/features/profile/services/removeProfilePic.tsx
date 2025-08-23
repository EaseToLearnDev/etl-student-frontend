import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { studentProfilePicsRemove } from "../api/studentProfilePicsRemove.api";

export const removeProfilePic = () => {
  const { studentData } = useStudentStore.getState();

  if (!studentData) return null;

  const { loginId, token } = studentData;

  const file = studentData?.profilePic.split("/");
  try {
    const data = new FormData();
    data.append("fileName", file[file.length - 1]);
    const res = studentProfilePicsRemove({ data, loginId, token });
    return res;
  } catch (error) {
    console.log("Failed to Delete Profile Picture: ", error);
    return null;
  }
};
