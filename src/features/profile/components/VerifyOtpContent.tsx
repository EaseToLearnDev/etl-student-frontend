import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import InputOTP from "../../../components/InputOTP";

interface VerifyOtpContentProps {
  onVerify?: (otp: string) => void;
  onCancel?: () => void;
  onResend?: () => void;
  error?: string | null;
  secondaryTitle?: string;
}

const VerifyOtpContent = ({
  onVerify,
  onCancel,
  onResend,
  error,
  secondaryTitle = "Cancel",
}: VerifyOtpContentProps) => {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = () => {
    setCountdown(30);
    onResend?.();
  };

  const handleVerify = () => {
    if (!otp || otp.length < 6) return;
    if (onVerify) onVerify(otp);
  };

  return (
    <div className="h-[500px] flex flex-col justify-start lg:justify-center items-center">
      <h2 className="!font-black text-center">Verify OTP</h2>
      <div className="flex flex-col justify-center gap-4 mt-6">
        <p className="text-center">
          We have sent OTP, Check your Email / Mobile
        </p>
        <InputOTP
          inputClassName="bg-[var(--surface-bg-tertiary)]"
          length={6}
          onChange={setOtp}
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex justify-center gap-4">
          <Button style="primary" onClick={handleVerify}>
            Verify
          </Button>
          <Button style="secondary" onClick={onCancel}>
            {secondaryTitle}
          </Button>
        </div>
      </div>
      <div className="text-center mt-4">
        {countdown > 0 ? (
          <p className="text-[var(--text-tertiary)]">
            You can resend OTP in {countdown} seconds
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="text-[var(--sb-ocean-bg-active)] hover:underline"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyOtpContent;
