import { Link } from "react-router";
import Button from "../../../../components/Button";
import { useForgetPassStore } from "../hooks/useForgetPassStore";
import { handleForgetPasswordToken } from "../services/handleForgetPasswordToken";
import InputField from "../../../../components/InputField";
import { useToastStore } from "../../../../global/hooks/useToastStore";

const EnterUserIdPhase = () => {
  const loading = useForgetPassStore((state) => state.loading);
  const setLoading = useForgetPassStore((state) => state.setLoading);
  const userId = useForgetPassStore((state) => state.userId);
  const setUserId = useForgetPassStore((state) => state.setUserId);
  const currentPhaseIndex = useForgetPassStore((state) => state.currentPhase);
  const setCurrentPhaseIndex = useForgetPassStore(
    (state) => state.setCurrentPhase
  );
  const setToken = useForgetPassStore((state) => state.setToken);
  const setToast = useToastStore((state) => state.setToast);

  return (
    <>
      {/* Title */}
      <h2 className="!font-black text-center">Forget Password</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* User Email Or Mobile */}
        <InputField
          label="Email or Mobile"
          value={userId.data}
          onChange={(e) =>
            setUserId({ ...userId, data: e.target.value.trim() })
          }
          info={{ msg: userId.error, type: "error" }}
          required
          pattern="(?:[0-9]{10}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})"
          placeholder="Enter Email or Mobile"
        />

        {/* Submit Button */}
        <Button
          style="primary"
          type="submit"
          className="mt-8 w-full"
          disabled={
            loading ||
            !/(?:[0-9]{10}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/.test(
              userId.data
            )
          }
          onClick={
            loading
              ? undefined
              : () =>
                  handleForgetPasswordToken({
                    userId,
                    setUserId,
                    setToken,
                    setToast,
                    setLoading,
                    callback: () => setCurrentPhaseIndex(currentPhaseIndex + 1),
                  })
          }
        >
          <h6 className="!font-semibold">
            {loading ? "Loading..." : "Submit"}
          </h6>
        </Button>

        {/* Go back to Login */}
        <div className="flex justify-center mt-10 gap-[2px]">
          <Link to={"/login"} className="text-[var(--sb-ocean-bg-active)]">
            <h6 className="!font-bold hover:underline">Go Back to Login</h6>
          </Link>
        </div>
      </form>
    </>
  );
};

export default EnterUserIdPhase;
