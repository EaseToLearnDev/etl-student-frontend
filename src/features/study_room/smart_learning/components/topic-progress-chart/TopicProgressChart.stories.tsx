import type { Meta, StoryObj } from "@storybook/react-vite";
import TopicProgressChart from "./TopicProgressChart";

const meta: Meta<typeof TopicProgressChart> = {
  component: TopicProgressChart,
  title: "Study Room/Smart Learning/Topic Progress Chart",
  argTypes: {
    progress: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress Percentage (0-100). Determines the filled section of the chart.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TopicProgressChart>;

export const ZeroProgress: Story = {
  args: {
    progress: 0,
  },
};

export const HalfProgress: Story = {
  args: {
    progress: 50,
  },
};

export const FullProgress: Story = {
  args: {
    progress: 100,
  },
};
