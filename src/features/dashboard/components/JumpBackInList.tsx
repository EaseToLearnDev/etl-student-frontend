import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import type { JumpBackInCardType } from "../dashboard.types";
import JumpBackInCard from "./JumpBackInCard";

const JumpBackInList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const dummyData: JumpBackInCardType[] = [
    { subject: "Physics", topicTitle: "Motions-Speed", progress: 80 },
    { subject: "Chemistry", topicTitle: "Reactions-Types", progress: 95 },
    { subject: "Chemistry", topicTitle: "Acid and Bases", progress: 75 },
    { subject: "Maths", topicTitle: "Algebra", progress: 60 },
    { subject: "Biology", topicTitle: "Human Heart", progress: 88 },
  ];

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
        <div className="flex items-center gap-4 text-white">
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
        {dummyData?.map((data, idx) => (
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
