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
import { Skeleton } from "../../../../components/SkeletonLoader";
import { useLoadingStore } from "../../../../hooks/useLoadingStore";
import { TreeViewSkeleton } from "../../../../components/TreeViewSkeleton";
import NoCopyWrapper from "../../../../global/noCopyWrapper";
import UpgradeModal from "../../../shared/components/UpgradeModal";
import useUpgradeModalStore from "../../../shared/hooks/useUpgradeModalStore";
import { getActiveCourseAccessStatus } from "../../../../global/services/upgrade";
import EmptyState from "../../../../components/EmptyState";
import type { ContentType } from "recharts/types/component/Label";
import canOpenContent from "../services/canOpenContent";
import type { Content } from "../sm.types";
import { useContentLimitStore } from "../hooks/useContentLimitStore";
import { useStudentStore } from "../../../shared/hooks/useStudentStore";
import LimitReachedModal from "../components/LimitReachedModal";

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
  const loading = useLoadingStore((s) => s.loading);
  const isUpgradeModalOpen = useUpgradeModalStore((s) => s.isUpgradeModalOpen);
  const activeCourse = useStudentStore((s) => s.activeCourse);

  // Actions
  const setTopicTree = useSMStore((s) => s.setTopicTree);
  const setTopicFlatList = useSMStore((s) => s.setTopicFlatList);
  const setTopicContentList = useSMStore((s) => s.setTopicContentList);
  const setSelectedTopicId = useSMStore((s) => s.setSelectedTopicId);
  const setSelectedContent = useSMStore((s) => s.setSelectedContent);
  const setTextContent = useSMStore((s) => s.setTextContent);
  const setIsUpgradeModalOpen = useUpgradeModalStore(
    (s) => s.setIsUpgradeModalOpen
  );
  const setLimits = useContentLimitStore((s) => s.setLimits);
  const addOrUpdateCounter = useContentLimitStore((s) => s.addOrUpdateCounter);
  const setIsLimitReachedmodalOpen = useContentLimitStore(
    (s) => s.setIsLimitReachedmodalOpen
  );
  const resetLimitReachedModal = useContentLimitStore((s) => s.reset);

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
    return () => {
      reset();
      resetLimitReachedModal();
    };
  }, []);

  // ========== Update selected topic on change ==========
  useEffect(() => {
    setSelectedTopic(getSelectedTopic());
  }, [selectedTopicId]);

  // ========== Load Topic Content on Topic Select ==========
  useEffect(() => {
    const getContentList = async () => {
      if (selectedTopic?.topicId) {
        const contentList = await loadTopicContent(selectedTopic);
        setTopicContentList(contentList?.list);
        setLimits(contentList?.contentLimit);
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

  const handleContentSelection = (content: Content) => {
    if (!activeCourse) return;

    if (getActiveCourseAccessStatus() === "renew") {
      setIsUpgradeModalOpen(true);
      return;
    }

    // Check if content limit has reached or not
    if (canOpenContent(activeCourse.courseId, content)) {
      addOrUpdateCounter(
        activeCourse.courseId,
        content.contentType,
        content.id
      );
      // update selected content and reset text content
      // if content is type 'Text' then text content will be retrieved from api call
      setSelectedContent(content);
      setTextContent(null);
    } else {
      // Show "Limit Reached" Modal
      setIsLimitReachedmodalOpen(true);
    }
  };

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
            loading && (!topicTree || topicTree.length === 0) ? (
              <>
                <TreeViewSkeleton />
              </>
            ) : (
              <TopicTreeView
                topics={topicTree || []}
                selectedTopic={selectedTopic}
                onClickHandler={(t) =>
                  setSelectedTopicId(t ? t?.topicId : null)
                }
                getId={(t) => t.topicId}
                getLabel={(t) => t.topicName}
                getChildren={(t) => t.children}
              />
            )
          }
          secondaryContent={
            loading ? (
              <div className="mt-4 space-y-3 p-4">
                <Skeleton height={80} variant="rounded" />
                <Skeleton height={80} variant="rounded" />
                <Skeleton height={80} variant="rounded" />
                <Skeleton height={80} variant="rounded" />
                <Skeleton height={80} variant="rounded" />
                <Skeleton height={80} variant="rounded" />
              </div>
            ) : !topicContentList ||
              topicContentList.length === 0 ||
              !selectedTopic ? (
              <EmptyState title="No Study Material Available" />
            ) : (
              <TopicContentPanel
                setSelectedContent={handleContentSelection}
                topicContentList={topicContentList}
                selectedTopic={selectedTopic}
                contentFilterType={contentFilterType}
              />
            )
          }
          hideSecondary={
            !selectedTopic || selectedContent !== null || isUpgradeModalOpen
          }
          onSecondaryHide={() => setSelectedTopicId(null)}
        />
      </div>

      {/* Modal for Selected Content */}
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

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />

      <LimitReachedModal />
    </div>
  );
};

export default StudyMaterialsPage;
