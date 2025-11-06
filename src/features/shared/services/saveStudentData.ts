// Types
import type { Option, StudentData, StudentDataResponse } from "../types";

// Hooks
import { useStudentStore } from "../hooks/useStudentStore";

// Services
import { generateCoursesData } from "./generateCoursesData";
import { saveCookies } from "./saveCookies";

export const saveStudentData = (
  data: Option<StudentDataResponse>,
  deviceType: Option<string> = "android"
) => {
  const { setStudentData, setShowFtuModal } = useStudentStore.getState();

  //   Early return if no data found
  if (!data) {
    setStudentData(null);
    return;
  }

  //   Save Cookies
  saveCookies(data);

  //   Generate course data and tabs
  const courses = generateCoursesData(data?.courses);
  const studentData: StudentData = {
    ...data,
    studentName: data?.studentName ?? "",
    emailId: data?.emailId ?? "",
    phoneNo: data?.phoneNo ?? "",
    profilePic: data?.profilePic ?? "",
    schools: data?.schools ?? [],
    courses: courses,
  };

  //   Store correct device type
  if (deviceType && deviceType.length > 0) {
    studentData.deviceType = deviceType;
  } else {
    studentData.deviceType = "web";
  }

  //   Persist student data in local storage
  setStudentData(studentData);
  setShowFtuModal(data?.firstTimeUser === 1);
};
