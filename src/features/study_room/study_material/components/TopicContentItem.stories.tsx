import type { Meta, StoryObj } from "@storybook/react-vite";
import TopicContentItem from "./TopicContentItem";

const meta: Meta <typeof TopicContentItem> = {
    component: TopicContentItem,
}

export default meta;

type Story = StoryObj<typeof TopicContentItem>;

export const Default: Story = {
    args: {
        content: {
            id: 0,
            contentTitle: "Introduction to React",
            contentDescription: "A beginner's guide to building UI with React.",
            contentType: "video",
            rating: 4.7,
        }
    }
}

export const LongDescription: Story = {
    args: {
        content: {
            id: 0,
            contentTitle: "Advanced Node.js",
            contentDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quis facilis velit in, ex asperiores sed qui numquam tenetur aut dolores obcaecati, eaque odio optio, non consectetur ullam magnam! Tempore, harum repellendus dolores in facilis, omnis molestias enim, consequuntur iste neque exercitationem ullam atque minus! nsf bf afsaf fgfsa",
            contentType: "article",
            rating: 4.7,
        }
    }
}