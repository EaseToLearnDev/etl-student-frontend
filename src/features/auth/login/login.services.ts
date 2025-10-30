// Types
import {
  Severity,
  type StudentDataResponse,
  type Option,
} from "../../shared/types";

// Store
import { useLoginStore } from "./hooks/useLoginStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";

// Apis
import { login } from "./apis/login";
import { type NavigateFunction } from "react-router-dom";
import { verifyMobileSendOtp } from "./apis/verifyMobileSendOtp";
import { verifyOtpLogin } from "./apis/verifyOtpLogin";

// services
import { saveStudentData } from "../../shared/services/saveStudentData";

export const HandleLogin = async (
  navigate: NavigateFunction,
  loginWith: string,
  deviceType: Option<string>
) => {
  const { userId, password, setError, setLoading, setToken } =
    useLoginStore.getState();
  const { setStudentData } = useStudentStore.getState();
  if (loginWith === "password") {
    try {
      // validateCredentials(email, password);

      setError("", Severity.None);
      setLoading(true);

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("password", password);
      formData.append("device", "web");

      const data: StudentDataResponse = await login(formData);

      // Save cookies and student data
      saveStudentData(data, deviceType);

      // Stop loading
      setLoading(false);

      // Navigate to dashboard
      if (data?.courses && data?.courses.length > 0) {
        navigate("/dashboard");
      } else {
        navigate("/selectyourcourse");
      }
    } catch (error: any) {
      setError("Invalid User-Id or password", Severity.Alert);
      setStudentData(null);
      console.log("Error: " + error);
    } finally {
      setLoading(false);
    }
  } else {
    setError("", Severity.None);
    setLoading(true);
    try {
      const res = await verifyMobileSendOtp(userId);
      if (res?.responseTxt === "sent_otp") {
        setToken(res?.obj?.token);
      } else if (res?.responseTxt === "mobile_not_exists") {
        setError("Invalid Number", Severity.Alert);
        setStudentData(null);
      }
    } catch (error: any) {
      setError("Something went wrong. Please try again.", Severity.Alert);
      setStudentData(null);
      console.log("Error: " + error?.message);
    } finally {
      setLoading(false);
    }
  }
};

export const handleVerifyOtp = async (
  otp: string,
  navigate: NavigateFunction,
  deviceType: Option<string>
) => {
  const { token, setError } = useLoginStore.getState();
  const { setStudentData } = useStudentStore.getState();
  if (!token) {
    setError("Invalid Number", Severity.Alert);
    return;
  }
  try {
    const data: StudentDataResponse = await verifyOtpLogin(otp, token);

    // Save cookies and student data
    saveStudentData(data, deviceType);

    // Navigate to dashboard
    if (data?.courses && data?.courses.length > 0) {
      navigate("/dashboard");
    } else {
      navigate("/selectyourcourse");
    }
    
    setError("Login Successful!", Severity.None);
  } catch (error) {
    console.log("verification :", error);
    setError("Invalid Otp Number", Severity.Alert);
    setStudentData(null);
  }
};
