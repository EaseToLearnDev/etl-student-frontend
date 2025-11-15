// React
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

// Icons
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

// Hooks
import useIsMobile from "../../../../hooks/useIsMobile";
import { useLoadingStore } from "../../../../hooks/useLoadingStore";
import useUpgradeModalStore from "../../../shared/hooks/useUpgradeModalStore";
import { useStudentStore } from "../../../shared/hooks/useStudentStore";
import { getActiveCourseAccessStatus } from "../../../../global/services/upgrade";

// Utils
import cn from "../../../../utils/classNames";

// Store
import { useMTStore } from "../hooks/useMTStore";
import { usePrevTestStore } from "../../../shared/hooks/usePrevTestStore";

// Services
import { loadMockTestList } from "../services/loadMocktestList";
import { selectAndShowStartTestModal } from "../services/selectAndShowStartTestModal";
import { handleStartTest } from "../../shared/services/handleStartTest";
import { handleShowPreviousOrStartTest } from "../../../shared/services/handleShowPreviousOrStartTest";

// Layouts & Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import TopicTestInstructions from "../../topic_test/components/TopicTestInstructions";
import { Modal } from "../../../../components/Modal";
import Tabs from "../../../../components/Tabs";
import StartMockTestModalContent from "../components/StartMockTestModalContent";
import { Skeleton } from "../../../../components/SkeletonLoader";
import TestCardList from "../../../shared/components/TestCardList";
import PreviousTestModalContent from "../../../shared/components/PreviousTestModalContent";
import UpgradeModal from "../../../shared/components/UpgradeModal";
import { pushToDataLayer } from "../../../../utils/gtm";
import { gtmEvents } from "../../../../utils/gtm-events";
import { usePageTracking } from "../../../../hooks/usePageTracking";
import { handleResumeTest } from "../../../shared/services/handleTest";

/**
 * MockTestPage component displays a list of mock tests categorized into "Complete Mock Tests" and "Subject Wise Mock Tests".
 */
const MockTestPage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Store state
  const testList = useMTStore((s) => s.testList);
  const selectedTest = useMTStore((s) => s.selectedTest);
  const setSelectedTest = useMTStore((s) => s.setSelectedTest);

  const showStartTestModal = useMTStore((s) => s.showStartTestModal);
  const setShowStartTestModal = useMTStore((s) => s.setShowStartTestModal);

  const showPreviousTestModal = useMTStore((s) => s.showPreviousTestModal);
  const setShowPreviousTestModal = useMTStore(
    (s) => s.setShowPreviousTestModal,
  );

  const reset = useMTStore((s) => s.reset);

  const loading = useLoadingStore((s) => s.loading);

  // Prev test store
  const previousRunningTest = usePrevTestStore((s) => s.prevRunningTest);
  const setPreviousRunningTest = usePrevTestStore((s) => s.setPrevRunningTest);

  // Local state
  const [hideSecondary, setHideSecondary] = useState(isMobile);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const courseTitle = useStudentStore((s) => s.activeCourse?.organisationName);

  const cancel_mock_test_button_id = "cancel_mock_test_button_id";

  const tabs = testList?.map((set) =>
    set?.categoryName
      ?.replace(courseTitle || "", "")
      .replace(/\bmock tests?\b/i, "")
      .trim(),
  );

  const isUpgradeModalOpen = useUpgradeModalStore((s) => s.isUpgradeModalOpen);
  const setIsUpgradeModalOpen = useUpgradeModalStore(
    (s) => s.setIsUpgradeModalOpen,
  );

  usePageTracking(gtmEvents.mock_test_page_visit)

  useEffect(() => {
    loadMockTestList();

    return () => {
      reset();
    };
  }, []);

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsContainerRef.current) {
      const scrollAmount = 200;
      const currentScroll = tabsContainerRef.current.scrollLeft;
      const newScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      tabsContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full h-full overflow-hidden">
      {/* Tabs + Navigation Arrow */}
      <div
        className={cn(
          "flex lg:items-center gap-2 md:max-w-[60%] lg:max-w-[70%]",
          !isMobile ? " pr-5" : "",
        )}
      >
        <button
          onClick={() => {
            setSelectedTabIndex(
              selectedTabIndex !== 0 ? selectedTabIndex - 1 : 0,
            );
            scrollTabs("left");
          }}
          className="size-10 aspect-square border-1 border-[var(--border-secondary)] rounded-lg flex justify-center items-center cursor-pointer hover:bg-[var(--sb-ocean-bg-disabled)] transition-colors"
        >
          <MdChevronLeft
            size={20}
            className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] active:text-[var(--text-primary)]"
          />
        </button>
        <div
          ref={tabsContainerRef}
          className="max-w-[90%] overflow-x-auto scrollbar-hide"
        >
          <Tabs
            tabs={tabs || []}
            selectedIndex={selectedTabIndex}
            onSelect={setSelectedTabIndex}
            tabClassName="px-5 py-2 text-[var(--text-secondary)] rounded-full hover:bg-[var(--sb-ocean-bg-disabled)] hover:text-[var(--sb-ocean-bg-active)] transition-all duration-200"
            activeTabClassName="px-5 py-2 text-white bg-[var(--sb-ocean-bg-active)] rounded-full shadow-md"
          />
        </div>
        <button
          onClick={() => {
            setSelectedTabIndex(
              selectedTabIndex !== (tabs || [])?.length - 1
                ? selectedTabIndex + 1
                : selectedTabIndex,
            );
            scrollTabs("right");
          }}
          className="ml-auto size-10 aspect-square border-1 border-[var(--border-secondary)] rounded-lg flex justify-center items-center cursor-pointer hover:bg-[var(--sb-ocean-bg-disabled)] transition-colors"
        >
          <MdChevronRight
            size={20}
            className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] active:text-[var(--text-primary)]"
          />
        </button>
      </div>

      {/* Layout */}
      <div className="w-full h-full overflow-y-auto mt-4">
        <ChildLayout
          primaryContent={
            !loading ? (
              <TestCardList
                tests={testList?.[selectedTabIndex]?.testList}
                infoClickHandler={() => setHideSecondary(false)}
                onClickHandler={(test) => {
                  getActiveCourseAccessStatus() === "renew"
                    ? setIsUpgradeModalOpen(true)
                    : selectAndShowStartTestModal({
                        testId: test?.id,
                        selectedTabIndex,
                        testList,
                        setSelectedTest,
                        setShowStartTestModal,
                      });
                }}
              />
            ) : (
              <>
                <div className="space-y-4">
                  <Skeleton height={100} variant="rounded" />
                  <Skeleton height={100} variant="rounded" />
                  <Skeleton height={100} variant="rounded" />
                  <Skeleton height={100} variant="rounded" />
                  <Skeleton height={100} variant="rounded" />
                  <Skeleton height={100} variant="rounded" />
                </div>
              </>
            )
          }
          secondaryContent={
            <TopicTestInstructions title="Mock Test" className="mb-12" />
          }
          hideSecondary={hideSecondary}
          onSecondaryHide={() => setHideSecondary(true)}
        />
      </div>

      <Modal
        isOpen={showStartTestModal}
        onClose={() => {
          setShowStartTestModal(false);
          pushToDataLayer({
            event: gtmEvents.cancel_mock_test_button_click,
            id: cancel_mock_test_button_id,
          });
        }}
        size="lg"
        className="p-4"
      >
        <StartMockTestModalContent
          test={selectedTest}
          onStart={() =>
            handleShowPreviousOrStartTest({
              setPreviousRunningTest,
              setShowPreviousTestModal,
              startTestCallback: () =>
                handleStartTest({
                  navigate,
                  testId: selectedTest?.mocktestId ?? null,
                  testType: 3,
                }),
            })
          }
          onClose={() => {
            setShowStartTestModal(false);
            pushToDataLayer({
              event: gtmEvents.cancel_mock_test_button_click,
              id: cancel_mock_test_button_id,
            });
          }}
        />
      </Modal>

      {/* Previous Test Modal */}
      <Modal
        isOpen={showPreviousTestModal}
        onClose={() => setShowPreviousTestModal(false)}
        size="lg"
        className="p-4"
      >
        <PreviousTestModalContent
          onStart={() =>
            handleStartTest({
              navigate,
              testId: selectedTest?.mocktestId ?? null,
              testType: 3,
            })
          }
          onResume={() => handleResumeTest(navigate, previousRunningTest)}
          onClose={() => setShowPreviousTestModal(false)}
          testName={previousRunningTest?.testName || ""}
        />
      </Modal>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
    </div>
  );
};

export default MockTestPage;
