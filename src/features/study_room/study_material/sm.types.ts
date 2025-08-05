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
  contentUrl?: string;
  language: string;
}

export interface TextContentType {
  id: number;
  contentTitle: string;
  contentType: string;
  contentUrl?: string;
  description: string;
  links: LinkItem[];
}

export interface LinkItem {
  title: string;
  id: string;
  tag: string;
  children?: LinkItem[];
}

export type FilterType = "All" | "PPT" | "PDF" | "Video";
