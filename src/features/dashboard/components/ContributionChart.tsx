import React, { memo } from "react";
// import { useActivityStore } from "../hooks/useActivityStore";
import { getColor } from "../utils/getColor";
import { normalizeGhHeatmapAPIData } from "../utils/normalizeGhHeatmapAPIData";
import { transformNormalizeGhData, type ITransformedGhData } from "../utils/transformNormalizeGhData";
// import { apiData } from "../../../data";
import { seggregateGhHeatmapData } from "../utils/seggregateGhHeatmapData";
import useDarkModeStore from "../../../store/useDarkModeStore";

export interface ActivityData {
  count: number;
  date: Date;
}

const DayCell = ({ day, dayIdx, monthIdx, weekIdx, color, onHover, onLeave, onDayClick, darkMode }: { day: ITransformedGhData, dayIdx: number; monthIdx: number; weekIdx: number; color: string, onHover: (e: React.MouseEvent, day: ITransformedGhData) => void, onLeave: () => void; onDayClick: (day: ITransformedGhData) => void, darkMode: boolean }) => {


  if (day.contribution > 0) {
    console.log(day)
  }


  return (
    <div
      title={`${day.contribution ? day.contribution : "No"} contributions on ${day.date}`}
      onMouseEnter={(e) => onHover(e, day)}
      onMouseLeave={onLeave}
      onClick={() => onDayClick(day)}
      className={`w-[clamp(0.8rem,1.2vw,1rem)] h-[clamp(1rem,1.2vw,1rem)]   rounded-sm ${getColor(
        day.contribution, color, darkMode
      )} ${day.isInvalidDate && "bg-transparent"}`}
    >
    </div>
  )
}

function ContributionChart({
  color = "green",
  year,
  apiData,
  onDayClick,
  scrollRef,
}: {
  color?: string;
  year: number | null;
  apiData: ITransformedGhData[][] | null,
  onDayClick: (day: ITransformedGhData) => void;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}) {
  // const { data, monthLabels } = useActivityStore(color, year);


  // console.log(apiData, year)


  const normalizedGhAPIData = normalizeGhHeatmapAPIData(apiData, year);
  const transformedData = transformNormalizeGhData(normalizedGhAPIData, year);
  const renderableData = seggregateGhHeatmapData(transformedData);

  const {darkMode} = useDarkModeStore();

  if(!renderableData) return <div className="text-red-400">[ERROR]: Something went wrong!!!</div>




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
        <div className="flex items-start justify-start gap-2 h-[calc(7*clamp(0.8rem,1.2vw,1rem)+6*0.25rem)] ">
          <div className="flex flex-col justify-between items-start pt-4  text-xs h-full text-[var(--text-tertiary)] text-bold">
            {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
              <div key={i} className="">
                {d}
              </div>
            ))}
          </div>
          <div className='flex gap-8 '>
            {

              renderableData.map((month: any, monthIdx: any) => {
                return (
                  <div key={monthIdx} className='flex flex-col  gap-2 '>

                    <p className='text-(--primary-text)  text-center'>{month.monthLabel}</p>
                    <div className='flex gap-2 '>

                      {
                        month.weeks.map((week: any, weekIdx: any) => {
                          return (
                            <div key={weekIdx} className='flex flex-col gap-1'>
                              {
                                week.map((day: any, dayIdx: any) => {

                                  return (
                                    <DayCell key={dayIdx} dayIdx={dayIdx} monthIdx={monthIdx} weekIdx={weekIdx} day={day} color={color} onHover={() => { }} onLeave={() => { }} onDayClick={onDayClick} darkMode={darkMode} />
                                  )
                                })
                              }
                            </div>

                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
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
