import cn from "../../../utils/classNames";
import LogoFull from "../../../components/logo-full";
import { SidebarMenu } from "./SidebarMenu";

export default function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-[var(--border-secondary)] 2xl:w-72",
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 2xl:px-8 2xl:pt-6">
        <a href={"/"} aria-label="Site Logo">
          <LogoFull className="max-w-[180px] h-fit" />
        </a>
      </div>

      <div className="custom-scrollbar h-[calc(100%-80px)] overflow-hidden --text-[var(--text-primary)]">
        <SidebarMenu />
      </div>
    </aside>
  );
}
