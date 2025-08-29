import React from 'react'
import cn from '../../../../utils/classNames';

interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Widget({ title, subtitle, className, children, ...props }: WidgetProps) {
  return (
    <div
      className={cn(
        "bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] rounded-2xl shadow-sm transition-all duration-200",
        "w-full",
        "p-3 sm:p-4 md:p-5 lg:p-6",
        "space-y-2 sm:space-y-3",
        className
      )}
      {...props}
    >
      {(title || subtitle) && (
        <div className="mb-2 sm:mb-3 md:mb-4">
          {title && (
            <h5 className="text-base sm:text-lg md:text-xl font-bold ml-2 sm:ml-4 mb-1 sm:mb-2 text-[var(--foreground)]">
              {title}
            </h5>
          )}
          {subtitle && (
            <span className="text-xs sm:text-sm  md:text-base text-[var(--muted)] ml-2 sm:ml-4">
              {subtitle}
            </span>
          )}
        </div>
      )}
      <div className="w-full">{children}</div>
    </div>
  );
}


Widget.displayName = "Widget"