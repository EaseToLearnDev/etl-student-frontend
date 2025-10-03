import { useStudentStore } from "../../../shared/hooks/useStudentStore";
import { useContentLimitStore } from "../hooks/useContentLimitStore";
import type { Content } from "../sm.types";

const canOpenContent = (courseId: number, content: Content) => {
  const { counters, limits } = useContentLimitStore.getState();


  const limit =
    content.contentType === "PDF"
      ? limits.pdfMax
      : content.contentType === "PPT"
      ? limits.pptMax
      : content.contentType === "Text"
      ? limits.textMax
      : limits.videoMax;

  const courseCounters = counters[content.contentType];
  const existing = courseCounters[courseId];

  // Case 1: Never opened any content, then allowed opening
  if (!existing) return true;

  // Case 2: Already opened this content, then allowed opening
  if (existing.contentIds.includes(content.id)) return true;

  // Case 3: New content, but limit not reached, then allowed opening
  if (existing.counter < limit) return true;

  return false;
};

export default canOpenContent;
