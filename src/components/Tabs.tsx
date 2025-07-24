import { useRef, useEffect, useState } from "react";
import cn from "../utils/classNames";

interface TabsProps {
  tabs: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

/**
 * Renders a tabbed navigation component with a sliding indicator.
 * Allows selection of tabs and highlights the active tab.
 */
const Tabs = ({ tabs, selectedIndex, onSelect }: TabsProps) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const selectedTab = tabRefs.current[selectedIndex];
    if (selectedTab) {
      const { offsetLeft, offsetWidth } = selectedTab;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [selectedIndex, tabs]);

  return (
    <div className="relative max-w-fit bg-[var(--surface-bg-secondary)] rounded-xl p-2">
      <div className="flex items-center gap-4 relative">
        {/* Sliding indicator */}
        <div
          ref={indicatorRef}
          className="absolute top-0 left-0 h-full rounded-lg bg-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out z-0"
          style={{
            width: `${indicatorStyle.width}px`,
            transform: `translateX(${indicatorStyle.left}px)`,
          }}
        />

        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={(el) => { tabRefs.current[index] = el; }}
            className={cn(
              "relative z-10 outline-none border-none cursor-pointer rounded-lg px-3 py-2 transition-colors duration-200",
              selectedIndex === index
                ? "text-[var(--sb-ocean-content-primary)] !font-medium"
                : "text-[var(--text-primary)]"
            )}
            onClick={() => onSelect(index)}
          >
            <p>{tab}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
