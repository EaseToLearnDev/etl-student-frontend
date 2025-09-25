import { useEffect, useRef, useState } from "react";
import ContributionChart from "./ContributionChart";
import Select from "../../../components/Select";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { ITransformedGhData } from "../utils/transformNormalizeGhData";
import useDarkModeStore from "../../../store/useDarkModeStore";

interface IActivityListProps {
  yearsOptions: number[] | null,
  apiData: ITransformedGhData[][] | null,
  year: number | null;
  setYear: any
}

export const ActivityList = ({ yearsOptions, apiData, year, setYear }: IActivityListProps) => {

  const [color, setColor] = useState('green');
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const {darkMode} = useDarkModeStore();

  const currentYear = new Date().getFullYear();


  console.log("ActivityList: ", yearsOptions, apiData, year, setYear)


  const handleClickOnDay = (day: any) => {
    console.log(day);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -containerWidth : containerWidth,
        behavior: "smooth",
      });
    }
  };



  const getLegendColors = (color: string) => {
    const colorMap = {
      green: {
        light: [
          "bg-gray-200",
          "bg-green-200",
          "bg-green-400",
          "bg-green-500",
          "bg-green-600",
          "bg-green-800",
        ],
        dark: [
          "bg-green-100/30",
          "bg-green-800",
          "bg-green-700",
          "bg-green-600",
          "bg-green-500",
          "bg-green-400",
        ],
      },
      emerald: {
        light: [
          "bg-emerald-100/30",
          "bg-emerald-200",
          "bg-emerald-400",
          "bg-emerald-500",
          "bg-emerald-600",
          "bg-emerald-800",
        ],
        dark: [
          "bg-emerald-900/50",
          "bg-emerald-800",
          "bg-emerald-700",
          "bg-emerald-600",
          "bg-emerald-500",
          "bg-emerald-400",
        ],
      },
      amber: {
        light: [
          "bg-amber-100/30",
          "bg-amber-200",
          "bg-amber-400",
          "bg-amber-500",
          "bg-amber-600",
          "bg-amber-800",
        ],
        dark: [
          "bg-amber-900/50",
          "bg-amber-800",
          "bg-amber-700",
          "bg-amber-600",
          "bg-amber-500",
          "bg-amber-400",
        ],
      },
      cyan: {
        light: [
          "bg-cyan-100/30",
          "bg-cyan-200",
          "bg-cyan-400",
          "bg-cyan-500",
          "bg-cyan-600",
          "bg-cyan-800",
        ],
        dark: [
          "bg-cyan-900/50",
          "bg-cyan-800",
          "bg-cyan-700",
          "bg-cyan-600",
          "bg-cyan-500",
          "bg-cyan-400",
        ],
      },
      fuchsia: {
        light: [
          "bg-fuchsia-100/30",
          "bg-fuchsia-200",
          "bg-fuchsia-400",
          "bg-fuchsia-500",
          "bg-fuchsia-600",
          "bg-fuchsia-800",
        ],
        dark: [
          "bg-fuchsia-900/50",
          "bg-fuchsia-800",
          "bg-fuchsia-700",
          "bg-fuchsia-600",
          "bg-fuchsia-500",
          "bg-fuchsia-400",
        ],
      },
      rose: {
        light: [
          "bg-rose-100/30",
          "bg-rose-200",
          "bg-rose-400",
          "bg-rose-500",
          "bg-rose-600",
          "bg-rose-800",
        ],
        dark: [
          "bg-rose-900/50",
          "bg-rose-800",
          "bg-rose-700",
          "bg-rose-600",
          "bg-rose-500",
          "bg-rose-400",
        ],
      },
    };

    const colorEntry = colorMap[color as keyof typeof colorMap] || colorMap.green;
    return darkMode ? colorEntry.dark : colorEntry.light;
  };


  const [c0, c1, c2, c3, c4, c5] = getLegendColors(color);
  const legendColors = [c0, c1, c2, c3, c4, c5];




  return (
    <>
      <div className="w-full mb-4 flex items-start justify-between">
        <div>
          <label
            htmlFor="choose-year"
            className="block mb-2 text-[var(--text-secondary)]"
          >
            Choose Year
          </label>
          <div className="relative flex items-center w-40">
            <Select
              type="Year"
              items={yearsOptions ? yearsOptions : []}
              selectedIndex={yearsOptions ? yearsOptions?.indexOf(year ? year : currentYear): null}
              isOpen={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
              onSelect={(index) => setYear(yearsOptions ? yearsOptions[index]: null)}
              className="w-full"
              dropdownClassName="w-40"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 text-[var(--text-primary)]">
          <button
            onClick={() => scroll("left")}
            className="size-7 aspect-square hover:bg-[var(--surface-bg-secondary)] flex justify-center items-center border border-[var(--border-secondary)] rounded-md transition"
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="size-7 aspect-square hover:bg-[var(--surface-bg-secondary)] flex justify-center items-center border border-[var(--border-secondary)] rounded-md transition"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>


      <ContributionChart
        // color={color}
        apiData={apiData}
        year={year}
        onDayClick={handleClickOnDay}
        scrollRef={scrollRef}
      />
      <div className="flex items-center justify-end gap-3 mt-2 text-[var(--text-tertiary)]">
        <span>Less</span>
        <div className="flex items-center justify-center gap-1">
          {legendColors.map((c, i) => (
            <div key={i} className={`w-4 h-4 rounded-sm ${c}`}></div>
          ))}
        </div>
        <span>More</span>
      </div>
    </>
    // <div className='flex items-center  justify-around gap-2 h-12 max-w-[320px]  w-full'>
    //     <button onClick={() => setColor('green')} className={`h-full w-1/6 rounded-lg bg-green-500 `}></button>
    //     <button onClick={() => setColor('emerald')} className='h-full w-1/6 rounded-lg bg-emerald-500'></button>
    //     <button onClick={() => setColor('amber')} className='h-full w-1/6 rounded-lg bg-amber-500'></button>
    //     <button onClick={() => setColor('cyan')} className='h-full w-1/6 rounded-lg bg-cyan-500'></button>
    //     <button onClick={() => setColor('fuchsia')} className='h-full w-1/6 rounded-lg bg-fuchsia-500'></button>
    //     <button onClick={() => setColor('rose')} className='h-full w-1/6 rounded-lg bg-rose-500'></button>
    // </div>
    // </div>
  );
};
