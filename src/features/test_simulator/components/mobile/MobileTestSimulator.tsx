// React
import { useState } from "react";

// Icons
import { MdChevronLeft } from "react-icons/md";

// Constants
import {
  MAX_HEIGHT,
  MIN_HEIGHT,
} from "../../../../layouts/child-layout/constants";

// Store
import useDrawerStore from "../../../../store/useDrawerStore";

// Services & Utils
import { getTimeFromSeconds } from "../../services/TestSimulator.services";

// Layouts & Components
import { useChildLayout } from "../../../../layouts/child-layout/hooks/useChildLayout";
import BottomNavigationSheet from "../../../../layouts/child-layout/components/BottomNavigationSheet";
import GlobalDrawer from "../../../../components/GlobalDrawer";
import TestHeader from "./TestHeader";
import StatusGroup from "../StatusGroup";
import AiChatPanel from "../AiChatPanel";
import SectionWiseQuestionList from "../SectionWiseQuestionList";
import SectionQuestionScroll from "./SectionQuestionScroll";
import ActiveQuestionPanel from "./ActiveQuestionPanel";
import useTestTimerStore from "../../store/useTestTimerStore";

/**
 * MobileTestSimulator is the main component for rendering the mobile view of the test simulator.
 */
const MobileTestSimulator = () => {
  // States
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  // Stores
  const openDrawer = useDrawerStore((state) => state.openDrawer);
  const remainingSec = useTestTimerStore((state) => state.remainingSec);
  const isExpired = useTestTimerStore((state) => state.isExpired);

  // Hooks
  const {
    isSecondaryHidden,
    sheetHeight,
    dragging,
    onDragStart,
    handleSecondaryHide,
  } = useChildLayout(!isAiChatOpen, () => setIsAiChatOpen(false), 0.9);

  const formattedTime = getTimeFromSeconds(remainingSec);

  return (
    <div className="relative flex flex-col h-[100dvh]">
      {/* Header */}
      <TestHeader />
      {/* Timer */}
      <div className="flex flex-col items-center mt-4">
        <span className="text-center">Time Remaining</span>
        <h2 className="text-center">
          {isExpired ? "Time's Up" : formattedTime}
        </h2>
      </div>

      <div className="flex flex-col w-full h-full justify-between gap-2 p-2">
        {/* Horizontal Section-wise Question List */}
        <SectionQuestionScroll />
        {/* Active Question Section */}
        <ActiveQuestionPanel />
      </div>

      {/* Tony AI Floating Button */}
      <div
        className="fixed bottom-[120px] right-[32px] flex flex-col items-center gap-1"
        onClick={() => {
          setIsAiChatOpen(true);
        }}
      >
        <div className="cursor-pointer size-[60px] bg-cyan-300 dark:bg-cyan-700 rounded-full flex justify-center items-center">
          <img
            src="/tony-logo.svg"
            alt="Tony AI"
            width={50}
            height={50}
            className="!size-[50px] object-cover"
          />
        </div>
        <span className="font-semibold !text-xs">TONY AI</span>
      </div>

      {/* Bottom Navigation for tony AI Chat Window */}
      <BottomNavigationSheet
        sheetContent={<AiChatPanel />}
        sheetHeight={sheetHeight}
        MAX_HEIGHT={MAX_HEIGHT}
        MIN_HEIGHT={MIN_HEIGHT}
        dragging={dragging}
        handleSheetHidden={handleSecondaryHide}
        isSheetHidden={isSecondaryHidden}
        onDragStart={onDragStart}
      />

      {/* Trigger for opening the question list side panel */}
      <div
        className="fixed top-[110px] right-0 size-[30px] bg-[var(--text-primary)] active:bg-[var(--text-secondary)] text-[var(--surface-bg-primary)] rounded-l-lg flex justify-center items-center "
        onClick={() =>
          openDrawer({
            view: (
              <div className="fixed w-full h-full flex flex-col py-5 gap-5 items-center bg-[var(--surface-bg-secondary)]">
                <h3 className="text-center">Questions</h3>
                <SectionWiseQuestionList />
                <StatusGroup />
              </div>
            ),
            placement: "right",
            containerClassName: "!w-[350px]",
          })
        }
      >
        <MdChevronLeft size={22} />
      </div>

      {/* Enable Global Drawer */}
      <GlobalDrawer />
    </div>
  );
};

export default MobileTestSimulator;
