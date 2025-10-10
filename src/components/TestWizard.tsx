import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toQueryString } from "../utils";
import etlDomains from "../utils/etlDomains";

interface Chunk {
  title: string;
  content: React.ReactNode;
}

const TestWizard = () => {
  const navigate = useNavigate();
  const [currentChunk, setCurrentChunk] = useState<number>(0);
  const [chunks, setChunks] = useState<Chunk[]>([]);

  // Params
  const params = new URLSearchParams(window.location.search);
  const courseUrl = params.get("courseUrl");
  const courseId = params.get("courseId");
  const utmSource = params.get("utm_source");
  const deviceType = params.get("device_type");
  const testUid = params.get("testUid");
  const testType = params.get("testType") ? Number(params.get("testType")) : 0;
  const assessmentMode = params.get("assessmentMode");
  const searchFlag = params.get("searchFlag");
  const searchQuery = params.get("searchQuery");
  const topicId = params.get("topicId");

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.ctrlKey ||
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && event.key === "I")
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Build content chunks
  useEffect(() => {
    const contentChunks: Chunk[] = [
      {
        title: "Welcome to ETL 👋",
        content: (
          <div className="text-center">
            <h5 className="text-[var(--sb-ocean-bg-active)] mb-4">
              This Isn't Just a Test. It's the Beginning of Smarter Learning.
            </h5>
            <div className="bg-[var(--border-tertiary)] p-5 rounded-lg my-5 border-l-4 border-[var(--sb-ocean-bg-active)] text-left">
              <h5 className="text-[var(--text-secondary)] mb-2">
                🎯 What to expect:
              </h5>
              <p className="mb-3">
                You’re about to take a Mock Test. Go ahead — complete it.
                <br />
                But mock tests are just one piece of the puzzle.
              </p>
              <p className="mb-3">
                In our <strong>Gap Fixer</strong> tool, we go beyond testing —
                we help you master every concept with feedback, targeted
                practice, and your AI assistant.
              </p>
              <p>
                Why settle for just knowing what went wrong, when you can fix it
                - fast? Explore <strong>Gap Fixer Tool</strong> in the student
                panel after submitting you test.
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "How to Navigate Your Test",
        content: (
          <div className="py-3">
            <div className="my-6 p-4 bg-[var(--border-tertiary)] rounded-lg border-l-4 border-[var(--sb-green-haze-bg-active)]">
              <h5 className="text-[var(--text-secondary)] mb-2">
                ⏱ Time Management
              </h5>
              <p>
                The clock has been set at server and count down timer at the top
                right corner of the screen will display left out time to closure
                from where you can monitor time you have to complete the exam.
              </p>
            </div>

            <div className="my-6 p-4 bg-[var(--border-tertiary)] rounded-lg border-l-4 border-[var(--sb-green-haze-bg-active)]">
              <h5 className="text-[var(--text-secondary)] mb-2">
                📝 Answering Questions
              </h5>
              <ul className="list-disc pl-5">
                <li>Click answer option buttons to select your answer.</li>
                <li>
                  To change an answer, simply click the desired option button.
                </li>
                <li>Click on RESET button to deselect a chosen answer.</li>
                <li>
                  Click on SAVE & NEXT to save the answer before moving to the
                  next question. The next question will automatically be
                  displayed.
                </li>
                <li>
                  Click on SKIP to move to the next question without saving the
                  current question.
                </li>
                <li>
                  Click on MARK FOR REVIEW to review your answer at later stage.
                </li>
                <li>
                  Make sure you click on SAVE & NEXT button everytime you want
                  to save your answer.
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 bg-[var(--border-tertiary)] rounded-lg border-l-4 border-[var(--sb-green-haze-bg-active)]">
              <h5 className="text-[var(--text-seondary)] mb-2">
                🧭 Navigation & Review
              </h5>
              <p>
                To go to a question, click on the question number on the right
                side of the screen.
              </p>
              <p>
                Candidate will be allowed to Shuffle between sections and
                questions anytime during the examination as per their
                convenience.
              </p>
              <p>
                Candidate can change their response of attempted answers anytime
                during the examination slot time by clicking another answer
                which candidates wants to change.
              </p>
            </div>

            <div className="my-6 p-4 bg-[var(--border-tertiary)] rounded-lg border-l-4 border-[var(--sb-green-haze-bg-active)]">
              <h5 className="text-[var(--text-seondary)] mb-2">
                📊 Question Status Indicators
              </h5>
              <p className="mb-3">
                The color coded diagram on the right side of the screen shows
                the status of the questions:
              </p>
              <ol className="list-decimal pl-5">
                <li>you have not visited question no 2.</li>
                <li>you have not answered question no 3.</li>
                <li>you have answered question no 4.</li>
                <li>you have marked the question no. 5 for review.</li>
                <li>you have answered & marked for review of question no. 6</li>
              </ol>
            </div>
            <div className="my-6 p-4 bg-[var(--border-tertiary)] rounded-lg border-l-4 border-[var(--sb-green-haze-bg-active)]">
              <h5 className="text-[var(--text-seondary)] mb-2">📈 Scoring</h5>
              <p>
                All the answered questions(saved or marked) will be considered
                for calculating the final score.
              </p>
            </div>

            <div className="my-6 p-4 bg-[var(--border-tertiary)] rounded-lg border-l-4 border-[var(--sb-green-haze-bg-active)]">
              <h5 className="text-[var(--text-seondary)] mb-3">
                ⚠️ Important Warnings
              </h5>
              <p className="text-[var(--sb-valencia-bg-active)] bg-[var(--sb-valencia-bg-disabled)] p-[10px] rounded-[6px] border-1 my-[10px] border-l-[var(--sb-valencia-bg-active)]">
                Do Not PRESS any keyboard key once the exam is started. This
                will LOCK your exam. You can connect with the exam invigilator
                to unlock and continue giving the exam.
              </p>
              <p className="text-[var(--sb-valencia-bg-active)] bg-[var(--sb-valencia-bg-disabled)] p-[10px] rounded-[6px] border-1 my-[10px] border-l-[var(--sb-valencia-bg-active)]">
                Do Not CLICK on the SUBMIT Button unless you have completed the
                exam. In case you click SUBMIT button, you will not be permitted
                to continue.
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Ready to Start?",
        content: (
          <div className="text-center px-4 py-8 md:py-12">
            <h4 className="text-[var(--sb-ocean-bg-active)] mb-5">
              🚀 Ready to begin?
            </h4>
            <p className="text-[var(--text-secondary)] mb-4">
              Click <strong>Start Test</strong> when you're ready to begin your
              examination.
            </p>
            <div className="mt-6 p-5 bg-[var(--sb-ocean-bg-disabled)] border border-[var(--sb-ocean-bg-active)] rounded-lg">
              <p className="text-[var(--sb-ocean-bg-active)] m-0">
                Make sure you've read all instructions carefully before
                proceeding.
              </p>
            </div>
          </div>
        ),
      },
    ];

    setChunks(contentChunks);
  }, []);

  const handleNext = () => {
    if (currentChunk < chunks.length - 1) {
      setCurrentChunk((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentChunk > 0) {
      setCurrentChunk((prev) => prev - 1);
    }
  };

  // Start Test Redirect
  const startTest = () => {
    const queryParams: Record<string, string> = {};
    if (courseUrl !== null) queryParams.courseUrl = courseUrl;
    if (courseId !== null) queryParams.courseId = courseId;
    if (utmSource !== null) queryParams.utm_source = utmSource;
    if (deviceType !== null) queryParams.device_type = deviceType;
    if (testUid !== null) queryParams.testUid = testUid;
    if (testType !== null) queryParams.testType = String(testType);
    if (assessmentMode !== null) queryParams.assessmentMode = assessmentMode;
    if (searchFlag !== null) queryParams.searchFlag = searchFlag;
    if (searchQuery !== null) queryParams.searchQuery = searchQuery;
    if (topicId !== null) queryParams.topicId = topicId;

    let queryString = toQueryString(queryParams);

    navigate(`/guest-testsimulator?${queryString}`);
  };

  if (chunks.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--app-bg)] px-3">
      <div className="relative max-w-[850px] w-full bg-[var(--surface-bg-primary)] rounded-xl shadow-lg p-5 md:p-10 flex flex-col min-h-[600px]">
        {/* Top (Logo - fixed, non scrollable) */}
        <div className="flex justify-center mb-6 flex-shrink-0">
          <img
            src={
              !etlDomains.includes(window.location.hostname)
                ? `${
                    import.meta.env.VITE_WHITE_LABEL_LOGO_URL
                  }/${window.location.hostname.replace(/\./g, "-")}.png`
                : "./ease_to_learn_logo.png"
            }
            alt="Site Logo"
            className="h-10"
          />
        </div>

        {/* Back Button */}
        {currentChunk > 0 && (
          <button
            className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center text-[var(--text-secondary)] rounded-full hover:bg-gray-100 hover:text-[var(--text-seondary)] transition-transform duration-300 hover:-translate-x-1"
            onClick={handleBack}
          >
            <FaArrowLeft className="w-4 h-4" />
          </button>
        )}

        {/* Middle (Scrollable Content) */}
        <div className="max-h-[400px] flex-1 overflow-y-auto px-1">
          <h3 className="text-center text-xl md:text-2xl font-semibold text-[var(--text-seondary)] mb-6">
            {chunks[currentChunk].title}
          </h3>
          <div className="leading-relaxed text-[var(--text-secondary)]">
            {chunks[currentChunk].content}
          </div>
        </div>

        {/* Bottom (Fixed Navigation) */}
        <div className="flex flex-col items-center mt-6 flex-shrink-0">
          <div>
            {currentChunk < chunks.length - 1 ? (
              <button
                className="bg-[var(--sb-ocean-bg-active)] text-white py-3 px-8 rounded-full text-base font-medium flex items-center gap-2 shadow-md hover:bg-[var(--sb-ocean-bg-hover)] hover:-translate-y-1 hover:shadow-lg transition"
                onClick={handleNext}
              >
                Next <FaArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <button
                className="bg-[var(--sb-green-haze-bg-active)] text-white py-3 px-8 rounded-full text-base font-medium shadow-md hover:bg-[var(--sb-green-haze-bg-hover)] hover:-translate-y-1 hover:shadow-lg transition"
                onClick={startTest}
              >
                Start Test
              </button>
            )}
          </div>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-3 mt-5">
            {chunks.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer transition-transform duration-300 ${
                  index === currentChunk
                    ? "bg-[var(--sb-ocean-bg-active)] scale-110"
                    : index < currentChunk
                    ? "bg-[var(--sb-green-haze-bg-active)]"
                    : "bg-gray-300"
                }`}
                onClick={() => setCurrentChunk(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestWizard;
