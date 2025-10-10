// React
import { useState } from "react";
import { Link } from "react-router";

//Icons
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { MdClose } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";

//Hooks & Stores
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { useTutorialStore } from "../../tutorials/hooks/useTutorialStore";

//Layouts & Components
import {
  tutorialCards,
  type TutorialContent,
  type TutorialVideo,
} from "../utils/BannerTutorialData";
import cn from "../../../utils/classNames";
import { Modal } from "../../../components/Modal";
import MediaContentModalView from "../../study_room/study_material/components/MediaContentModalVIew";
import useIsMobile from "../../../hooks/useIsMobile";
import { isProfileComplete } from "../services/isProfileComplete";

interface FeaturedBannerCarousalProps {
  className?: string;
}

const FeaturedBannerCarousal = ({ className }: FeaturedBannerCarousalProps) => {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
  const [selectedVideo, setSelectedVideo] = useState<TutorialVideo | null>(
    null
  );
  const [selectedContent, setSelectedContent] =
    useState<TutorialContent | null>(null);
  const studentName = useStudentStore(
    (state) => state.studentData?.studentName
  );

  const setShowTutorialModal = useTutorialStore((s) => s.setShowTutorialModal);

  const mobile = useIsMobile();

  const slides = [
    // Slide 1
    <div key="slide-1" className="relative w-full h-full flex-shrink-0">
      <img
        src="./dashboard_banner.png"
        className="absolute top-0 left-0 w-full h-full object-cover select-none pointer-events-none z-10"
      />

      <div className="relative z-30 flex flex-col justify-between h-full w-full p-6 sm:p-10">
        <div>
          <h3 className="text-white">Welcome {studentName?.split(" ")?.[0]}</h3>
          <p className="text-gray-300 mt-2 max-w-[40ch]">
            Discover new courses and keep learning.
          </p>
        </div>

        <div className="mt-2 flex flex-col sm:flex-row items-stretch sm:items-center mb-4 md:mb-0 gap-3 sm:gap-5">
          <button
            className="bg-white hover:bg-gray-300 px-4 py-2 sm:px-6 sm:py-3 text-black font-medium rounded-lg sm:rounded-xl transition-all duration-200 ease"
            onClick={() => setShowTutorialModal(true)}
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
      className="relative w-full h-full flex-shrink-0 bg-gradient-to-r from-violet-700 to-blue-700 flex items-center justify-center sm:p-10 py-10 px-2"
    >
      <div className="grid grid-cols-3 gap-2 sm:gap-5 w-full select-none">
        {tutorialCards.map((card, i) => (
          <div
            key={i}
            onClick={() => setSelectedContent(card.content as TutorialContent)}
            className="border cursor-pointer border-white/40 p-4 rounded-lg flex flex-col gap-2 items-center justify-start text-white text-center hover:bg-white/10 transition"
          >
            <div className="w-8 h-8 flex bg-white/10 rounded-md justify-center items-center text-2xl">
              {card.icon}
            </div>
            <div>
              <h6>{card.title}</h6>
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

      {selectedContent && !selectedVideo && (
        <Modal
          isOpen={selectedContent !== null}
          onClose={() => setSelectedContent(null)}
          className="p-6 lg:p-10"
          size="lg"
        >
          <div className="flex flex-col gap-6 text-[var(--text-primary)]">
            <h4 className="p-2">{selectedContent.contentTitle}</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {selectedContent.data.map((item: TutorialVideo, idx: number) => (
                <div
                  key={idx}
                  onClick={() => setSelectedVideo(item)}
                  className="flex flex-col p-5 border border-[var(--border-primary)] rounded-xl shadow-sm hover:shadow-lg hover:bg-[var(--surface-bg-tertiary)] transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <LuGraduationCap className="size-5 text-white" />
                    </div>
                    <h6 className="flex-1 text-[var(--text-primary)] group-hover:text-[var(--text-primary)]/80">
                      {item.title}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
            <div
              onClick={() => setSelectedContent(null)}
              className={cn(
                "fixed top-5 right-5 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
                " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
              )}
            >
              <MdClose size={20} />
            </div>
          </div>
        </Modal>
      )}
      {selectedVideo && (
        <Modal
          isOpen={selectedVideo !== null}
          onClose={() => setSelectedVideo(null)}
          className="p-4"
          containerClassName="!h-full !w-full !max-w-full"
        >
          <MediaContentModalView
            content={{
              id: 9999,
              contentTitle: selectedVideo.title,
              contentType: "Video",
              contentUrl: selectedVideo.videoLink,
            }}
          />
          <div
            onClick={() => setSelectedVideo(null)}
            className={cn(
              "fixed top-5 right-5 w-[40px] h-[40px] flex justify-center items-center cursor-pointer",
              "text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border border-[var(--border-primary)] rounded-full"
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
