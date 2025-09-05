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

const DashboardPage = () => {
  const setTestList = useCTStore((s) => s.setTestList);
  const setPrevRunningTest = usePrevTestStore((s) => s.setPrevRunningTest);
  const toastData = useToastStore((s) => s.toastData)
  const showToast = useToastStore((s) => s.showToast)

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
      {/* Top + Middle section */}
      <div className="grid grid-cols-1 gap-5">

        {/* Featured Banner (top-left) */}
        <div className="order-1 xl:col-start-1 xl:row-start-1">
          <FeaturedBannerCarousal className="min-h-[250px] max-h-[250px]" />
        </div>

        {/* Jump Back In (bottom-left) */}
        <div className="order-3 xl:col-start-1 xl:row-start-2">
          <WidgetCard className="w-full min-h-[300px] max-h-full">
            <ActivityList />
          </WidgetCard>
        </div>

        {/* Class Tests (right column spanning 2 rows) */}
        <div className="order-2 xl:col-start-2 xl:row-span-2">
          <WidgetCard title="Class Tests" className="h-full min-h-[300px]">
            <ClassTestList />
          </WidgetCard>
        </div>
      </div>
        <div className="xl:col-start-1 xl:row-start-2">
          <WidgetCard className="w-full min-h-[300px] max-h-full overflow-hidden">
            <JumpBackInList />
          </WidgetCard>
        </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-[250px] max-h-[250px]">
        <WidgetCard>
          <DownloadAppCard />
        </WidgetCard>
        <WidgetCard>
          <SupportSection />
        </WidgetCard>
      </div>

      {showToast && toastData && (
        <Toast
          {...toastData}
          key={toastData.title}
          duration={toastData.duration}
        />
      )}
    </div>
  );
};

export default DashboardPage;
