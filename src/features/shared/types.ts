export type TopicType = {
  topicId: number;
  questionCount: number;
  subjectiveCount: number;
  topicName: string;
  topicUrl: string;
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

export type TopicTestType = {
  testName: string;
  testUrl: string;
  testTime: number;
  questions: number;
  totalMarks: number;
  difficulty: string;
  progress: "not_started" | "in_progress";
  marks?: number;
};
