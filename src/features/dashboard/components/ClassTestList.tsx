// Hooks
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { useCTStore } from "../../../shared/hooks/useCTStore";
// Components
import ClassTestCard from "./ClassTestCard";

/**
 * Renders a list of class test cards using data from the CT store.
 */
const ClassTestList = () => {
  const testList = useCTStore((s) => s.testList);

  return testList && testList?.length > 0 ? (
    testList?.map((t, idx) => (
      <div className="flex flex-row 2xl:flex-col max-h-full overflow-x-auto 2xl:overflow-y-auto pt-4">
        <ClassTestCard key={idx} test={t} />
      </div>
    ))
  ) : (
    <div className="w-full h-full grid place-items-center pb-20">
      <div className="flex flex-col items-center text-center text-[var(--text-tertiary)]">
        <ArchiveBoxIcon width={100} height={100} />
        <h6>No Class Tests Available</h6>
      </div>
    </div>
  );
};

export default ClassTestList;
