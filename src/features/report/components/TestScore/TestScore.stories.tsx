import type { Meta, StoryObj } from "@storybook/react-vite";
import TestScore from "./TestScore";

const meta: Meta<typeof TestScore> = {
  component: TestScore,
  argTypes: {
    name: {
      control: { type: "text" },
      description: "The name of the test or subject (e.g., 'Math Test').",
    },
    type: {
      control: { type: "text" },
      description: "A short descriptor or type for the test (e.g., 'Term 1').",
    },
    score: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "The numeric score achieved (e.g., 85).",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TestScore>;

export const Default: Story = {
  args: {
    name: "Full Mock Test 1",
    type: "Mock test",
    score: 85,
  },
};

export const WithLongname: Story = {
  args: {
    name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, non? gsa consectetur adipisicing ?",
    type: "Mock test",
    score: 92,
  },
};

export const WithoutGrade: Story = {
  args: {
    name: "Full Mock Test",
    type: "Mock test",
    score: 65,
  },
};
