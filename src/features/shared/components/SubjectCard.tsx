// React
import { Link } from "react-router";

// Icons
import { BiSolidBook } from "react-icons/bi";
import { MdTimer } from "react-icons/md";

type SubjectCardProps = {
  item: Item;
};

type Item = {
  subjectName: string;
  description: string;
  topicCount: number;
  lastStudied: string;
  url: string;
};

/**
 * Renders a card component displaying information about a subject.
 *
 * @remarks
 * The `SubjectCard` component presents a subject's image, name, description, topic count,
 * and last studied date. It is clickable and navigates to the subject's detail page using the provided URL.
 * 
 * @param props - The props for the SubjectCard component.
 * @param props.item - The subject item containing details to display.
 */
const SubjectCard = ({ item }: SubjectCardProps) => {
  return (
    <Link
      to={`${item?.url}`}
      className="cursor-pointer border-1 border-[var(--border-secondary)] rounded-xl overflow-hidden p-[2px] pb-6 bg-[var(--surface-bg-primary)] hover:scale-[102%] transition-transform"
    >
      <img
        src="./subject_static.png"
        alt="Subject Image"
        className="w-full max-h-[200px] md:h-[224px] aspect-square object-cover rounded-lg rounded-b-none"
      />
      <div className="mt-5 grid gap-1 px-4">
        <h5 className="!text-[24px] !leading-[32px] !font-bold !tracking-[var(--ls-0)] text-ellipsis line-clamp-2">
          {item?.subjectName}
        </h5>
        <h6 className="!font-normal !leading-[24px] !tracking-[var(--ls-05)] text-[var(--text-secondary)] text-ellipsis line-clamp-2">
          {item?.description}
        </h6>
      </div>
      <div className="px-4 mt-3 grid gap-2">
        <div className="flex items-center gap-1">
          <BiSolidBook size={20} className="text-[var(--sb-ocean-bg-active)]" />
          <p>Modules Available: {item?.topicCount}+ Topics</p>
        </div>
        <div className="flex items-center gap-1">
          <MdTimer size={20} className="text-[var(--sb-ocean-bg-active)]" />
          <p>Last studied: {item?.lastStudied}</p>
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;
