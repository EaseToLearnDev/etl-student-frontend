import useIsMobile from "../../../hooks/useIsMobile";
import DesktopReportAnalytics from "../components/DesktopReportAnalytics";
import MobileReportAnalytics from "../components/MobileReportAnalytics";

const dummyRecentTests = [
  {
    name: "NEET UG MOCK TEST 1",
    type: "Mock Test",
    score: 80,
  },
  {
    name: "PHYSICS CHAPTER TEST - MECHANICS",
    type: "Chapter Test",
    score: 92,
  },
  {
    name: "CHEMISTRY MOCK TEST 3",
    type: "Mock Test",
    score: 74,
  },
  {
    name: "BIOLOGY TOPIC TEST - GENETICS",
    type: "Topic Test",
    score: 88,
  },
];
const dummySubjectReports = [
  {
    subject: "Physics",
    description:
      "Strong foundation in mechanics and thermodynamics. Need to focus more on optics and modern physics concepts.",
    progress: 78,
    strengths: ["Mechanics", "Thermodynamics", "Waves"],
    areas_of_improvement: [
      "Optics",
      "Modern Physics",
      "Electromagnetic Induction",
    ],
  },
  {
    subject: "Chemistry",
    description:
      "Excellent understanding of organic chemistry. Inorganic chemistry requires more practice and memorization.",
    progress: 85,
    strengths: [
      "Organic Chemistry",
      "Chemical Bonding",
      "Coordination Compounds",
    ],
    areas_of_improvement: [
      "Inorganic Chemistry",
      "Qualitative Analysis",
      "Metallurgy",
    ],
  },
  {
    subject: "Biology",
    description:
      "Good grasp of plant and animal physiology. Genetics and evolution topics need more attention.",
    progress: 72,
    strengths: ["Plant Physiology", "Human Physiology", "Cell Biology"],
    areas_of_improvement: ["Genetics", "Evolution", "Ecology", "Biotechnology"],
  },
  {
    subject: "Mathematics",
    description:
      "Strong analytical skills in calculus and algebra. Coordinate geometry and trigonometry need improvement.",
    progress: 68,
    strengths: ["Calculus", "Algebra", "Probability"],
    areas_of_improvement: [
      "Coordinate Geometry",
      "Trigonometry",
      "3D Geometry",
    ],
  },
];
const ReportAnalytics = () => {
  const isMobile = useIsMobile();
  return isMobile ? (
    <MobileReportAnalytics
      data={{
        recentTests: dummyRecentTests,
        subjectReports: dummySubjectReports,
      }}
    />
  ) : (
    <DesktopReportAnalytics
      data={{
        recentTests: dummyRecentTests,
        subjectReports: dummySubjectReports,
      }}
    />
  );
};

export default ReportAnalytics;
