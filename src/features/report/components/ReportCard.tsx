import { MdArrowRight } from "react-icons/md";
import Button from "../../../components/Button";
import type { TestReportdata } from "../pages/ReportMockTestPage";
import {
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { BiCalendarMinus } from "react-icons/bi";
import Badge from "../../../components/Badge";
import { Theme } from "../../../utils/colors";
import type { LearningSessionData } from "../pages/ReportLearningSessionPage";

interface ReportCardProps {
  data: TestReportdata | LearningSessionData;
  onClick: (reportData: TestReportdata | LearningSessionData) => void;
}

const ReportCard = ({ data, onClick }: ReportCardProps) => {
  return (
    <div
      className="group relative border border-[var(--border-secondary)] rounded-2xl p-5 bg-[var(--surface-bg-primary)] shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => onClick(data)}
    >
      {/* Content */}
      <div className="relative z-10">
        {/* Header with score badge */}
        <div className="flex items-start justify-between mb-4">
          <h4 className="text-[var(--text-primary)] pr-4 line-clamp-2 transition-colors">
            {data.testTitle}
          </h4>
          <Badge theme={Theme.Sunglow} style="filled" className="py-1 px-2">
            <span>
              {Math.round((data.marksObtain / data.fullMarks) * 100)}%
            </span>
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-[var(--sb-ocean-bg-disabled)] flex items-center justify-center flex-shrink-0">
              <BiCalendarMinus
                size={20}
                className="text-[var(--sb-ocean-bg-active)]"
              />
            </div>
            <div>
              <p className="text-[var(--text-secondary)] font-medium">Date</p>
              <span className="text-[var(--text-tertiary)] font-semibold">
                {data.date}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-[var(--sb-amethyst-bg-disabled)] flex items-center justify-center flex-shrink-0">
              <DocumentTextIcon
                height={20}
                width={20}
                className="text-[var(--sb-amethyst-bg-active)]"
              />
            </div>
            <div>
              <p className="text-[var(--text-secondary)] font-medium">
                Questions
              </p>
              <span className="text-[var(--text-tertiary)] font-semibold">
                {data.totalQuestions}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-[var(--sb-green-haze-bg-disabled)] flex items-center justify-center flex-shrink-0">
              <CheckCircleIcon
                height={20}
                width={20}
                className="text-[var(--sb-green-haze-bg-active)]"
              />
            </div>
            <div>
              <p className="text-[var(--text-secondary)] font-medium">Score</p>
              <span className="text-[var(--text-tertiary)] font-semibold">
                {data.marksObtain}/{data.fullMarks}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-[var(--sb-pumpkin-bg-disabled)] flex items-center justify-center flex-shrink-0">
              <ClockIcon
                width={20}
                height={20}
                className="text-[var(--sb-pumpkin-bg-active)]"
              />
            </div>
            <div>
              <p className="text-[var(--text-secondary)]">Duration</p>
              <span className="text-[var(--text-tertiary)]">
                {data.timeSpent}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-2 bg-[var(--surface-bg-tertiary)] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${(data.marksObtain / data.fullMarks) * 100}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <Button
          style="secondary"
          className="w-full rounded-lg"
          onClick={() => {
            onClick(data);
          }}
        >
          View Detailed Report
          <MdArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ReportCard;
