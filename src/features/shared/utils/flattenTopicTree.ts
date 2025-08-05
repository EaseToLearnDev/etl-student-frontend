import type { TopicType } from "../types";

export const flattenTopics = (topics: TopicType[]): TopicType[] => {
  const result: TopicType[] = [];

  const traverse = (items: TopicType[]) => {
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
