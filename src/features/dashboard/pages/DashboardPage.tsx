import { useEffect } from "react";
import BorderedCard from "../../../components/BorderedCard";
import ClassTestList from "../components/ClassTestList";
import FeaturedBannerCarousal from "../components/FeaturedBannerCarousal";
import { loadClassTestList } from "../../../global/services/loadClassTestList";
import { useCTStore } from "../../../global/hooks/useCTStore";
import JumpBackInList from "../components/JumpBackInList";
import DownloadAppCard from "../components/DownloadAppCard";
import SupportSection from "../components/SupportSection";

const DashboardPage = () => {
  const setTestList = useCTStore((s) => s.setTestList);

  useEffect(() => {
    const fetchData = async () => {
      const list = await loadClassTestList();
      if (list) {
        setTestList(list);
      }
    };
    fetchData();
  }, []);

  return (
  <div className="pb-5 h-full flex flex-col gap-5 flex-grow scrollbar-hide overflow-y-auto">
  {/* Top + Middle section */}
  <div className="grid grid-cols-1 2xl:grid-cols-[1fr_400px] 2xl:grid-rows-[250px_minmax(300px,1fr)] gap-5">
    {/* Featured Banner (top-left) */}
    <div className="order-1 2xl:col-start-1 2xl:row-start-1">
      <FeaturedBannerCarousal className="min-h-[250px] max-h-[250px]" />
    </div>

    {/* Jump Back In (bottom-left) */}
    <div className="order-3 2xl:col-start-1 2xl:row-start-2">
      <BorderedCard className="w-full min-h-[300px] max-h-full">
        <JumpBackInList />
      </BorderedCard>
    </div>

    {/* Class Tests (right column spanning 2 rows) */}
    <div className="order-2 2xl:col-start-2 2xl:row-span-2">
      <BorderedCard title="Class Tests" className="h-full">
        <ClassTestList />
      </BorderedCard>
    </div>
  </div>

  {/* Bottom section */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-[250px] max-h-[250px]">
    <DownloadAppCard className="border border-[var(--border-tertiary)]" />
    <SupportSection className="border border-[var(--border-tertiary)]" />
  </div>
</div>

  );
};

export default DashboardPage;
