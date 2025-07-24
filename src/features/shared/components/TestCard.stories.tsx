import type { Meta, StoryObj } from "@storybook/react-vite";
import TestCard from "./TestCard";
import type { TestType } from "../types";

const meta: Meta<typeof TestCard> = {
  component: TestCard,
};

export default meta;

type Story = StoryObj<typeof TestCard>;

const baseTest: TestType = {
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
