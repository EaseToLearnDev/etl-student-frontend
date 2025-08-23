import { useStudentStore } from "../../shared/store/useStudentStore";
import { studentProfilePicsUpload } from "../api/studentProfilePicsUpload.api";

interface LoadProfilePicProps {
    file: File;
}

export const LoadProfilePic = async ({file} : LoadProfilePicProps) => {
  const { studentData } = useStudentStore.getState();

  if (!studentData) return null;

  const { loginId, token } = studentData;

  try {
    const data = new FormData();
    data.append("uploadedFiles", file)
    const res = await studentProfilePicsUpload({data, loginId, token});
    return res;
  } catch (error) {
    console.log("Failed to Upload Image : ",error)
    return null
  }
};
