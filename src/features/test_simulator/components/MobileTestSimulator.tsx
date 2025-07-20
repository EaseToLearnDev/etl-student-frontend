import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Button from "../../../components/Button";
import BottomNavigationSheet from "../../../layouts/child-layout/components/BottomNavigationSheet";
import { useChildLayout } from "../../../layouts/child-layout/hooks/useChildLayout";
import useDrawerStore from "../../../store/useDrawerStore";
import { useState } from "react";
import AiChatPanel from "./AiChatPanel";
import {
  MAX_HEIGHT,
  MIN_HEIGHT,
} from "../../../layouts/child-layout/constants";
import SectionWiseQuestionList from "./SectionWiseQuestionList";
import StatusGroup from "./StatusGroup";
import GlobalDrawer from "../../../components/GlobalDrawer";
import cn from "../../../utils/classNames";

const MobileTestSimulator = ({ title, timer, data }: any) => {
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const {
    isSecondaryHidden,
    sheetHeight,
    dragging,
    onDragStart,
    handleSecondaryHide,
  } = useChildLayout(!isAiChatOpen, () => setIsAiChatOpen(false), 0.9);
  const openDrawer = useDrawerStore((state) => state.openDrawer);

  // TODO REPLACE WITH STORE DATA (CURRENT SECTION QUESTIONS)
  const currentSectionQuestions =
    data?.obj?.[0]?.sectionSet?.[0]?.questionNumbers.map(
      ({ questionIndex, questionId }: any) => {
        const question = data.obj[0]?.questionSet?.find(
          (q: any) => q.questionId === questionId
        );
        return question ? { ...question, questionIndex } : null;
      }
    );

  return (
    <div className="relative flex flex-col h-[100dvh]">
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
      <div className="flex flex-col items-center mt-4">
        <span className="text-center">Time Remaining</span>
        <h2 className="text-center">{timer}</h2>
      </div>
      <div className="flex flex-col w-full h-full justify-between gap-2 p-2">
        <div className="w-full bg-[var(--surface-bg-primary)] rounded-[20px] p-5">
          <div className="flex flex-col justify-center gap-3 items-center">
            <h3 className="text-center">Physics</h3>
            <div className="flex gap-2 justify-center overflow-x-auto">
              {currentSectionQuestions?.map((q: any, i: number) => (
                <button
                  key={q.questionId}
                  className={cn(
                    "cursor-pointer min-w-[50px] min-h-[50px] max-w-[60px] max-h-[60px] rounded-[16px] flex justify-center items-center",
                    "border-1 border-[var(--border-primary)] hover:bg-[var(--surface-bg-secondary)] focus:bg-[var(--surface-bg-secondary)] active:bg-[var(--surface-bg-tertiary)]"
                  )}
                >
                  <span>Q{i + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col w-full h-full bg-[var(--surface-bg-primary)] rounded-[20px] p-5 justify-between">
          <div className="flex flex-col">
            <h5>Questions</h5>
            <div className="flex flex-col gap-5 p-4">
              <h4>
                {
                  "Let U = {10, 11, 12, 13, 14, 15, 16, 17}, A = {10, 11, 12} and B = {12, 14, 16} then find the value of (A U B )"
                }
              </h4>
            </div>
            <div className="flex flex-col gap-5 p-4">
              {["Option 1", "Option 2", "Option 2", "Option 3"]?.map(
                (option, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <label className="flex items-center gap-4 cursor-pointer w-full">
                      <input
                        name="option"
                        type="radio"
                        value={option}
                        className="appearance-none w-[14px] h-[14px] border-1 border-[var(--border-primary)] rounded-full outline-none transition-all duration-200 ease-in-out checked:bg-[var(--sb-ocean-bg-active)] checked:border-none checked:w-[16px] checked:h-[16px]"
                      />
                      <p className="select-none">{option}</p>
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-2">
            <div className="size-[40px] aspect-square flex justify-center items-center rounded-full border-1 border-[var(--border-primary)] cursor-pointer hover:bg-[var(--surface-bg-secondary)] active:bg-[var(--surface-bg-tertiary)] transition-all duration-200 ease-in-out">
              <MdChevronLeft size={22} />
            </div>
            <Button style="secondary" className="!min-w-[50px]">
              Clear
            </Button>
            <Button style="secondary" className="!min-w-[50px]">
              Review
            </Button>
            <Button style="secondary" className="!min-w-[50px]">
              Save
            </Button>
            <div className="size-[40px] aspect-square flex justify-center items-center rounded-full border-1 border-[var(--border-primary)] cursor-pointer hover:bg-[var(--surface-bg-secondary)] active:bg-[var(--surface-bg-tertiary)] transition-all duration-200 ease-in-out">
              <MdChevronRight size={22} />
            </div>
          </div>
        </div>
      </div>
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
