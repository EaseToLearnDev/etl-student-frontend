import { type Meta, type StoryObj } from "@storybook/react-vite";
import SubjectReport from "./SubjectReport";
import type { ComponentProps } from "react";

type SubjectReportProps = ComponentProps<typeof SubjectReport>;

const meta: Meta<SubjectReportProps> = {
  component: SubjectReport,
  title: "Reports and Analytics/Subject Report",
  argTypes: {
    subject: {
      control: { type: "text" },
      description: "The name of the subject (e.g., 'Mathematics').",
    },
    description: {
      control: { type: "text" },
      description: "A brief description of the subject report.",
    },
    progress: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "The progress percentage in the subject.",
    },
    strengths: {
      control: { type: "object" },
      description: "List of strengths in the subject.",
    },
    areas_of_improvement: {
      control: { type: "object" },
      description: "List of areas needing improvement in the subject.",
    },
  },
};

export default meta;

type Story = StoryObj<SubjectReportProps>;

export const Default: Story = {
  args: {
    subject: "Biology",
    description: "15 Tests completed with 72% average score",
    progress: 70,
    strengths: ["Human Physiology", "Ecology"],
    areas_of_improvement: ["Molecular Biology", "Genetics"],
  }
};

export const Minimal: Story = {
  args: {
    subject: "Chemistry",
    description: "Just starting the syllabus",
    progress: 5,
  },
};

export const EmptyState: Story = {
  args: {},
};
