import Badge from "../../../components/Badge";
import { Theme } from "../../../utils/colors";
import type { JumpBackInCardType } from "../dashboard.types";

interface JumpBackInCardProps {
  data: JumpBackInCardType;
}
const JumpBackInCard = ({ data }: JumpBackInCardProps) => {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden bg-[var(--surface-bg-primary)]">
      <img src="/jump_in_card.png" className="w-full h-[120px] object-cover" />
      <div className="flex flex-col gap-2 p-4">
        <Badge
          theme={Theme.Neutral}
          style="outline"
          className="w-fit !rounded-lg p-2 border !border-[var(--border-secondary)]"
        >
          {data?.subject}
        </Badge>
        <h5>{data?.topicTitle}</h5>
        <p className="text-[var(--sb-ocean-bg-active)]">{`${data?.progress}% Complete`}</p>
      </div>
    </div>
  );
};

export default JumpBackInCard;
