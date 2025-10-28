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
import type { ITransformedGhData } from "../utils/transformNormalizeGhData";
import ActivityListData from "../components/ActivityListData";
import { LuLoader } from "react-icons/lu";
import useIsMobile from "../../../hooks/useIsMobile";
import {
  getGhActivityByDay,
  type IGhActivityByDayResults,
} from "../services/getGhActivityByDay";
import { getGhActivityYears } from "../services/getGhActivityYears";
import { getGhActivity } from "../services/getGhActivity";
import FirstTimeUserModal from "../components/FirstTimeUser";
import { loadWeekScheduledClasses } from "../services/loadWeekScheduledClasses";
import ScheduledClassesList from "../components/ScheduledClassesList";
import type { WeekClassScheduleList } from "../dashboard.types";
import { useLoadingStore } from "../../../hooks/useLoadingStore";

const DashboardPage = () => {
  const setTestList = useCTStore((s) => s.setTestList);
  const setPrevRunningTest = usePrevTestStore((s) => s.setPrevRunningTest);
  const toastData = useToastStore((s) => s.toastData);
  const showToast = useToastStore((s) => s.showToast);
  const activeCourse = useStudentStore((s) => s.activeCourse);
  const studentData = useStudentStore((s) => s.studentData);
  const loading = useLoadingStore((s) => s.loading);
  const isMobile = useIsMobile();

  const [showFirstTimeModal, setShowFirstTimeModal] = useState(false);
  const [scheduledClasses, setScheduledClasses] = useState<
    WeekClassScheduleList[] | null
  >(null);

  const [color, setColor] = useState("green");
  const [year, setYear] = useState(null);
  const [apiData, setAPIData] = useState<ITransformedGhData[][] | null>(year);
  const [yearsOptions, setYearsOptions] = useState<number[] | null>(null);
  const [loadingGhActivity, setLoadingGhActivity] = useState<boolean>(false);
  const [loadingGhActivityYears, setLoadingGhActivityYears] =
    useState<boolean>(false);
  const [loadingGhActivityByDay, setLoadingGhActivityByDay] =
    useState<boolean>(false);

  // In (YYYY-MM-DD) format
  const [date, setDate] = useState<string | null>(null);
  const [dataByDay, setDataByDay] = useState<IGhActivityByDayResults[] | null>(
    null
  );

  const createDate = (_date: Date) => {
    const yyyy = _date.getFullYear().toString();
    const mm = String(_date.getMonth() + 1).padStart(2, "0");
    const dd = String(_date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleClickOnDay = (day: ITransformedGhData) => {
    const _date = day.date;
    if (!_date) return;
    setDate(createDate(_date));
  };

  const isClassTest = activeCourse?.tabs?.classTest;

  useEffect(() => {
    const firstTimeUser = localStorage.getItem("firstTimeUser");
    if (!firstTimeUser && studentData?.firstTimeUser === 1) {
      setShowFirstTimeModal(true);

      // set in local storage so modal only open once
      localStorage.setItem("firstTimeUser", "1");
    }
  }, [studentData?.firstTimeUser]);

  useEffect(() => {
    const fetchData = async () => {
      const classTestList = await loadClassTestList();
      const prevRunningTest = await loadPreviousRunningTest();
      const scheduledClasses = await loadWeekScheduledClasses();

      if (classTestList) setTestList(classTestList);
      if (prevRunningTest) setPrevRunningTest(prevRunningTest);
      if (scheduledClasses) setScheduledClasses(scheduledClasses);
    };
    fetchData();

    const fetchGhActivityYears = async () => {
      const _data = await getGhActivityYears(setLoadingGhActivityYears);
      if (_data) setYearsOptions(_data.sort((a, b) => b - a));
    };
    fetchGhActivityYears();
  }, []);

  useEffect(() => {
    const fetchGhActivity = async () => {
      const _data = await getGhActivity(year, setLoadingGhActivity);
      setColor("green");
      if (_data) setAPIData(_data);
    };
    fetchGhActivity();
  }, [year]);

  useEffect(() => {
    const fetchGhActiviyByDay = async () => {
      const _data = await getGhActivityByDay(date, setLoadingGhActivityByDay);
      if (_data) setDataByDay(_data);
      else setDataByDay(null);
    };
    if (!date) {
      setDate(createDate(new Date()));
    }
    fetchGhActiviyByDay();
  }, [date]);

  return (
    <div className="pb-5 h-full flex flex-col gap-5 flex-grow scrollbar-hide overflow-y-auto">
      {/* Top Section (split into 2 halves) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="flex flex-col gap-5 xl:col-span-2">
          <FeaturedBannerCarousal className="min-h-[250px] max-h-[250px]" />
          <WidgetCard
            title="Activity Chart"
            className="w-full min-h-[300px] max-h-full "
          >
            <ActivityList
              yearsOptions={yearsOptions}
              apiData={apiData}
              year={year}
              setYear={setYear}
              loadingGhActivity={loadingGhActivity}
              loadingGhActivityYears={loadingGhActivityYears}
              color={color}
              setColor={setColor}
              handleClickOnDay={handleClickOnDay}
            />
          </WidgetCard>
        </div>

        {!isMobile && (
          <div className="flex flex-col gap-5 xl:col-span-1">
            {isClassTest ? (
              <>
                <WidgetCard
                  title="Scheduled Classes"
                  className="h-full max-h-[250px]"
                >
                  <ScheduledClassesList data={scheduledClasses} loading={loading} />
                </WidgetCard>
                <WidgetCard title="Class Tests" className="h-full">
                  <ClassTestList />
                </WidgetCard>
              </>
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
        )}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-5 min-h-[250px] max-h-[250px]">
        <WidgetCard
          title="Tests activity "
          description={date}
          className="min-h-[400px] relative "
        >
          {loadingGhActivityByDay ? (
            <LuLoader className="animate-spin absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2  w-8 h-8" />
          ) : (
            <ActivityListData dataByDay={dataByDay} />
          )}
        </WidgetCard>
        <WidgetCard title="Jump Back In" className="h-full min-h-[300px]">
          <JumpBackInList />
        </WidgetCard>

        {isMobile && isClassTest && (
          <>
            <WidgetCard title="Class Tests" className="h-full min-h-[300px]">
              <ClassTestList />
            </WidgetCard>
            <WidgetCard title="Scheduled Classes" className="h-full max-h-[250px]">
              <ScheduledClassesList data={scheduledClasses} loading={loading} />
            </WidgetCard>
          </>
        )}
        {(isClassTest || isMobile) && (
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
      <FirstTimeUserModal
        isOpen={showFirstTimeModal}
        onClose={() => setShowFirstTimeModal(false)}
      />
      {/* Toast */}
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
