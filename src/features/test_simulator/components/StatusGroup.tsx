import { colors, Theme } from "../../../utils/colors";

interface Status {
  id: string;
  text: string;
  theme: Theme;
  count: number;
}

const StatusGroup = () => {
  const statusList: Status[] = [
    {
      id: "not-visited",
      text: "Not Visited",
      theme: Theme.Sakura,
      count: 0,
    },
    {
      id: "not-attempted",
      text: "Not Attempted",
      theme: Theme.Pumpkin,
      count: 0,
    },
    {
      id: "attempted",
      text: "Attempted",
      theme: Theme.Ocean,
      count: 0,
    },
    {
      id: "marked-for-review",
      text: "Marked for Review",
      theme: Theme.Sunglow,
      count: 0,
    },
  ];
  return (
    <div className="relative w-full flex flex-wrap items-center justify-center gap-5">
      {statusList.map((status) => {
        const statusTheme = colors[status.theme];
        return (
          <div key={status.id} className="flex gap-2 items-center">
            <div
              className="size-[24px] aspect-square flex justify-center items-center rounded-full"
              style={{ background: statusTheme.bg.active, color: statusTheme.content.primary }}
            >
              {status.count}
            </div>
            <p>{status.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatusGroup;
