import ChildLayout from "../../../layouts/child-layout/ChildLayout";
import ActiveQuestionPanel from "../components/ActiveQuestionPanel";
import TestSidePanel from "../components/TestSidePanel";

const TestSimulator = () => {
  return (
    <div className="h-screen flex flex-col flex-grow gap-5 p-8">
      <div className="flex justify-between">
        <div className="md:w-[60%] lg:w-[70%] xl:w-[75%]">
          <h3>Mock Test 4</h3>
        </div>
        <div className="hidden md:flex md:justify-center md:w-[40%] lg:w-[30%] xl:w-[25%]">
          <h3>03:00:00</h3>
        </div>
      </div>
      <div className="h-full overflow-y-auto">
        <ChildLayout
          primaryContent={<ActiveQuestionPanel />}
          secondaryContent={<TestSidePanel />}
        />
      </div>
    </div>
  );
};

export default TestSimulator;
