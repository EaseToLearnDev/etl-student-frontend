import { useRef, useState } from "react";
import ContributionChart from "./ContributionChart";
import Select from "../../../components/Select";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export const ActivityList = () => {
  //   const [color, setColor] = useState("green");
  const [year, setYear] = useState("2025");
  const [isOpen, setIsOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const yearOptions = ["2025", "2024", "2023", "2022", "2021", "2020"];

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
              items={yearOptions}
              selectedIndex={yearOptions.indexOf(year)}
              isOpen={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
              onSelect={(index) => setYear(yearOptions[index])}
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
        year={year}
        onDayClick={handleClickOnDay}
        scrollRef={scrollRef}
      />
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
