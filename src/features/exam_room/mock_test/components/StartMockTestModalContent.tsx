// React
import { MdClose } from "react-icons/md";
import { FiTarget, FiUsers } from "react-icons/fi";
import {
  PiBookOpen,
  PiCheckCircle,
  PiClock,
  PiMedal,
  PiWarning,
} from "react-icons/pi";

// Types
import type { MockTest } from "../../../shared/types";

// Hooks
import useIsMobile from "../../../../hooks/useIsMobile";

// Utils
import cn from "../../../../utils/classNames";

// Components
import Button from "../../../../components/Button";
import useDarkModeStore from "../../../../store/useDarkModeStore";
import { pushToDataLayer } from "../../../../utils/gtm";
import { gtmEvents } from "../../../../utils/gtm-events";

const begin_mock_test_button_id = "begin_mock_test_button_id"

const getSectionFields = (
  section: NonNullable<MockTest["sectionSet"]>[number],
) => [
  {
    field: "Correct Answer",
    value: `${section.correctMarks > 0 ? "+" : ""}${section.correctMarks}`,
    icon: <PiCheckCircle size={20} />,
  },
  {
    field: "Incorrect Answer",
    value: `${section.incorrectMarks > 0 ? "+" : ""}${section.incorrectMarks}`,
    icon: <PiWarning size={20} />,
  },
  {
    field: "Not Answered",
    value: `${section.notAnswerMarks > 0 ? "+" : ""}${section.notAnswerMarks}`,
    icon: <FiTarget size={20} />,
  },
];

interface StartMockTestModalContentParams {
  test: MockTest | null;
  onStart: () => void;
  onClose: () => void;
}
const StartMockTestModalContent = ({
  test,
  onStart,
  onClose,
}: StartMockTestModalContentParams) => {
  const isMobile = useIsMobile();
  const darkMode = useDarkModeStore((state) => state.darkMode);
  if (!test) return null;

  const fields = [
    {
      field: "Total Questions",
      value: test.totalQuestions,
      icon: <PiBookOpen size={20} />,
    },
    {
      field: "Total Time",
      value: `${test.testTotalTime} minutes`,
      icon: <PiClock size={20} />,
    },
    {
      field: "Total Marks",
      value: test.totalMarks,
      icon: <PiMedal size={20} />,
    },
    {
      field: "Correct Answer",
      value: test?.correctAnsMark,
      icon: <PiCheckCircle size={20} />,
    },
    {
      field: "Incorrect Answer",
      value: test?.wrongAnsMark,
      icon: <PiWarning size={20} />,
    },
    {
      field: "Question Not Attempted",
      value: test?.noAnsMark,
      icon: <FiTarget size={20} />,
    },
  ];

  const validFields =
    test?.sectionSet && test?.sectionSet?.length > 0
      ? fields.slice(0, 3)
      : fields;
  const isOdd = validFields.length % 2 !== 0;

  return (
    <div className="relative h-full min-h-[70vh] max-h-[70vh] p-2">
      {/* Header */}

      <div className="absolute top-0 left-0 w-full h-full max-h-[90px] bg-[var(--surface-bg-secondary)] flex justify-between gap-2 px-4 py-2">
        <div className="flex flex-col gap-1">
          <h4>Mock Test</h4>
          <h6>{test.testName}</h6>
        </div>
        <div
          onClick={onClose}
          className={cn(
            "fixed top-3 right-3 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
            " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full",
          )}
        >
          <MdClose size={20} />
        </div>
      </div>

      {/* Test Overview Fields */}

      <div className="mt-[90px] h-[calc(70vh-190px)] py-2 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <FiTarget size={20} />
            <h5>Test Overview</h5>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {validFields.map((f, i) => {
              const isLast = i === validFields.length - 1;
              return (
                <div
                  key={f.field}
                  className={cn(
                    "flex flex-col md:flex-row items-center gap-2 p-2 md:gap-4 md:p-4",
                    "w-full bg-[var(--surface-bg-tertiary)] rounded-lg shadow-sm",
                    isMobile && isLast && isOdd ? "col-span-2" : "",
                  )}
                >
                  <div
                    className={cn(
                      "flex w-[30px] h-[30px] justify-center items-center rounded-md text-",
                      darkMode
                        ? "bg-[var(--sb-neutral-bg-disabled)]/50"
                        : "bg-[var(--sb-neutral-bg-disabled)]",
                    )}
                  >
                    {f.icon}
                  </div>
                  <div className="flex flex-col text-center md:text-left">
                    <span>{f.field}</span>
                    <h6>{f.value}</h6>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Test Sections */}
        {test.sectionSet && test.sectionSet.length > 0 && (
          <div className="mt-7 flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <FiUsers size={20} />
              <h5>Test Sections</h5>
            </div>
            <div className="flex flex-col gap-4 pr-2">
              {test.sectionSet?.map((section) => (
                <div
                  key={section.sectionName}
                  className="w-full bg-[var(--surface-bg-tertiary)] rounded-lg"
                >
                  <div className="flex justify-between items-center p-4 border-b border-[var(--border-primary)]">
                    <h6>{section.sectionName}</h6>
                    <p>{`Questions ${section.questionRange}`}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-2">
                    {getSectionFields(section).map((f) => (
                      <div
                        key={f.field}
                        className="flex flex-col md:flex-row items-center gap-2 p-2 text-center md:text-left md:gap-4 md:p-4 w-full"
                      >
                        <div
                          className={cn(
                            "flex w-[30px] h-[30px] justify-center items-center rounded-md text-",
                            darkMode
                              ? "bg-[var(--sb-neutral-bg-disabled)]/50"
                              : "bg-[var(--sb-neutral-bg-disabled)]",
                          )}
                        >
                          {f.icon}
                        </div>
                        <div>
                          <span>{f.field}</span>
                          <h6>{f.value}</h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center absolute bottom-0 left-0 w-full h-full px-4 py-2 max-h-[80px] bg-[var(--surface-bg-secondary)]">
        <div className="flex gap-4 items-center">
          <Button 
          id={begin_mock_test_button_id}
          onClick={()=> {
            onStart();
            pushToDataLayer({
            event: gtmEvents.begin_mock_test_button_click,
            test_name: test.testName,
            mockTest_id: test.mocktestId
          });
    
          }}>Start Now</Button>
          <Button 
          style="secondary" onClick={() => {
              onClose();
              
            }}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartMockTestModalContent;
