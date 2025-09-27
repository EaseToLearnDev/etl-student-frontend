import cn from "../../../utils/classNames";
import LogoFull from "../../../components/logo-full";
import { SidebarMenu } from "./SidebarMenu";
import { Link } from "react-router";
import ReleaseNotesModal from "./ReleaseNotesModal";
import etlDomains from "../../../utils/etlDomains";

export default function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-[var(--border-secondary)] bg-[var(--surface-bg-secondary)] 2xl:w-72",
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-2 pt-5 2xl:px-8 2xl:pt-6 select-none focus:outline-none">
        <Link
          to="/"
          aria-label="Site Logo"
          className="focus:outline-none focus:ring-0"
          tabIndex={-1}
        >
          {etlDomains.includes(window.location.hostname) ? (
            <LogoFull className="max-w-[180px] h-fit select-none pointer-events-none" />
          ) : (
            <img
              src={`${
                import.meta.env.VITE_WHITE_LABEL_LOGO_URL
              }/${window.location.hostname.replace(/\./g, "-")}.png`}
              alt="Site Logo"
              className="max-w-[180px] h-fit select-none pointer-events-none rounded-md"
            />
          )}
        </Link>
      </div>

      <div className="custom-scrollbar h-[calc(100%-80px)] overflow-hidden --text-[var(--text-primary)]">
        <SidebarMenu />
      </div>
      <ReleaseNotesModal />
    </aside>
  );
}
