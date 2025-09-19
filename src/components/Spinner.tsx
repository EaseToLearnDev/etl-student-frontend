import cn from "../utils/classNames";

interface LoaderProps {
  title?: string;
  description?: string;
  className?: string;
  spinnerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  gap?: number;
}

export const Spinner = ({
  title = "Loading...",
  description,
  className = "",
  spinnerClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  gap = 10,
}: LoaderProps) => {
  return (
    <div className={className}>
      <div
        className="fixed top-0 right-0 h-screen w-screen z-50 flex flex-col justify-center items-center bg-[var(--surface-bg-primary)]/70 backdrop-blur-sm"
        style={{ gap }}
      >
        <div
          className={cn(
            "animate-spin rounded-full border-8 border-solid border-[var(--text-primary)] border-t-transparent h-32 w-32 aspect-square",
            spinnerClassName
          )}
        ></div>
        {/* Texts */}
        <div className="text-center">
          {title && (
            <h4 className={cn("text-[var(--text-secondary)]", titleClassName)}>
              {title}
            </h4>
          )}
          {description && (
            <p
              className={cn(
                "text-[var(--text-tertiary)] mt-2",
                descriptionClassName
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
