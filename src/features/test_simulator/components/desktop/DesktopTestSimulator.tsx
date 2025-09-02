// Layouts & Components
import DesktopChildLayout from "../../../../layouts/child-layout/components/DesktopChildLayout";
import ActiveQuestionPanel from "./ActiveQuestionPanel";
import TestHeader from "./TestHeader";
import TestSidePanel from "./TestSidePanel";

interface DesktopTestSimulatorProps {
  mode: "test" | "answers";
}

/**
 * Renders the desktop version of the Test Simulator interface.
 */
const DesktopTestSimulator = ({ mode }: DesktopTestSimulatorProps) => {
  return (
    <div className="h-screen flex flex-col flex-grow gap-5 p-8">
      <TestHeader mode={mode} />
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
