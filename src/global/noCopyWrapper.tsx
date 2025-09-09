import type { ReactNode } from "react";

const NoCopyWrapper = ({ children, className = ""}: { children: ReactNode, className?: string }) => {
  const handleEvent = (e: any) => {
    e.preventDefault();
  };
  return (
    <div onCopy={handleEvent} onCut={handleEvent} onContextMenu={handleEvent} className={className}>
      {children}
    </div>
  );
};

export default NoCopyWrapper;
