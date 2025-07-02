import {
  PiChartLineFill,
  PiHouseFill,
  PiNotebookFill,
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
    href: "#",
    icon: <PiNotebookFill />,
    dropdownItems: [
      {
        name: "Study Material",
        href: "/studymaterial",
      },
      {
        name: "Smart Learning",
        href: "/smartlearning",
      },
    ],
  },
  {
    name: "Exam Room",
    href: "#",
    icon: <PiTimerFill />,
    dropdownItems: [
      {
        name: "Topic Test",
        href: "/topictest",
      },
      {
        name: "Exam Test",
        href: "/mocktest",
      },
      {
        name: "Class Test",
        href: "/classtest",
      },
    ],
  },
  {
    name: "Reports",
    href: "/report",
    icon: <PiChartLineFill />,
  },
];
