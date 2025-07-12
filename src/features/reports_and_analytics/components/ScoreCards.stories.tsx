import { type Meta, type StoryObj } from "@storybook/react-vite";
import ScoreCards from "../components/ScoreCards";

const meta: Meta<typeof ScoreCards> = {
  component: ScoreCards,
  // tags: ["autodocs"],
  argTypes: {
    type: {
      options: ["primary", "success", "error", "neutral", "default"],
      control: {
        type: "select",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ScoreCards>;

export const Default: Story = {
  args: {
    type: "primary",
    title: "Total use",
    value: 1204,
    description: "Last 7 days",
  },
};

export const TertiaryWithLongTitle: Story = {
  args: {
    type: "success",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, non?",
    value: 84,
    description: "Completion Rate",
  },
};

export const MinimalCard: Story = {
  args: {
    title: "No Theme Set",
    value: "N/A",
  },
};
