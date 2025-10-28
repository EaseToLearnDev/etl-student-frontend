import { LuCalendarMinus2 } from "react-icons/lu";
import Badge from "../../../components/Badge";
import EmptyState from "../../../components/EmptyState";
import { Theme } from "../../../utils/colors";
import type { WeekClassScheduleList } from "../dashboard.types";
import { Skeleton } from "../../../components/SkeletonLoader";

interface ScheduledClassesListProps {
  data: WeekClassScheduleList[] | null;
  loading: boolean;
}

const ScheduledClassesList = ({ data, loading }: ScheduledClassesListProps) => {

  if (loading) {
    return (
      <div className="mt-2 flex flex-col gap-2">
        <Skeleton height={40} variant="rectangular" />
        <Skeleton height={20} variant="rectangular" />
        <Skeleton height={20} variant="rectangular" />
        <Skeleton height={20} variant="rectangular" />
        <Skeleton height={20} variant="rectangular" />
      </div>
    );
  }

  if (!data || data.length === 0)
    return (
      <EmptyState
        title="No Schedule Classes"
        description="It looks like there aren’t any classes available right now."
        icon={<LuCalendarMinus2 className="w-20 h-20" />}
        className="max-w-md"
      />
    );

  return (
    <div className="max-h-[160px] overflow-y-scroll mt-2 flex items-center pt-0">
      {data.map((c, idx) => {
        return (
          <div
            key={idx}
            className="border-b-2 border-[var(--border-primary)] shadow-sm hover:shadow-md transition-shadow w-full pb-2 mt-2"
          >
            <div className="flex items-center justify-between mb-2">
              <p title={c.topicTitle}>
                {c.topicTitle.length > 15
                  ? c.topicTitle?.slice(0, 15) + "..."
                  : c.topicTitle}
              </p>
              <Badge theme={Theme.Ocean} style="filled" className="py-1">
                <span>
                  {new Intl.DateTimeFormat("en-US").format(c.classDateName)}
                </span>
              </Badge>
            </div>

            <div className="flex flex-col gap-2">
              <p>
                <span className="font-medium text-[var(--sb-ocean-bg-active)]">
                  Subject:
                </span>{" "}
                {c.subject}
              </p>
              <p>
                <span className="font-medium text-[var(--sb-ocean-bg-active)]">
                  Class:
                </span>{" "}
                {c.className}
              </p>
              <p>
                <span className="font-medium text-[var(--sb-ocean-bg-active)]">
                  School:
                </span>{" "}
                {c.schoolName}
              </p>
              <p>
                <span className="font-medium text-[var(--sb-ocean-bg-active)]">
                  Teacher:
                </span>{" "}
                {c.teacherName}
              </p>
            </div>

            {/* <span className="mt-3 text-[var(--text-secondary)]">
              Created on {new Date(c.createdDateTime).toLocaleDateString()}
            </span> */}
          </div>
        );
      })}
    </div>
  );
};

export default ScheduledClassesList;
