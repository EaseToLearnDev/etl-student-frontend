import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import InputOTP from "../../../components/InputOTP";
import cn from "../../../utils/classNames";
import { BiEdit } from "react-icons/bi";
import { pushToDataLayer } from "../../../utils/gtm";

interface VerifyOtpContentProps {
  onVerify?: (otp: string) => void;
  onCancel?: () => void;
  onResend?: () => void;
  value?: string | number;
  type: "Email" | "Mobile" | "Both";
  error?: string | null;
  secondaryTitle?: string;
}

const verify_otp_button_id = "verify_otp_button_click";
const cancel_otp_button_id = "cancel_otp_button_click";
const otp_resend_button_id = "otp_resend_button_click";

const VerifyOtpContent = ({
  onVerify,
  onCancel,
  onResend,
  type,
  value,
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
    <div className="flex flex-col justify-start lg:justify-center items-center">
      <h2 className="!font-black text-center">Verify OTP</h2>
      <div className="flex flex-col justify-center gap-4 mt-6">
        <p className="text-center">
          We have sent OTP, Check your {type === "Both" ? "Email/Mobile" : type}
        </p>

        {type !== "Both" && (
          <div className="flex items-center rounded-lg border border-[var(--border-secondary)] focus-within:ring-2 focus-within:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out">
            {type === "Mobile" && (
              <span className="flex items-center gap-1 ml-1 px-3 py-3 bg-[var(--surface-bg-secondary)] rounded-lg text-[var(--text-secondary)] select-none">
                <img src="./india.png" alt="IN" width={18} height={18} /> +91
              </span>
            )}

            <input
              type="text"
              className={cn(
                "flex-1 px-4 py-3 bg-transparent outline-none rounded-r-lg text-base"
              )}
              required
              value={value}
            // onChange={}
            />
            <BiEdit
              onClick={() => onCancel?.()}
              width={18}
              height={18}
              className="mr-2 cursor-pointer"
            />
          </div>
        )}
        <InputOTP
          inputClassName="bg-[var(--surface-bg-tertiary)]"
          length={6}
          onChange={setOtp}
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex justify-center gap-4">
          <Button
            id={verify_otp_button_id}
            style="primary"
            onClick={() => {
              pushToDataLayer({
                event: "verify_otp_button_click",
                // clickId: verify_otp_button_id,
                // label: "Verify",
              });

              handleVerify();
            }}>
            Verify
          </Button>
          <Button
            id={cancel_otp_button_id}
            style="secondary"
            onClick={() => {
              pushToDataLayer({
                event: "cancel_otp_button_click",
                // clickId: cancel_otp_button_id,
                // label: secondaryTitle,
              });

              onCancel?.();
            }}>
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
          id={otp_resend_button_id}
            onClick={() => {
              pushToDataLayer({
                event: "otp_resend_button_click"
              })
              handleResend()}}
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
