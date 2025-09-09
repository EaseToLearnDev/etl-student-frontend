import { useStudentStore } from "../../shared/hooks/useStudentStore";

export const loadTablsForReports = () => {
  const { activeCourse } = useStudentStore.getState();
  const tabs: string[] = [];

  if (activeCourse?.tabs?.selfTest) {
    tabs.push("Learning Sessions", "Competitive Sessions");
  }
  if (activeCourse?.tabs?.topicTest) {
    tabs.push("Topic Tests");
  }
  if (activeCourse?.tabs?.mockTest) {
    tabs.push("Mock Tests");
  }
  if (activeCourse?.tabs?.classTest) {
    tabs.push("Class Tests");
  }

  return tabs;
};
