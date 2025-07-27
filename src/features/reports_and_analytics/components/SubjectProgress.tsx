import { useEffect, useState } from "react";

interface SubjectProgressProps {
  progress?: number;
}
const SubjectProgress = ({ progress }: SubjectProgressProps) => {
  const [prog, setProg] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => setProg(progress || 0), 100);
  }, []);

  if (!progress) return null;
  return (
    <div className="flex flex-col gap-5">
      <h5>Subject Report</h5>
      <div className="flex flex-col gap-2">
        <h5 className="!font-semibold">{progress || 0}%</h5>
        <div className="w-full h-3 rounded-full overflow-hidden bg-[var(--surface-bg-secondary)]">
          <div
            className="h-full bg-[var(--sb-ocean-bg-active)] rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${prog}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectProgress;
