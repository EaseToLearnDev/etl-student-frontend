import { useState, type ReactElement, type RefObject } from "react";

// Components
import { Popover } from "../../../components/Popover/Popover";
import { PopoverTrigger } from "../../../components/Popover/PopoverTrigger";
import { PopoverContent } from "../../../components/Popover/PopoverContent";

const QrPopoverContent = ({ qrCode }: { qrCode: string }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <span>Scan QR to download app</span>
      <img
        src={`./${qrCode}`}
        alt="Download App QR"
        className="size-[120px] aspect-square rounded-lg"
      />
    </div>
  );
};

const QrPopover = ({
  qrCode,
  children,
}: {
  children: ReactElement & { ref?: RefObject<any> };
  qrCode: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Popover open={isOpen} setIsOpen={setIsOpen} shadow="sm" placement={"top"}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="z-[9999] flex justify-center items-center px-4 py-4 bg-[var(--surface-bg-secondary)]">
        <QrPopoverContent qrCode={qrCode} />
      </PopoverContent>
    </Popover>
  );
};

export default QrPopover;
