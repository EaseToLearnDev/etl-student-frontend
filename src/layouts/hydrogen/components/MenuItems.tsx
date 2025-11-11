import { BiHomeAlt, BiHomeAlt2, BiSolidHomeAlt2 } from "react-icons/bi";
import { HiBookOpen, HiChartBar, HiChartPie, HiHome, HiMiniHome, HiOutlineBookOpen, HiOutlineChartBar, HiOutlineChartPie, HiOutlineHome, HiOutlineRectangleStack, HiRectangleStack } from "react-icons/hi2";
import {
  PiBooksFill,
  PiBooks,
  PiBrainFill,
  PiBrain,
  PiChartLineFill,
  PiChartLine,
  PiClipboardTextFill,
  PiClipboardText,
  PiHouseFill,
  PiHouse,
  PiLightningFill,
  PiLightning,
  PiNotebookFill,
  PiNotebook,
  PiPencilSimpleFill,
  PiPencilSimple,
  PiTimerFill,
  PiTimer,
} from "react-icons/pi";

interface MenuItem {
  id: string;
  name: string;
  desc?: string;
  href: string;
  static?: boolean;
  icon?: React.ReactNode;
  iconOutline?: React.ReactNode;
  menuItems?: MenuItem[];
  hideTitle?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    href: "/dashboard",
    static: false,
    icon: <HiHome />,
    iconOutline: <HiOutlineHome />,
  },
  {
    id: "studyRoom",
    name: "Study Room",
    href: "/study-room",
    static: true,
    icon: <HiBookOpen />,
    iconOutline: <HiOutlineBookOpen />,
    menuItems: [
      {
        id: "selfTest",
        name: "Gap Fixer",
        desc: "Smart Learning",
        href: "/smart-learning",
        icon: <PiBrainFill />,
        iconOutline: <PiBrain />,
      },
      {
        id: "studyMaterial",
        name: "Study Material",
        href: "/study-material",
        icon: <PiBooksFill />,
        iconOutline: <PiBooks />,
      },
      {
        id: "adaptiveLearning",
        name: "Adaptive Learning",
        href: "/adaptive-learning",
        icon: <PiLightningFill />,
        iconOutline: <PiLightning />,
      },
    ],
  },
  {
    id: "examRoom",
    name: "Exam Room",
    href: "/exam-room",
    static: true,
    icon: <PiTimerFill />,
    iconOutline: <PiTimer />,
    menuItems: [
      {
        id: "topicTest",
        name: "Topic Test",
        href: "/topic-test",
        icon: <PiClipboardTextFill />,
        iconOutline: <PiClipboardText />,
      },
      {
        id: "mockTest",
        name: "Mock Test",
        href: "/mock-test",
        icon: <PiTimerFill />,
        iconOutline: <PiTimer />,
      },
      {
        id: "classTest",
        name: "Class Test",
        href: "/class-test",
        icon: <PiPencilSimpleFill />,
        iconOutline: <PiPencilSimple />,
      },
    ],
  },
  {
    id: "report",
    name: "Reports",
    href: "/report",
    static: false,
    icon: <HiChartPie />,
    iconOutline: <HiOutlineChartPie />,
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
    name: "All Exams",
    href: "/selectcourse",
    static: false,
    icon: <HiRectangleStack />,
    iconOutline: <HiOutlineRectangleStack />,
    hideTitle: true,
  },
];
