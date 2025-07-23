
interface MarksCardProps {
  yourScore: number;
  topperScore: number;
  averageScore: number;
}

const MarksScored = ({ yourScore, topperScore, averageScore } : MarksCardProps) => {
  const getProgressBarWidth = (score: number) => {
    return `${score}%`;
  };

  return (
    <div className="text-[var(--surface-bg-primary)] p-6 rounded-lg max-w-sm mx-auto font-sans">
      <h5 className="text-[var(--text-tertiary)] mb-4">Marks Scored</h5>
      <div className="text-5xl font-bold mb-8 text-[var(--text-primary)]">{yourScore}</div>

      <div className="">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[var(--text-primary)]">Your Score</p>
          <p className="text-[var(--sb-ocean-bg-active)] ">{yourScore}%</p>
        </div>
        <div className="w-full bg-[var(--text-tertiary)] rounded-full h-2.5">
          <div
            className="bg-[var(--sb-ocean-bg-active)] h-2.5 rounded-full"
            style={{ width: getProgressBarWidth(yourScore) }}
          ></div>
        </div>y
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[var(--text-primary)]">Topper Score</p>
          <p className="text-[var(--sb-ocean-bg-active)]">{topperScore}%</p>
        </div>
        <div className="w-full bg-[var(--text-tertiary)]  rounded-full h-2.5">
          <div
            className="bg-[var(--sb-ocean-bg-active)] h-2.5 rounded-full"
            style={{ width: getProgressBarWidth(topperScore) }}
          ></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-[var(--text-primary)] text-lg">Average Score</p>
          <p className="text-[var(--sb-ocean-bg-active)]">{averageScore}%</p>
        </div>
        <div className="w-full bg-[var(--text-tertiary)] rounded-full h-2.5">
          <div
            className="bg-[var(--sb-ocean-bg-active)] h-2.5 rounded-full"
            style={{ width: getProgressBarWidth(averageScore) }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MarksScored;