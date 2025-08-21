import DesktopChildLayout from "../../../layouts/child-layout/components/DesktopChildLayout"
import BarChart from "../components/newreports/BarChart"

const Overview = () => {
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

export default Overview
