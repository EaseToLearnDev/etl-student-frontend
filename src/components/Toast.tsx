import React, { useEffect, useState, type JSX } from "react";
import {
  MdCheckCircle,
  MdInfo,
  MdWarning,
  MdClose,
  MdBuild,
} from "react-icons/md";
import cn from "../utils/classNames";
import Button from "./Button";
import { BiError } from "react-icons/bi";
import { ToastType } from "../features/shared/types";
import { useToastStore } from "../global/hooks/useToastStore";
interface ToastProps {
  type?: ToastType;
  title: string;
  description?: string;
  button?: string;
  duration?: number;
  onClick?: () => void;
  onExpire?: () => void;
  className?: string;
}

const colorMap: Record<ToastType, string> = {
  [ToastType.SUCCESS]:
    "bg-[var(--sb-green-haze-bg-disabled)] text-[var(--sb-green-haze-bg-active)] border-[var(--sb-green-haze-bg-active)]",
  [ToastType.DANGER]:
    "bg-[var(--sb-valencia-bg-disabled)] text-[var(--sb-valencia-bg-active)] border-[var(--sb-valencia-bg-active)]",
  [ToastType.PRIMARY]:
    "bg-[var(--sb-ocean-bg-disabled)] text-[var(--sb-ocean-bg-active)] border-[var(--sb-ocean-bg-active)]",
  [ToastType.WARNING]:
    "bg-[var(--sb-sunglow-bg-disabled)] text-[var(--sb-sunglow-bg-active)] border-[var(--sb-sunglow-bg-active)]",
  [ToastType.PATCH]:
    "bg-[var(--sb-pumpkin-bg-disabled)] text-[var(--sb-pumpkin-bg-active)] border-[var(--sb-pumpkin-bg-active)]",
};

const iconMap: Record<ToastType, JSX.Element> = {
  [ToastType.SUCCESS]: (
    <MdCheckCircle className="text-[var(--sb-green-haze-bg-active)] text-xl" />
  ),
  [ToastType.DANGER]: (
    <BiError className="text-[var(--sb-valencia-bg-active)] text-xl" />
  ),
  [ToastType.PRIMARY]: (
    <MdInfo className="text-[var(--sb-ocean-bg-active)] text-xl" />
  ),
  [ToastType.WARNING]: (
    <MdWarning className="text-[var(--sb-sunglow-bg-active)] text-xl" />
  ),
  [ToastType.PATCH]: (
    <MdBuild className="text-[var(--sb-pumpkin-bg-active)] text-xl" />
  ),
};

export const Toast: React.FC<ToastProps> = ({
  type = ToastType.PRIMARY,
  title,
  description,
  button,
  duration = 5000,
  onExpire,
  onClick,
  className,
}) => {
  const [visible, setVisible] = useState(true);
  const resetToast = useToastStore(s => s.resetToast)

  const handleOnClick = () => {
    setVisible(false);
    onExpire?.();
    resetToast();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onExpire?.();
      resetToast();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "z-9999 fixed top-5 right-5 w-md items-start flex gap-3 border rounded-xl shadow-lg p-4",
        colorMap[type],
        className
      )}
    >
      <div className="flex-1">
        <div className="flex items-start gap-2">
          <p>{iconMap[type]}</p>

          <div className="flex flex-col gap-1">
            <h6>{title}</h6>
            {description && <p>{description}</p>}
            {button && (
              <Button
                style="secondary"
                className={`hover:bg-opacity-80 w-fit mt-2 px-3 py-1 rounded ${colorMap[type]}`}
                onClick={onClick}
              >
                <p className="font-medium">{button}</p>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div
        onClick={handleOnClick}
        className={cn(
          "fixed top-7 right-7 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer"
        )}
      >
        <MdClose size={20} />
      </div>
    </div>
  );
};
