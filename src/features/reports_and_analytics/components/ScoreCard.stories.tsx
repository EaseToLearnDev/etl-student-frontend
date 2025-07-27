import { type Meta, type StoryObj } from "@storybook/react-vite";
import ScoreCard from "./ScoreCard";
import { Theme } from "../../../utils/colors";

const meta: Meta<typeof ScoreCard> = {
  component: ScoreCard,
  title: "Reports and Analytics/Score Cards",
  argTypes: {
    theme: {
      options: Object.values(Theme),
      control: {
        type: "select",
      },
      description: "The theme of the score card, which affects its appearance.",
    },
    title: {
      control: { type: "text" },
      description: "The title of the score card (e.g., 'Total use').",
    },
    value: {
      control: { type: "number" },
      description: "The numeric value displayed on the score card (e.g., 1204).",
    },
    description: {
      control: { type: "text" },
      description: "A brief description or subtitle for the score card (e.g., 'Last 7 days').",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ScoreCard>;

export const Default: Story = {
  args: {
    theme: Theme.Ocean,
    title: "Total use",
    value: 1204,
    description: "Last 7 days",
  },
};

export const TertiaryWithLongTitle: Story = {
  args: {
    theme: Theme.Sakura,
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
