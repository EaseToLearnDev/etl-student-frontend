import { useEffect, useState } from "react";
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
import { getGhActivity } from "../../../global/services/getGhActivity";
import type { ITransformedGhData } from "../utils/transformNormalizeGhData";
import { getGhActivityYears } from "../../../global/services/getGhActivityYears";
import { getGhActivityByDay } from "../../../global/services/getGhActivityByDay";


export const colorMap = {
  green: {
    light: [
      "bg-gray-200",
      "bg-green-300",
      "bg-green-400",
      "bg-green-500",
      "bg-green-600",
      "bg-green-800",
    ],
    dark: [
      "bg-green-100/30",
      "bg-green-700",
      "bg-green-600",
      "bg-green-500",
      "bg-green-400",
      "bg-green-300",
    ],
  },
  emerald: {
    light: [
      "bg-emerald-100/30",
      "bg-emerald-200",
      "bg-emerald-400",
      "bg-emerald-500",
      "bg-emerald-600",
      "bg-emerald-800",
    ],
    dark: [
      "bg-emerald-900/50",
      "bg-emerald-800",
      "bg-emerald-700",
      "bg-emerald-600",
      "bg-emerald-500",
      "bg-emerald-400",
    ],
  },
  amber: {
    light: [
      "bg-amber-100/30",
      "bg-amber-200",
      "bg-amber-400",
      "bg-amber-500",
      "bg-amber-600",
      "bg-amber-800",
    ],
    dark: [
      "bg-amber-900/50",
      "bg-amber-800",
      "bg-amber-700",
      "bg-amber-600",
      "bg-amber-500",
      "bg-amber-400",
    ],
  },
  cyan: {
    light: [
      "bg-cyan-100/30",
      "bg-cyan-200",
      "bg-cyan-400",
      "bg-cyan-500",
      "bg-cyan-600",
      "bg-cyan-800",
    ],
    dark: [
      "bg-cyan-900/50",
      "bg-cyan-800",
      "bg-cyan-700",
      "bg-cyan-600",
      "bg-cyan-500",
      "bg-cyan-400",
    ],
  },
  fuchsia: {
    light: [
      "bg-fuchsia-100/30",
      "bg-fuchsia-200",
      "bg-fuchsia-400",
      "bg-fuchsia-500",
      "bg-fuchsia-600",
      "bg-fuchsia-800",
    ],
    dark: [
      "bg-fuchsia-900/50",
      "bg-fuchsia-800",
      "bg-fuchsia-700",
      "bg-fuchsia-600",
      "bg-fuchsia-500",
      "bg-fuchsia-400",
    ],
  },
  rose: {
    light: [
      "bg-rose-100/30",
      "bg-rose-200",
      "bg-rose-400",
      "bg-rose-500",
      "bg-rose-600",
      "bg-rose-800",
    ],
    dark: [
      "bg-rose-900/50",
      "bg-rose-800",
      "bg-rose-700",
      "bg-rose-600",
      "bg-rose-500",
      "bg-rose-400",
    ],
  },
};



const DashboardPage = () => {
  const setTestList = useCTStore((s) => s.setTestList);
  const setPrevRunningTest = usePrevTestStore((s) => s.setPrevRunningTest);
  const toastData = useToastStore((s) => s.toastData);
  const showToast = useToastStore((s) => s.showToast);
  const activeCourse = useStudentStore((s) => s.activeCourse);
  const [color, setColor] = useState('green');

  const [year, setYear] = useState(null);
  const [apiData, setAPIData] = useState<ITransformedGhData[][] | null>(year);
  const [yearsOptions, setYearsOptions] = useState<number[] | null>(null);
  const [loadingGhActivity, setLoadingGhActivity] = useState<boolean>(false);
  const [loadingGhActivityYears, setLoadingGhActivityYears] = useState<boolean>(false);
  const [loadingGhActivityByDay, setLoadingGhActivityByDay] = useState<boolean>(false);

  // In (YYYY-MM-DD) format
  const [date, setDate] = useState<string | null>(null);
  const [dataByDay, setDataByDay] = useState<any>(null);


  console.log("dataByDay: ", dataByDay);


  const handleClickOnDay = (day: ITransformedGhData) => {
    const _date = day.date;
    if(!_date) return;
    const yyyy = _date.getFullYear().toString();
    const mm = String(_date.getMonth()+1).padStart(2, '0');
    const dd = String(_date.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
  };


  const isClassTest = activeCourse?.tabs?.classTest;

  useEffect(() => {
    const fetchData = async () => {
      const classTestList = await loadClassTestList();
      const prevRunningTest = await loadPreviousRunningTest();

      if (classTestList) setTestList(classTestList);
      if (prevRunningTest) setPrevRunningTest(prevRunningTest);
    };
    fetchData();


    const fetchGhActivityYears = async () => {
      const _data = await getGhActivityYears(setLoadingGhActivityYears);
      if (_data) setYearsOptions(_data.sort((a, b) => (b - a)));
    }
    fetchGhActivityYears();
  }, []);


  useEffect(() => {
    const fetchGhActivity = async () => {
      const _data = await getGhActivity(year, setLoadingGhActivity);
      setColor('green');
      if (_data) setAPIData(_data);
    }
    fetchGhActivity();
  }, [year]);

  useEffect(() => {
    const fetchGhActiviyByDay = async () => {
      const _data = await getGhActivityByDay(date, setLoadingGhActivityByDay);
      if(_data) setDataByDay(_data);
    }

    fetchGhActiviyByDay();
  }, [date]);


  return (
    <div className="pb-5 h-full flex flex-col gap-5 flex-grow scrollbar-hide overflow-y-auto">
      {/* Top Section (split into 2 halves) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="flex flex-col gap-5 xl:col-span-2">
          <FeaturedBannerCarousal className="min-h-[250px] max-h-[250px]" />
          <WidgetCard className="w-full min-h-[300px] max-h-full">
            <ActivityList yearsOptions={yearsOptions} apiData={apiData} year={year} setYear={setYear} loadingGhActivity={loadingGhActivity} loadingGhActivityYears={loadingGhActivityYears} color={color} setColor={setColor} handleClickOnDay={handleClickOnDay} />
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
