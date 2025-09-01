// import useOnboardingStore from "../hooks/useOnboardingStore";
// import { OnboardingPhase, type OnboardingPhaseType } from "../onboarding.types";
// import SelectCourseCategory from "../components/SelectCourseCategory";
// import SelectCourse from "../components/SelectCourse";
// import SelectPlan from "../components/SelectPlan";

// const OnboardingPage = () => {
//   const currentPhase = useOnboardingStore((state) => state.currentPhase);

//   const phases: OnboardingPhaseType = {
//     [OnboardingPhase.CourseCategory]: <SelectCourseCategory />,
//     [OnboardingPhase.Course]: <SelectCourse />,
//     [OnboardingPhase.Plan]: <SelectPlan />,
//   };

//   return (
//     <div className="h-[100dvh] max-h-[100dvh] overflow-hidden w-full grid place-items-center">
//       {/* Full height inner wrapper */}
//       <div className="w-full h-full bg-[var(app-bg)] flex flex-col pt-10">
//         {/* Scrollable container */}
//         <div className="w-full h-full bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-t-[25px] py-4 px-2">
//           {phases[currentPhase]}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OnboardingPage;
