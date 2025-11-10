import Tabs from "../../../components/Tabs";
import DesktopChildLayout from "../../../layouts/child-layout/components/DesktopChildLayout";
import {
  getFilteredMenuItems,
  getFilteredSubMenuItems,
} from "../../../utils/menuFilter";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { useNavigate } from "react-router-dom";
import { menuItems } from "../../../layouts/hydrogen/components/MenuItems";
import WidgetCard from "../../report/components/newreports/WidgetCard";
import { useEffect, useState } from "react";
import { loadClassTestList } from "../../../global/services/loadClassTestList";
import { loadPreviousRunningTest } from "../../shared/services/loadPreviousRunningTest";
import { loadWeekScheduledClasses } from "../services/loadWeekScheduledClasses";
import { useCTStore } from "../../../global/hooks/useCTStore";
import { usePrevTestStore } from "../../shared/hooks/usePrevTestStore";
import type {
  DashBoardFilterMenuList,
  WeekClassScheduleList,
} from "../dashboard.types";
import JumpBackInList from "./JumpBackInList";
import UpcomingClassesAndTests from "./UpcomingClassesAndTests";
import DownloadAppCard from "./DownloadAppCard";
import SupportSection from "./SupportSection";
import FeaturedBanner from "./FeaturedBanner";

const DesktopDashboardPage = () => {
  const navigate = useNavigate();
  const activeCourse = useStudentStore((state) => state.activeCourse);
  const setPrevRunningTest = usePrevTestStore((s) => s.setPrevRunningTest);
  const setTestList = useCTStore((s) => s.setTestList);
  const [scheduledClasses, setScheduledClasses] = useState<
    WeekClassScheduleList[] | null
  >(null);

  const menus = getFilteredMenuItems(activeCourse);
  const isClassTestFeatEnabled = activeCourse?.tabs?.classTest;

  const filterMenu: DashBoardFilterMenuList[] = [
    // Add parentId manually for submenu items
    ...menuItems.flatMap((item) =>
      getFilteredSubMenuItems(item.id, activeCourse).map((subItem) => ({
        ...subItem,
        parentId: item.id,
      }))
    ),

    // Top-level menus like Report or Other Courses
    ...menus.filter(
      (item) => item.id === "report" || item.id === "otherCourses"
    ),
  ];

  useEffect(() => {
    const fetchData = async () => {
      const classTestList = await loadClassTestList();
      const prevRunningTest = await loadPreviousRunningTest();
      let scheduledClasses = null;
      // Checks if Student have any Class then calls the week classes api
      if (isClassTestFeatEnabled) {
        scheduledClasses = await loadWeekScheduledClasses();
      }

      if (classTestList) setTestList(classTestList);
      if (prevRunningTest) setPrevRunningTest(prevRunningTest);
      if (scheduledClasses) setScheduledClasses(scheduledClasses);
    };
    fetchData();
  }, []);

  return (
    <DesktopChildLayout
      primaryContent={
        <div className="flex flex-col gap-5">
          {/* Featured Banner */}
          <div>
            <FeaturedBanner />
          </div>

          {/* Navigation Buttons */}
          <WidgetCard title="Quickly Access Links">
            <div className="mt-4">
              <Tabs
                tabs={filterMenu.map((item) => item.name)}
                selectedIndex={0}
                onSelect={(index) => {
                  const selected = filterMenu[index];
                  if (!selected?.href) return;

                  const prefix =
                    selected.parentId === "studyRoom"
                      ? "/study-room"
                      : selected.parentId === "examRoom"
                      ? "/exam-room"
                      : "";

                  navigate(`${prefix}${selected.href}`);
                }}
                activeTabClassName="bg-[var(--surface-bg-primary)] rounded-md hover:bg-[var(--surface-bg-secondary)]"
                tabClassName="rounded-md bg-[var(--surface-bg-primary)] text-[var(--text-primary)]"
              />
            </div>
          </WidgetCard>

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
      primaryClassName="bg-[var(--surface-secondary)] py-2 px-0"
      secondaryClassName="bg-[var(--surface-secondary)] py-2 px-0"
    />
  );
};

export default DesktopDashboardPage;
