import { useNavigate } from "react-router-dom";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import cn from "../../../utils/classNames";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { setFtueLevel } from "../services/setFtueLevel";
import WidgetCard from "../../report/components/newreports/WidgetCard";

interface GuideStep {
    id: number;
    title: string;
    description: string;
    link: string;
}

const QuickStart = () => {
    const navigate = useNavigate();
    const setStudentData = useStudentStore((state) => state.setStudentData);

    // Get current FTUE level
    const studentData = useStudentStore((state) => state.studentData);
    const completedCount = studentData?.firstTimeUser;

    if(completedCount == null || !studentData){
        return;
    }

    const steps: GuideStep[] = [
        {
            id: 1,
            title: "Visit Gap Fixer",
            description: "Identify and fix your knowledge gaps",
            link: "/gap-fixer",
        },
        {
            id: 2,
            title: "Start a Session",
            description: "Begin your first learning session",
            link: "/session",
        },
        {
            id: 3,
            title: "Use Ask Tony",
            description: "Get instant help from AI assistant",
            link: "/ask-tony",
        },
        {
            id: 4,
            title: "Visit PaceX",
            description: "Track your learning pace and progress",
            link: "/pacex",
        },
        {
            id: 5,
            title: "Adaptive Learning",
            description: "Experience personalized learning paths",
            link: "/adaptive-learning",
        },
        {
            id: 6,
            title: "Visit Topic Test",
            description: "Test your knowledge on specific topics",
            link: "/topic-test",
        },
        {
            id: 7,
            title: "Visit Mock Test",
            description: "Take full-length practice exams",
            link: "/mock-test",
        },
    ];

    const totalSteps = steps.length;

    const handleStepClick = async (step: GuideStep) => {
        // Update FTUE level if clicking next uncompleted step
        if (step.id === completedCount + 1) {
            setStudentData({
                ...studentData,
                firstTimeUser: step.id == 7 ? null : step.id,
            })
            await setFtueLevel(step.id);
            // navigate(step.link);
        }
    };

    return (
        <WidgetCard title="Quick Start">
            {/* Progress Bar */}
            <div className="w-full h-2 bg-[var(--surface-bg-secondary)] rounded-full overflow-hidden my-4">
                <div
                    className="h-full bg-[var(--sb-green-haze-bg-active)] transition-all duration-300"
                    style={{ width: `${(completedCount / totalSteps) * 100}%` }}
                />
            </div>

            {/* Steps List */}
            <div className="flex flex-col gap-3">
                {steps.map((step) => {
                    const isCompleted = step.id <= completedCount;
                    const isNextStep = step.id === completedCount + 1;

                    return (
                        <div
                            key={step.id}
                            className={cn(
                                "flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer",
                                "hover:bg-[var(--surface-bg-secondary)]",
                                !isCompleted && !isNextStep && "opacity-50"
                            )}
                            onClick={() => handleStepClick(step)}
                        >
                            <div className="flex-shrink-0 mt-0.5">
                                {isCompleted ? (
                                    <MdCheckCircle
                                        size={20}
                                        className="text-[var(--sb-green-haze-bg-active)]"
                                    />
                                ) : (
                                    <MdRadioButtonUnchecked
                                        size={20}
                                        className="text-[var(--text-tertiary)]"
                                    />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h6
                                    className={cn(
                                        "!text-sm !font-medium",
                                        isCompleted
                                            ? "text-[var(--sb-green-haze-bg-active)]" 
                                            : "text-[var(--text-secondary)]"    
                                    )}
                                >
                                    {step.title}
                                </h6>
                                <p className={cn(
                                    "text-xs mt-0.5",
                                    isCompleted
                                        ? "text-[var(--sb-green-haze-bg-active)] opacity-80"  
                                        : "text-[var(--text-tertiary)]"                 
                                )}>
                                    {step.description}
                                </p>
                            </div>

                            <span className="text-xs text-[var(--text-tertiary)] flex-shrink-0">
                                {step.id}/{totalSteps}
                            </span>
                        </div>
                    );
                })}
            </div>
        </WidgetCard>
    );
};

export default QuickStart;