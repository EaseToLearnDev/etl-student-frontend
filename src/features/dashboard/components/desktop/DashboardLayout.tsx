import type { WeekClassScheduleList } from "../../dashboard.types";

// Components
import DesktopChildLayout from "../../../../layouts/child-layout/components/DesktopChildLayout";
import WidgetCard from "../../../report/components/newreports/WidgetCard";
import JumpBackInList from "../JumpBackInList";
import UpcomingClassesAndTests from "../UpcomingClassesAndTests";
import DownloadAppCard from "../DownloadAppCard";
import SupportSection from "../SupportSection";
import FeaturedBanner from "../FeaturedBanner";
import QuickAccessSection from "../QuickAccessSection";
import type { Option } from "../../../shared/types";
import QuickStart from "../QuickStart";

interface DashboardLayoutProps {
  isClassTestFeatEnabled: Option<boolean>;
  scheduledClasses: WeekClassScheduleList[] | null;
}

/**
 * Desktop layout for dashboard page
 * */
const DashboardLayout = ({
  isClassTestFeatEnabled,
  scheduledClasses,
}: DashboardLayoutProps) => {
  return (
    <DesktopChildLayout
      primaryContent={
        <div className="flex flex-col gap-5">
          {/* Featured Banner */}
          <div>
            <FeaturedBanner />
          </div>

          {/* Navigation Buttons */}
          <QuickAccessSection />

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

          {/* Container Consist Jump Back In & Topic Progress */}
          <div className="flex justify-center gap-3">
            <WidgetCard title="Topic Progress" className="w-full">
              <JumpBackInList />
            </WidgetCard>
            <WidgetCard title="Jump Back In" className="w-full">
              <JumpBackInList />
            </WidgetCard>
          </div>
        </div>
      }
      secondaryContent={
        <div className="flex flex-col gap-4">
           {/* Quick Start */}
            <QuickStart />
          {/* Class Test & UpComing Classes Container */}
          {isClassTestFeatEnabled && (
            <WidgetCard title="Upcoming Classes & Tests">
              <UpcomingClassesAndTests scheduledClasses={scheduledClasses} />
            </WidgetCard>
          )}
          {/* Download App Container */}
          <WidgetCard id="dash-download-card">
            <DownloadAppCard />
          </WidgetCard>
          {/* Support Section */}
          <WidgetCard>
            <SupportSection />
          </WidgetCard>
        </div>
      }
      primaryClassName="bg-[var(--surface-secondary)] py-2 px-0 scrollbar-hide"
      secondaryClassName="bg-[var(--surface-secondary)] py-2 px-0 scrollbar-hide"
    />
  );
};

export default DashboardLayout;
