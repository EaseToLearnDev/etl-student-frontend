import { MdClose } from "react-icons/md";
import { Modal } from "../../../components/Modal";
import { useGuestStore } from "../../../global/hooks/useGuestStore";
import cn from "../../../utils/classNames";
import { useEffect, useState } from "react";
import { webTopicCourses } from "../api/webTopicCourses.api";
import EmptyState from "../../../components/EmptyState";
import useTestStore from "../store/useTestStore";

interface TopicData {
  courseId: number;
  courseTitle: string;
}

export function GuestCourseCardsModal() {
  const [topic, setTopic] = useState<TopicData[]>([]);
  const openCourseCardsModal = useGuestStore((s) => s.openCourseCardsModal);
  const setOpenCourseCardsModal = useGuestStore(
    (s) => s.setOpenCourseCardsModal
  );
  const testData = useTestStore((s) => s.testData);

  useEffect(() => {
    const fetchData = async () => {
      const topicId = testData?.questionSet[0].topicId;
      if (!topicId) {
        return null;
      }
      try {
        const data: TopicData[] = await webTopicCourses(topicId);
        setTopic(data);
      } catch (error) {
        console.log("Error Fetching Topic Data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Modal
      isOpen={openCourseCardsModal}
      onClose={() => setOpenCourseCardsModal(false)}
      size="xl"
    >
      <div className="flex flex-col gap-6">
        <div>
          <h4>What Courses are you looking for ?</h4>
          <p className="mt-2">
            Explore our curated list of courses and find the perfect match for
            your learning goals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {!topic ? (
            <></>
          ) : (
            topic.map((course, index) => (
              <div
                key={index}
                onClick={() => {}}
                className={cn(
                  "cursor-pointer rounded-xl border border-[var(--border-primary)]",
                  "bg-[var(--surface-bg-primary)] shadow-md hover:shadow-lg",
                  "p-4 flex flex-col justify-between transition-all"
                )}
              >
                <h5>{course.courseTitle}</h5>
              </div>
            ))
          )}
        </div>
        <div
          onClick={() => setOpenCourseCardsModal(false)}
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
}
