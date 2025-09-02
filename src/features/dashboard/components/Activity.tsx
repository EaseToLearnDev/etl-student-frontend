import cn from "../../../utils/classNames";

interface ActivityItem {
  date: string;
  actions: {
    text: string;
    repo: string;
    link?: string;
  }[];
}

interface ActivityProps {
  activities: ActivityItem[];
  className?: string;
}

const Activity = ({ activities, className = "" }: ActivityProps) => {
  return (
    <div className={cn("max-h-full overflow-y-auto", className)}>
      {activities.map((activity, i) => (
        <div key={i} className="mb-6">
          {/* Date */}
          <div className="text-sm text-gray-400 mb-3">{activity.date}</div>

          <div className="relative ml-5">
            {activity.actions.map((action, j) => (
              <div key={j} className="relative flex items-start mb-4">
                {/* Circle indicator */}
                <div className="absolute -left-5 w-3 h-3 rounded-full bg-gray-400 mt-1.5"></div>

                {/* Action text */}
                <div>
                  <p className="text-sm">
                    {action.text}{" "}
                    <a
                      href={action.link || "#"}
                      className="text-blue-400 hover:underline"
                    >
                      {action.repo}
                    </a>
                  </p>
                </div>
              </div>
            ))}

            {/* Vertical line */}
            <div className="absolute left-[-4px] top-2 bottom-0 w-[2px] bg-gray-600"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Activity;
