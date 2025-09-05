// Utils
import Button from "../../../components/Button";

interface TestEndedModalContentProps {
  onSubmit: () => void;
}

const TestEndedModalContent = ({ onSubmit }: TestEndedModalContentProps) => {
  return (
    <div className="relative p-2 px-4">
      <div className="flex flex-col gap-4">
        <h5 className="!font-bold">Test Time Ended</h5>
        <h6 className="text-[var(--text-secondary)]">
          The time for the test has ended. Please submit your test to view results.
        </h6>
      </div>
      <div className="flex justify-end mt-7">
        <Button onClick={onSubmit}>Submit Now</Button>
      </div>
    </div>
  );
};

export default TestEndedModalContent;