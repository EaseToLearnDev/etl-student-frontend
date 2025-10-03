export interface TopicSyllabusType {
  responseTxt: string;
  obj: {
    list: ContentType[];
    contentLimit?: ContentLimit;
  };
}

export type ContentType = "PPT" | "PDF" | "Video" | "Text";

export interface Content {
  id: number;
  contentTitle: string;
  contentType: ContentType;
  contentUrl?: string;
  description?: string;
  links?: LinkItem[];
  language?: string;
}

export interface ContentLimit {
  videoMax: number;
  pdfMax: number;
  pptMax: number;
  textMax: number;
}

export interface LinkItem {
  title: string;
  id: string;
  tag: string;
  children?: LinkItem[];
}

export type FilterType = "All" | "PPT" | "PDF" | "Video";
