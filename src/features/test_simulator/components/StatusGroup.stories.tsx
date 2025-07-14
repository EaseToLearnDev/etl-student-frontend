import type { Meta, StoryObj } from "@storybook/react-vite";
import StatusGroup from "./StatusGroup";

const meta: Meta<typeof StatusGroup> = {
  component: StatusGroup,
};
export default meta;

type Story = StoryObj<typeof StatusGroup>;

export const Default: Story = {
  render: () => <StatusGroup />,
};
