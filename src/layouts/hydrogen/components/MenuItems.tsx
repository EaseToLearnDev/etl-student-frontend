import {
  PiChartLineFill,
  PiHouseFill,
  PiNotebookFill,
  PiTimerFill,
} from "react-icons/pi";

export const menuItems = [
  {
    name: "Dashboard",
    href: "/",
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
        href: "/selecttopictest",
      },
      {
        name: "Exam Test",
        href: "/selectmocktest",
      },
      {
        name: "Class Test",
        href: "/selectclasstest",
      },
    ],
  },
  {
    name: "Reports & Analytics",
    href: "/report",
    icon: <PiChartLineFill />,
  },
];
