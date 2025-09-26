import { Link } from "react-router";

export const InAppPayment = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="mb-6">In App Purchases</h2>
        <div className="flex flex-col items-center gap-3">
          <Link
            to="/"
            className="border border-[var(--border-primary)] px-6 py-2 rounded-md bg-[var(--surface-bg-primary)] hover:bg-[var(--surface-bg-secondary)]"
          >
            Go Home
          </Link>
          <p>OR</p>
          <Link
            to="/selectcourse"
            className="border border-[var(--border-primary)] px-6 py-2 rounded-md bg-[var(--surface-bg-primary)] hover:bg-[var(--surface-bg-secondary)]"
          >
            Select Course
          </Link>
        </div>
      </div>
    </div>
  );
};
