// React
import { useEffect } from "react";

// Store
import useTopicStore from "../../../shared/store/useTopicStore";
import { useSMStore } from "../store/useSMStore";

// Services
import { loadStudyMaterialTopicTree } from "../services/loadStudyMaterialTopicTree";
import { loadTopicContent } from "../services/loadTopicContent";

// Layout and Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import TopicContentPanel from "../components/TopicContentPanel";
import TopicTreeView from "../../../shared/components/TopicTreeView";


/**
 * SMTopicListPage displays a list of study material topics and their content.
 * Handles topic selection, content loading, and layout rendering.
 */
const SMTopicListPage = () => {
  const reset = useTopicStore((state) => state.reset);
  const topicTree = useSMStore((state) => state.topicTree);
  const selectedTopic = useSMStore((state) => state.selectedTopic);
  const setSelectedTopic = useSMStore((state) => state.setSelectedTopic);

  useEffect(() => {
    loadStudyMaterialTopicTree();
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    if (selectedTopic?.topicId) {
      loadTopicContent();
    }
  }, [selectedTopic?.topicId]);

  return (
    <div className="h-full flex flex-col flex-grow">
      <div className="flex items-center gap-4">
        <h3 className="!font-bold items-end">Select Your Topic</h3>
      </div>
      <div className="mt-5 h-full overflow-y-auto">
        <ChildLayout
          primaryContent={
            <TopicTreeView
              topics={topicTree || []}
              activeTopic={selectedTopic}
              onClickHandler={setSelectedTopic}
              getId={(t) => t.topicId}
              getLabel={(t) => t.topicName}
              getChildren={(t) => t.children}
            />
          }
          secondaryContent={<TopicContentPanel />}
          hideSecondary={!selectedTopic}
          onSecondaryHide={reset}
          secondaryInitialHeight={1}
        />
      </div>
    </div>
  );
};

export default SMTopicListPage;
