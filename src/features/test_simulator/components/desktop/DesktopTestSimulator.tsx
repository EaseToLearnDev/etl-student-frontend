import DesktopChildLayout from "../../../../layouts/child-layout/components/DesktopChildLayout";
import ActiveQuestionPanel from "./ActiveQuestionPanel";
import TestSidePanel from "./TestSidePanel";

const DesktopTestSimulator = ({ title, timer }: any) => {
  return (
    <div className="h-screen flex flex-col flex-grow gap-5 p-8">
      <div className="flex justify-between">
        <div className="md:w-[60%] lg:w-[70%] xl:w-[75%]">
          <h3 className="text-ellipsis line-clamp-1">{title}</h3>
        </div>
        <div className="hidden md:flex md:justify-center md:w-[40%] lg:w-[30%] xl:w-[25%]">
          <h3>{timer}</h3>
        </div>
      </div>
      <div className="h-full overflow-y-auto">
        <DesktopChildLayout
          primaryContent={<ActiveQuestionPanel />}
          secondaryContent={<TestSidePanel />}
        />
      </div>
    </div>
  );
};

export default DesktopTestSimulator;
