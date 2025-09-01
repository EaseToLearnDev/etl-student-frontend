// import { useState } from "react";
// import Tabs from "../../../components/Tabs";
// import PlanFeature from "../../shared/components/PlanFeature";
// import { OnboardingPhase, type FeatureType } from "../onboarding.types";
// import { switchPhase } from "../onboarding.services";
// import Button from "../../../components/Button";

// const features: FeatureType[] = [
//   {
//     title: "Study Material",
//     subfeatures: [
//       {
//         title: "Videos",
//         value: "check",
//       },
//       {
//         title: "Study Notes",
//         value: "(Limited Up to 4x)",
//       },
//     ],
//   },
//   {
//     title: "Smart Learning",
//     subfeatures: [
//       {
//         title: "Learning Session",
//         value: 1,
//       },
//       {
//         title: "Competitive Session",
//         value: 1,
//       },
//       {
//         title: "Subject/Topic Test",
//         value: 1,
//       },
//       {
//         title: "Previous Years Question",
//         value: "(Limited Up to 1x)",
//       },
//       {
//         title: "24 X 7 AI Assistant",
//         value: "(Limited Up to 1x)",
//       },
//     ],
//   },
//   {
//     title: "Exam Test",
//     subfeatures: [
//       {
//         title: "Topic Test Limit",
//         value: 1,
//       },
//       {
//         title: "Mock Test Limit",
//         value: 1,
//       },
//       {
//         title: "Total Number of Mock Test",
//         value: 1,
//       },
//       {
//         title: "AI Assistant",
//         value: "(Limited Up to 1x)",
//       },
//     ],
//   },
//   {
//     title: "Report & Analytics",
//     subfeatures: [
//       {
//         title: "Reports",
//         value: "(Limited Up to 1x)",
//       },
//       {
//         title: "Test History",
//         value: "(Limited Up to 1x)",
//       },
//       {
//         title: "Real-time Analysis",
//         value: "(Limited Up to 1x)",
//       },
//       {
//         title: "Performance Detail",
//         value: "(Limited Up to 1x)",
//       },
//     ],
//   },
//   {
//     title: "24 X 7 Online Access",
//     subfeatures: [
//       {
//         title: "Online Access",
//         value: "check",
//       },
//     ],
//   },
//   {
//     title: "Comparative Study",
//     subfeatures: [
//       {
//         title: "All India Rank",
//         value: "(Limited Up to 1x)",
//       },
//     ],
//   },
// ];

// const SelectPlan = () => {
//   const [planIndex, setPlanIndex] = useState(0);
//   return (
//     <div className="relative flex flex-col gap-5">
//       <div className="flex flex-col gap-3 items-center justify-center text-center h-[100px]">
//         <h2>Select Plan</h2>
//         <h6>Pick your plan</h6>
//       </div>
//       <div className="w-full px-2">
//         <Tabs
//           tabs={["Free", "Pro", "Ace"]}
//           selectedIndex={planIndex}
//           onSelect={setPlanIndex}
//           containerClassName="w-full max-w-none"
//           tabClassName="flex-1"
//         />
//       </div>
//       <div
//         className="mt-5 flex flex-col gap-5 overflow-y-auto pb-[200px]"
//         style={{ maxHeight: "calc(100dvh - 200px)" }}
//       >
//         {features.map((feature, index) => (
//           <PlanFeature key={index} feature={feature} />
//         ))}
//       </div>
//       <div className="fixed bottom-0 h-[100px] left-0 right-0 flex justify-center items-center px-5 bg-[var(--surface-bg-primary)]">
//         <Button
//           className="w-full"
//           onClick={() => switchPhase(OnboardingPhase.Plan)}
//         >
//           <h6>Next</h6>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default SelectPlan;
