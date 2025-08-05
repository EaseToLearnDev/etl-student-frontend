import type { LinkItem } from "../sm.types";

export const  buildNestedList = (flatList: LinkItem[]): LinkItem[] | null => {
  if(!flatList) return null;

  const root: LinkItem[] = [];
  const stack: LinkItem[] = [];

  flatList.forEach((item) => {
    const level = parseInt(item.tag.replace("h", ""), 10);

    const newItem: LinkItem = { ...item, children: [] };

    // Remove items from stack until we find the parent
    while (stack.length > 0 && parseInt(stack[stack.length - 1].tag.replace("h", ""), 10) >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(newItem);
    } else {
      const parent = stack[stack.length - 1];
      parent.children = parent.children || [];
      parent.children.push(newItem);
    }

    stack.push(newItem);
  });

  return root;
}