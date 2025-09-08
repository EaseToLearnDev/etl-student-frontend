import type { ReactNode } from "react";

const NoCopyWrapper = ({ children }: { children: ReactNode }) => {
  const handleEvent = (e: any) => {
    e.preventDefault();
  };
  return (
    <div onCopy={handleEvent} onCut={handleEvent} onContextMenu={handleEvent}>
      {children}
    </div>
  );
};

export default NoCopyWrapper;
