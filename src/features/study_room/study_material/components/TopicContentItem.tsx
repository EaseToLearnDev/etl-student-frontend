// Icons
import { PiStarFill } from "react-icons/pi";
import PDFIcon from "../../../../components/icons/pdf-solid-icon";

// Types
import type { ContentType } from "../../../shared/types";

type TopicContentItemProps = {
    content: ContentType;
}

/**
 * Renders a single topic content item displaying its title, description, PDF icon, and rating.
 *
 * @component
 * @param {TopicContentItemProps} props - The props for the component.
 * @param {ContentType} props.content - The content data to display, including title, description, and rating.
 * @returns {JSX.Element} The rendered topic content item component.
 *
 */
const TopicContentItem = ({ content }: TopicContentItemProps) => {
  return (
    <div className="flex gap-5 p-3 items-center border-1 border-[var(--border-secondary)] rounded-[8px] cursor-pointer hover:bg-[var(--surface-bg-secondary)]">
      <PDFIcon height={74} />
      <div className="w-full flex flex-col gap-1">
        <div className="w-full flex justify-between">
          <h6 className="!font-semibold text-ellipsis line-clamp-2">
            {content?.contentTitle}
          </h6>
          <div className="flex items-center gap-1">
            <PiStarFill className="w-4 fill-yellow-400 text-yellow-400" />
            <p>{content?.rating}</p>
          </div>
        </div>
        <p className="w-full text-ellipsis line-clamp-2">
          {content?.contentDescription}
        </p>
      </div>
    </div>
  );
};

export default TopicContentItem;
