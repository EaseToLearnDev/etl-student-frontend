// Utils
import Button from "../../../components/Button";

interface FullScreenExitModalContentProps {
  onReEnter: () => void;
  onSubmit: () => void;
}

const FullScreenExitModalContent = ({
  onReEnter,
  onSubmit,
}: FullScreenExitModalContentProps) => {
  return (
    <div className="relative p-2 px-4">
      <div className="flex flex-col gap-4">
        <h5 className="!font-bold">Full Screen Exited</h5>
        <h6 className="text-[var(--text-secondary)]">
          You have exited full screen mode. Please re-enter or submit now.
        </h6>
      </div>
      <div className="flex justify-end mt-7 gap-4">
        <Button onClick={onReEnter} style="secondary">
          Re-enter
        </Button>
        <Button onClick={onSubmit}>Submit Now</Button>
      </div>
    </div>
  );
};

export default FullScreenExitModalContent;