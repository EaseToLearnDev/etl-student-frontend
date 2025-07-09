import { type Meta, type StoryObj } from "@storybook/react-vite";
import SubjectReport from "../components/SubjectReport";
import type { ComponentProps } from "react";

type SubjectReportProps = ComponentProps<typeof SubjectReport>;

const meta: Meta<SubjectReportProps> = {
  component: SubjectReport,
//   tags: ["autodocs"],
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
