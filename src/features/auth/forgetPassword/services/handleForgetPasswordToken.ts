import {
  ToastType,
  type InputField,
  type ToastData,
} from "../../../shared/types";
import createForgetPasswordToken from "../apis/createForgetPasswordToken.api";
import type { TokenType } from "../forgetPassword.types";

interface HandleForgetPasswordTokenParams {
  userId: InputField;
  setUserId: (userId: InputField) => void;
  setToken: (token: TokenType | null) => void;
  setToast: (data: ToastData) => void;
  setLoading: (v: boolean) => void;
  callback?: () => void;
}

export const handleForgetPasswordToken = async ({
  userId,
  setUserId,
  setToken,
  setToast,
  setLoading,
  callback,
}: HandleForgetPasswordTokenParams) => {
  try {
    setLoading(true);

    if (!userId.data?.trim()) {
      setUserId({
        ...userId,
        error: "Please Enter valid User Email or Password",
      });
      setLoading(false);
      return;
    }

    const data = await createForgetPasswordToken({ userId: userId.data });

    if (data && data.responseTxt === "success") {
      setToken(data.obj);
      setLoading(false);
      callback?.();
    } else if (data && data.responseTxt === "InvalidUserId") {
      throw new Error(
        "Sorry, We could not find your detail in our record. Enter correct detail."
      );
    } else {
      throw new Error("Error somewhere, Try after sometime.");
    }
  } catch (error: any) {
    setToast({
      title: "Failure",
      description: error?.message ?? "Unknown Error, Try after sometime.",
      type: ToastType.DANGER,
    });
    setToken(null);
    setLoading(false);
  }
};
