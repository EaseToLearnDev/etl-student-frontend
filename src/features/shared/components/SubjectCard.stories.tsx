import type { Meta, StoryObj } from "@storybook/react-vite";
import SubjectCard from "./SubjectCard";
import { MemoryRouter } from "react-router";

const meta: Meta<typeof SubjectCard> = {
  component: SubjectCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SubjectCard>;

export const Default: Story = {
  args: {
    item: {
      subjectName: "Mathematics",
      description: "Understand the logic behind numbers, algebra, and more",
      topicCount: 12,
      lastStudied: "2 days ago",
      url: "mathematics",
    },
  },
};

export const LongDescription: Story = {
  args: {
    item: {
      subjectName: "History and Civics",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos soluta dolorum odio obcaecati repellat ipsam officiis rerum numquam facilis, accusamus, aliquam natus illum eveniet minus, eaque quas! Tempore inventore delectus dolores. Maiores ex, recusandae quas tenetur delectus minima assumenda numquam.",
      topicCount: 9,
      lastStudied: "5 days ago",
      url: "history-and-civics",
    },
  },
};
