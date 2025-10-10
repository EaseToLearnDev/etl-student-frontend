import { PiBook, PiChartLine, PiTimer } from "react-icons/pi";
import type { ContentType } from "../../study_room/study_material/sm.types";

export interface TutorialVideo {
  title: string;
  videoLink: string;
}

export interface TutorialContent {
  id: number;
  contentTitle: string;
  contentType: ContentType;
  data: TutorialVideo[];
}

export interface TutorialCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  content: TutorialContent;
}

export const tutorialCards: TutorialCard[] = [
  {
    title: "Study Room",
    description: "Watch Study Room tutorials to boost your learning.",
    icon: <PiBook />,
    content: {
      id: 1,
      contentTitle: "Study Room Video Tutorial",
      contentType: "Video",
      data: [
        {
          title: "What is My Study Room and how to use it?",
          videoLink: "https://www.youtube.com/embed/U40xDO-oXa8",
        },
        {
          title: "What is My Study Material and how to use it?",
          videoLink: "https://www.youtube.com/embed/CmqiPLH7BGc",
        },
      ],
    },
  },
  {
    title: "Exam Room",
    description:
      "Learn how to attempt practice exams, view results, and improve your score.",
    icon: <PiTimer />,
    content: {
      id: 2,
      contentTitle: "Exam Room Video Tutorial",
      contentType: "Video",
      data: [
        {
          title: "What is My Exam Room and how to use it?",
          videoLink: "https://www.youtube.com/embed/lxe59f74gaE",
        },
        {
          title: "My Mock Topic Tutorial: A Step-by-Step Guide",
          videoLink: "https://www.youtube.com/embed/vQOcTVWm5AI",
        },
        {
          title: "My Topic Test Tutorial: A Step-by-Step Guide",
          videoLink: "https://www.youtube.com/embed/mz6lU3TfgwQ",
        },
        {
          title: "My Class Test Tutorial: A Step-by-Step Guide",
          videoLink: "https://www.youtube.com/embed/UaNK7D0MwCo",
        },
      ],
    },
  },
  {
    title: "Analytics",
    description:
      "Track your performance with detailed analytics and progress insights.",
    icon: <PiChartLine />,
    content: {
      id: 3,
      contentTitle: "Report & Analytics Video Tutorial",
      contentType: "Video",
      data: [
        {
          title: "Discover Emerging Trends",
          videoLink: "https://www.youtube.com/embed/0KAYPfpnTbg",
        },
      ],
    },
  },
];
