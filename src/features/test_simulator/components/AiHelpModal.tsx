import { MdClose } from "react-icons/md";
import { Modal } from "../../../components/Modal";
import cn from "../../../utils/classNames";
import { LuBot } from "react-icons/lu";
import Button from "../../../components/Button";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useAiStore } from "../store/useAiStore";
import { AIModalView } from "../test_simulator.types";
import WidgetCard from "../../report/components/newreports/WidgetCard";

interface AiHelpModalInterface {
  isOpen: boolean;
  onClose: () => void;
}

const AIContent = () => {
  const setCurrentModalView = useAiStore((s) => s.setCurrentModalView);

  return (
    <div>
      <div className="flex items-center gap-2 mt-2">
        <img
          src="/tony.jpeg"
          alt="Tony AI"
          width={60}
          height={60}
          className="size-[60px] aspect-square rounded-full object-cover p-1 border border-[var(--border-primary)]"
        />
        <div className="flex flex-col">
          <h6>Tony AI Teacher</h6>
          <p className="text-[var(--text-secondary)]">
            Get detailed explanations and reasoning
          </p>
        </div>
      </div>
      <p className="text-[var(--text-secondary)] px-2 mt-4">
        Kindly prefer to search the answer first from your Books. Then ask
        <b className="text-[var(--sb-ocean-bg-active)]"> TONY</b>. Try to know
        the reasons of the answer and not only the answer.
      </p>

      <Button className="mt-7 w-full">
        <LuBot size={20} /> {"Ask TONY (Your AI Teacher)"}
      </Button>

      {/* Secondary Actions */}
      <div className="grid grid-cols-2 items-center gap-2 mt-4">
        <Button
          style="secondary"
          className="hover:bg-[var(--surface-bg-tertiary)]"
        >
          <MagnifyingGlassIcon width={20} height={20} />
          Search Google
        </Button>
        <Button
          style="secondary"
          className="hover:bg-[var(--surface-bg-tertiary)]"
          onClick={() => setCurrentModalView(AIModalView.StudyMaterialContent)}
        >
          <BookOpenIcon width={20} height={20} />
          Study Material
        </Button>
      </div>
    </div>
  );
};

const StudyMaterialContent = () => {
  const setCurrentModalView = useAiStore((s) => s.setCurrentModalView);

  return (
    <div>
      <div className="flex justify-between items-center gap-4 py-2">
        <div
          onClick={() => {
            setCurrentModalView(AIModalView.AIContent);
          }}
          className="flex gap-2 items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-none hover:bg-[var(--surface-bg-tertiary)]"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <p>Back</p>
        </div>
        <div className="flex items-center gap-2">
          <LuBot size={20} className="text-[var(--sb-ocean-bg-active)]" />
          <p className="text-[var(--text-secondary)]">Tony's Response</p>
        </div>
      </div>
      <WidgetCard className="min-h-[300px] w-full mt-2"></WidgetCard>
    </div>
  );
};

const AiHelpModal = ({ isOpen, onClose }: AiHelpModalInterface) => {
  const currentModalView = useAiStore((s) => s.currentModalView);

  // map enum to component
  const views = {
    [AIModalView.AIContent]: <AIContent />,
    [AIModalView.StudyMaterialContent]: <StudyMaterialContent />,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      className="p-4"
      blur="none"
    >
      <div className="relative p-2">
        {/* Top Header */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center size-8 aspect-square bg-[var(--sb-ocean-bg-active)] rounded-md">
                <BookOpenIcon width={16} height={16} />
              </div>
              <h5 className="!font-bold">Physics</h5>
            </div>
            <div
              onClick={onClose}
              className={cn(
                "size-10 aspect-square flex justify-center items-center cursor-pointer",
                " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
              )}
            >
              <MdClose size={20} />
            </div>
          </div>

          {/* Main Body */}
          {views[currentModalView]}
        </div>
      </div>
    </Modal>
  );
};

export default AiHelpModal;
