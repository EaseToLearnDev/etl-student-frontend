import { useRef, useState } from "react";

// Icons
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// Hooks
import { usePrevTestStore } from "../../shared/hooks/usePrevTestStore";

// Components
import JumpBackInCard from "./JumpBackInCard";
import EmptyState from "../../../components/EmptyState";
import EmptyGhostIcon from "../../../components/icons/empty-ghost-icon";
import { Modal } from "../../../components/Modal";

const JumpBackInList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPreviousTestModalOpen, setIsPreviousTestModalOpen] = useState<boolean>(false);
  const prevRunningTest = usePrevTestStore((s) => s.prevRunningTest);

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

      {/* Scrollable list */}
      <div
        ref={scrollRef}
        className="max-w-full flex overflow-x-auto scrollbar-hide pt-4 scroll-smooth snap-x snap-mandatory"
      >
        {prevRunningTest ? (
          <div className="snap-start shrink-0 basis-[calc((100%-60px)/4)] mr-5 last:mr-0">
            <JumpBackInCard
              testType={prevRunningTest?.testMode || ""}
              topicTitle={prevRunningTest?.testName || ""}
            />
          </div>
        ) : (
          <EmptyState
            icon={<EmptyGhostIcon />}
            title="No Previous Tests Found"
          />
        )}
      </div>

      {/* <Modal isOpen={isPreviousTestModalOpen} onClose={() => setIsPreviousTestModalOpen(false)}>

      </Modal> */}
    </div>
  );
};

export default JumpBackInList;
