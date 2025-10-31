// Types
import Button from "../../../../components/Button";
import type { Topic } from "../../../shared/types";

// Interfaces
interface AdaptiveSecondaryPanelProps {
  selectedTopic: Topic;
  onClickHandler: () => void;
}

const AdaptiveSecondary = ({
  selectedTopic,
  onClickHandler,
}: AdaptiveSecondaryPanelProps) => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <h6 className="!font-semibolt text-ellipsis line-clamp-2">
        {selectedTopic?.topicName}
      </h6>
      <div className="absolute bottom-0 left-0 right-0 pb-4 px-4 flex justify-center items-center bg-[var(--surface-bg-primary)]">
        <Button className="w-full" style="primary" onClick={onClickHandler}>
          Start Learning
        </Button>
      </div>
    </div>
  );
};

export default AdaptiveSecondary;
