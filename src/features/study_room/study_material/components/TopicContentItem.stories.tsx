import type { Meta, StoryObj } from "@storybook/react-vite";
import TopicContentItem from "./TopicContentItem";

const meta: Meta<typeof TopicContentItem> = {
  component: TopicContentItem,
  title: "Study Room/Study Material/Topic Content Item",
  argTypes: {
    content: {
      control: { type: "object" },
      description:
        "The content object containing details like title, description, type, and rating.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TopicContentItem>;

export const Default: Story = {
  args: {
    content: {
      id: 0,
      contentTitle: "Introduction to React",
      contentType: "video",
      language: "English",
    },
  },
};

export const LongDescription: Story = {
  args: {
    content: {
      id: 0,
      contentTitle: "Advanced Node.js",
      contentType: "article",
      language: "English",
    },
  },
};
