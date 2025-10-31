import DesktopChildLayout from "../../../layouts/child-layout/components/DesktopChildLayout";
import ActiveQuestionPanel from "./ActiveQuestionPanel";
import TestHeader from "./desktop/TestHeader";

const AdaptiveTestSimulator = () => {
  return (
    <div className="h-screen flex flex-col flex-grow gap-5 p-8">
      <TestHeader />
      <div className="h-full overflow-y-auto relative">
        <DesktopChildLayout
          primaryContent={<ActiveQuestionPanel />}
          isSecondaryHidden={true}
        />
      </div>
    </div>
  );
};

export default AdaptiveTestSimulator;
