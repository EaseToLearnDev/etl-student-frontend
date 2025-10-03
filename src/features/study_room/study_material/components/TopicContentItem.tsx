// Types
import type { Content } from "../sm.types";
import type { ReactNode } from "react";

// Icons
import DocIcon from "../../../../components/icons/doc-solid-icon";
import PDFIcon from "../../../../components/icons/pdf-solid-icon";
import PPTIcon from "../../../../components/icons/ppt-solid-icon";
import VideoIcon from "../../../../components/icons/video-solid-icon";

type TopicContentItemProps = {
  content: Content;
  onClickHandler?: (content: Content) => void;
};

/**
 * Renders a single topic content item displaying its title, description, PDF icon, and rating.
 *
 */
const TopicContentItem = ({
  content,
  onClickHandler,
}: TopicContentItemProps) => {
  const iconMap: Record<string, ReactNode> = {
    Text: <DocIcon height={74} />,
    PPT: <PPTIcon height={74} />,
    PDF: <PDFIcon height={74} />,
    Video: <VideoIcon height={74} />,
  };

  const icon = iconMap[content?.contentType || "Text"];

  return (
    <div
      onClick={() => onClickHandler?.(content)}
      className="flex gap-5 p-3 items-center border-1 border-[var(--border-secondary)] rounded-[8px] cursor-pointer hover:bg-[var(--surface-bg-secondary)]"
    >
      {icon}
      <div className="w-full flex flex-col gap-1">
        <div className="w-full">
          <h6 className="!font-semibold text-ellipsis line-clamp-2">
            {content?.contentTitle}
          </h6>
        </div>
        <div className="w-full flex gap-2 items-center">
          <p className="text-ellipsis line-clamp-2 text-[var(--text-secondary)]">
            {content?.contentType}
          </p>
          {content?.contentType && content?.language ? (
            <div className="w-1 h-1 rounded-full bg-[var(--text-primary)]" />
          ) : (
            <></>
          )}
          <p className="text-ellipsis line-clamp-2 text-[var(--text-secondary)]">
            {content?.language}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopicContentItem;
