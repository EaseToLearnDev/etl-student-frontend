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

const MockTestAnalytics = () => {

  return (
    <div className="flex flex-col gap-10 px-10">
      <h2>Mock Test Reports</h2>
      <div className="flex gap-4 flex-wrap">
        {performanceStats?.map((stat) => (
          <ScoreCards bg={false} theme={Theme.Ocean} title={stat.title} value={stat.value} />
        ))}
      </div>
      <TimeManagement />
      <PerformanceTable />
      <Comparison />
    </div>
  )
}

export default MockTestAnalytics