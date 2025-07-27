import { useEffect, useState } from "react";
import { PiBookOpen } from "react-icons/pi";

interface TopicProgressProps {
  topics: {
    topicName?: string;
    total?: number;
    completed?: number;
  }[];
}

/**
 * Displays a list of topics with their progress information.
 */
const TopicProgress = ({ topics }: TopicProgressProps) => {
  const [progressList, setProgressList] = useState<number[]>([]);

  useEffect(() => {
    // Initialize
    setProgressList(new Array(topics.length).fill(0));

    // Animate to actual values
    const timeout = setTimeout(() => {
      const list = topics.map((t) =>
        (t.total || 0) > 0 ? ((t.completed || 0) / (t.total || 1)) * 100 : 0
      );
      setProgressList(list);
    }, 100);
    return () => clearTimeout(timeout);
  }, [topics]);

  return (
    <div className="flex flex-col p-5 bg-[var(--surface-bg-secondary)] rounded-lg gap-5 h-full overflow-hidden">
      <h5>Topic progress</h5>
      <div className="flex flex-col gap-2 h-full overflow-y-auto">
        {topics?.length > 0 ? (
          topics.map((item, index) => (
            <div key={index} className="grid grid-cols-2">
              <p>{item.topicName}</p>
              <div className="flex flex-col gap-1">
                <span>
                  {item.completed}/{item.total}
                </span>
                <div className="w-full h-1 rounded-full overflow-hidden bg-[var(--surface-bg-secondary)]">
                  <div
                    className="h-full bg-[var(--sb-ocean-bg-active)] rounded-full duration-500 ease-out"
                    style={{
                      width: `${progressList[index]}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col items-center gap-2 text-[var(--text-tertiary)]">
              <PiBookOpen size={32} />{" "}
              <h6>You haven't started this subject yet.</h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicProgress;
