// React
import { useState } from "react";

// Icons
import { MdChevronLeft } from "react-icons/md";

// Utils
import cn from "../../../utils/classNames";

// Components
import AiIcon from "../../../components/icons/ai-icon";
import QuestionNavigator from "./QuestionNavigator";
import AiChatPanel from "./AiChatPanel";

const dummyData = {
  responseTxt: "success",
  message: "Total Found: 1",
  obj: [
    {
      testId: 5508,
      testName: "NEET UG 2025 COMPLETE MOCK TEST 1",
      testType: 3,
      testOption: 3,
      totalTime: 180,
      noQuestionAttempt: 0,
      remainingTime: 10800,
      lastQuestionIndex: 0,
      sectionLock: "No_Lock",
      sectionSet: [
        {
          sectionName: "Physics",
          questionNumbers: [
            { questionIndex: 0, questionId: 253097 },
            { questionIndex: 1, questionId: 253182 },
            { questionIndex: 2, questionId: 81431 },
            { questionIndex: 3, questionId: 245275 },
            { questionIndex: 4, questionId: 253438 },
          ],
        },
        {
          sectionName: "Chemistry",
          questionNumbers: [
            { questionIndex: 0, questionId: 253097 },
            { questionIndex: 1, questionId: 253182 },
            { questionIndex: 2, questionId: 81431 },
            { questionIndex: 3, questionId: 245275 },
            { questionIndex: 4, questionId: 253438 },
          ],
        },
        {
          sectionName: "Biology",
          questionNumbers: [
            { questionIndex: 0, questionId: 253097 },
            { questionIndex: 1, questionId: 253182 },
            { questionIndex: 2, questionId: 81431 },
            { questionIndex: 3, questionId: 245275 },
            { questionIndex: 4, questionId: 253438 },
          ],
        },
        {
          sectionName: "English",
          questionNumbers: [
            { questionIndex: 0, questionId: 253097 },
            { questionIndex: 1, questionId: 253182 },
            { questionIndex: 2, questionId: 81431 },
            { questionIndex: 3, questionId: 245275 },
            { questionIndex: 4, questionId: 253438 },
          ],
        },
        {
          sectionName: "Hindi",
          questionNumbers: [
            { questionIndex: 0, questionId: 253097 },
            { questionIndex: 1, questionId: 253182 },
            { questionIndex: 2, questionId: 81431 },
            { questionIndex: 3, questionId: 245275 },
            { questionIndex: 4, questionId: 253438 },
          ],
        }
      ],
      questionSet: [
        {
          questionId: 253097,
          questionDisplayId: "1011905052",
          questionType: "Multiple-Choice",
          questionTypeLabel: "Multiple Choice",
          sectionId: 564,
          sectionName: "PHYSICS",
          sectionOrder: 1,
          sectionTime: 0,
          topicId: "1024",
          timeSpent: 0,
          correctAnswerMarks: 4,
          incorrectAnswerMarks: -1,
          notAnswerMarks: 0,
          questionBody:
            "Q1. Energy dissipated when switch moves from A to B. (Image based)",
          responseChoice: [
            { responseId: "A", responseText: "(1/8)·(Q²/C)" },
            { responseId: "B", responseText: "(3/8)·(Q²/C)" },
            { responseId: "C", responseText: "(5/8)·(Q²/C)" },
            { responseId: "D", responseText: "(3/4)·(Q²/C)" },
          ],
          backgroundImg: "url('./not-visited.png')",
          cssName: "qbg-not-visited",
          noQuestionAttempt: 0,
          noQuestion: 5,
        },
        {
          questionId: 253182,
          questionDisplayId: "1011905053",
          questionType: "Multiple-Choice",
          questionTypeLabel: "Multiple Choice",
          sectionId: 564,
          sectionName: "PHYSICS",
          sectionOrder: 1,
          sectionTime: 0,
          topicId: "1025",
          timeSpent: 0,
          correctAnswerMarks: 4,
          incorrectAnswerMarks: -1,
          notAnswerMarks: 0,
          questionBody:
            "Q2. A body falls freely under gravity. What is its velocity after 5 seconds?",
          responseChoice: [
            { responseId: "A", responseText: "49 m/s" },
            { responseId: "B", responseText: "25 m/s" },
            { responseId: "C", responseText: "50 m/s" },
            { responseId: "D", responseText: "60 m/s" },
          ],
          backgroundImg: "url('./not-visited.png')",
          cssName: "qbg-not-visited",
          noQuestionAttempt: 0,
          noQuestion: 5,
        },
        {
          questionId: 81431,
          questionDisplayId: "1011905054",
          questionType: "Multiple-Choice",
          questionTypeLabel: "Multiple Choice",
          sectionId: 564,
          sectionName: "PHYSICS",
          sectionOrder: 1,
          sectionTime: 0,
          topicId: "1026",
          timeSpent: 0,
          correctAnswerMarks: 4,
          incorrectAnswerMarks: -1,
          notAnswerMarks: 0,
          questionBody:
            "Q3. A capacitor is charged to 100V. What is the energy stored?",
          responseChoice: [
            { responseId: "A", responseText: "1/2 CV²" },
            { responseId: "B", responseText: "CV²" },
            { responseId: "C", responseText: "2CV²" },
            { responseId: "D", responseText: "None" },
          ],
          backgroundImg: "url('./not-visited.png')",
          cssName: "qbg-not-visited",
          noQuestionAttempt: 0,
          noQuestion: 5,
        },
        {
          questionId: 245275,
          questionDisplayId: "1011905055",
          questionType: "Multiple-Choice",
          questionTypeLabel: "Multiple Choice",
          sectionId: 564,
          sectionName: "PHYSICS",
          sectionOrder: 1,
          sectionTime: 0,
          topicId: "1027",
          timeSpent: 0,
          correctAnswerMarks: 4,
          incorrectAnswerMarks: -1,
          notAnswerMarks: 0,
          questionBody: "Q4. What is the unit of force?",
          responseChoice: [
            { responseId: "A", responseText: "Joule" },
            { responseId: "B", responseText: "Pascal" },
            { responseId: "C", responseText: "Newton" },
            { responseId: "D", responseText: "Watt" },
          ],
          backgroundImg: "url('./not-visited.png')",
          cssName: "qbg-not-visited",
          noQuestionAttempt: 0,
          noQuestion: 5,
        },
        {
          questionId: 253438,
          questionDisplayId: "1011905056",
          questionType: "Multiple-Choice",
          questionTypeLabel: "Multiple Choice",
          sectionId: 564,
          sectionName: "PHYSICS",
          sectionOrder: 1,
          sectionTime: 0,
          topicId: "1028",
          timeSpent: 0,
          correctAnswerMarks: 4,
          incorrectAnswerMarks: -1,
          notAnswerMarks: 0,
          questionBody:
            "Q5. Which law explains the direction of induced current?",
          responseChoice: [
            { responseId: "A", responseText: "Faraday's Law" },
            { responseId: "B", responseText: "Lenz's Law" },
            { responseId: "C", responseText: "Ohm's Law" },
            { responseId: "D", responseText: "Ampere's Law" },
          ],
          backgroundImg: "url('./not-visited.png')",
          cssName: "qbg-not-visited",
          noQuestionAttempt: 0,
          noQuestion: 5,
        },
      ],
    },
  ],
};

const TestSidePanel = () => {
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  return (
    <div className="relative h-full flex flex-col gap-5 overflow-y-hidden">
      <div className="flex justify-between items-center">
        <h5>{isAiChatOpen ? "Assistant Tony" : "Questions"}</h5>
        <button
          onClick={() => setIsAiChatOpen((prev) => !prev)}
          className={cn(
            "cursor-pointer rounded-full hover:bg-[var(--surface-bg-secondary)]",
            "w-[32px] h-[32px] flex justify-center items-center"
          )}
        >
          {isAiChatOpen ? (
            <MdChevronLeft size={20} />
          ) : (
            <AiIcon fontSize={18} />
          )}
        </button>
      </div>
      {isAiChatOpen ? <AiChatPanel /> : <QuestionNavigator data={dummyData} />}
    </div>
  );
};

export default TestSidePanel;
