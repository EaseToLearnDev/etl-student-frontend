import React, { type JSX } from "react";
import {
  MdCheckCircle,
  MdError,
  MdInfo,
  MdWarning,
  MdClose,
} from "react-icons/md";

export enum ToastType {
  SUCCESS = "success",
  DANGER = "danger",
  PRIMARY = "primary",
  WARNING = "warning",
  PATCH = "patch",
}

interface ToastProps {
  type: ToastType;
  title: string;
  description?: string;
  button?: string;
  onClose?: () => void;
}

const colorMap: Record<ToastType, string> = {
  [ToastType.SUCCESS]: "bg-[var(--sb-green-haze-bg-disabled)] text-[var(--sb-green-haze-bg-active)] border-[var(--sb-green-haze-bg-active)]",
  [ToastType.DANGER]: "bg-[var(--sb-valencia-bg-disabled)] text-[var(--sb-valencia-bg-active)] border-[var(--sb-valencia-bg-active)]",
  [ToastType.PRIMARY]: "bg-[var(--sb-ocean-bg-disabled)] text-[var(--sb-ocean-bg-active)] border-[var(--sb-ocean-bg-active)]",
  [ToastType.WARNING]: "bg-[var(--sb-sunglow-bg-disabled)] text-[var(--sb-sunglow-bg-active)] border-[var(--sb-sunglow-bg-active)]",
  [ToastType.PATCH]: "bg-[var(--sb-neutral-bg-disabled)] text-[var(--sb-neutral-bg-active)] border-[var(--sb-neutral-bg-active)]",
};

const iconMap: Record<ToastType, JSX.Element> = {
  [ToastType.SUCCESS]: <MdCheckCircle className="text-[var(--sb-green-haze-bg-active)]" />,
  [ToastType.DANGER]: <MdError className="text-[var(--sb-valencia-bg-active)]" />,
  [ToastType.PRIMARY]: <MdInfo className="text-[var(--sb-ocean-bg-active)] text-xl" />,
  [ToastType.WARNING]: <MdWarning className="text-[var(--sb-sunglow-bg-active)] text-xl" />,
  [ToastType.PATCH]: <MdInfo className="text-[var(--sb-neutral-bg-active)] text-xl" />,
};

export const Toast: React.FC<ToastProps> = ({
  type,
  title,
  description,
  button,
  onClose,
}) => {
  return (
    <div
      className={`flex items-start gap-3 border rounded-xl shadow-lg p-4 w-80 ${colorMap[type]}`}
    >
      {iconMap[type]}
      <div className="flex-1">
        <h4 className="font-semibold">{title}</h4>
        {description && <p className="text-sm opacity-80">{description}</p>}
        {button && (
          <button className="mt-2 px-3 py-1 rounded bg-gray-800 text-white text-sm">
            {button}
          </button>
        )}
      </div>
      <button onClick={onClose}>
        <MdClose />
      </button>
    </div>
  );
};
