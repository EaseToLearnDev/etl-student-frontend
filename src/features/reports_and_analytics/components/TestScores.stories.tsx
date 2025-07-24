import type { Meta, StoryObj } from "@storybook/react-vite";
import TestScores from "./TestScores";

const meta: Meta<typeof TestScores> = {
  component: TestScores,
  title: "Reports and Analytics/Test Scores",
  argTypes: {
    title: {
      control: { type: "text" },
      description: "The title of the test or subject (e.g., 'Math Test').",
    },
    tag: {
      control: { type: "text" },
      description: "A short descriptor or tag for the test (e.g., 'Term 1').",
    },
    score: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "The numeric score achieved (e.g., 85).",
    },
    grade: {
      options: ["Good", "Excellent", "Need of Improvement"],
      control: {
        type: "select",
      },
      description:
        "The grade category (e.g., 'Good', 'Excellent', 'Need of Improvement').",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TestScores>;

export const Default: Story = {
  args: {
    title: "Full Mock Test 1",
    tag: "Mock test",
    score: 85,
    grade: "Good",
  },
};

export const WithLongTitle: Story = {
  args: {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, non? gsa consectetur adipisicing ?",
    tag: "Mock test",
    score: 92,
    grade: "Excellent",
  },
};

export const WithoutGrade: Story = {
  args: {
    title: "Full Mock Test",
    tag: "Mock test",
    score: 65,
    grade: undefined,
  },
};