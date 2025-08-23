
// React
import { useEffect, useRef, useState } from "react";

// Types
import type { TextContentType } from "../sm.types";

// Icons
import { MdArrowUpward } from "react-icons/md";

// Hooks
import useIsMobile from "../../../../hooks/useIsMobile";

// Utils
import { checkForTable, checkVisible } from "../../../../utils";
import cn from "../../../../utils/classNames";

// Services
import { buildNestedList } from "../services/buildNestedList";

// Components
import NestedList from "./NestedList";

interface TextContentModalViewProps {
  content: TextContentType;
}

/**
 * Modal view component for displaying text content with a table of contents and scroll-to-top functionality.
 */
const TextContentModalView = ({ content }: TextContentModalViewProps) => {
  const list = buildNestedList(content?.links);
  const isMobile = useIsMobile();

  const tocRef = useRef<HTMLDivElement | null>(null);
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const [tocVisible, setTocVisible] = useState(true);

  useEffect(() => {
    if (!isMobile || !scrollableRef.current || !tocRef.current) return;

    const handleScroll = () => {
      const visible = checkVisible(tocRef.current!);
      setTocVisible(visible);
    };

    handleScroll(); // initial check

    const container = scrollableRef.current;
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => container.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const scrollToTop = () => {
    scrollableRef?.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={scrollableRef}
      className="relative focus:outline-none w-full flex flex-col lg:flex-row gap-5 max-h-full overflow-y-auto lg:overflow-hidden px-2 lg:px-0"
    >
      {/* Sidebar */}
      {list && list?.length > 0 && (
        <div
          ref={tocRef}
          className="w-full min-h-[400px] lg:w-[35%] xl:w-[25%] 2xl:w-[20%] border-1 border-[var(--border-primary)] rounded-xl overflow-hidden p-4 flex flex-col"
        >
          <h5 className="!font-bold">Table of Contents</h5>
          <div className="mt-4 flex flex-col gap-3 flex-1 overflow-y-auto pb-[50px]">
            <NestedList items={list} />
          </div>
        </div>
      )}
      {/* Content */}
      <div className="flex-1 w-full max-h-full lg:overflow-y-auto flex flex-col items-center lg:px-[50px]">
        <h1 className="!font-bold my-5 text_content_heading">
          {content?.contentTitle}
        </h1>
        <div
          className="text_content w-full"
          dangerouslySetInnerHTML={{
            __html: checkForTable(
              content?.description.trim().replace(/[\r\n]+/g, "")
            ),
          }}
        />
      </div>
      {/* Go to top Arrow */}
      {isMobile && list && !tocVisible && (
        <div
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-5 right-5 w-[50px] h-[50px] aspect-square flex justify-center items-center",
            " border-1 border-[var(--border-primary)] bg-[var(--surface-bg-primary)] rounded-full"
          )}
        >
          <MdArrowUpward size={18} />
        </div>
      )}
    </div>
  );
};

export default TextContentModalView;
