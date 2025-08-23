import { useState, useEffect, useRef } from "react";

export const useOtp = (length: number) => {
  const [otpArr, setOtpArr] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const insertOtpNum = (value: string) => {
    if (!/^\d$/.test(value)) return;

    const num = parseInt(value);
    const newArr = [...otpArr];
    newArr[currentIndex] = num;
    setOtpArr(newArr);

    if (currentIndex < length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setTimeout(() => {
        inputRefs.current[nextIndex]?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const activeElement = document.activeElement as HTMLInputElement;
    const currentInputRef = inputRefs.current[currentIndex];
    if (activeElement !== currentInputRef) return;

    if (
      e.key === "Tab" &&
      currentIndex === length - 1 &&
      otpArr[currentIndex] !== -1
    ) {
      setTimeout(() => {
        currentInputRef?.blur();
      }, 0);
      return;
    }

    if (e.key === "Backspace") {
      const newArr = [...otpArr];
      if (otpArr[currentIndex] >= 0) {
        newArr[currentIndex] = -1;
        setOtpArr(newArr);
      } else if (currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);
        newArr[prevIndex] = -1;
        setOtpArr(newArr);
        setTimeout(() => {
          inputRefs.current[prevIndex]?.focus();
        }, 0);
      }
      return;
    }

    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const empty = Array.from({ length }, () => -1);
    setOtpArr(empty);
    setCurrentIndex(0);
    inputRefs.current = Array(length).fill(null);

    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 0);
  }, [length]);

  const otpValue = otpArr.filter((d) => d >= 0).join("");

  return {
    otpArr,
    currentIndex,
    inputRefs,
    insertOtpNum,
    handleKeyDown,
    setCurrentIndex,
    otpValue,
  };
};
