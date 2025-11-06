import { useEffect, useState } from "react";
import WidgetCard from "../../report/components/newreports/WidgetCard";
import { ActivityList } from "../components/ActivityList";
import FeaturedBannerCarousal from "../components/FeaturedBannerCarousal";
import { getGhActivity } from "../services/getGhActivity";
import {
  getGhActivityByDay,
  type IGhActivityByDayResults,
} from "../services/getGhActivityByDay";
import { getGhActivityYears } from "../services/getGhActivityYears";
import { loadWeekScheduledClasses } from "../services/loadWeekScheduledClasses";
import { loadPreviousRunningTest } from "../../shared/services/loadPreviousRunningTest";
import { loadClassTestList } from "../../../global/services/loadClassTestList";
import { usePageTracking } from "../../../hooks/usePageTracking";
import { gtmEvents } from "../../../utils/gtm-events";
import type { ITransformedGhData } from "../utils/transformNormalizeGhData";
import type { WeekClassScheduleList } from "../dashboard.types";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { useLoadingStore } from "../../../hooks/useLoadingStore";
import useIsMobile from "../../../hooks/useIsMobile";
import { useToastStore } from "../../../global/hooks/useToastStore";
import { useCTStore } from "../../../global/hooks/useCTStore";
import { usePrevTestStore } from "../../shared/hooks/usePrevTestStore";
import { LuLoader } from "react-icons/lu";
import ActivityListData from "../components/ActivityListData";
import JumpBackInList from "../components/JumpBackInList";
import DownloadAppCard from "../components/DownloadAppCard";
import SupportSection from "../components/SupportSection";
import FirstTimeUserModal from "../components/FirstTimeUser";
import { Toast } from "../../../components/Toast";
import UpcomingClassesAndTests from "../components/UpcomingClassesAndTests";
import StartTopicTestModalContent from "../../exam_room/shared/components/StartTopicTestModalContent";
import { Modal } from "../../../components/Modal";
import { handleStartTest } from "../../exam_room/shared/services/handleStartTest";
import { useNavigate } from "react-router";

const DashboardV2Page = () => {
  const navigate = useNavigate();
  const setTestList = useCTStore((s) => s.setTestList);
  const selectedTest = useCTStore((s) => s.selectedTest);
  const setSelectedTest = useCTStore((s) => s.setSelectedTest);
  const showStartTestModal = useCTStore((s) => s.showStartTestModal);
  const setShowStartTestModal = useCTStore((s) => s.setShowStartTestModal);

  const setPrevRunningTest = usePrevTestStore((s) => s.setPrevRunningTest);
  const toastData = useToastStore((s) => s.toastData);
  const showToast = useToastStore((s) => s.showToast);
  const activeCourse = useStudentStore((s) => s.activeCourse);
  const showFtuModal = useStudentStore((s) => s.showFtuModal);
  const setShowFtuModal = useStudentStore((s) => s.setShowFtuModal);
  const loading = useLoadingStore((s) => s.loading);
  const isMobile = useIsMobile();

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

  const isClassTestFeatEnabled = activeCourse?.tabs?.classTest;

  usePageTracking(gtmEvents.dashboard_page_visit);

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
    <div
      className="pb-5 scrollbar-hide overflow-y-auto dashboard-grid"
      data-variant={isClassTestFeatEnabled ? "class-test" : "default"}
    >
      <FeaturedBannerCarousal />
      {isClassTestFeatEnabled && (
        <WidgetCard title="Upcoming Classes & Tests">
          <UpcomingClassesAndTests scheduledClasses={scheduledClasses} />
        </WidgetCard>
      )}
      <WidgetCard
        title="Activity Chart"
        className="w-full min-h-[390px] max-h-full overflow-x-auto"
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
      <WidgetCard id="dash-download-card" className="dash-download-card max-h-[300px]">
        <DownloadAppCard />
      </WidgetCard>
      <WidgetCard>
        <SupportSection />
      </WidgetCard>

      <FirstTimeUserModal
        isOpen={showFtuModal}
        onClose={() => setShowFtuModal(false)}
      />

      <Modal
        isOpen={showStartTestModal}
        onClose={() => setShowStartTestModal(false)}
        size="lg"
        className="p-4"
      >
        <StartTopicTestModalContent
          customTitle={"Class Test"}
          testName={selectedTest?.testTitle || ""}
          onStart={() => {
            handleStartTest({
              navigate,
              testId: selectedTest?.testId ?? null,
              classTestId: selectedTest?.scheduleId,
              testType: selectedTest?.testType,
            });
            setShowStartTestModal(false);
          }}
          onClose={() => setShowStartTestModal(false)}
          details={{
            marksCorrect: selectedTest?.markCorrectAns,
            marksIncorrect: selectedTest?.markIncorrectAns,
            marksUnattempted: selectedTest?.markNotAttempt,
            questionType: selectedTest?.questionType,
            totalMarks: selectedTest?.totalMark,
            totalQuestions: selectedTest?.totalQuestion,
            totalTime: selectedTest?.totalTime,
          }}
        />
      </Modal>

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

export default DashboardV2Page;
