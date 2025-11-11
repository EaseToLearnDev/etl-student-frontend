import Badge from "../../../components/Badge";
import { Theme } from "../../../utils/colors";

interface JumpBackInCardProps {
  id?: string;
  topicTitle: string;
  testMode: string;
  onClick: () => void;
}
const JumpBackInCard = ({
  id,
  testMode,
  topicTitle,
  onClick,
}: JumpBackInCardProps) => {
  return (
    <div
      id ={id}
      className="w-full h-full rounded-lg overflow-hidden bg-[var(--surface-bg-primary)] cursor-pointer"
      onClick={onClick}
    >
      <img src={testMode === "Learning Session" ? "./gap-fixer-previous.jpg" : "./pacex-previous.jpg"} className="w-full h-[120px] object-cover" />
      <div className="flex flex-col gap-2 p-4">
        <Badge
          theme={Theme.Neutral}
          style="outline"
          className="w-fit !rounded-lg py-1 px-2 border !border-[var(--border-secondary)]"
        >
          <p>{testMode === "Learning Session" ? "Gap Fixer" : "PaceX"}</p>
        </Badge>
        <p className="font-medium">{topicTitle}</p>
      </div>
    </div>
  );
};

export default JumpBackInCard;
