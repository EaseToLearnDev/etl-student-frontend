import { PiWarningOctagonDuotone } from "react-icons/pi";
import { Link } from "react-router";

const PgCancelled = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-2">
      <PiWarningOctagonDuotone
        size={48}
        className="text-[var(--sb-valencia-bg-active)]"
      />
      <h4 className="text-[var(--sb-valencia-bg-active)]">
        Payment Transaction Failed
      </h4>
      <p className="mb-3">Don't worry, you can try again.</p>
      <Link
        to={"/selectcourse"}
        className="border border-[var(--border-primary)] px-6 py-2 rounded-md bg-[var(--surface-bg-primary)] hover:bg-[var(--surface-bg-secondary)]"
      >
        Try Again.
      </Link>
      <p>or</p>
      <Link
        to={"/"}
        className="border border-[var(--border-primary)] px-6 py-2 rounded-md bg-[var(--surface-bg-primary)] hover:bg-[var(--surface-bg-secondary)]"
      >
        Go to your Dashboard
      </Link>
    </div>
  );
};

export default PgCancelled;
