// Icons
import { MdArrowBack, MdChevronLeft } from "react-icons/md";

// Constants
// import {
//   MAX_HEIGHT,
//   MIN_HEIGHT,
// } from "../../../../layouts/child-layout/constants";

// Store
import useDrawerStore from "../../../../store/useDrawerStore";

// Layouts & Components
// import { useChildLayout } from "../../../../layouts/child-layout/hooks/useChildLayout";
// import BottomNavigationSheet from "../../../../layouts/child-layout/components/BottomNavigationSheet";
import GlobalDrawer from "../../../../components/GlobalDrawer";
import TestHeader from "./TestHeader";
import StatusGroup from "../StatusGroup";
// import AiChatPanel from "../AiChatPanel";
import SectionWiseQuestionList from "../SectionWiseQuestionList";
import SectionQuestionScroll from "./SectionQuestionScroll";
import ActiveQuestionPanel from "../ActiveQuestionPanel";
import useTestStore from "../../store/useTestStore";

/**
 * MobileTestSimulator is the main component for rendering the mobile view of the test simulator.
 */
const MobileTestSimulator = () => {
  // Stores
  const openDrawer = useDrawerStore((state) => state.openDrawer);
  const closeDrawer = useDrawerStore((state) => state.closeDrawer);
  const mode = useTestStore((state) => state.testMode);
  // Hooks
  // const {
  //   isSecondaryHidden,
  //   sheetHeight,
  //   dragging,
  //   onDragStart,
  //   handleSecondaryHide,
  // } = useChildLayout(!isAiChatOpen, () => setIsAiChatOpen(false), 0.9);

  return (
    <div className="relative flex flex-col h-[100dvh]">
      {/* Header */}
      {mode !== "review" ? <TestHeader /> : null}

      <div className="flex flex-col w-full h-full gap-2 p-2">
        {/* Horizontal Section-wise Question List */}
        <SectionQuestionScroll />
        {/* Active Question Section */}
        <div className="flex-1 w-full overflow-y-auto">
          <ActiveQuestionPanel />
        </div>
      </div>

      {/* Bottom Navigation for tony AI Chat Window
      <BottomNavigationSheet
        sheetContent={<AiChatPanel onClose={handleSecondaryHide} />}
        sheetHeight={sheetHeight}
        MAX_HEIGHT={MAX_HEIGHT}
        MIN_HEIGHT={MIN_HEIGHT}
        dragging={dragging}
        handleSheetHidden={handleSecondaryHide}
        isSheetHidden={isSecondaryHidden}
        onDragStart={onDragStart}
      /> */}

      {/* Trigger for opening the question list side panel */}
      <div
        className="fixed top-[110px] right-0 size-[30px] bg-[var(--text-primary)] active:bg-[var(--text-secondary)] text-[var(--surface-bg-primary)] rounded-l-lg flex justify-center items-center "
        onClick={() =>
          openDrawer({
            view: (
              <div className="w-full h-full flex flex-col p-4 gap-5 items-center bg-[var(--surface-bg-secondary)]">
                <div
                  className="w-full flex gap-3 items-center"
                  onClick={() => closeDrawer()}
                >
                  <div className="size-10 aspect-square border-1 border-[var(--border-primary)] flex justify-center items-center rounded-lg hover:bg-[var(--surface-bg-tertiary)]">
                    <MdArrowBack size={18} />
                  </div>
                  <h3>Questions</h3>
                </div>
                <SectionWiseQuestionList />
                <StatusGroup />
              </div>
            ),
            placement: "right",
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
