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

interface MenuItem {
  id: string;
  name: string;
  href: string;
  static?: boolean;
  icon?: React.ReactNode;
  menuItems?: MenuItem[];
  hideTitle?: boolean;
}

export const menuItems: MenuItem[] = [
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
    href: "/report/overview",
    static: false,
    icon: <PiChartLineFill />,
    // menuItems: [
    //   {
    //     id: "reportOverview",
    //     name: "Overview",
    //     href: "/overview",
    //     icon: <PiChartBarFill />,
    //   },
    //   {
    //     id: "reportLearning",
    //     name: "Learning Session",
    //     href: "/learning",
    //     icon: <PiBooksFill />,
    //   },
    //   {
    //     id: "reportCompetitive",
    //     name: "Competitive Session",
    //     href: "/competitive",
    //     icon: <PiBrainFill />,
    //   },
    //   {
    //     id: "reportTopicTest",
    //     name: "Topic Test",
    //     href: "/topic-test",
    //     icon: <PiClipboardTextFill />,
    //   },
    //   {
    //     id: "reportMockTest",
    //     name: "Mock Test",
    //     href: "/mock-test",
    //     icon: <PiTimerFill />,
    //   },

    //   {
    //     id: "reportClassTest",
    //     name: "Class Test",
    //     href: "/class-test",
    //     icon: <PiPencilSimpleFill />,
    //   },
    // ],
  },
  {
    id: "otherCourses",
    name: "All Courses",
    href: "/selectcourse",
    static: false,
    icon: <PiBooksFill />,
    hideTitle: true,
  },
];
