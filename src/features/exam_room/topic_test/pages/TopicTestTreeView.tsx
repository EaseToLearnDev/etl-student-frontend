import { useEffect, useState } from "react";
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import TopicTreeView from "../../../shared/components/TopicTreeView";
import { loadTopicTestTree } from "../services/loadTopicTestTree";
import { useTTStore } from "../store/useTTStore";
import { MdArrowBack } from "react-icons/md";
import cn from "../../../../utils/classNames";
import { capitalizeWords } from "../../../../utils";
import TestCardList from "../../../shared/components/TestCardList";
import TopicTestInstructions from "../components/TopicTestInstructions";
import { loadTopicTestList } from "../services/loadTopicTestList";
import useIsMobile from "../../../../hooks/useIsMobile";

const TopicTestTreeView = () => {
  // Hooks
  const isMobile = useIsMobile();

  // Stores
  const reset = useTTStore((state) => state.reset);
  const topicTree = useTTStore((state) => state.topicTree);
  const selectedTopic = useTTStore((state) => state.selectedTopic);
  const setSelectedTopic = useTTStore((state) => state.setSelectedTopic);
  const resetSelectedTopic = useTTStore((state) => state.resetSelectedTopic);
  const testList = useTTStore((state) => state.testList);

  // States
  const [hideSecondary, setHideSecondary] = useState<boolean>(
    isMobile ? true : false
  );

  // useEffects
  useEffect(() => {
    loadTopicTestTree();
    return reset;
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      loadTopicTestList(selectedTopic);
    }
  }, [selectedTopic]);

  return (
    <div className="h-full flex flex-col flex-grow">
      {/* Header */}
      <div className="flex items-center gap-4">
        {selectedTopic && (
          <div
            onClick={resetSelectedTopic}
            className={cn(
              "w-[34px] h-[34px] aspect-square flex justify-center items-center cursor-pointer",
              "border-1 border-[var(--border-primary)] rounded-full hover:bg-[var(--surface-bg-secondary)]"
            )}
          >
            <MdArrowBack size={20} className="text-[var(--text-primary)]" />
          </div>
        )}
        <h3 className="!font-bold items-end text-ellipsis line-clamp-2">
          {selectedTopic
            ? capitalizeWords(selectedTopic?.topicName)
            : "Select Your Topic"}
        </h3>
      </div>

      <div className="mt-5 h-full overflow-y-auto">
        {selectedTopic && testList && testList?.length > 0 ? (
          <ChildLayout
            primaryContent={
              <TestCardList
                tests={testList || []}
                infoClickHandler={() => setHideSecondary(false)}
              />
            }
            secondaryContent={
              <TopicTestInstructions
                title={capitalizeWords(selectedTopic.topicName)}
              />
            }
            hideSecondary={hideSecondary}
            onSecondaryHide={() => setHideSecondary(true)}
          />
        ) : (
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
            hideSecondary={true}
          />
        )}
      </div>
    </div>
  );
};

export default TopicTestTreeView;
