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
        href: "/study-material",
      },
      {
        name: "Smart Learning",
        href: "/smart-learning",
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
        href: "/topic-test",
      },
      {
        name: "Exam Test",
        href: "/mock-test",
      },
      {
        name: "Class Test",
        href: "/class-test",
      },
    ],
  },
  {
    name: "Reports",
    href: "/report",
    icon: <PiChartLineFill />,
  },
];
