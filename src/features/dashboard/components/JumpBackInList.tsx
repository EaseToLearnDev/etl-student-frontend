import { useRef, useState } from "react";

// Icons
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// Hooks
import { usePrevTestStore } from "../../shared/hooks/usePrevTestStore";

// Components
import JumpBackInCard from "./JumpBackInCard";
import EmptyState from "../../../components/EmptyState";
import EmptyGhostIcon from "../../../components/icons/empty-ghost-icon";
import PreviousTestModal from "./PreviousTestModal";
import { handleResumeTest } from "../../study_room/smart_learning/services/handleTest";
import { useNavigate } from "react-router";
import {
  LuClipboardX,
  LuFileClock,
  LuFilePenLine,
  LuFileQuestion,
} from "react-icons/lu";
import { pushToDataLayer } from "../../../utils/gtm";
import { gtmEvents } from "../../../utils/gtm-events";

const cancel_previous_test_modal_id = "cancel_previous_test_modal_id";
const JumpBackInList = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPreviousTestModalOpen, setIsPreviousTestModalOpen] =
    useState<boolean>(false);
  const prevRunningTest = usePrevTestStore((s) => s.prevRunningTest);
  const jump_back_in_button_id = "jump_back_in_button_id";

  // const scroll = (direction: "left" | "right") => {
  //   if (scrollRef.current) {
  //     const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 0;
  //     const gap = 20; // matches `gap-5` (5*4px = 20px)
  //     const scrollAmount = cardWidth + gap;
  //     scrollRef.current.scrollBy({
  //       left: direction === "left" ? -scrollAmount : scrollAmount,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  return (
    <div>
      {/* Scrollable list */}
      <div
        ref={scrollRef}
        className="max-w-full flex overflow-x-auto scrollbar-hide pt-4 scroll-smooth snap-x snap-mandatory"
      >
        {prevRunningTest?.testName ? (
          <div className="snap-start min-w-[250px] mr-5 last:mr-0">
            <JumpBackInCard
              onClick={() => {
                pushToDataLayer({
                  event: gtmEvents.jump_back_in_button_click,
                  id: jump_back_in_button_id,
                });

                setIsPreviousTestModalOpen(true);
              }}
              testType={prevRunningTest?.testMode || ""}
              topicTitle={prevRunningTest?.testName || ""}
            />
          </div>
        ) : (
          <div className="flex flex-col w-full items-center py-4">
            <EmptyState
              title="No previous tests available"
              description="No previous test data is available at the moment."
              icon={<LuFileClock className="w-20 h-20" />}
              className="max-w-md lg:max-w-sm"
            />
          </div>
        )}
      </div>
      <PreviousTestModal
        isOpen={isPreviousTestModalOpen}
        onResume={() => handleResumeTest(navigate, prevRunningTest)}
        onClose={() => {
          pushToDataLayer({
            event: gtmEvents.cancel_previous_test_modal_click,
            id: cancel_previous_test_modal_id
          
          });
          setIsPreviousTestModalOpen(false);
        }}
      />
    </div>
  );
};

export default JumpBackInList;
