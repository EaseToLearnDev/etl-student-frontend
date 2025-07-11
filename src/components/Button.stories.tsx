import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    style: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
    onClick: {
      control: { action: "clicked" },
    },
    children: {
      control: { type: "text" },
      description: "Button Label",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click Me",
    style: "primary",
  },
};

export const CustomClass: Story = {
  args: {
    children: "Custom Styled",
    style: "primary",
    className: "rounded-full shadow-md",
  },
};
