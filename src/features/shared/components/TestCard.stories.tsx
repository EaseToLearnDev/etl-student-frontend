/*
import type { Meta, StoryObj } from "@storybook/react-vite";
import TestCard from "./TestCard";
import type { Test } from "../types";

const meta: Meta<typeof TestCard> = {
  component: TestCard,
};

export default meta;

type Story = StoryObj<typeof TestCard>;

const baseTest: Test = {
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
      id: 1,
      time: 40,
      title: "No Title",
      score: 45,
      marks: 28,
    },
  },
};

export const NotStartedWithoutMarks: Story = {
  args: {
    test: {
      ...baseTest,
      id: 1,
      time: 40,
      title: "No Title",
      score: 45,
      marks: 28,
    },
  },
};

export const InProgress: Story = {
  args: {
    test: {
      ...baseTest,
      id: 1,
      time: 40,
      title: "No Title",
      score: 45,
      marks: 28,
    },
  },
};

export const MobileInfoClickable: Story = {
  args: {
    test: {
      ...baseTest,
      id: 1,
      time: 40,
      title: "No Title",
      score: 45,
      marks: 28,
    },
    infoClickHandler: () => alert("Info clicked"),
  },
};
*/
export default null;
