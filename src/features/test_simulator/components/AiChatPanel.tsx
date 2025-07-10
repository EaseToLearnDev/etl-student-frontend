const AiChatPanel = () => {
  return (
    <div className="relative w-full h-full flex flex-col">
      <textarea rows={2} placeholder="Type the problem" className="z-99 fixed bottom-5 left-5 right-5 border-1 border-[var(--border-primary)] rounded-xl resize-none p-3"></textarea>
    </div>
  );
};

export default AiChatPanel;