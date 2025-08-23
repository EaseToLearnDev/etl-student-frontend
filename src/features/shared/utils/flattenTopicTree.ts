import type { Topic } from "../types";

export const flattenTopics = (topics: Topic[]): Topic[] => {
  const result: Topic[] = [];

  const traverse = (items: Topic[]) => {
    for (const item of items) {
      result.push({ ...item, children: [] });
      if (item.children?.length) {
        traverse(item.children);
      }
    }
  };

  traverse(topics);
  return result;
};
