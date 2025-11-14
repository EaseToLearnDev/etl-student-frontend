import {
  BoltIcon,
  ClockIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import { formatMinutesToHHMMSS } from "../libs/utils";
import { getTimeFromSeconds } from "../../../utils";

interface TimeManagementCardsData {
  totalTime: number;
  timeSpent: number;
  timeTakenPercent: number;
  timeSpentMinutes: string;
  averageSpeedPerQuestionLabel: string;
  timeRemaining?: number;
  timeRemainingPercent?: number;
}

interface TImeManagementCardsProps {
  data: TimeManagementCardsData
}

const TImeManagementCards = ({data}: TImeManagementCardsProps) => {
  return (
    <div className="w-full mx-auto my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Time Card */}
        <div className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-[var(--border-primary)] border-solid bg-[var(--surface-bg-primary)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[var(--sb-ocean-bg-disabled)]">
                <ClockIcon className="w-5 h-5 text-[var(--text-tertiary)]" />
              </div>
              <h6 className="text-[var(--text-secondary)]">Total Time</h6>
            </div>
          </div>
          <h4 className="mb-2 text-[var(--sb-ocean-bg-active)]">
            {formatMinutesToHHMMSS(data.totalTime)}
          </h4>
          <p className="text-[var(--text-tertiary)]">Session duration</p>
        </div>

        {/* Time Taken Card */}
        <div className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out p-6 border border-[var(--border-primary)] bg-[var(--surface-bg-primary)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[var(--sb-sakura-bg-disabled)]">
                <ClockIcon className="w-5 h-5 text-[var(--text-tertiary)]" />
              </div>
              <h6 className="text-[var(--text-secondary)]">Time Taken</h6>
            </div>
          </div>
          <h4 className="mb-2 text-[var(--sb-ocean-bg-active)]">
            {data.timeSpentMinutes
              ? getTimeFromSeconds(data.timeSpent)
              : "00:00:00"}
          </h4>
          <p className="text-[var(--text-tertiary)]">Elapsed time</p>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full rounded-full h-2 bg-[var(--border-tertiary)]">
              <div
                className="h-2 rounded-full transition-all duration-500 bg-[var(--sb-ocean-bg-active)]"
                style={{ width: `${data.timeTakenPercent ?? 0}%` }}
              ></div>
            </div>
            <p className="text-xs mt-1 text-[var(--text-tertiary)]">
              {data.timeTakenPercent ?? 0}% Complete
            </p>
          </div>
        </div>

        {/* Remaining Time Card */}
        <div className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-[var(--border-primary)] border-solid bg-[var(--surface-bg-primary)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[var(--sb-pumpkin-bg-disabled)]">
                <PresentationChartLineIcon className="w-5 h-5 text-[var(--text-tertiary)]" />
              </div>
              <h6 className="text-[var(--text-secondary)]">Remaining Time</h6>
            </div>
          </div>
          <h4 className="mb-2 text-[var(--sb-green-haze-bg-active)]">
            {data.timeRemaining
              ? getTimeFromSeconds(data.timeRemaining)
              : "00:00:00"}
          </h4>
          <p className="text-[var(--text-tertiary)]">Time left</p>

          {/* Countdown Visual */}
          <div className="mt-4">
            <div className="w-full rounded-full h-2 bg-[var(--border-tertiary)]">
              <div
                className="h-2 rounded-full transition-all duration-500 bg-[var(--sb-green-haze-bg-active)]"
                style={{ width: `${data.timeRemainingPercent ?? 0}%` }}
              ></div>
            </div>
            <p className="mt-1 text-[var(--text-tertiary)]">
              {data.timeRemainingPercent ?? 0}% Remaining
            </p>
          </div>
        </div>

        {/* Average Speed Card */}
        <div className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-[var(--border-primary)] border-solid bg-[var(--surface-bg-primary)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[var(--sb-valencia-bg-disabled)]">
                <BoltIcon className="w-5 h-5 text-[var(--text-tertiary)]" />
              </div>
              <h6 className="text-[var(--text-secondary)]">
                Avg. Speed/Question
              </h6>
            </div>
          </div>
          <h3 className="mb-2 text-[var(--sb-valencia-bg-active)]">
            {data.averageSpeedPerQuestionLabel}
          </h3>
          <p className="text-[var(--text-tertiary)]">Per question</p>

          {/* Speed Indicator */}
          <div className="mt-4 flex items-center space-x-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-6 rounded bg-[var(--border-tertiary)]"
                ></div>
              ))}
            </div>
            <p className="text-[var(--text-tertiary)]">Just started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TImeManagementCards;
