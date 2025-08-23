// React
import { useEffect, useState } from "react";

// Types
import type { Topic } from "../../../shared/types";

// Icons
import { MdClose } from "react-icons/md";

// Hooks
import { useSMStore } from "../hooks/useSMStore";

// Utils
import cn from "../../../../utils/classNames";
import { flattenTopics } from "../../../shared/utils/flattenTopicTree";

// Services
import { loadStudyMaterialTopicTree } from "../services/loadStudyMaterialTopicTree";
import { loadTopicContent } from "../services/loadTopicContent";
import { loadTextContent } from "../services/loadTextContent";

// Layout and Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import TopicTreeView from "../../../shared/components/TopicTreeView";
import { Modal } from "../../../../components/Modal";
import TopicContentPanel from "../components/TopicContentPanel";
import TextContentModalView from "../components/TextContentModalView";
import MediaContentModalView from "../components/MediaContentModalVIew";

/**
 * SMTopicListPage displays a list of study material topics and their content.
 */
const StudyMaterialsPage = () => {
  // Helpers
  const getSelectedTopic = useSMStore((s) => s.getSelectedTopic);
  const reset = useSMStore((s) => s.reset);

  // State
  const topicTree = useSMStore((s) => s.topicTree);
  const selectedTopicId = useSMStore((s) => s.selectedTopicId);
  const topicContentList = useSMStore((s) => s.topicContentList);
  const contentFilterType = useSMStore((s) => s.contentFilterType);
  const selectedContent = useSMStore((s) => s.selectedContent);
  const textContent = useSMStore((s) => s.textContent);

  // Actions
  const setTopicTree = useSMStore((s) => s.setTopicTree);
  const setTopicFlatList = useSMStore((s) => s.setTopicFlatList);
  const setTopicContentList = useSMStore((s) => s.setTopicContentList);
  const setSelectedTopicId = useSMStore((s) => s.setSelectedTopicId);
  const setSelectedContent = useSMStore((s) => s.setSelectedContent);
  const setTextContent = useSMStore((s) => s.setTextContent);

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  // ========== Initial Topic Tree ==========
  useEffect(() => {
    const getTopicTree = async () => {
      const data = await loadStudyMaterialTopicTree();
      if (data) {
        setTopicTree(data);
        const flatList = flattenTopics(data);
        setTopicFlatList(flatList);
      }
    };
    getTopicTree();
    return reset;
  }, []);

  useEffect(() => {
    setSelectedTopic(getSelectedTopic());
  }, [selectedTopicId]);

  // ========== Load Topic Content on Topic Select ==========
  useEffect(() => {
    const getContentList = async () => {
      if (selectedTopic?.topicId) {
        const contentList = await loadTopicContent(selectedTopic);
        setTopicContentList(contentList);
      }
    };
    getContentList();
  }, [selectedTopic?.topicId]);

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

  // ========== Render ==========
  return (
    <div className="h-full flex flex-col flex-grow">
      {/* Header */}
      <div className="flex items-center gap-4">
        <h5 className="!font-semibold pl-2 items-end">Select Your Topic</h5>
      </div>
      {/* Body */}
      <div className="mt-4 h-full overflow-y-auto">
        <ChildLayout
          primaryContent={
            <TopicTreeView
              topics={topicTree || []}
              selectedTopic={selectedTopic}
              onClickHandler={(t) => setSelectedTopicId(t ? t?.topicId : null)}
              getId={(t) => t.topicId}
              getLabel={(t) => t.topicName}
              getChildren={(t) => t.children}
            />
          }
          secondaryContent={
            topicContentList && selectedTopic ? (
              <TopicContentPanel
                setSelectedContent={setSelectedContent}
                topicContentList={topicContentList}
                selectedTopic={selectedTopic}
                contentFilterType={contentFilterType}
              />
            ) : (
              <></>
            )
          }
          hideSecondary={!selectedTopic || selectedContent !== null}
          onSecondaryHide={() => setSelectedTopicId(null)}
          secondaryInitialHeight={1}
        />
      </div>

      {/* Modal for Selected Content */}
      {selectedContent && (
        <Modal
          isOpen={selectedContent !== null}
          onClose={() => setSelectedContent(null)}
          size="xl"
          className="p-4 lg:p-10"
          containerClassName="!h-full !w-full !max-w-full"
        >
          <>
            {selectedContent?.contentType === "Text" && textContent ? (
              <TextContentModalView content={textContent} />
            ) : (
              <MediaContentModalView content={selectedContent} />
            )}
            <div
              onClick={() => setSelectedContent(null)}
              className={cn(
                "fixed top-5 right-5 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
                " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
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

export default StudyMaterialsPage;
