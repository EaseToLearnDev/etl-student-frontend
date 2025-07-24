import type { Meta, StoryObj } from "@storybook/react-vite";
import PerformanceReport from "./PerformanceReport";

const meta: Meta<typeof PerformanceReport> = {
  component: PerformanceReport,
  title: "Reports and Analytics/Performance Report",
  argTypes: {
    percentage: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description:
        "The performance percentage to display (0 to 100). Determines the filled section of the chart.",
    },
    description: {
      control: { type: "text" },
      description:
        "Optional descriptive text displayed beside the chart. Defaults to a fallback message if not provided.",
    },
  },
};
export default meta;

type Story = StoryObj<typeof PerformanceReport>;

export const Default: Story = {
  args: {
    percentage: 75,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, accusantium! Fuga debitis eaque ducimus quis eligendi harum eos, tempore autem mollitia eveniet, voluptatibus soluta recusandae nobis voluptatem temporibus possimus illo!",
  },
};

export const NoProgress: Story = {
  args: {
    percentage: 0,
  },
};

export const Completed: Story = {
  args: {
    percentage: 100,
    description:
      "Congratulations! You've completed all your objectives for this cycle.",
  },
};
