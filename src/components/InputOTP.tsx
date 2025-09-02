import { useEffect } from "react";
import { useOtp } from "../hooks/useOtp";
import cn from "../utils/classNames";

interface InputOTPProps {
  length: number;
  inputClassName?: string;
  className?: string;
  onChange?: (otp: string) => void;
}

const InputOTP = ({
  length,
  inputClassName = "",
  className = "",
  onChange,
}: InputOTPProps) => {
  const {
    otpArr,
    inputRefs,
    insertOtpNum,
    handleKeyDown,
    setCurrentIndex,
    otpValue,
  } = useOtp(length);

  useEffect(() => {
    onChange?.(otpValue);
  }, [otpValue, onChange]);

  return (
    <div className="flex gap-3 items-center justify-center">
      {otpArr.map((otp, index) => (
        <div
          key={index}
          className={cn(
            "w-10 h-10 bg-[var(--surface-bg-secondary)] rounded-md",
            className
          )}
        >
          <input
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className={cn(
              "w-full h-full rounded-md p-2 text-center bg-transparent",
              "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out",
              inputClassName
            )}
            value={otp}
            onChange={(e) => insertOtpNum(e.target.value, index)}
            onKeyDown={handleKeyDown}
            onFocus={(e) => {
              setCurrentIndex(index);
              if (otp)
                setTimeout(() => (e.target as HTMLInputElement).select(), 0);
            }}
            aria-label={`Digit ${index + 1} of ${length} OTP`}
          />
        </div>
      ))}
    </div>
  );
};

export default InputOTP;
