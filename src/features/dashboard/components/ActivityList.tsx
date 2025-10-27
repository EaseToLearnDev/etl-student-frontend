import { useEffect, useRef, useState } from "react";

// Icons
import { LuActivity, LuCalendarMinus2, LuFilePenLine } from "react-icons/lu";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// Utils
import { normalizeGhHeatmapAPIData } from "../utils/normalizeGhHeatmapAPIData";
import { seggregateGhHeatmapData } from "../utils/seggregateGhHeatmapData";
import {
  generateColorsForGhHeatmap,
  Seed,
} from "../utils/generateColorsForGhHeatmap";
import {
  transformNormalizeGhData,
  type ITransformedGhData,
} from "../utils/transformNormalizeGhData";

// Hooks
import useDarkModeStore from "../../../store/useDarkModeStore";

// Components
import ContributionChart from "./ContributionChart";
import Select from "../../../components/Select";
import { Skeleton } from "../../../components/SkeletonLoader";
import EmptyState from "../../../components/EmptyState";

interface IActivityListProps {
  yearsOptions: number[] | null;
  apiData: ITransformedGhData[][] | null;
  year: number | null;
  setYear: any;
  color: string;
  setColor: (val: string) => void;
  loadingGhActivity: boolean;
  loadingGhActivityYears: boolean;
  handleClickOnDay: (day: any) => void;
}

export const ActivityList = ({
  yearsOptions,
  apiData,
  year,
  setYear,
  loadingGhActivity,
  loadingGhActivityYears,
  color,
  setColor,
  handleClickOnDay,
}: IActivityListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useDarkModeStore();
  const currentYear = new Date().getFullYear();

  const normalizedGhAPIData = normalizeGhHeatmapAPIData(apiData, year);
  const transformedData = transformNormalizeGhData(normalizedGhAPIData, year);
  const renderableData = seggregateGhHeatmapData(transformedData);


  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.scrollWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -containerWidth : containerWidth,
        behavior: "smooth",
      });
    }
  };

  const getLegendColors = () => {
    const colorEntry =
      generateColorsForGhHeatmap(color as Seed)[color] ||
      generateColorsForGhHeatmap("green" as Seed).green;
    return darkMode ? colorEntry.dark : colorEntry.light;
  };

  const [c0, c1, c2, c3, c4, c5] = getLegendColors();
  const legendColors = [c0, c1, c2, c3, c4, c5];

  return (
    <>
      <div className="w-full mb-4 flex items-start justify-between mt-5">
        <div>
          <label
            htmlFor="choose-year"
            className="block mb-2 text-[var(--text-secondary)]"
          >
            Choose Year
          </label>
          <div className="relative flex items-center w-40">
            {loadingGhActivityYears ? (
              <Skeleton width="120px" height="40px" className="rounded-lg" />
            ) : (
              <Select
                type="Year"
                items={yearsOptions ? yearsOptions : []}
                selectedIndex={
                  yearsOptions
                    ? yearsOptions?.indexOf(year ? year : currentYear)
                    : null
                }
                isOpen={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
                onSelect={(index) =>
                  setYear(yearsOptions ? yearsOptions[index] : null)
                }
                className="w-full"
                dropdownClassName="w-40"
              />
            )}
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

      {loadingGhActivity ? (
        <Skeleton width="100%" height="40%" className="rounded-lg mb-3" />
      ) : (
        <ContributionChart
          color={color}
          renderableData={renderableData}
          darkMode={darkMode}
          onDayClick={handleClickOnDay}
          scrollRef={scrollRef}
          scroll={scroll}
        />
      )}
      <div className="flex items-center justify-end gap-3 mt-2 text-[var(--text-tertiary)]">
        <span>Less</span>
        <div className="flex items-center justify-center gap-1">
          {legendColors.map((c, i) => {
            return <div key={i} className={`w-4 h-4 rounded-sm ${c}`}></div>;
          })}
        </div>
        <span>More</span>
      </div>
    </>
  );
};
