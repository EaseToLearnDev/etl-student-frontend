// Store
import useTestStore from "../../store/useTestStore";

// Components
import Button from "../../../../components/Button";

/**
 * Renders the header section for the test simulator on mobile devices.
 */
const TestHeader = () => {
  const testTitle = useTestStore((state) => state.testData?.testName) || "";
  const setIsSubmissionModalOpen = useTestStore(
    (state) => state.setIsSubmissionModalOpen
  );

  return (
    <div className="flex items-center justify-between p-2">
      <h3 className="text-ellipsis line-clamp-1 flex-1">{testTitle}</h3>
      <div className="flex items-center gap-2">
        {/* <Button
          onClick={() => setIsContinueLaterModalOpen(true)}
          style="secondary"
        >
          End Session
        </Button> */}
        <Button onClick={() => setIsSubmissionModalOpen(true)}>Submit</Button>
      </div>
    </div>
  );
};

export default TestHeader;
