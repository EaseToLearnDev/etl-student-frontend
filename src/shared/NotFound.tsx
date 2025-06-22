import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="grid place-items-center items-center h-screen">
      <div className="flex flex-col gap-2 items-center">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="border-1 border-[var(--border-primary)] px-6 py-2 rounded-md mt-4 bg-[var(--surface-bg-primary)] hover:bg-[var(--surface-bg-secondary)]"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
