// React
import { useEffect, useState, useRef } from "react";

// Utils
import cn from "../../../../utils/classNames";

interface InputOTP {
  length: number;
  inputClassName?: string;
  className?: string;
}

/**
 * OTP input component for entering a fixed-length numeric code.
 * Handles focus, input validation, and navigation between fields.
 */
const InputOTP = ({
  length,
  inputClassName = "",
  className = "",
}: InputOTP) => {
  const [otpArr, setOtpArr] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const insertOtpNum = (value: string) => {
    // Only allow single digit numbers
    if (!/^\d$/.test(value)) return;

    const num = parseInt(value);
    const newArr = [...otpArr];
    newArr[currentIndex] = num;
    setOtpArr(newArr);

    // Move to next input if not at the end
    if (currentIndex < length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      // Focus next input
      setTimeout(() => {
        inputRefs.current[nextIndex]?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the current input is focused
    const activeElement = document.activeElement as HTMLInputElement;
    const currentInputRef = inputRefs.current[currentIndex];

    if (activeElement !== currentInputRef) {
      return; // Don't do anything if current field is not focused
    }

    // Handle tab key on last input field
    if (
      e.key === "Tab" &&
      currentIndex === length - 1 &&
      otpArr[currentIndex] !== -1
    ) {
      // Let the default tab behavior happen (focus next form element)
      // But blur the current input to ensure it's unfocused
      setTimeout(() => {
        currentInputRef?.blur();
      }, 0);
      return;
    }

    // Allow backspace to clear current field and go to previous
    if (e.key === "Backspace") {
      const newArr = [...otpArr];
      if (otpArr[currentIndex] >= 0) {
        // Clear current field
        newArr[currentIndex] = -1;
        setOtpArr(newArr);
      } else if (currentIndex > 0) {
        // Go to previous field and clear it
        const prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);
        newArr[prevIndex] = -1;
        setOtpArr(newArr);
        // Focus previous input
        setTimeout(() => {
          inputRefs.current[prevIndex]?.focus();
        }, 0);
      }
      return;
    }

    // Only allow digits
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const empty = Array.from({ length }, () => -1);
    setOtpArr(empty);
    setCurrentIndex(0);

    // Initialize refs array
    inputRefs.current = Array(length).fill(null);

    // Focus first input after initialization
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 0);
  }, [length]);
  return (
    <div className="flex gap-3 items-center justify-center">
      {otpArr?.map((otp, index) => (
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
            disabled={index !== currentIndex}
            className={cn(
              "w-full h-full rounded-md p-2 text-center bg-transparent",
              "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out",
              inputClassName
            )}
            value={otp >= 0 ? otp : ""}
            onChange={(e) => insertOtpNum(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            onInput={(e) => {
              // Prevent non-digit characters from being displayed
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/\D/g, "");
            }}
            onFocus={() => setCurrentIndex(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default InputOTP;
