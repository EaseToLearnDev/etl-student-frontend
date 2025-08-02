import {
  PiBooksFill,
  PiBrainFill,
  PiChartBarFill,
  PiChartLineFill,
  PiClipboardTextFill,
  PiHouseFill,
  PiNotebookFill,
  PiPencilSimpleFill,
  PiTimerFill,
} from "react-icons/pi";

export const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <PiHouseFill />,
  },
  {
    name: "Study Room",
    href: "/study-room",
    icon: <PiNotebookFill />,
    menuItems: [
      {
        name: "Study Material",
        href: "/study-material",
        icon: <PiBooksFill />,
      },
      {
        name: "Smart Learning",
        href: "/smart-learning",
        icon: <PiBrainFill />,
      },
    ],
  },
  {
    name: "Exam Room",
    href: "/exam-room",
    icon: <PiTimerFill />,
    menuItems: [
      {
        name: "Topic Test",
        href: "/topic-test",
        icon: <PiClipboardTextFill />,
      },
      {
        name: "Mock Test",
        href: "/mock-test",
        icon: <PiTimerFill />,
      },
      {
        name: "Class Test",
        href: "/class-test",
        icon: <PiPencilSimpleFill />,
      },
    ],
  },
  {
    name: "Reports",
    href: "/report",
    icon: <PiChartLineFill />,
    menuItems: [
      {
        name: "Overview",
        href: "/overview",
        icon: <PiChartBarFill />,
      },
      {
        name: "Mock Test",
        href: "/mock-test",
        icon: <PiTimerFill />,
      },
    ],
  },
];
