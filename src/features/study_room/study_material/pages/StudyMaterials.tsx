// React
import { useEffect } from "react";

// Icons
import { MdClose } from "react-icons/md";

// Utils
import cn from "../../../../utils/classNames";
import { flattenTopics } from "../../../shared/utils/flattenTopicTree";

// Hooks
import useStudyMaterial from "../hooks/useStudyMaterial";

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
const StudyMaterials = () => {
  const {
    reset,
    topicTree,
    setTopicTree,
    setTopicFlatList,
    contentFilterType,
    topicContentList,
    setTopicContentList,
    getSelectedTopic,
    setSelectedTopicId,
    selectedContent,
    setSelectedContent,
    textContent,
    setTextContent,
  } = useStudyMaterial();

  const selectedTopic = getSelectedTopic();

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
        <h3 className="!font-bold items-end">Select Your Topic</h3>
      </div>

      {/* Body */}
      <div className="mt-5 h-full overflow-y-auto">
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

export default StudyMaterials;
