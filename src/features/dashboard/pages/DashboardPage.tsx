import { useEffect } from "react";
import ClassTestList from "../components/ClassTestList";
import FeaturedBannerCarousal from "../components/FeaturedBannerCarousal";
import { loadClassTestList } from "../../../global/services/loadClassTestList";
import { useCTStore } from "../../../global/hooks/useCTStore";
import JumpBackInList from "../components/JumpBackInList";
import DownloadAppCard from "../components/DownloadAppCard";
import SupportSection from "../components/SupportSection";
import WidgetCard from "../../report/components/newreports/WidgetCard";
import { usePrevTestStore } from "../../shared/hooks/usePrevTestStore";
import { loadPreviousRunningTest } from "../../shared/services/loadPreviousRunningTest";
import { ActivityList } from "../components/ActivityList";
import { Toast } from "../../../components/Toast";
import { useToastStore } from "../../../global/hooks/useToastStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import TutorialsModal from "../../tutorials/pages/TutorialsModal";

const DashboardPage = () => {
  const setTestList = useCTStore((s) => s.setTestList);
  const setPrevRunningTest = usePrevTestStore((s) => s.setPrevRunningTest);
  const toastData = useToastStore((s) => s.toastData);
  const showToast = useToastStore((s) => s.showToast);
  const activeCourse = useStudentStore((s) => s.activeCourse);

  const isClassTest = activeCourse?.tabs?.classTest;

  useEffect(() => {
    const fetchData = async () => {
      const classTestList = await loadClassTestList();
      const prevRunningTest = await loadPreviousRunningTest();

      if (classTestList) setTestList(classTestList);
      if (prevRunningTest) setPrevRunningTest(prevRunningTest);
    };
    fetchData();
  }, []);

  return (
    <div className="pb-5 h-full flex flex-col gap-5 flex-grow scrollbar-hide overflow-y-auto">
      {/* Top Section (split into 2 halves) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="flex flex-col gap-5 xl:col-span-2">
          <FeaturedBannerCarousal className="min-h-[250px] max-h-[250px]" />
          <WidgetCard className="w-full min-h-[300px] max-h-full">
            <ActivityList />
          </WidgetCard>
        </div>

        <div className="flex flex-col gap-5 xl:col-span-1">
          {isClassTest ? (
            <WidgetCard title="Class Tests" className="h-full min-h-[300px]">
              <ClassTestList />
            </WidgetCard>
          ) : (
            <>
              <WidgetCard className="min-h-[250px] max-h-[250px]">
                <DownloadAppCard />
              </WidgetCard>
              <WidgetCard className="h-full">
                <SupportSection />
              </WidgetCard>
            </>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[250px] max-h-[250px]">
        <WidgetCard>
          <JumpBackInList />
        </WidgetCard>
        {isClassTest && (
          <>
            <WidgetCard>
              <DownloadAppCard />
            </WidgetCard>
            <WidgetCard>
              <SupportSection />
            </WidgetCard>
          </>
        )}
      </div>

      {/* Toast */}
      {showToast && toastData && (
        <Toast
          {...toastData}
          key={toastData.title}
          duration={toastData.duration}
        />
      )}

      <TutorialsModal />
    </div>
  );
};

export default DashboardPage;
