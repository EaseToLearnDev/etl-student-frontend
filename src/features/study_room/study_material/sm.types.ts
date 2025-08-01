export interface TopicSyllabusType {
  responseTxt: string;
  obj: {
    list: TopicContentType[];
  };
}

export interface TopicContentType {
  id: number;
  contentTitle: string;
  contentType: string;
  language: string;
}