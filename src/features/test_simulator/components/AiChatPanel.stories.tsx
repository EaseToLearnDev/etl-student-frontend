import type { Meta, StoryObj } from "@storybook/react-vite";
import AiChatPanel from "./AiChatPanel";

const meta: Meta<typeof AiChatPanel> = {
  component: AiChatPanel,
};

export default meta;

type Story = StoryObj<typeof AiChatPanel>;

export const Default: Story = {
  render: () => <AiChatPanel />,
};
