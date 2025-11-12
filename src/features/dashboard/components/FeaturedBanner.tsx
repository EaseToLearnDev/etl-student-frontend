import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { MdClose } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { pushToDataLayer } from "../../../utils/gtm";
import { gtmEvents } from "../../../utils/gtm-events";
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

const AUTO_SLIDE_INTERVAL = 4000;

interface FeaturedBannerProps {
  className?: string;
}

const FeaturedBanner = ({ className }: FeaturedBannerProps) => {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<TutorialVideo | null>(
    null
  );
  const [selectedContent, setSelectedContent] =
    useState<TutorialContent | null>(null);
  const studentName = useStudentStore(
    (state) => state.studentData?.studentName
  );
  const mobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedSlideIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const handleCloseModal = () => {
    pushToDataLayer({ event: gtmEvents.feature_banner_close_button_click });
  };

  const slides = [
    // Welcome Slide
    {
      id: "welcome",
      content: (
        <div className="relative w-full h-full flex-shrink-0">
          <img
            src="./dashboard_banner.png"
            alt="Dashboard Banner"
            className="absolute top-0 left-0 bottom-0 right-0 w-full h-full object-cover select-none pointer-events-none z-10"
          />
          <div className="relative z-30 flex flex-col justify-between h-full w-full p-6 sm:p-10">
            <div>
              <h3 className="text-white">
                Welcome {studentName?.split(" ")?.[0]}
              </h3>
              <p className="text-gray-300 mt-2 max-w-[40ch]">
                Discover new courses and keep learning.
              </p>
            </div>
            <div className="mt-2 flex flex-col max-w-[300px] sm:max-w-full sm:flex-row items-stretch sm:items-center mb-4 md:mb-0 gap-3 sm:gap-5">
              {!isProfileComplete() && (
                <Link
                  id="complete_profile_button_id"
                  to="/profile"
                  className="sm:ml-auto border border-white/50 hover:bg-white/10 px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 text-white transition-all duration-200 ease"
                  onClick={() =>
                    pushToDataLayer({
                      event: gtmEvents.complete_profile_button_click,
                    })
                  }
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
        </div>
      ),
    },

    // Slides from tutorialCards
    ...tutorialCards.map((card) => ({
      id: card.title,
      content: (
        <div
          key={card.title}
          className="relative w-full h-full bg-gradient-to-r from-violet-700 to-blue-700 p-6 text-white flex justify-center items-center"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
            {/* Details */}
            <div className="flex flex-col items-start sm:max-w-[60%]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 flex justify-center items-center text-2xl bg-white/10 rounded-lg">
                  {card.icon}
                </div>
                <h4 className="text-lg font-semibold">{card.title}</h4>
              </div>
              <p className="text-gray-200 text-sm sm:text-base w-full sm:max-w-[40ch]">
                {card.description}
              </p>
            </div>

            {/* Button */}
            <div className="w-full sm:w-fit sm:ml-auto mb-3 sm:mb-0">
              <button
                className="w-full sm:w-fit border border-white/40 hover:bg-white/10 px-6 py-2 rounded-lg transition font-medium text-nowrap"
                onClick={() => setSelectedContent(card.content)}
              >
                Watch Tutorials
              </button>
            </div>
          </div>
        </div>
      ),
    })),
  ];

  return (
    <div
      className={cn(
        "relative w-full h-full rounded-lg overflow-hidden",
        className
      )}
    >
      {/* Navigation Arrows */}
      <div className="absolute top-2 right-3 z-30 flex items-center gap-3">
        <button
          onClick={() =>
            setSelectedSlideIndex((prev) =>
              prev === 0 ? slides.length - 1 : prev - 1
            )
          }
          className="size-7 flex justify-center items-center hover:bg-white/10 text-white rounded-md transition border border-white/30"
        >
          <ChevronLeftIcon className="size-4" />
        </button>

        <button
          onClick={() =>
            setSelectedSlideIndex((prev) =>
              prev === slides.length - 1 ? 0 : prev + 1
            )
          }
          className="size-7 flex justify-center items-center hover:bg-white/10 text-white rounded-md transition border border-white/30"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setSelectedSlideIndex(i)}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              selectedSlideIndex === i ? "bg-white/50" : "bg-white/20"
            )}
          />
        ))}
      </div>

      {/* Slides Wrapper */}
      <div
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${selectedSlideIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            {slide.content}
          </div>
        ))}
      </div>

      {/* Tutorial Modal */}
      {selectedContent && !selectedVideo && (
        <Modal
          isOpen={!!selectedContent}
          onClose={() => setSelectedContent(null)}
          className="p-6 lg:p-10"
          size="lg"
        >
          <div className="flex flex-col gap-6">
            <h4 className="p-2">{selectedContent.contentTitle}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {selectedContent.data.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedVideo(item)}
                  className="flex flex-col p-5 border border-[var(--border-primary)] rounded-xl shadow-sm hover:shadow-lg hover:bg-[var(--surface-bg-tertiary)] transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <LuGraduationCap className="size-5 text-white" />
                    </div>
                    <h6 className="flex-1">{item.title}</h6>
                  </div>
                </div>
              ))}
            </div>
            <div
              onClick={() => setSelectedContent(null)}
              className="fixed top-5 right-5 w-10 h-10 flex justify-center items-center bg-[var(--surface-bg-primary)] border border-[var(--border-primary)] rounded-full cursor-pointer"
            >
              <MdClose size={20} />
            </div>
          </div>
        </Modal>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <Modal
          isOpen={!!selectedVideo}
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
            className="fixed top-5 right-5 w-10 h-10 flex justify-center items-center bg-[var(--surface-bg-primary)] border border-[var(--border-primary)] rounded-full cursor-pointer"
          >
            <MdClose size={20} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FeaturedBanner;
