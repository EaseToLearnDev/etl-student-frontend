import { FaRegCheckCircle } from "react-icons/fa";
import { LuLoader } from "react-icons/lu";

const PgResponse = () => {
    
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <FaRegCheckCircle size={32} />
        <h5 className="text-[var(--sb-green-haze-bg-active)]">
          Payment transaction has been completed successfully!
        </h5>
        <p>Please wait, we are redirecting you to your dashboard.</p>
        <LuLoader className="animate-spin w-8 h-8" />
      </div>
    </div>
  );
};

export default PgResponse;
