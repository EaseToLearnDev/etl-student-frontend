import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import type { JumpBackInCardType } from "../dashboard.types";
import JumpBackInCard from "./JumpBackInCard";
import { loadPreviousRunningTest } from "../../shared/services/loadPreviousRunningTest";
import type { PrevRunningTest } from "../../shared/types";

const JumpBackInList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [data, setdata] = useState<PrevRunningTest | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadPreviousRunningTest();
      if(data) {
        setdata(data);
      }
    } 
    fetchData();
  }, [])

const cardData: JumpBackInCardType[] = 
  data
    ? [{
        subject: data.testMode || "",
        topicTitle: data.testName || "",
      }]
    : [];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 0;
      const gap = 20; // matches `gap-5` (5*4px = 20px)
      const scrollAmount = cardWidth + gap;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      {/* Header with nav buttons */}
      <div className="flex justify-between items-center">
        <h5>Jump Back In</h5>
        <div className="flex items-center gap-4 text-[var(--text-primary)]">
          <button
            onClick={() => scroll("left")}
            className="size-7 flex justify-center items-center border border-[var(--border-secondary)] rounded-md transition"
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="size-7 flex justify-center items-center border border-[var(--border-secondary)] rounded-md transition"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>

      {/* Scrollable list */}
      <div
        ref={scrollRef}
        className="max-w-full flex overflow-x-auto scrollbar-hide pt-4 scroll-smooth snap-x snap-mandatory"
      >
        {cardData?.map((data, idx) => (
          <div
            key={idx}
            className="snap-start shrink-0 basis-[calc((100%-60px)/4)] mr-5 last:mr-0"
          >
            <JumpBackInCard data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JumpBackInList;
