// React
import { useEffect } from "react";

// Store
import { useSMStore } from "../store/useSMStore";

// Services
import { loadStudyMaterialTopicTree } from "../services/loadStudyMaterialTopicTree";
import { loadTopicContent } from "../services/loadTopicContent";
import { loadTextContent } from "../services/loadTextContent";

// Layout and Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import { Modal } from "../../../../components/Modal";
import TopicContentPanel from "../components/TopicContentPanel";
import TopicTreeView from "../../../shared/components/TopicTreeView";
import TextContentModalView from "../components/TextContentModalView";
import MediaContentModalView from "../components/MediaContentModalVIew";
import { MdClose } from "react-icons/md";
import cn from "../../../../utils/classNames";

/**
 * SMTopicListPage displays a list of study material topics and their content.
 * Handles topic selection, content loading, and layout rendering.
 */
const StudyMaterials = () => {
  const reset = useSMStore((state) => state.reset);
  const resetSelectedTopic = useSMStore((state) => state.resetSelectedTopic);
  const topicTree = useSMStore((state) => state.topicTree);
  const selectedTopic = useSMStore((state) => state.selectedTopic);
  const setSelectedTopic = useSMStore((state) => state.setSelectedTopic);
  const selectedContent = useSMStore((state) => state.selectedContent);
  const setSelectedContent = useSMStore((state) => state.setSelectedContent);
  const textContent = useSMStore((state) => state.textContent);

  // ========== Initial Load ==========
  useEffect(() => {
    loadStudyMaterialTopicTree();
    return reset;
  }, []);

  // ========== Load Topic Content on Topic Select ==========
  useEffect(() => {
    if (selectedTopic?.topicId) {
      loadTopicContent();
    }
  }, [selectedTopic?.topicId]);

  // ========== Load Text Content on Content Select ==========
  useEffect(() => {
    if (
      selectedContent?.id &&
      selectedContent.contentType === "Text" &&
      textContent?.id !== selectedContent?.id
    ) {
      loadTextContent();
    }
  }, [selectedContent?.id]);

  // ========== Render ==========
  return (
    <div className="h-full flex flex-col flex-grow">
      {/* Header */}
      <div className="flex items-center gap-4">
        <h3 className="!font-bold items-end">Select Your Topic</h3>
      </div>

      {/* Body */}
      <div className="mt-5 h-full overflow-y-auto">
        <ChildLayout
          primaryContent={
            <TopicTreeView
              topics={topicTree || []}
              onClickHandler={setSelectedTopic}
              getId={(t) => t.topicId}
              getLabel={(t) => t.topicName}
              getChildren={(t) => t.children}
            />
          }
          secondaryContent={<TopicContentPanel />}
          hideSecondary={!selectedTopic || selectedContent !== null}
          onSecondaryHide={resetSelectedTopic}
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

export default StudyMaterials;
