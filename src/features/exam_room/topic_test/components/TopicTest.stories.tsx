import type { Meta, StoryObj } from "@storybook/react-vite";
import TopicTest from "./TopicTest";
import type { TopicTestType } from "../../../shared/types";

const meta: Meta<typeof TopicTest> = {
  component: TopicTest,
};

export default meta;

type Story = StoryObj<typeof TopicTest>;

const baseTest: TopicTestType = {
  testName: "Physical Chemistry",
  testUrl: "physical-chemistry",
  testTime: 180,
  questions: 20,
  totalMarks: 100,
  difficulty: "medium",
  progress: "not_started",
};

export const Default: Story = {
  args: {
    test: {
      ...baseTest,
      marks: 28,
      progress: "not_started",
    },
  },
};

export const NotStartedWithoutMarks: Story = {
  args: {
    test: {
      ...baseTest,
      progress: "not_started",
    },
  },
};

export const InProgress: Story = {
  args: {
    test: {
      ...baseTest,
      progress: "in_progress",
    },
  },
};

export const MobileInfoClickable: Story = {
  args: {
    test: baseTest,
    infoClickHandler: () => alert("Info clicked"),
  },
};
