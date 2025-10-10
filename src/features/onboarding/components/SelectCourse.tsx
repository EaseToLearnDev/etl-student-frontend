import Button from "../../../components/Button";
import cn from "../../../utils/classNames";
import { switchPhase } from "../onboarding.services";
import { OnboardingPhase } from "../onboarding.types";

const SelectCourse = () => {
  const courses = [
    {
      title: "NEET UG",
      image: "./logo.svg",
    },
    {
      title: "CUET",
      image: "./logo.svg",
    },
    {
      title: "NEET PG",
      image: "./logo.svg",
    },
    {
      title: "SBI PO",
      image: "./logo.svg",
    },
    {
      title: "JEE Main",
      image: "./logo.svg",
    },
    {
      title: "JEE Advanced",
      image: "./logo.svg",
    },
    {
      title: "CLAT",
      image: "./logo.svg",
    },
    {
      title: "UPSC",
      image: "./logo.svg",
    },
    {
      title: "SSC CGL",
      image: "./logo.svg",
    },
    {
      title: "CAT",
      image: "./logo.svg",
    },
    {
      title: "GATE",
      image: "./logo.svg",
    },
    {
      title: "XAT",
      image: "./logo.svg",
    },
  ];
  return (
    <div className="relative flex flex-col gap-5">
      <div className="flex flex-col gap-3 items-center justify-center text-center h-[100px]">
        <h2>Select Exam</h2>
        <h6>Pick your exam</h6>
      </div>

      <div
        className="mt-5 grid grid-cols-3 sm:grid-cols-4 gap-4 overflow-y-auto pb-[100px] px-2"
        style={{ maxHeight: "calc(100dvh - 200px)" }}
      >
        {courses.map((course, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 justify-center items-center"
          >
            <div
              className={cn(
                "w-full h-full aspect-square border-1 border-[var(--border-secondary)] rounded-lg",
                "flex justify-center items-center object-cover p-3"
              )}
            >
              <img src={course.image} alt={course.title} />
            </div>
            <p>{course.title}</p>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 h-[100px] left-0 right-0 flex justify-center items-center px-5 bg-[var(--surface-bg-primary)]">
        <Button className="w-full" onClick={() => switchPhase(OnboardingPhase.Plan)}>
          <h6>Next</h6>
        </Button>
      </div>
    </div>
  );
};

export default SelectCourse;
