import { useState } from "react";
import Tabs from "../../../components/Tabs";
import { useCTStore } from "../../../global/hooks/useCTStore";
import ClassTestCard from "./ClassTestCard";
import EmptyState from "../../../components/EmptyState";
import { LuCalendarMinus2, LuCalendarX } from "react-icons/lu";
import { useLoadingStore } from "../../../hooks/useLoadingStore";
import type { WeekClassScheduleList } from "../dashboard.types";
import { Skeleton } from "../../../components/SkeletonLoader";
import ScheduledClass from "./ScheduledClass";

const UpcomingClassesAndTests = ({
  scheduledClasses,
}: {
  scheduledClasses: WeekClassScheduleList[] | null;
}) => {
  const tabs = ["Class Tests", "Next Classes"];

  const loading = useLoadingStore((s) => s.loading);
  const [selectedTabIdx, setSelectedTabIdx] = useState<number>(0);
  const testList = useCTStore((s) => s.testList);
  const setSelectedTest = useCTStore((s) => s.setSelectedTest);
  const setShowStartTestModal = useCTStore((s) => s.setShowStartTestModal);

  return (
    <div>
      <Tabs
        tabs={tabs}
        selectedIndex={selectedTabIdx}
        onSelect={setSelectedTabIdx}
        activeTabClassName="bg-[var(--sb-ocean-bg-active)] w-full max-w-[200px] border-none text-white"
        containerClassName="py-5 justify-center"
        tabClassName="w-full max-w-[200px]"
      />

      {/* Upcoming Class Tests */}
      {selectedTabIdx === 0 && (
        <div className="h-[300px] lg:h-[500px] overflow-y-auto focus:outline-none">
          {testList && testList?.length > 0 ? (
            <div className="flex flex-col gap-4">
              {testList?.map((t, index) => (
                <ClassTestCard
                  key={index}
                  test={t}
                  onStart={(test) => {
                    setSelectedTest(test);
                    setShowStartTestModal(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No scheduled tests available"
              description="There are no upcoming tests scheduled at the moment. Please check back later."
              icon={<LuCalendarX className="w-20 h-20" />}
              className="max-w-md lg:max-w-sm"
            />
          )}
        </div>
      )}

      {/* Upcoming Classes */}
      {selectedTabIdx === 1 && (
        <div className="h-[300px] lg:h-[500px] overflow-y-auto">
          {loading && (
            <div className="mt-2 flex flex-col gap-2">
              <Skeleton height={40} variant="rectangular" />
              <Skeleton height={20} variant="rectangular" />
              <Skeleton height={20} variant="rectangular" />
              <Skeleton height={20} variant="rectangular" />
              <Skeleton height={20} variant="rectangular" />
            </div>
          )}
          {scheduledClasses && scheduledClasses.length > 0 ? (
            <div className="flex flex-col gap-4">
              {scheduledClasses?.map((cls, index) => (
                <ScheduledClass key={index} scheduleClass={cls} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Schedule Classes"
              description="It looks like there aren't any classes available right now."
              icon={<LuCalendarMinus2 className="w-20 h-20" />}
              className="max-w-md h-full"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UpcomingClassesAndTests;
