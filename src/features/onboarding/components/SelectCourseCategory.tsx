// Types
import { OnboardingPhase } from "../onboarding.types";

// Services
import { switchPhase } from "../onboarding.services";

// Utils
import cn from "../../../utils/classNames";

// Components
import Button from "../../../components/Button";

const SelectCourseCategory = () => {
  const categories = [
    {
      title: "Engineering",
      image: "./logo.svg",
    },
    {
      title: "Medical",
      image: "./logo.svg",
    },
    {
      title: "Law",
      image: "./logo.svg",
    },
    {
      title: "Defence",
      image: "./logo.svg",
    },
    {
      title: "Engineering",
      image: "./logo.svg",
    },
    {
      title: "Medical",
      image: "./logo.svg",
    },
    {
      title: "Law",
      image: "./logo.svg",
    },
    {
      title: "Defence",
      image: "./logo.svg",
    },
    {
      title: "Engineering",
      image: "./logo.svg",
    },
    {
      title: "Medical",
      image: "./logo.svg",
    },
    {
      title: "Law",
      image: "./logo.svg",
    },
    {
      title: "Defence",
      image: "./logo.svg",
    },
  ];
  return (
    <div className="relative flex flex-col gap-5">
      <div className="flex flex-col gap-3 items-center justify-center text-center h-[100px]">
        <h2>Select Course Category</h2>
        <h6>Pick your course</h6>
      </div>

      <div
        className="mt-5 grid grid-cols-3 sm:grid-cols-4 gap-4 overflow-y-auto pb-[100px] px-2"
        style={{ maxHeight: "calc(100dvh - 200px)" }}
      >
        {categories.map((category, index) => (
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
              <img src={category.image} alt={category.title} />
            </div>
            <p>{category.title}</p>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 h-[100px] left-0 right-0 flex justify-center items-center px-5 bg-[var(--surface-bg-primary)]">
        <Button
          className="w-full"
          onClick={() => {
            switchPhase(OnboardingPhase.Course);
            // toggle();
          }}
        >
          <h6>Next</h6>
        </Button>
      </div>
    </div>
  );
};

export default SelectCourseCategory;
