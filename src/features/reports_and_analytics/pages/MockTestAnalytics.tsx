import { Theme } from "../../../utils/colors";
import Comparison from "../components/Comparison"
import PerformanceTable from "../components/PerformanceTable"
import ScoreCards from "../components/ScoreCards"
import TimeManagement from "../components/TimeManagement"

interface PerformanceStats {
  title: string;
  value: number;
}


const performanceStats: PerformanceStats[] = [
  {
    title: "Total Questions",
    value: 100,
  },
  {
    title: "Correct Answers",
    value: 70,
  },
  {
    title: "In - Correct Answers",
    value: 20,
  },
  {
    title: "Un-attempted Question",
    value: 10,
  },
];

const TonyOpinion = () => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border border-[var(--border-primary)] bg-[var(--surface-bg-primary)] shadow-md">
      <img
        src="/subject_static.png"
        alt="Tony"
        className="h-16 w-16 rounded-full"
      />
      <div>
        <h4 className="text-lg font-semibold text-[var(--text-primary)]">
          Tony opinion on your Performance...
        </h4>
        <p className="text-sm text-[var(--text-secondary)]">
          Great job on scoring above average in your mock test! Your consistent
          effort and understanding of the concepts are clearly reflected in
          your performance. Keep up the good work, and with a bit more
          practice, you're well on your way to reaching the top scores. Stay
          focused and confident!
        </p>
      </div>
    </div>
  );
};

const MockTestAnalytics = () => {

  return (
    <div className="flex flex-col gap-10 scrollbar-hide">
      <h2>Mock Test Reports</h2>
      <section className=" flex flex-col gap-10 bg-[var(--surface-bg-primary)] p-10 rounded-3xl ">
        <div>
          <div className="flex items-center justify-between mb-4">
          <h3 className="text-[var(--text-primary)]">Scorecard</h3>
          <a className="text-[var(--sb-ocean-bg-active)] hover:text-[var(--sb-ocean-bg-hover)]">View Answers</a>
          </div>
      <div className="flex gap-4 flex-wrap">
        {performanceStats?.map((stat) => (
          <ScoreCards bg={"var(--surface-bg-secondary)"} theme={Theme.Ocean} title={stat.title} value={stat.value} />
        ))}
      </div>
        </div>
      <TimeManagement />
      <PerformanceTable />
      <Comparison />
      <TonyOpinion />
      </section>
    </div>
  )
}

export default MockTestAnalytics