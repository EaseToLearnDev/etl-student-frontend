import { Link } from "react-router";

const SuccessPhase = () => {
  return (
    <>
      <h2 className="!font-black text-center">Password Changed Successfully</h2>
      <div className="mt-4 flex flex-col gap-4">
        <p className="text-center">
          You can now go back to the login screen and sign in with your new
          password.
        </p>
        {/* Go back to Login */}
        <div className="flex justify-center mt-10 gap-[2px]">
          <Link to={"/login"} className="text-[var(--sb-ocean-bg-active)]">
            <h6 className="!font-bold hover:underline">Go Back to Login</h6>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SuccessPhase;
