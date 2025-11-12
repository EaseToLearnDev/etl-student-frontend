// Types
import type { Option } from "../../../shared/types";
import type { WeekClassScheduleList } from "../../dashboard.types";

// Components
import WidgetCard from "../../../report/components/newreports/WidgetCard";
import DownloadAppCard from "../DownloadAppCard";
import FeaturedBanner from "../FeaturedBanner";
import JumpBackInList from "../JumpBackInList";
import QuickAccessSection from "../QuickAccessSection";
import SupportSection from "../SupportSection";
import UpcomingClassesAndTests from "../UpcomingClassesAndTests";
import QuickStart from "../QuickStart";

interface DashboardLayoutProps {
  isClassTestFeatEnabled: Option<boolean>;
  scheduledClasses: WeekClassScheduleList[] | null;
}

/**
 * Mobile layout for dashboard page
 * */
const DashboardLayout = ({
  isClassTestFeatEnabled,
  scheduledClasses,
}: DashboardLayoutProps) => {
  return (
    <div className="flex flex-col gap-5">
      <FeaturedBanner />
      {/* Quick Start */}
            <QuickStart />
      <QuickAccessSection />
      {isClassTestFeatEnabled && (
        <UpcomingClassesAndTests scheduledClasses={scheduledClasses} />
      )}
      {/* Activity Chart Data */}
      <WidgetCard title="Activity Chart">
        {/* <ActivityList
            yearsOptions={yearsOptions}
            apiData={apiData}
            year={year}
            setYear={setYear}
            loadingGhActivity={loadingGhActivity}
            loadingGhActivityYears={loadingGhActivityYears}
            color={color}
            setColor={setColor}
            handleClickOnDay={handleClickOnDay}
          /> */}
      </WidgetCard>

      {/* Activity Data */}
      <WidgetCard title="Tests activity">
        {/* <ActivityListData dataByDay={dataByDay} /> */}
      </WidgetCard>
      <WidgetCard title="Topic Progress" className="w-full">
        <JumpBackInList />
      </WidgetCard>
      <WidgetCard title="Jump Back In" className="w-full">
        <JumpBackInList />
      </WidgetCard>
      {/* Download App Container */}
      <WidgetCard id="dash-download-card">
        <DownloadAppCard />
      </WidgetCard>
      {/* Support Section */}
      <WidgetCard>
        <SupportSection />
      </WidgetCard>
    </div>
  );
};

export default DashboardLayout;
