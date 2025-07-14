import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";
import { Theme } from "../utils/colors";
import AiIcon from "../components/icons/ai-icon";

const meta: Meta<typeof Badge> = {
  component: Badge,
  argTypes: {
    theme: {
      control: { type: "select" },
      options: Object.values(Theme),
    },
    onClickHandler: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: (
      <>
        <AiIcon />
        <span>Ask AI</span>
      </>
    ),
    theme: Theme.Ocean,
  },
};
