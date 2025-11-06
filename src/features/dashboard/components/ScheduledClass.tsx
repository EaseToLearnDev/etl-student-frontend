// Types
import type { WeekClassScheduleList } from "../dashboard.types";

// Icons
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { LuCircleUser } from "react-icons/lu";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

interface ScheduledClassProps {
  scheduleClass: WeekClassScheduleList;
}

const ScheduledClass = ({ scheduleClass }: ScheduledClassProps) => {
  return (
    <div className="shadow-sm hover:shadow-lg transition rounded-lg p-4 flex flex-col gap-4 border border-[var(--border-secondary)]">
      {/* Title */}
      <div>
        <p
          title={scheduleClass.topicTitle}
          className="font-semibold text-wrap line-clamp-2 text-ellipsis"
        >
          {scheduleClass?.topicTitle ?? ""}
        </p>
        <span className="text-[var(--text-secondary)]">
          {scheduleClass.subject} • {scheduleClass.className}
        </span>
        {/* <Badge theme={Theme.Ocean} style="filled" className="py-1">
            <span>
              {new Intl.DateTimeFormat("en-US").format(c.classDateName)}
            </span>
          </Badge> */}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="h-5 w-5 text-[var(--text-tertiary)]" />
          <span className="text-[var(--text-secondary)]">
            {new Intl.DateTimeFormat("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(scheduleClass.classDateName))}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineBuildingLibrary className="h-5 w-5 text-[var(--text-tertiary)]" />
          <span className="text-[var(--text-secondary)]">
            {scheduleClass?.schoolName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <LuCircleUser className="h-5 w-5 text-[var(--text-tertiary)]" />
          <span className="text-[var(--text-secondary)]">
            {scheduleClass?.teacherName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScheduledClass;
