import React, { memo, useEffect } from "react";
import { getColor } from "../utils/getColor";
import type { ITransformedGhData } from "../utils/transformNormalizeGhData";
import EmptyState from "../../../components/EmptyState";
import { LuActivity } from "react-icons/lu";

export interface ActivityData {
  count: number;
  date: Date;
}

const DayCell = memo(
  ({
    day,
    color,
    onHover,
    onLeave,
    onDayClick,
    darkMode,
  }: {
    day: ITransformedGhData;
    color: string;
    onHover: (e: React.MouseEvent, day: ITransformedGhData) => void;
    onLeave: () => void;
    onDayClick: (day: ITransformedGhData) => void;
    darkMode: boolean;
  }) => {
    return (
      <div
        title={`${
          day.contribution ? day.contribution + " problems" : "No problem"
        } attempted on ${day.date}`}
        onMouseEnter={(e) => onHover(e, day)}
        onMouseLeave={onLeave}
        onClick={() => onDayClick(day)}
        className={`w-[clamp(1rem,1.2vw,1rem)] h-[clamp(1rem,1.2vw,1rem)] transition-transform transform hover:scale-110 child cursor-pointer rounded-sm ${getColor(
          day.contribution,
          color,
          darkMode
        )} ${day.isInvalidDate && "invisible pointer-events-none"}`}
      ></div>
    );
  }
);

function ContributionChart({
  color = "green",
  onDayClick,
  renderableData,
  darkMode,
  scrollRef,
  scroll,
}: {
  color?: string;
  onDayClick: (day: ITransformedGhData) => void;
  renderableData: any;
  darkMode: boolean;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  scroll: (data: "left" | "right") => void;
}) {
  if (!renderableData) {
    return (
      <EmptyState
        title="No activity data available"
        description="No activity data available yet. Start giving tests, and your activity will appear here!"
        icon={<LuActivity className="w-20 h-20" />}
        className="max-w-md"
      />
    );
  }

  useEffect(() => {
    scroll("right");
  }, [scrollRef]);

  return (
    <div
      ref={scrollRef}
      className="flex flex-col justify-start items-start gap-2 w-full overflow-x-auto pb-4 h-[180px] mb-3 "
    >
      {/* <div
        className="flex text-xs text-[var(--text-tertiary)] text-bold mb-1"
        style={{
          width: `calc(52 * (clamp(0.8rem, 1.2vw, 1rem) + 0.25rem))`,
        }}
      >
        <div className="w-10"></div>
        {data.map((_, weekIdx) => {
          const label = monthLabels.find((m) => m.index === weekIdx);
          return (
            <div key={weekIdx} className="flex-1 text-center">
              {label ? label.name : ""}
            </div>
          );
        })}
      </div> */}
      <div className="flex flex-col justify-start gap-4">
        <div className="flex items-start justify-start gap-2 h-[calc(7*clamp(1rem,1.2vw,1rem)+6*0.25rem)] ">
          <div className="flex flex-col justify-between items-start mt-7  h-[calc(7*clamp(1rem,1.2vw,1rem)+6*0.25rem)]  text-xs text-[var(--text-tertiary)] text-bold">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
              <div
                key={i}
                className={`${
                  !(i & 1)
                    ? "invisible pointer-events-none"
                    : "visible pointer-events-auto"
                }`}
              >
                {d}
              </div>
            ))}
          </div>
          <div className="flex gap-8 ">
            {renderableData?.map((month: any, monthIdx: any) => {
              return (
                <div key={monthIdx} className="flex flex-col  gap-2  ">
                  <p className="text-(--primary-text)  text-center">
                    {month.monthLabel}
                  </p>
                  <div className="flex gap-2">
                    {month.weeks.map((week: any, weekIdx: any) => {
                      return (
                        <div
                          key={weekIdx}
                          className="flex flex-col gap-1 parent "
                        >
                          {week.map((day: any, dayIdx: any) => {
                            return (
                              <DayCell
                                key={dayIdx}
                                day={day}
                                color={color}
                                onHover={() => {}}
                                onLeave={() => {}}
                                onDayClick={onDayClick}
                                darkMode={darkMode}
                              />
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className="flex gap-1">
            {data.map((week, weekIdx) => {
              return (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.map((day, dayIdx) => {
                    return (
                      <DayCell
                        key={dayIdx}
                        day={day}
                        color={color}
                        onHover={() => {}}
                        onLeave={() => []}
                        onDayClick={onDayClick}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ContributionChart;
