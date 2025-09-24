import { useState } from "react";
import { ChevronDownIcon, FolderIcon } from "@heroicons/react/24/outline";
import { MdClose } from "react-icons/md";
import cn from "../utils/classNames";
import { Modal } from "./Modal";
import MediaContentModalView from "../features/study_room/study_material/components/MediaContentModalVIew";

type Theme = "primary" | "success" | "warning" | "danger";

interface AccordionData {
  category: string;
  items: {
    title: string;
    videoLink?: string;
  }[];
}

interface AccordionProps {
  data: AccordionData[];
  className?: string;
  icon?: React.ReactNode;
  theme?: Theme;
}

const themeMap: Record<Theme, string> = {
  primary:
    "text-[var(--sb-ocean-bg-active)] hover:bg-[var(--sb-ocean-bg-disabled)]",
  success:
    "text-[var(--sb-green-haze-bg-active)] hover:bg-[var(--sb-green-haze-bg-disabled)]",
  warning:
    "text-[var(--sb-sunglow-bg-active)] hover:bg-[var(--sb-sunglow-bg-disabled)]",
  danger:
    "text-[var(--sb-valencia-bg-active)] hover:bg-[var(--sb-valencia-bg-disabled)]",
};

export default function Accordion({
  data,
  className,
  icon,
  theme = "primary",
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {data.map((section, index) => (
        <div key={index} className="w-full">
          <button
            onClick={() => toggle(index)}
            className="flex w-full items-center justify-between rounded bg-[var(--surface-bg-secondary)] px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <p className={cn("h-6 w-6", themeMap[theme])}>
                {icon || <FolderIcon className="h-6 w-6" />}
              </p>
              <h6 className={cn(themeMap[theme])}>{section.category}</h6>
            </div>
            <ChevronDownIcon
              className={cn(
                "h-4 w-4 transform transition-transform duration-300",
                openIndex === index && "rotate-180",
                themeMap[theme]
              )}
            />
          </button>

          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              openIndex === index
                ? "max-h-[1000px] opacity-100 p-2 bg-[var(--surface-bg-secondary)]"
                : "max-h-0 opacity-0"
            )}
          >
            <ul className="space-y-2">
              {section.items.map((item, idx) => (
                <li
                  key={idx}
                  className={cn(
                    "p-3 rounded cursor-pointer transition",
                    "cursor-default text-[var(--text-secondary)]"
                  )}
                  onClick={() =>
                    item.videoLink
                      ? setSelectedVideo(item.videoLink)
                      : undefined
                  }
                >
                  <h6
                    className={cn(
                      "cursor-pointer underline",
                      item.videoLink ?? "no-underline"
                    )}
                  >
                    {item.title}
                  </h6>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {selectedVideo && (
        <Modal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          className="p-4 lg:p-10"
          containerClassName="!h-full !w-full !max-w-full"
        >
          <MediaContentModalView
            content={{
              contentTitle: "Video",
              contentType: "Video",
              contentUrl: selectedVideo,
              id: Date.now(),
              language: "English",
            }}
          />
          <div
            onClick={() => setSelectedVideo(null)}
            className={cn(
              "fixed top-5 right-5 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
              "text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
            )}
          >
            <MdClose size={20} />
          </div>
        </Modal>
      )}
    </div>
  );
}
