export const LearningSessionInstructions = () => {
  return (
    <div className="flex flex-col text-[14px] font-medium tracking-[var(--ls-01)]">
      {/* <p>
            Welcome to Learning Mode, your dedicated practice space designed to
            help you learn at your own pace and build confidence before taking
            real-time tests.
          </p>
          <p>Here's what makes Learning Mode special:</p> */}
      <h6 className="font-semibold">General Instructions</h6>
      <ol
        type="a"
        className="list-[lower-alpha] list-inside flex flex-col gap-4 mt-4 mb-4"
      >
        <li className="flex items-start gap-2 rounded-lg bg-[var(--surface-bg-hover)] text-[var(--text-primary)]">
          <p className="text-[var(--sb-ocean-bg-active)]">a.</p>
          <p className="flex-1">Try to answer all the questions.</p>
        </li>
        <li className="flex items-start gap-2 rounded-lg bg-[var(--surface-bg-hover)] text-[var(--text-primary)]">
          <p className="text-[var(--sb-ocean-bg-active)]">b.</p>
          <p className="flex-1">
            <span className="text-red-500 !font-medium">Do not guess. </span>In
            case you don't know the answer click{" "}
            <span className="!font-medium text-green-500">HELP</span>
          </p>
        </li>
        <li className="flex items-start gap-2 rounded-lg bg-[var(--surface-bg-hover)] text-[var(--text-primary)]">
          <p className="text-[var(--sb-ocean-bg-active)]">c.</p>
          <p className="flex-1">
            First search the answer from your books. Then ask Tony AI
          </p>
        </li>
        <li className="flex items-start gap-2 rounded-lg bg-[var(--surface-bg-hover)] text-[var(--text-primary)]">
          <p className="text-[var(--sb-ocean-bg-active)]">d.</p>
          <p className="flex-1">
            If your doubts are still not cleared SKIP a question. ETL Teachers
            will clear the doubts.
          </p>
        </li>
        <li className="flex items-start gap-2 rounded-lg bg-[var(--surface-bg-hover)] text-[var(--text-primary)]">
          <p className="text-[var(--sb-ocean-bg-active)]">e.</p>
          <p className="flex-1">
            Each learning session will have different set questions.
          </p>
        </li>
        <li className="flex items-start gap-2 rounded-lg bg-[var(--surface-bg-hover)] text-[var(--text-primary)]">
          <p className="text-[var(--sb-ocean-bg-active)]">f.</p>
          <p className="flex-1">
            We recommend to move to competitive mode only if the learning
            session progress bar is green.
          </p>
        </li>
      </ol>
    </div>
  );
};
