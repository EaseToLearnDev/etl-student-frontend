import { useState } from "react";
import Button from "../../../components/Button";
import InputOTP from "../../auth/signup/components/InputOTP";

interface VerifyOtpContentProps {
  onVerify?: (otp: string) => void;
  onCancel?: () => void;
  error?: string | null;
}

const VerifyOtpContent = ({ onVerify, onCancel, error }: VerifyOtpContentProps) => {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (!otp || otp.length < 6) return;
    if (onVerify) onVerify(otp);
  };

  return (
    <div>
      <h5 className="text-center mb-3">Verify OTP</h5>
      <div className="flex flex-col justify-center gap-4">
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
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpContent;
