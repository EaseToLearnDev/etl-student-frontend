import { ToastType, type ToastData } from "../../../shared/types";
import { verifyForgetPasswordToken } from "../apis/verifyForgetPasswordToken.api";

export interface InputField {
  id: string;
  data: string;
  error: string;
}

interface HandleVerifyParams {
  password: InputField;
  confirmPassword: InputField;
  otp: InputField;
  token: string;
  tokenIdentify: string;
  setToast: (data: ToastData) => void;
  setLoading: (v: boolean) => void;
  setPassword: (f: InputField) => void;
  setConfirmPassword: (f: InputField) => void;
  setOtp: (f: InputField) => void;
  onSuccess?: () => void;
}

export const handleVerify = async ({
  password,
  confirmPassword,
  otp,
  token,
  tokenIdentify,
  setToast,
  setLoading,
  setPassword,
  setConfirmPassword,
  setOtp,
  onSuccess,
}: HandleVerifyParams) => {
  try {
    setLoading(true);

    // validate & update errors
    const {
      password: p,
      confirmPassword: cp,
      otp: o,
      hasError,
    } = verifyFields(password, confirmPassword, otp);

    if (hasError) {
      // assign updated fields back so UI re-renders with errors
      setPassword(p);
      setConfirmPassword(cp);
      setOtp(o);

      setLoading(false);
      return;
    }

    const data = await verifyForgetPasswordToken({
      password: p.data,
      token,
      tokenIdentify,
      otp: o.data,
    });

    if (data?.responseTxt === "success") {
      setToast({
        title: "Success",
        description: "Successfully updated password!",
        type: ToastType.SUCCESS,
      });
      setLoading(false);
      onSuccess?.();
    } else if (data?.responseTxt === "InvalidToken") {
      throw new Error("Your reset password session has expired. Try again.");
    } else if (data?.responseTxt === "InvalidOTP") {
      throw new Error("Invalid OTP");
    } else {
      throw new Error("Error somewhere, Try again later.");
    }
  } catch (error: any) {
    if (error?.message !== "Invalid OTP") {
      setToast({
        title: "Failure",
        description: error.message ?? "Unknown Error, Try again later.",
        type: ToastType.DANGER,
      });
    }
    setLoading(false);
  }
};

/**
 * Returns updated fields with errors populated
 */
const verifyFields = (
  password: InputField,
  confirmPassword: InputField,
  otp: InputField
): {
  password: InputField;
  confirmPassword: InputField;
  otp: InputField;
  hasError: boolean;
} => {
  let hasError = false;

  const updatedPassword = { ...password, error: "" };
  const updatedConfirm = { ...confirmPassword, error: "" };
  const updatedOtp = { ...otp, error: "" };

  if (!updatedOtp.data.trim()) {
    updatedOtp.error = "Please enter OTP";
    hasError = true;
  }

  if (!updatedPassword.data.trim()) {
    updatedPassword.error = "Please enter new password.";
    hasError = true;
  }

  if (!updatedConfirm.data.trim()) {
    updatedConfirm.error = "Please confirm your password.";
    hasError = true;
  } else if (
    updatedPassword.data.trim() &&
    updatedPassword.data !== updatedConfirm.data
  ) {
    updatedConfirm.error =
      "Your confirm password does not match with new password";
    hasError = true;
  }

  return {
    password: updatedPassword,
    confirmPassword: updatedConfirm,
    otp: updatedOtp,
    hasError,
  };
};
