import useTestStore from "../../store/useTestStore";

/**
 * Renders the test header for the desktop view, displaying the test title and a static timer.
 */
const TestHeader = () => {
  const testTitle = useTestStore((state) => state.testData?.testName) || "";

  return (
    <div className="flex justify-between">
      <div className="md:w-[60%] lg:w-[70%] xl:w-[75%]">
        <h3 className="text-ellipsis line-clamp-1">{testTitle}</h3>
      </div>
      <div className="hidden md:flex md:justify-center md:w-[40%] lg:w-[30%] xl:w-[25%]">
        <h3>{"03:00:00"}</h3>
      </div>
    </div>
  );
};

export default TestHeader;
