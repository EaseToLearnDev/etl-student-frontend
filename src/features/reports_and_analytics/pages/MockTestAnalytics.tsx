import Comparison from "../components/Comparison"
import PerformanceTable from "../components/PerformanceTable"
import TimeManagement from "../components/TimeManagement"

const MockTestAnalytics = () => {
  return (
    <div>
      <h2>Mock Test Reports</h2>
      <TimeManagement />
      <PerformanceTable />
      <Comparison/>
    </div>
  )
}

export default MockTestAnalytics