import { type Meta, type StoryObj } from "@storybook/react-vite"
import ScoreCards from "../components/ScoreCards"
import { Theme } from "../../../utils/colors";

const meta: Meta<typeof ScoreCards> = {
    component: ScoreCards,
    // tags: ["autodocs"],
    argTypes: {
        theme: {
            options : Object.values(Theme),
            control: {
                type: "select"
            }
        }
    }
};

export default meta;

type Story = StoryObj<typeof ScoreCards>;

export const Default: Story = {
    args: {
        theme: Theme.Ocean,
        title: "Total use",
        value: 1204,
        description: "Last 7 days"
    }
};

export const TertiaryWithLongTitle: Story = {
  args: {
    theme: Theme.Sakura,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, non?",
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
