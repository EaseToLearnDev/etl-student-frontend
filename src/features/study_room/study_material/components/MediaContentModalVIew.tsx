import type { TopicContentType } from "../sm.types";

interface MediaContentModalViewProps {
  content: TopicContentType;
}

const MediaContentModalView = ({ content }: MediaContentModalViewProps) => {
  return content.contentType === "Video" ? (
    // Video Iframe
    <iframe
      width="100%"
      height="100%"
      src={content.contentUrl}
      title={content.contentTitle || "Youtube Video Player"}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
      className="rounded-xl"
    ></iframe>
  ) : (
    // PPT and PDF Iframe
    <iframe
      width="100%"
      height="100%"
      src={
        "https://drive.google.com/viewerng/viewer?embedded=true&url=" +
        content.contentUrl
      }
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="rounded-xl"
    ></iframe>
  );
};

export default MediaContentModalView;
