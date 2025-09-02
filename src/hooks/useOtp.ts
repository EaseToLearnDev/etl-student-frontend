import { useState, useEffect, useRef } from "react";

export const useOtp = (length: number) => {
  const [otpArr, setOtpArr] = useState<string[]>(Array(length).fill(""));
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const insertOtpNum = (value: string, index: number) => {
    if (!/^\d$/.test(value)) return;

    const newArr = [...otpArr];
    newArr[index] = value;
    setOtpArr(newArr);

    if (index < length - 1) {
      const nextIndex = index + 1;
      setCurrentIndex(nextIndex);
      setTimeout(() => inputRefs.current[nextIndex]?.focus(), 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const newArr = [...otpArr];
      if (otpArr[currentIndex]) {
        newArr[currentIndex] = "";
        setOtpArr(newArr);
      } else if (currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        newArr[prevIndex] = "";
        setOtpArr(newArr);
        setCurrentIndex(prevIndex);
        setTimeout(() => inputRefs.current[prevIndex]?.focus(), 0);
      }
      return;
    }

    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      insertOtpNum(e.key, currentIndex);
      return;
    }
  };

  useEffect(() => {
    setOtpArr(Array(length).fill(""));
    setCurrentIndex(0);
    inputRefs.current = Array(length).fill(null);

    setTimeout(() => inputRefs.current[0]?.focus(), 0);
  }, [length]);

  const otpValue = otpArr.join("");

  return { otpArr, inputRefs, insertOtpNum, handleKeyDown, setCurrentIndex, otpValue };
};
