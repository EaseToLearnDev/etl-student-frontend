// Store
import useTestStore from "../../store/useTestStore";

// Components
import Button from "../../../../components/Button";

/**
 * Renders the header section for the test simulator on mobile devices.
 * Displays the test title and provides action buttons to end the session or submit the test.
 */
const TestHeader = () => {
  const testTitle = useTestStore((state) => state.testData?.testName) || "";
  return (
    <div className="flex items-center justify-between p-4">
      <h3 className="text-ellipsis line-clamp-1">{testTitle}</h3>
      {/* TODO: ADD FUNCTIONALITY TO END SESSION AND SUBMIT */}
      <div className="flex items-center gap-2">
        <Button style="secondary">End Session</Button>
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default TestHeader;
