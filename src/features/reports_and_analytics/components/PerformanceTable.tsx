interface PerformanceData {
  subject: string;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  score: number;
  performance: string;
}

const performanceData: PerformanceData[] = [
  {
    subject: 'Physics',
    totalQuestions: 30,
    correct: 18,
    incorrect: 6,
    unattempted: 6,
    score: 45,
    performance: 'Performance',
  },
  {
    subject: 'Chemistry',
    totalQuestions: 30,
    correct: 18,
    incorrect: 6,
    unattempted: 6,
    score: 45,
    performance: 'Performance',
  },
  {
    subject: 'Biology',
    totalQuestions: 30,
    correct: 18,
    incorrect: 6,
    unattempted: 6,
    score: 45,
    performance: 'Performance',
  },
];

const PerformanceTable = () => {
  return (
    <div className="font-sans border-1 rounded-2xl border-[var(--border-primary)] p-6 my-10">
      <h4 className="font-semibold text-[var(--text-primary)] mb-5">In Detail Performance</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-[var(--surface-bg-secondary)] rounded-3xl">
              {['Subject', 'Total Questions', 'Correct', 'Incorrect', 'Unattempted', 'Score', 'Performance', 'Drill Down'].map((header) => (
                <th
                  key={header}
                  className="p-4 text-sm font-medium text-[var(--text-tertiary)]tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {performanceData.map((item, index) => (
              <tr key={index} className="border-b-1 border-[var(--border-primary)] last:border-b-0 hover:bg-[var(--surface-bg-secondary)] ">
                <td className="p-4 text-sm text-[var(--text-primary)] font-semibold">{item.subject}</td>
                <td className="p-4 text-sm text-[var(--text-primary)">{item.totalQuestions}</td>
                <td className="p-4 text-sm text-[var(--text-primary)">{item.correct}</td>
                <td className="p-4 text-sm text-[var(--text-primary)">{item.incorrect}</td>
                <td className="p-4 text-sm text-[var(--text-primary)">{item.unattempted}</td>
                <td className="p-4 text-sm text-[var(--text-primary)">{item.score}</td>
                <td className="p-4 text-sm text-[var(--text-primary)">{item.performance}</td>
                <td className="p-4 text-sm">
                  <a href="#" className="text-[var(--sb-ocean-bg-active)] font-semibold hover:underline">
                    View Detail 
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceTable;