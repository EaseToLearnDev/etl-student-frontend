interface LoaderProps {
  title?: string;
  description?: string;
  className?: string;
}

export const Spinner = ({
  title = "Loading...",
  description,
  className,
}: LoaderProps) => {
  return (
    <div className={className}>
      <div className="fixed top-0 right-0 h-screen w-screen z-50 flex flex-col justify-center items-center bg-[var(--surface-bg-primary)]/70 backdrop-blur-sm">
        
        {/* New Spinner */}
        <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
          <div className="animate-spin rounded-full border-8 border-solid border-[var(--text-primary)] border-t-transparent h-32 w-32"></div>
        </div>

        {/* Texts */}
        <div className="mt-72 text-center"> 
          {title && <h3 className="text-[var(--text-secondary)]">{title}</h3>}
          {description && <p className="text-[var(--text-tertiary)] mt-2">{description}</p>}
        </div>
      </div>
    </div>
  );
};
