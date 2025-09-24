import { MdClose } from "react-icons/md";
import { Modal } from "../../../components/Modal";
import cn from "../../../utils/classNames";
import { useTutorialStore } from "../hooks/useTutorialStore";
import {
  AcademicCapIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Accordion from "../../../components/Accordion";

const cardDemoList = [
  "Guided Walkthrough",
  "Interactive Features",
  "Personalized Experience",
];

const data = [
  // {
  //   category: "Dashboard",
  //   items: [
  //     {
  //       title: "Discover Emerging Trends",
  //       videoLink: "https://www.youtube.com/embed/3fumBcKC6RE",
  //     },
  //     {
  //       title: "See the top questions consumers ask about any topic",
  //       videoLink: "https://www.youtube.com/embed/ysz5S6PUM-U",
  //     },
  //     {
  //       title: "See where consumers are talking most about any topic",
  //       videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //     },
  //     {
  //       title: "Differentiate fads from trends",
  //       videoLink: "https://www.youtube.com/embed/jNQXAC9IVRw",
  //     },
  //     {
  //       title: "Forecast Future Market Conditions",
  //       videoLink: "https://www.youtube.com/embed/oHg5SJYRHA0",
  //     },
  //     {
  //       title: "See what consumers are searching on different channels",
  //       videoLink: "https://www.youtube.com/embed/tgbNymZ7vqY",
  //     },
  //   ],
  // },
  {
    category: "MY Study Room",
    items: [
      {
        title: "What is MY Study Room and how to use it?",
        videoLink:
          "https://www.youtube.com/embed/PBZ_v7gVBXI?si=JKUzsldGRRdmPviL",
      },
      // {
      //   title: "Discover Emerging Trends",
      //   videoLink: "https://www.youtube.com/embed/3fumBcKC6RE",
      // },
      // {
      //   title: "See the top questions consumers ask about any topic",
      //   videoLink: "https://www.youtube.com/embed/ysz5S6PUM-U",
      // },
      // {
      //   title: "Differentiate fads from trends",
      //   videoLink: "https://www.youtube.com/embed/jNQXAC9IVRw",
      // },
      // {
      //   title: "Forecast Future Market Conditions",
      //   videoLink: "https://www.youtube.com/embed/oHg5SJYRHA0",
      // },
      // {
      //   title: "See what consumers are searching on different channels",
      //   videoLink: "https://www.youtube.com/embed/tgbNymZ7vqY",
      // },
    ],
  },
  // {
  //   category: "Smart Learning",
  //   items: [
  //     {
  //       title: "See the top questions consumers ask about any topic",
  //       videoLink: "https://www.youtube.com/embed/ysz5S6PUM-U",
  //     },
  //     {
  //       title: "See where consumers are talking most about any topic",
  //       videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //     },
  //     {
  //       title: "Differentiate fads from trends",
  //       videoLink: "https://www.youtube.com/embed/jNQXAC9IVRw",
  //     },
  //     {
  //       title: "Discover Emerging Trends",
  //       videoLink: "https://www.youtube.com/embed/3fumBcKC6RE",
  //     },
  //     {
  //       title: "Forecast Future Market Conditions",
  //       videoLink: "https://www.youtube.com/embed/oHg5SJYRHA0",
  //     },
  //     {
  //       title: "See what consumers are searching on different channels",
  //       videoLink: "https://www.youtube.com/embed/tgbNymZ7vqY",
  //     },
  //   ],
  // },
  {
    category: "MY Exam Room",
    items: [
      {
        title: "What is MY Exam Room and how to use it?",
        videoLink:
          "https://www.youtube.com/embed/w7M0oCKfUwk?si=LK9DQswWj0DU5oaT",
      },
      // {
      //   title: "Discover Emerging Trends",
      //   videoLink: "https://www.youtube.com/embed/3fumBcKC6RE",
      // },
      // {
      //   title: "See the top questions consumers ask about any topic",
      //   videoLink: "https://www.youtube.com/embed/ysz5S6PUM-U",
      // },
      // {
      //   title: "See where consumers are talking most about any topic",
      //   videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      // },
      // {
      //   title: "Differentiate fads from trends",
      //   videoLink: "https://www.youtube.com/embed/jNQXAC9IVRw",
      // },
      // {
      //   title: "Forecast Future Market Conditions",
      //   videoLink: "https://www.youtube.com/embed/oHg5SJYRHA0",
      // },
    ],
  },
  // {
  //   category: "Report & Analytics",
  //   items: [
  //     {
  //       title: "Discover Emerging Trends",
  //       videoLink: "https://www.youtube.com/embed/3fumBcKC6RE",
  //     },
  //     {
  //       title: "See the top questions consumers ask about any topic",
  //       videoLink: "https://www.youtube.com/embed/ysz5S6PUM-U",
  //     },
  //     {
  //       title: "See where consumers are talking most about any topic",
  //       videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //     },
  //     {
  //       title: "Differentiate fads from trends",
  //       videoLink: "https://www.youtube.com/embed/jNQXAC9IVRw",
  //     },
  //     {
  //       title: "Forecast Future Market Conditions",
  //       videoLink: "https://www.youtube.com/embed/oHg5SJYRHA0",
  //     },
  //     {
  //       title: "See what consumers are searching on different channels",
  //       videoLink: "https://www.youtube.com/embed/tgbNymZ7vqY",
  //     },
  //   ],
  // },
  // {
  //   category: "All Courses",
  //   items: [
  //     {
  //       title: "Discover Emerging Trends",
  //       videoLink: "https://www.youtube.com/embed/3fumBcKC6RE",
  //     },
  //     {
  //       title: "See the top questions consumers ask about any topic",
  //       videoLink: "https://www.youtube.com/embed/ysz5S6PUM-U",
  //     },
  //     {
  //       title: "See where consumers are talking most about any topic",
  //       videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //     },
  //     {
  //       title: "Differentiate fads from trends",
  //       videoLink: "https://www.youtube.com/embed/jNQXAC9IVRw",
  //     },
  //     {
  //       title: "Forecast Future Market Conditions",
  //       videoLink: "https://www.youtube.com/embed/oHg5SJYRHA0",
  //     },
  //     {
  //       title: "See what consumers are searching on different channels",
  //       videoLink: "https://www.youtube.com/embed/tgbNymZ7vqY",
  //     },
  //   ],
  // },
];

const TutorialsModal = () => {
  const showTutorialModal = useTutorialStore((s) => s.showTutorialModal);
  const setShowTutorialModal = useTutorialStore((s) => s.setShowTutorialModal);

  return (
    <Modal
      isOpen={showTutorialModal}
      onClose={() => setShowTutorialModal(false)}
      size="lg"
    >
      <div className="p-2">
        <div className="flex flex-col gap-2 text-[var(--text-primary)]">
          <h4>Welcome to Your Learning Journey</h4>
          <p>Discover all features to enhance your learning experience</p>
        </div>

        <div className="flex flex-col gap-3 justify-center mt-3 p-3 font-normal bg-[var(--surface-bg-tertiary)] rounded-md">
          {cardDemoList.map((item, index) => (
            <div key={index} className="flex items-center gap-[5px]">
              <CheckCircleIcon
                width={30}
                height={30}
                className="text-[var(--sb-ocean-bg-active)]"
              />
              <p>{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2 text-[var(--text-tertiary)]">
            <h6>Tutorials Videos</h6>
            <ArrowRightIcon width={20} height={20} />
          </div>
          <div className="mt-3">
            <Accordion
              data={data}
              icon={<AcademicCapIcon width={20} height={20} />}
            />
          </div>
        </div>

        <div
          onClick={() => setShowTutorialModal(false)}
          className={cn(
            "fixed top-5 right-5 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
            " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
          )}
        >
          <MdClose size={20} />
        </div>
      </div>
    </Modal>
  );
};

export default TutorialsModal;
