import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Button from "../../../../components/Button";
import BottomNavigationSheet from "../../../../layouts/child-layout/components/BottomNavigationSheet";
import { useChildLayout } from "../../../../layouts/child-layout/hooks/useChildLayout";
import useDrawerStore from "../../../../store/useDrawerStore";
import { useState } from "react";
import AiChatPanel from "../AiChatPanel";
import {
  MAX_HEIGHT,
  MIN_HEIGHT,
} from "../../../../layouts/child-layout/constants";
import SectionWiseQuestionList from "../SectionWiseQuestionList";
import GlobalDrawer from "../../../../components/GlobalDrawer";
import useTestStore from "../../store/useTestStore";
import Question from "../Question";
import cn from "../../../../utils/classNames";
import Radio from "../../../../components/Radio";
import StatusGroup from "../StatusGroup";

const MobileTestSimulator = ({ title, timer }: any) => {
  // States
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  // Drawer Store
  const openDrawer = useDrawerStore((state) => state.openDrawer);

  // Test Store
  const currentQuestion = useTestStore((state) => state.getCurrentQuestion());
  const currentSection = useTestStore((state) =>
    state.sectionsUI.find((s) => s.sectionName === currentQuestion?.sectionName)
  );
  const currentResponse = useTestStore((s) =>
    currentQuestion ? s.questionResponseMap[currentQuestion?.questionId] : null
  );
  const setCurrentResponse = useTestStore((state) => state.setCurrentResponse);
  const goToPrev = useTestStore((state) => state.goToPrev);
  const goToNext = useTestStore((state) => state.goToNext);
  const markCurrentFoReview = useTestStore(
    (state) => state.markCurrentForReview
  );
  const clearCurrentResponse = useTestStore(
    (state) => state.clearCurrentResponse
  );

  // Hooks
  const {
    isSecondaryHidden,
    sheetHeight,
    dragging,
    onDragStart,
    handleSecondaryHide,
  } = useChildLayout(!isAiChatOpen, () => setIsAiChatOpen(false), 0.9);

  return (
    <div className="relative flex flex-col h-[100dvh]">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="size-[24px] rounded-full ">
            <MdChevronLeft size={22} />
          </div>
          <h3 className="text-ellipsis line-clamp-1">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button style="secondary">End Session</Button>
          <Button>Submit</Button>
        </div>
      </div>
      {/* Timer */}
      <div className="flex flex-col items-center mt-4">
        <span className="text-center">Time Remaining</span>
        <h2 className="text-center">{timer}</h2>
      </div>

      <div className="flex flex-col w-full h-full justify-between gap-2 p-2">
        {/* Section wise  horizontal question list */}
        <div className="w-full bg-[var(--surface-bg-primary)] rounded-[20px] p-5">
          <div className="flex flex-col justify-center gap-3 items-center">
            <h3 className="text-center">{currentQuestion?.sectionName}</h3>
            <div className="flex gap-2 justify-center overflow-x-auto">
              {currentSection?.questionList &&
              currentSection?.questionList?.length > 0 ? (
                currentSection?.questionList?.map((q, i: number) => (
                  <Question
                    key={q.questionId}
                    question={q}
                    questionNumber={i + 1}
                  />
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        {/* Active Question Section */}
        <div className="flex flex-1 flex-col w-full h-full bg-[var(--surface-bg-primary)] rounded-[20px] p-5 justify-between">
          <div className="flex flex-col">
            <h5>Questions</h5>
            <div className="flex flex-col gap-5 p-4">
              <h4>{currentQuestion?.questionBody}</h4>
            </div>
            <div className="flex flex-col gap-5 p-4">
              {currentQuestion?.responseChoice?.map((response, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Radio
                    text={response.responseText}
                    checked={
                      currentResponse?.responseId === response.responseId
                    }
                    onChange={(e) => {
                      const response = currentQuestion?.responseChoice?.find(
                        (r) => r.responseText === e.target.value
                      );
                      setCurrentResponse(response ?? null);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="w-full flex justify-center items-center gap-2">
            <div
              className={cn(
                "size-[40px] aspect-square flex justify-center items-center rounded-full border-1 border-[var(--border-primary)] cursor-pointer",
                "hover:bg-[var(--surface-bg-secondary)] active:bg-[var(--surface-bg-tertiary)] transition-all duration-200 ease-in-out"
              )}
              onClick={goToPrev}
            >
              <MdChevronLeft size={22} />
            </div>
            <Button
              style="secondary"
              className="!min-w-[50px]"
              onClick={clearCurrentResponse}
            >
              Clear
            </Button>
            <Button
              style="secondary"
              className="!min-w-[50px]"
              onClick={markCurrentFoReview}
            >
              Review
            </Button>
            <Button style="secondary" className="!min-w-[50px]">
              Save
            </Button>
            <div
              className={cn(
                "size-[40px] aspect-square flex justify-center items-center rounded-full border-1 border-[var(--border-primary)] cursor-pointer",
                "hover:bg-[var(--surface-bg-secondary)] active:bg-[var(--surface-bg-tertiary)] transition-all duration-200 ease-in-out"
              )}
              onClick={goToNext}
            >
              <MdChevronRight size={22} />
            </div>
          </div>
        </div>
      </div>
      {/* Tony AI */}
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
      <GlobalDrawer />
    </div>
  );
};

export default MobileTestSimulator;
