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
  const {correctResponseEnabled} = useTestStore(s => s.features);

  return (
    <div className="flex items-center justify-between gap-4 py-2 px-4">
      <h5 className="!font-semibold text-ellipsis line-clamp-2 flex-1">{testTitle}</h5>
      {!correctResponseEnabled && <div className="flex items-center gap-2">
        <Button onClick={() => setIsSubmissionModalOpen(true)}>Submit</Button>
      </div>}
    </div>
  );
};

export default TestHeader;
