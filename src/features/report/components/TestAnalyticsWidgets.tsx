import { FiTarget } from "react-icons/fi";
import { Widget } from "./newreports/Widget";
import { ChartBarIcon, CheckCircleIcon, ClockIcon, PresentationChartLineIcon, StarIcon, XCircleIcon } from "@heroicons/react/24/outline";
import CircleProgressBar from "./newreports/circularProgressBar";

interface TestAnalyticsWidgetData {
  marksObtain: number;
  fullMarks: number;
  percentageMarks: number;
  correctAnswers: number;
  totalQuestion: number;
  incorrectAnswers: number;
  spentTimeLabel: string;
  totalTimeLabel: string;
  timeTakenPercent: number;
}

interface TestAnalytcisWidgetsProps {
    data: TestAnalyticsWidgetData;
    scorePercentage: number;
    correctPercentage: number;
    incorrectPercentage: number;
    timeUsedPercentage: number;
}

const TestAnalyticsWidgets = ({data, scorePercentage, correctPercentage, incorrectPercentage,timeUsedPercentage}: TestAnalytcisWidgetsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {/* Score Widget */}
      <Widget className="bg-[var(--sb-ocean-bg-disabled)] border border-[var(--border-primary)] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <FiTarget className="w-5 h-5 text-[var(--sb-ocean-bg-active)]" />
              <p className="text-[var(--text-tertiary)]">Total Score</p>
            </div>
            <h4 className="text-[var(--text-primary)] mt-4 mb-6">
              {data.marksObtain}/{data.fullMarks}
            </h4>
            <p className="text-[var(--text-tertiary)] flex items-center gap-1">
              <PresentationChartLineIcon className="w-4 h-4" />
              {data.percentageMarks ?? 0}%
            </p>
          </div>
          <div className="relative">
            <CircleProgressBar
              percentage={scorePercentage}
              size={70}
              strokeWidth={6}
              stroke="var(--border-secondary)"
              progressColor="var(--sb-ocean-bg-active)"
              startAngle={90}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <FiTarget className="w-7 h-7 text-[var(--sb-ocean-bg-active)]" />
            </div>
          </div>
        </div>
      </Widget>

      {/* Correct Widget */}
      <Widget className="bg-[var(--sb-green-haze-bg-disabled)] border border-[var(--border-primary)] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircleIcon className="w-5 h-5 text-[var(--sb-green-haze-bg-active)]" />
              <p className="text-[var(--text-tertiary)]">Correct Answers</p>
            </div>
            <h3 className="text-[var(--text-primary)] mt-4 mb-6">
              {data.correctAnswers}
            </h3>
            <p className="text-[var(--text-tertiary)] flex items-center gap-1">
              <ChartBarIcon className="w-4 h-4" />
              out of {data.totalQuestion}
            </p>
          </div>
          <div className="relative">
            <CircleProgressBar
              percentage={correctPercentage}
              size={70}
              strokeWidth={6}
              stroke="var(--border-secondary)"
              progressColor="var(--sb-green-haze-bg-active)"
              startAngle={90}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircleIcon className="w-7 h-7 text-[var(--sb-green-haze-bg-active)]" />
            </div>
          </div>
        </div>
      </Widget>

      {/* Incorrect Widget */}
      <Widget className="bg-[var(--sb-valencia-bg-disabled)] border border-[var(--border-primary)] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <XCircleIcon className="w-5 h-5 text-[var(--sb-valencia-bg-active)]" />
              <p className="text-[var(--text-tertiary)]">Incorrect Answers</p>
            </div>
            <h3 className="text-[var(--text-primary)] mt-4 mb-6">
              {data.incorrectAnswers ?? "N/A"}
            </h3>
            <p className="text-[var(--text-tertiary)] flex items-center gap-1">
              <StarIcon className="w-4 h-4" />
              {(data.incorrectAnswers || 0) > 0
                ? `-${data.incorrectAnswers} marks`
                : "0 marks"}
            </p>
          </div>
          <div className="relative">
            <CircleProgressBar
              percentage={incorrectPercentage}
              size={70}
              strokeWidth={6}
              stroke="var(--border-secondary)"
              progressColor="var(--sb-valencia-bg-active)"
              startAngle={90}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <XCircleIcon className="w-7 h-7 text-[var(--sb-valencia-bg-active)]" />
            </div>
          </div>
        </div>
      </Widget>

      {/* Time Used Widget */}
      <Widget className="bg-[var(--sb-sunglow-bg-disabled)] border border-[var(--border-primary)] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <ClockIcon className="w-5 h-5 text-[var(--sb-sunglow-bg-active)]" />
              <p className="text-[var(--text-tertiary)]">Time Spent</p>
            </div>
            <h3 className="text-[var(--text-primary)] mt-4 mb-6">
              {data.spentTimeLabel ?? "N/A"}
            </h3>
            <p className="text-[var(--text-tertiary)] flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {data.timeTakenPercent}% of {data.totalTimeLabel}
            </p>
          </div>
          <div className="relative">
            <CircleProgressBar
              percentage={timeUsedPercentage}
              size={70}
              strokeWidth={6}
              stroke="var(--border-secondary)"
              progressColor="var(--sb-sunglow-bg-active)"
              startAngle={90}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <ClockIcon className="w-7 h-7 text-[var(--sb-sunglow-bg-active)]" />
            </div>
          </div>
        </div>
      </Widget>
    </div>
  );
};

export default TestAnalyticsWidgets;
