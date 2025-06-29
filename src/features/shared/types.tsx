export type TopicType = {
  topicId: number;
  questionCount: number;
  subjectiveCount: number;
  topicName: string;
  pathIds: string;
  children: TopicType[];
};

export type ContentType = {
  id: number;
  contentTitle: string;
  contentDescription: string;
  contentType: string;
  rating: number;
  language?: string;
};
