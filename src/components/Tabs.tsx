// Utils
import cn from "../utils/classNames";

interface TabsProps {
  tabs: readonly string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  containerClassName?: string;
  tabClassName?: string;
  activeTabClassName?: string;
}

/**
 * Renders a customizable tab navigation component.
 */
const Tabs = ({
  tabs,
  selectedIndex,
  onSelect,
  containerClassName,
  tabClassName,
  activeTabClassName,
}: TabsProps) => {
  return (
    <div className={cn("relative flex items-center gap-3", containerClassName)}>
      {tabs?.map((tab, index) => (
        <div
          key={tab}
          onClick={() => onSelect(index)}
          className={cn(
            "border-1 border-[var(--border-secondary)] rounded-full",
            "flex justify-center items-center w-fit px-4 py-2 whitespace-nowrap",
            "select-none cursor-pointer transition-colors duration-150 ease",
            index === selectedIndex
              ? cn(
                  "text-[var(--text-primary)] bg-[var(--surface-bg-secondary)]",
                  activeTabClassName
                )
              : cn(
                  "text-[var(--text-secondary)] hover:bg-[var(--surface-bg-secondary)]",
                  tabClassName
                )
          )}
        >
          <p>{tab}</p>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
