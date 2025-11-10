import useIsMobile from "../../../hooks/useIsMobile"
import DesktopDashboardPage from "../components/DesktopDashboardPage"

const DashboardV3Page = () => {
    const isMobile = useIsMobile()
  return isMobile ? (
    <></>
  ) : (
    <DesktopDashboardPage />
  )
}

export default DashboardV3Page
