import { useState } from "react";
import type { LinkItem } from "../sm.types";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

const NestedList = ({ items }: { items: LinkItem[] }) => {
  return (
    <ul className="h-full pl-2 pr-2">
      {items.map((item) => (
        <NestedListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

const NestedListItem = ({ item }: { item: LinkItem }) => {
  const [isOpen, setIsOpen] = useState(true);

  const hasChildren = item.children && item.children.length > 0;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Handle smooth scroll
    const targetElement = document.getElementById(item.id);
    if (targetElement) {
      e.preventDefault(); 
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }

    // Toggle open/close if has children
    if (hasChildren) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <li className="mb-2">
      <a
        href={`#${item.id}`}
        className="flex items-center gap-1 justify-between cursor-pointer select-none px-4 py-2 hover:bg-[var(--surface-bg-tertiary)] rounded-md transition-all duration-200 ease-in"
        onClick={handleClick}
      >
        <p className="text-[var(--text-secondary)]">{item.title}</p>
        {hasChildren ? (
          isOpen ? (
            <FiChevronDown size={16} className="text-[var(--text-secondary)]" />
          ) : (
            <FiChevronRight
              size={16}
              className="text-[var(--text-secondary)]"
            />
          )
        ) : (
          <span className="w-[14px]" /> // empty space to align
        )}
      </a>

      {hasChildren && isOpen && (
        <div className="mt-1 ml-2">
          <NestedList items={item.children!} />
        </div>
      )}
    </li>
  );
};

export default NestedList;
