import { MdClose } from "react-icons/md";
import { Modal } from "../../../components/Modal";
import cn from "../../../utils/classNames";
import { LuBot } from "react-icons/lu";
import Button from "../../../components/Button";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useAiStore } from "../store/useAiStore";
import { AIModalView } from "../test_simulator.types";
import WidgetCard from "../../report/components/newreports/WidgetCard";
import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { handleOpenAI } from "../services/handleOpenAI";
import useTestStore from "../store/useTestStore";
import { checkForTable } from "../../../utils";
import { goGoogle } from "../services/goGoogle";
import { useEffect } from "react";
import { getHelpContent } from "../services/getHelpContent";
import TopicContentItem from "../../study_room/study_material/components/TopicContentItem";
import useIsMobile from "../../../hooks/useIsMobile";
import { RiLoader4Fill } from "react-icons/ri";
import { loadTextContent } from "../../study_room/study_material/services/loadTextContent";
import NoCopyWrapper from "../../../global/noCopyWrapper";
import TextContentModalView from "../../study_room/study_material/components/TextContentModalView";
import MediaContentModalView from "../../study_room/study_material/components/MediaContentModalVIew";

interface AiHelpModalInterface {
  isOpen: boolean;
  onClose: () => void;
}

const Main = () => {
  const setCurrentModalView = useAiStore((s) => s.setCurrentModalView);
  const loading = useLoadingStore((s) => s.loading);
  const currentQuestion = useTestStore((s) => s.getCurrentQuestion());
  const incrementHelpCount = useTestStore((s) => s.incrementHelpCount);
  const setSolution = useAiStore((s) => s.setSolution);
  const testStatus = useTestStore((s) => s.testData?.testStatus);

  return (
    <div>
      <div className="flex items-center gap-2 mt-2">
        <img
          src="./tony.jpeg"
          alt="Tony AI"
          width={60}
          height={60}
          className="size-[60px] aspect-square rounded-full object-cover p-1 border border-[var(--border-primary)]"
        />
        <div className="flex flex-col">
          <h6>Tony AI Teacher</h6>
          <p className="text-[var(--text-secondary)]">
            Get detailed explanations and reasoning
          </p>
        </div>
      </div>
      <p className="text-[var(--text-secondary)] px-2 mt-4">
        Kindly prefer to search the answer first from your Books. Then ask
        <b className="text-[var(--sb-ocean-bg-active)]"> TONY</b>. Try to know
        the reasons of the answer and not only the answer.
      </p>

      <Button
        className="mt-7 w-full"
        disabled={loading}
        onClick={() =>
          handleOpenAI({
            questionId: currentQuestion?.questionId,
            itemId: currentQuestion?.itemId,
          }).then((v) => {
            setSolution(v ? v : "");
            setCurrentModalView(AIModalView.AIContent);
            incrementHelpCount();
          })
        }
      >
        {!loading ? (
          <>
            <LuBot size={20} /> {"Ask TONY (Your AI Teacher)"}
          </>
        ) : (
          <div className="flex items-center gap-2">
            <RiLoader4Fill size={20} className="animate-spin" />
            <p>Please Wait...</p>
          </div>
        )}
      </Button>

      {/* Secondary Actions */}
      {!testStatus || testStatus !== 1 ? (
        <div className="flex items-center gap-2 mt-4">
          <Button
            style="secondary"
            className="flex-1 hover:bg-[var(--surface-bg-tertiary)]"
            onClick={() =>
              goGoogle({
                questionText: currentQuestion?.questionBody,
                responseChoices: currentQuestion?.responseChoice,
              })
            }
          >
            <MagnifyingGlassIcon width={20} height={20} />
            Search Google
          </Button>
          <Button
            style="secondary"
            className="flex-1 hover:bg-[var(--surface-bg-tertiary)]"
            onClick={() =>
              setCurrentModalView(AIModalView.StudyMaterialContent)
            }
          >
            <BookOpenIcon width={20} height={20} />
            Study Material
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const AIContent = () => {
  const solution = useAiStore((s) => s.solution);
  const setCurrentModalView = useAiStore((s) => s.setCurrentModalView);

  return (
    <div>
      <div className="flex justify-between items-center gap-4 py-2">
        <div
          onClick={() => {
            setCurrentModalView(AIModalView.Main);
          }}
          className="flex gap-2 items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <p>Back</p>
        </div>
        <div className="flex items-center gap-2">
          <LuBot size={20} className="text-[var(--sb-ocean-bg-active)]" />
          <p className="text-[var(--text-secondary)]">Tony's Response</p>
        </div>
      </div>
      <WidgetCard className="w-full mt-2">
        {solution ? (
          <div
            className="text_content w-full min-h-[300px]"
            dangerouslySetInnerHTML={{
              __html: checkForTable(solution?.trim().replace(/[\r\n]+/g, "")),
            }}
          />
        ) : (
          <div className="w-full grid place-items-center min-h-[200px]">
            <h6 className="text-[var(--text-secondary)]">
              Our AI could not find solution for some reason. Try after sometime
            </h6>
          </div>
        )}
      </WidgetCard>
      <WidgetCard className="mt-4 bg-[var(--sb-sunglow-bg-disabled)] !p-4">
        <p className="!font-semibold">Disclaimer</p>
        <span className="text-[var(-text-secondary)]">
          Tony AI is an NLP model for increasing conceptual understanding and
          sometimes may give inaccurate answers more so in image-based
          questions. When in doubt, seek ETL teachers support in Report &
          Analytics. ETL Teacher would also respond if you have SKIPPED the
          question.
        </span>
      </WidgetCard>
    </div>
  );
};

const StudyMaterialContent = () => {
  const setCurrentModalView = useAiStore((s) => s.setCurrentModalView);
  const studyMaterial = useAiStore((s) => s.studyMaterial);
  const selectedContent = useAiStore((s) => s.selectedContent);
  const setSelectedContent = useAiStore((s) => s.setSelectedContent);
  const textContent = useAiStore((s) => s.textContent);
  const setTextContent = useAiStore((s) => s.setTextContent);
  // ========== Load Text Content on Content Select ==========
  useEffect(() => {
    const getTextContent = async () => {
      if (
        selectedContent?.id &&
        selectedContent.contentType === "Text" &&
        textContent?.id !== selectedContent?.id
      ) {
        const data = await loadTextContent(selectedContent);
        if (data) {
          setTextContent(data);
        }
      }
    };

    getTextContent();
  }, [selectedContent?.id]);

  return (
    <div>
      <div className="flex justify-between items-center gap-4 py-2">
        <div
          onClick={() => {
            setCurrentModalView(AIModalView.Main);
          }}
          className="flex gap-2 items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <p>Back</p>
        </div>
      </div>
      <WidgetCard className="min-h-fit max-h-[400px] w-full mt-2 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studyMaterial && studyMaterial?.length > 0 ? (
            studyMaterial?.map((content) => (
              <TopicContentItem
                key={content?.id}
                content={content}
                onClickHandler={() => {
                  setSelectedContent(content);
                }}
              />
            ))
          ) : (
            <div className="w-full grid place-items-center min-h-[100px]">
              <h6 className="text-[var(--text-secondary)]">
                No study materials available for this topic.
              </h6>
            </div>
          )}
        </div>
      </WidgetCard>
      {selectedContent && (
        <Modal
          isOpen={selectedContent !== null}
          onClose={() => {
            setSelectedContent(null);
            setTextContent(null);
          }}
          size="xl"
          className="p-4 lg:p-10"
          containerClassName="!h-full !w-full !max-w-full"
        >
          <>
            {selectedContent?.contentType === "Text" && textContent ? (
              <NoCopyWrapper className="w-full h-full">
                <TextContentModalView content={textContent} />
              </NoCopyWrapper>
            ) : (
              <NoCopyWrapper className="w-full h-full">
                <MediaContentModalView content={selectedContent} />
              </NoCopyWrapper>
            )}
            <div
              onClick={() => setSelectedContent(null)}
              className={cn(
                "fixed top-5 right-5 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
                "text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
              )}
            >
              <MdClose size={20} />
            </div>
          </>
        </Modal>
      )}
    </div>
  );
};

const AiHelpModal = ({ isOpen, onClose }: AiHelpModalInterface) => {
  const isMobile = useIsMobile();
  const currentModalView = useAiStore((s) => s.currentModalView);
  const setCurrentModalView = useAiStore((s) => s.setCurrentModalView);
  const testConfig = useTestStore((s) => s.testConfig);
  const currentQuestion = useTestStore((s) => s.getCurrentQuestion());
  const setStudyMaterial = useAiStore((s) => s.setStudyMaterial);
  const testName = useTestStore((s) => s.testData?.testName);

  // map enum to component
  const views = {
    [AIModalView.Main]: <Main />,
    [AIModalView.AIContent]: <AIContent />,
    [AIModalView.StudyMaterialContent]: <StudyMaterialContent />,
  };

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      if (!isOpen) return;
      const list = await getHelpContent({
        topicId: currentQuestion?.topicId,
        searchQuery: testConfig?.searchQuery,
        searchFlag: testConfig?.searchFlag,
      });
      if (list) {
        setStudyMaterial(list);
      }
    };
    fetchStudyMaterials();
    return () => setCurrentModalView(AIModalView.Main);
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={
        currentModalView === AIModalView.AIContent && !isMobile ? "xl" : "lg"
      }
      className="p-4"
      blur="none"
      noGutter
    >
      <div className="relative p-2 max-h-[90dvh]">
        {/* Top Header */}
        <div className="flex flex-col gap-4">
          <div className="sticky top-0 left-0 w-full p-4 bg-[var(--surface-bg-secondary)] flex justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center size-8 aspect-square bg-[var(--sb-ocean-bg-active)] rounded-md">
                <BookOpenIcon width={16} height={16} className="text-white" />
              </div>
              <h5 className="!font-bold text-ellipsis line-clamp-2">
                {testName || ""}
              </h5>
            </div>
            <div
              onClick={onClose}
              className={cn(
                "size-10 aspect-square flex justify-center items-center cursor-pointer",
                " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
              )}
            >
              <MdClose size={20} />
            </div>
          </div>

          {/* Main Body */}
          <div className="px-4 pb-4">{views[currentModalView]}</div>
        </div>
      </div>
    </Modal>
  );
};

export default AiHelpModal;
