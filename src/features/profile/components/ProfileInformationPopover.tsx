// React
import { useState, type ReactElement, type RefObject } from "react";

// Components
import { Popover } from "../../../components/Popover/Popover";
import { PopoverTrigger } from "../../../components/Popover/PopoverTrigger";
import { PopoverContent } from "../../../components/Popover/PopoverContent";

const InformationPopoverContent = ({ type }: { type: string }) => {
  return type === "mobile" ? (
    <div className="flex flex-col items-center gap-2 w-[200px] sm:w-sm">
      <p>
        Your mobile number lets us verify your identity securely with OTPs. It
        keeps your account safe and login quick.
      </p>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-2 w-[200px] sm:w-sm">
      <p>
        Your email helps us connect with you for timely and personalized teacher
        support.
      </p>
    </div>
  );
};

const ProfileInformationPopover = ({
  type,
  children,
}: {
  children: ReactElement & { ref?: RefObject<any> };
  type: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Popover
      open={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement={"bottom-start"}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="z-[9999] flex justify-center items-center px-4 py-4 bg-[var(--surface-bg-secondary)]">
        <InformationPopoverContent type={type} />
      </PopoverContent>
    </Popover>
  );
};

export default ProfileInformationPopover;
