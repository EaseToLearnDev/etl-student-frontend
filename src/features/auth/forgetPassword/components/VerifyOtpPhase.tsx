import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import { useToastStore } from "../../../../global/hooks/useToastStore";
import { useForgetPassStore } from "../hooks/useForgetPassStore";
import { handleVerify } from "../services/handleVerify";

const VerifyOtpPhase = () => {
  const otp = useForgetPassStore((state) => state.otp);
  const setOtp = useForgetPassStore((state) => state.setOtp);
  const token = useForgetPassStore((state) => state.token);
  const password = useForgetPassStore((state) => state.password);
  const setPassword = useForgetPassStore((state) => state.setPassword);
  const confirmPassword = useForgetPassStore((state) => state.confirmPassword);
  const setConfirmPassword = useForgetPassStore(
    (state) => state.setConfirmPassword
  );
  const loading = useForgetPassStore((state) => state.loading);
  const setLoading = useForgetPassStore((state) => state.setLoading);
  const currentPhaseIndex = useForgetPassStore((state) => state.currentPhase);
  const setCurrentPhaseIndex = useForgetPassStore(
    (state) => state.setCurrentPhase
  );
  const setToast = useToastStore((s) => s.setToast);

  return (
    <>
      {/* Title */}
      <h2 className="!font-black text-center">Change Password</h2>
      <div className="mt-4 flex flex-col gap-4">
        <h6 className="text-[var(--text-secondary)] text-center">{`We have sent you OTP. Kindly Check your mobile ${
          token?.mobile || ""
        } or email ID ${token?.emailId || ""}`}</h6>

        <InputField
          label="Enter OTP"
          value={otp.data}
          onChange={(e) => setOtp({ ...otp, data: e.target.value })}
          placeholder="Enter 6 Digit OTP"
          type="text"
          maxLength={6}
          pattern="\d{6}"
          required
        />
        <InputField
          label="New Password"
          value={password.data}
          onChange={(e) => setPassword({ ...password, data: e.target.value })}
          placeholder="Enter New Password"
          type="password"
          required
          info={{ msg: password.error, type: "error" }}
        />
        <InputField
          label="Confirm Password"
          value={confirmPassword.data}
          onChange={(e) =>
            setConfirmPassword({ ...confirmPassword, data: e.target.value })
          }
          placeholder="Confirm Password"
          type="password"
          required
          info={{ msg: confirmPassword.error, type: "error" }}
        />
        <Button
          style="primary"
          type="submit"
          className="mt-4 w-full"
          disabled={
            loading ||
            otp.data.length !== 6 ||
            password.data.length === 0 ||
            confirmPassword.data.length === 0
          }
          onClick={
            loading
              ? undefined
              : () =>
                  handleVerify({
                    password,
                    confirmPassword,
                    token: token?.token ?? "",
                    tokenIdentify: token?.tokenIdentify ?? "",
                    otp,
                    setLoading,
                    setToast,
                    setPassword,
                    setConfirmPassword,
                    setOtp,
                    onSuccess: () =>
                      setCurrentPhaseIndex(currentPhaseIndex + 1),
                  })
          }
        >
          <h6 className="!font-semibold">
            {loading ? "Loading..." : "Submit"}
          </h6>
        </Button>
      </div>
    </>
  );
};

export default VerifyOtpPhase;
