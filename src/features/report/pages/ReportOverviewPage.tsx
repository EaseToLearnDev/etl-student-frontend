import DesktopChildLayout from "../../../layouts/child-layout/components/DesktopChildLayout"
import { useStudentStore } from "../../shared/hooks/useStudentStore"
import BarChart from "../components/newreports/BarChart"

const ReportOverviewPage = () => {
  console.log(useStudentStore((s) => s.studentData));
  return (
    <div className=''>
      <h3 className='pb-5'>Overview</h3>
      <div>
        <DesktopChildLayout 
        primaryContent = {<BarChart/>}
        isSecondaryHidden = {true}
        />
      </div>
    </div>
  )
}

export default ReportOverviewPage
