
// Icons
import { MdAddAPhoto } from "react-icons/md";
import { HiMiniMicrophone } from "react-icons/hi2";

// Utils
import { Theme } from "../../../utils/colors";

// Components
import AiIcon from "../../../components/icons/ai-icon";
import Badge from "../../../components/Badge";

interface BadgeListItem {
  text: string;
  theme: Theme;
}

/**
 * Renders the AI chat panel with quick action badges and chat input.
 * Includes Tony AI avatar, greeting, and controls for photo and microphone input.
 */
const AiChatPanel = () => {
  const badgesList: BadgeListItem[] = [
    { text: "Ask Explanation", theme: Theme.Ocean },
    { text: "Report a Problem", theme: Theme.Sakura },
    { text: "Teacher's Help", theme: Theme.Sunglow },
    { text: "Study Material", theme: Theme.Pumpkin },
    { text: "More", theme: Theme.Neutral },
  ];
  
  return (
    <div className="relative w-full h-full flex flex-col">
      <div
        className="flex flex-col overflow-y-auto"
        style={{ maxHeight: "calc(100% - 140px)" }}
      >
        {/* Tony Image and Greeting */}
        <div className="flex flex-col justify-center items-center gap-2 p-5">
          <img
            src="/tony-logo.svg"
            width={78}
            height={78}
            alt="Tony AI"
            className="object-cover bg-cyan-300 dark:bg-cyan-800 rounded-full aspect-square"
          />
          <h3 className="text-center">How can I help you today?</h3>
        </div>
        {/* Clickable Badges To Ask Quick Questions */}
        <div className="w-full flex flex-wrap justify-center gap-4">
          {badgesList.map((badgeItem: BadgeListItem, idx: number) => (
            <Badge key={idx} theme={badgeItem.theme}>
              {
                <>
                  <AiIcon />
                  <h6>{badgeItem.text}</h6>
                </>
              }
            </Badge>
          ))}
        </div>
      </div>

      {/* Chat Box */}
      <div className="h-[140px] bottom-0 fixed left-0 right-0 rounded-t-xl resize-none p-5 bg-[var(--surface-bg-secondary)]">
        <input
          type="text"
          placeholder="Ask anything..."
          className="p-3 outline-none border-none w-full z-99 placeholder-[var(--text-secondary)] text-[var(--text-primary)]"
        />
        <div className="flex items-center justify-between">
          <div className="w-[48px] h-[48px] flex justify-center items-center">
            <MdAddAPhoto
              size={24}
              className="w-[28px] h-[28px] justify-center items-center"
            />
          </div>
          <div className="w-[48px] h-[48px] flex justify-center items-center">
            <HiMiniMicrophone size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatPanel;
