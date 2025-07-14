import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./Button";

const meta: Meta<typeof Button> = {
    component: Button,
    argTypes: {
        style: {
            control: {type: "select"},
            options: ["primary", "secondary", "neutral"]
        },
        onClick: {
            action: {type: "clicked"}
        }
    }
}

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: "Primary Button",
        style: "primary",
    }
}

export const CustomClass: Story = {
    args: {
        children: "Custom Styled",
        style: "secondary",
        className: "rounded-full shadow-md"
    }
}

export const Playground: Story = {
  args: {
    children: "Click Me",
    style: "neutral",
  },
};