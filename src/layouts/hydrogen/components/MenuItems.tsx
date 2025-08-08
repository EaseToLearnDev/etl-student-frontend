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
    id: "dashboard",
    name: "Dashboard",
    href: "/dashboard",
    static: false,
    icon: <PiHouseFill />,
  },
  {
    id: "studyRoom",
    name: "Study Room",
    href: "/study-room",
    static: true,
    icon: <PiNotebookFill />,
    menuItems: [
      {
        id: "studyMaterial",
        name: "Study Material",
        href: "/study-material",
        icon: <PiBooksFill />,
      },
      {
        id: "selfTest",
        name: "Smart Learning",
        href: "/smart-learning",
        icon: <PiBrainFill />,
      },
    ],
  },
  {
    id: "examRoom",
    name: "Exam Room",
    href: "/exam-room",
    static: true,
    icon: <PiTimerFill />,
    menuItems: [
      {
        id: "topicTest",
        name: "Topic Test",
        href: "/topic-test",
        icon: <PiClipboardTextFill />,
      },
      {
        id: "mockTest",
        name: "Mock Test",
        href: "/mock-test",
        icon: <PiTimerFill />,
      },
      {
        id: "classTest",
        name: "Class Test",
        href: "/class-test",
        icon: <PiPencilSimpleFill />,
      },
    ],
  },
  {
    id: "report",
    name: "Reports",
    href: "/report",
    static: false,
    icon: <PiChartLineFill />,
    menuItems: [
      {
        id: "reportOverview",
        name: "Overview",
        href: "/overview",
        icon: <PiChartBarFill />,
      },
      {
        id: "reportMockTest",
        name: "Mock Test",
        href: "/mock-test",
        icon: <PiTimerFill />,
      },
    ],
  },
];
