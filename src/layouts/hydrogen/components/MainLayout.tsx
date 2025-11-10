import { Outlet } from "react-router";
import GlobalDrawer from "../../../components/GlobalDrawer";
import GlobalModal from "../../../components/GlobalModal";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TopMenu from "./TopMenu";
import TutorialsModal from "../../../features/tutorials/pages/TutorialsModal";
import useIsMobile from "../../../hooks/useIsMobile";
import MobileNavBar from "./MobileNavBar";

export default function HydrogenLayout() {
  const isMobile = useIsMobile();
  return (
    <>
      <main className="flex h-[100dvh] flex-grow bg-[var(--app-bg)] overflow-hidden">
        <Sidebar className="fixed hidden xl:block" />
        <div className="flex h-[100dvh] w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
          <Header className="w-full h-[80px] max-h-[80px] max-desktop-width header-ultra-wide" />
          <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9 overflow-hidden max-h-[calc(100dvh-140px)] xl:max-h-[calc(100dvh-80px)]">
            <div className="flex flex-col gap-4 h-full max-desktop-width">
              <TopMenu />
              <div className="flex-1 min-h-0 overflow-auto scrollbar-hide">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Navigation Bar */}
        <MobileNavBar />
      </main>
      <GlobalDrawer />
      <GlobalModal />
      <TutorialsModal />
    </>
  );
}
