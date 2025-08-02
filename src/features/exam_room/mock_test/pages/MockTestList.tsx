// React
import { useEffect, useState } from "react";
// Hooks
import useIsMobile from "../../../../hooks/useIsMobile";

// Store
import { useMTStore } from "../store/useMTStore";

// Services
import { loadMockTestList } from "../services/loadMocktestList";

// Layouts & Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import TopicTestInstructions from "../../topic_test/components/TopicTestInstructions";
import TestCardList from "../../../shared/components/TestCardList";
import Tabs from "../../../../components/Tabs";
import Select from "../../../../components/Select";


/**
 * MockTestList component displays a list of mock tests categorized into "Complete Mock Tests" and "Subject Wise Mock Tests".
 */
const MockTestList = () => {
  const isMobile = useIsMobile();
  const [hideSecondary, setHideSecondary] = useState<boolean>(
    isMobile ? true : false
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDropdownIndex, setSelectedDropdownIndex] = useState(0);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const testList = useMTStore((state) => state.testList);

  const completeMockTests = testList?.[0] || [];
  const subjectSpecificMockTests = testList?.slice(1) || [];

  useEffect(() => {
    loadMockTestList();
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between md:w-[60%] lg:w-[70%] xl:w-[75%] pr-5">
        {/* Tabs */}
        <Tabs
          tabs={["Complete Mock Tests", "Subject Wise Mock Tests"]}
          selectedIndex={selectedTabIndex}
          onSelect={setSelectedTabIndex}
        />
        {selectedTabIndex === 1 && (
          <Select
            type="Subjects"
            items={subjectSpecificMockTests.map((item) => item.categoryName)}
            isOpen={isDropdownOpen}
            onToggle={() => setIsDropdownOpen((prev) => !prev)}
            selectedIndex={selectedDropdownIndex}
            onSelect={setSelectedDropdownIndex}
          />
        )}
      </div>

      {/* Layout */}
      <div className="w-full h-full overflow-y-auto mt-4">
        {selectedTabIndex === 0 ? (
          <ChildLayout
            primaryContent={
              <TestCardList
                tests={completeMockTests}
                infoClickHandler={() => setHideSecondary(false)}
              />
            }
            secondaryContent={<TopicTestInstructions title="Instructions" />}
            hideSecondary={hideSecondary}
            onSecondaryHide={() => setHideSecondary(true)}
          />
        ) : (
          <ChildLayout
            primaryContent={
              <TestCardList
                tests={subjectSpecificMockTests[selectedDropdownIndex]}
                infoClickHandler={() => setHideSecondary(false)}
              />
            }
            secondaryContent={<TopicTestInstructions title="Instructions" />}
            hideSecondary={hideSecondary}
            onSecondaryHide={() => setHideSecondary(true)}
          />
        )}
      </div>
    </div>
  );
};

export default MockTestList;
