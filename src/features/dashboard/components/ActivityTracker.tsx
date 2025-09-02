import { ActivityCalendar } from "react-activity-calendar";
import useDarkModeStore from "../../../store/useDarkModeStore";

const ActivityTracker = () => {
    const darkMode = useDarkModeStore((s) => s.darkMode);

    // Level 1 to 7,
  const data = [
    {
      date: "2024-06-23",
      count: 8,
      level: 1,
    },
    {
      date: "2024-08-02",
      count: 16,
      level: 4,
    },
    {
      date: "2024-11-29",
      count: 11,
      level: 3,
    },
  ];

  return (
    <ActivityCalendar
      data={data}
      blockSize={20}
      blockMargin={4}
      colorScheme={darkMode ? 'dark' : 'light'}
      fontSize={14}
      maxLevel={7}
      
      hideTotalCount
      showWeekdayLabels
      theme={{
        dark: ["oklch(37.9% 0.146 265.522)", "oklch(80.9% 0.105 251.813)"],
        light: ["oklch(80.9% 0.105 251.813)", "oklch(37.9% 0.146 265.522)"],
      }}
    />
  );
};

export default ActivityTracker;
