import { useEffect, useState } from "react";
import { useCTStore } from "../../../global/hooks/useCTStore";
import useIsMobile from "../../../hooks/useIsMobile";
import { usePrevTestStore } from "../../shared/hooks/usePrevTestStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import DesktopDashboardLayout from "../components/desktop/DashboardLayout";
import MobileDashboardLayout from "../components/mobile/DashboardLayout";
import type { WeekClassScheduleList } from "../dashboard.types";
import { loadClassTestList } from "../../../global/services/loadClassTestList";
import { loadPreviousRunningTest } from "../../shared/services/loadPreviousRunningTest";
import { loadWeekScheduledClasses } from "../services/loadWeekScheduledClasses";
import FirstTimeUserModal from "../components/FirstTimeUser";

const DashboardV3Page = () => {
  const isMobile = useIsMobile();
  const activeCourse = useStudentStore((state) => state.activeCourse);
  const setPrevRunningTest = usePrevTestStore((s) => s.setPrevRunningTest);
  const setTestList = useCTStore((s) => s.setTestList);
  const [scheduledClasses, setScheduledClasses] = useState<
    WeekClassScheduleList[] | null
  >(null);

  const showFtuModal = useStudentStore((s) => s.showFtuModal);
  const setShowFtuModal = useStudentStore((s) => s.setShowFtuModal);

  const isClassTestFeatEnabled = activeCourse?.tabs?.classTest;

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
    <>
      {isMobile ? (
        <MobileDashboardLayout
          isClassTestFeatEnabled={isClassTestFeatEnabled}
          scheduledClasses={scheduledClasses}
        />
      ) : (
        <DesktopDashboardLayout
          isClassTestFeatEnabled={isClassTestFeatEnabled}
          scheduledClasses={scheduledClasses}
        />
      )}

      <FirstTimeUserModal
        isOpen={showFtuModal}
        onClose={() => setShowFtuModal(false)}
      />
    </>
  );
};

export default DashboardV3Page;
