// Hooks
import { useCTStore } from "../../../global/hooks/useCTStore";

// Components
import ClassTestCard from "./ClassTestCard";
import EmptyState from "../../../components/EmptyState";

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
    <EmptyState title="No Class Tests Available" />
  );
};

export default ClassTestList;
