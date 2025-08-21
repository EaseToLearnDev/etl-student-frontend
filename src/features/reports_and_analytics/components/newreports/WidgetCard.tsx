"use client";

import React, { forwardRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const widgetCardClasses = {
  base: "border border-gray-200 p-5 lg:p-7 shadow",
  rounded: {
    sm: "rounded-sm",
    DEFAULT: "rounded-lg",
    lg: "rounded-xl",
    xl: "rounded-2xl",
  },
};

type WidgetCardProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  rounded?: keyof typeof widgetCardClasses.rounded;
  headerClassName?: string;
  titleClassName?: string;
  actionClassName?: string;
  descriptionClassName?: string;
  className?: string;
};

const WidgetCard = forwardRef<HTMLDivElement, React.PropsWithChildren<WidgetCardProps>>(
  (
    {
      title,
      description,
      action,
      rounded = "DEFAULT",
      className = "",
      headerClassName = "",
      titleClassName = "",
      actionClassName = "",
      descriptionClassName = "",
      children,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${widgetCardClasses.base} ${widgetCardClasses.rounded[rounded]} ${className}`}
      >
        {/* Header */}
        <div
          className={`${
            action ? "flex items-start justify-between" : ""
          } ${headerClassName}`}
        >
          <div>
            {title && (
              <h5 className={`${titleClassName}`}>
                {title}
              </h5>
            )}
            {description && (
              <p className={`mt-2 text-sm text-[var(--text-tertiary)] ${descriptionClassName}`}>
                {description}
              </p>
            )}
          </div>
          {action && <div className={`ps-2 ${actionClassName}`}>{action}</div>}
        </div>

        {children}
      </div>
    );
  }
);

WidgetCard.displayName = "WidgetCard";

export default WidgetCard;
