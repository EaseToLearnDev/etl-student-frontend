// Utils
import cn from "../../../utils/classNames";

// Components
import HamburgerButton from "./HamburgerButton";
import Sidebar from "./Sidebar";
import StickyHeader from "./StickyHeader";


export default function Header({ className }: { className?: string }) {
  return (
    <StickyHeader
      className={cn("z-[990] 2xl:py-5 3xl:px-8 4xl:px-10", className)}
    >
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton
          view={<Sidebar className="static w-full 2xl:w-full" />}
        />
        <a
          href={"/"}
          aria-label="Site Logo"
          className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
        >
          <img />
        </a>
      </div>

      {/* <HeaderMenuRight /> */}
    </StickyHeader>
  );
}
