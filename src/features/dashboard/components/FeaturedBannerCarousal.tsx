import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import cn from "../../../utils/classNames";
import { useState } from "react";
import { PiBook, PiChartLine, PiTimer } from "react-icons/pi";
import { Link } from "react-router";
import { Modal } from "../../../components/Modal";
import { MdClose } from "react-icons/md";
import { useSMStore } from "../../study_room/study_material/hooks/useSMStore";
import MediaContentModalView from "../../study_room/study_material/components/MediaContentModalVIew";
import useIsMobile from "../../../hooks/useIsMobile";
import { isProfileComplete } from "../services/isProfileComplete";

interface FeaturedBannerCarousalProps {
  className?: string;
}

const FeaturedBannerCarousal = ({ className }: FeaturedBannerCarousalProps) => {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);

  const selectedContent = useSMStore((s) => s.selectedContent);
  const setSelectedContent = useSMStore((s) => s.setSelectedContent);
  const mobile = useIsMobile();

  const tutorialCards = [
    {
      title: "Study Room",
      description: "Watch Study Room tutorials to boost your learning.",
      icon: <PiBook />,
      content: {
        contentTitle: "The Nitrogen Cycle",
        contentType: "Video",
        contentUrl: "https://www.youtube.com/embed/Fy3HSTkvvc8",
        id: 375,
        language: "English",
      },
    },
    {
      title: "Exam Room",
      description:
        "Learn how to attempt practice exams, view results, and improve your score.",
      icon: <PiTimer />,
      content: {
        contentTitle: "The Nitrogen Cycle",
        contentType: "Video",
        contentUrl: "https://www.youtube.com/embed/Fy3HSTkvvc8",
        id: 375,
        language: "English",
      },
    },
    {
      title: "Analytics",
      description:
        "Track your performance with detailed analytics and progress insights.",
      icon: <PiChartLine />,
      content: {
        contentTitle: "The Nitrogen Cycle",
        contentType: "Video",
        contentUrl: "https://www.youtube.com/embed/Fy3HSTkvvc8",
        id: 375,
        language: "English",
      },
    },
  ];

  const slides = [
    // Slide 1
    <div key="slide-1" className="relative w-full h-full flex-shrink-0">
      <img
        src="/dashboard_banner.png"
        className="absolute top-0 left-0 w-full h-full object-cover select-none pointer-events-none z-10"
      />

      <div className="relative z-30 flex flex-col justify-between h-full w-full p-6 sm:p-10">
        <div>
          <h3 className="text-white">Welcome Back</h3>
          <p className="text-gray-300 mt-2 max-w-[40ch]">
            Discover new courses and keep learning.
          </p>
        </div>

        <div className="mt-2 flex flex-col sm:flex-row items-stretch sm:items-center mb-4 md:mb-0 gap-3 sm:gap-5">
          <button
            className="bg-white hover:bg-gray-300 px-4 py-2 sm:px-6 sm:py-3 text-black font-medium rounded-lg sm:rounded-xl transition-all duration-200 ease"
            onClick={() => setSelectedSlideIndex(1)}
          >
            Explore Features
          </button>
          {!isProfileComplete() && (
            <Link
              to={"/profile"}
              className="sm:ml-auto border border-white/50 hover:bg-white/10 px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 text-white transition-all duration-200 ease"
            >
              Complete Profile
              <ArrowRightIcon
                width={14}
                height={14}
                className="sm:w-4 sm:h-4"
              />
            </Link>
          )}
        </div>
      </div>
    </div>,

    // Slide 2 (mapped cards)
    <div
      key="slide-2"
      className="relative w-full h-full flex-shrink-0 bg-gradient-to-r from-violet-700 to-blue-700 flex items-center justify-center p-10"
    >
      <div className="grid grid-cols-3 gap-5 w-full select-none">
        {tutorialCards.map((card, i) => (
          <div
            key={i}
            onClick={() => setSelectedContent(card.content)}
            className="border cursor-pointer border-white/40 p-4 rounded-lg flex flex-col gap-2 items-center justify-start text-white text-center hover:bg-white/10 transition"
          >
            <div className="w-8 h-8 flex bg-white/10 rounded-md justify-center items-center text-2xl">
              {card.icon}
            </div>
            <div>
              <h6 className="text-lg font-semibold">{card.title}</h6>
              {mobile ? (
                ""
              ) : (
                <p className="text-sm text-gray-200">{card.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>,
  ];

  return (
    <div
      className={cn(
        "relative w-full h-full rounded-lg overflow-hidden",
        className
      )}
    >
      {/* Navigation */}
      <div className="absolute top-2 right-3 z-30 flex items-center gap-3">
        <button
          onClick={() =>
            setSelectedSlideIndex((prev) =>
              prev === 0 ? slides.length - 1 : prev - 1
            )
          }
          className="size-7 aspect-square flex justify-center items-center hover:bg-white/10 text-white rounded-md transition border border-white/30"
        >
          <ChevronLeftIcon className="size-4" />
        </button>

        <button
          onClick={() =>
            setSelectedSlideIndex((prev) =>
              prev === slides.length - 1 ? 0 : prev + 1
            )
          }
          className="size-7 aspect-square flex justify-center items-center hover:bg-white/10 text-white rounded-md transition border border-white/30"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setSelectedSlideIndex(i)}
            className={cn(
              "w-3 h-3 aspect-square rounded-full transition-colors",
              selectedSlideIndex === i ? "bg-white/50" : "bg-white/20"
            )}
          />
        ))}
      </div>

      {/* Slides wrapper */}
      <div
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${selectedSlideIndex * 100}%)` }}
      >
        {slides}
      </div>

      {selectedContent && (
        <Modal
          isOpen={selectedContent !== null}
          onClose={() => setSelectedContent(null)}
          className="p-4 lg:p-10"
          containerClassName="!h-full !w-full !max-w-full"
        >
          <MediaContentModalView content={selectedContent} />
          <div
            onClick={() => setSelectedContent(null)}
            className={cn(
              "fixed top-5 right-5 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
              " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
            )}
          >
            <MdClose size={20} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FeaturedBannerCarousal;
