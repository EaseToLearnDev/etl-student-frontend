import { MdClose } from "react-icons/md";
import { Modal } from "../../../components/Modal";
import cn from "../../../utils/classNames";
import Button from "../../../components/Button";
// import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { useGuestStore } from "../../../global/hooks/useGuestStore";
import VerifyOtpContent from "../../profile/components/VerifyOtpContent";
import { useNavigate, useSearchParams } from "react-router";
import { handleSendOtp } from "../services/handleSendOtp";
import { loadVerifyOtp } from "../services/loadVerifyOtp";
import { handleAddCourseToGuest } from "../services/handleAddCourseToGuest";
import { handleTestSubmit } from "../services/handleTestSubmit";

export const GuestTestSubmitModal = () => {
  const [params] = useSearchParams();
  //Replace States from Your Store States
  const showGuestTestSubmitModal = useGuestStore(
    (s) => s.showGuestTestSubmitModal
  );
  const openVerifyOtp = useGuestStore((s) => s.openVerifyOtp);
  const name = useGuestStore((s) => s.name);
  const mobile = useGuestStore((s) => s.mobile);
  const email = useGuestStore((s) => s.email);
  const error = useGuestStore((s) => s.error);
  const setOpenVerifyOtp = useGuestStore((s) => s.setOpenVerifyOtp);
  const setEmail = useGuestStore((s) => s.setEmail);
  const setError = useGuestStore((s) => s.setError);
  const setMobile = useGuestStore((s) => s.setMobile);
  const setName = useGuestStore((s) => s.setName);
  const setShowGuestTestSubmitModal = useGuestStore(
    (s) => s.setShowGuestTestSubmitModal
  );

  const navigate = useNavigate();

  const handleVerifyOtp = async (otp: string) => {
    const courseUrl = params.get("courseUrl") ?? "";
    const utmSource = params.get("utm_source") ?? "";

    const checkRes = await loadVerifyOtp({ courseUrl, utmSource, otp });

    if (checkRes) {
      await handleAddCourseToGuest();
      handleTestSubmit(navigate);
    } else {
      setError("Error Submitting the Test");
    }
  };

  return (
    <Modal
      isOpen={showGuestTestSubmitModal}
      onClose={() => setShowGuestTestSubmitModal(false)}
      size="md"
    >
      {!openVerifyOtp ? (
        <div className="relative w-full p-2 px-3">
          <h5>Verify you details to see your test result</h5>
          <div className="w-full flex flex-col gap-3 mt-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="Name"
                className="!font-medium text-[var(--text-secondary)]"
              >
                Name
              </label>
              <input
                name="name"
                className={cn(
                  "flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
                )}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="Mobile"
                className="!font-medium text-[var(--text-secondary)]"
              >
                Mobile
              </label>
              <input
                name="mobile"
                className={cn(
                  "flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
                )}
                value={mobile === 0 ? "" : mobile}
                onChange={(e) => setMobile(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="Email"
                className="!font-medium text-[var(--text-secondary)]"
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                className={cn(
                  "flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
                )}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-center mt-3">{error}</p>}

          <div className="flex justify-end mt-4">
            <div className="flex gap-4 items-center">
              <Button onClick={handleSendOtp}>Verify Otp</Button>
              <Button
                style="secondary"
                onClick={() => setShowGuestTestSubmitModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
          <div
            onClick={() => setShowGuestTestSubmitModal(false)}
            className={cn(
              "fixed top-5 right-5 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
              " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
            )}
          >
            <MdClose size={20} />
          </div>
        </div>
      ) : (
        <VerifyOtpContent
          onVerify={handleVerifyOtp}
          onCancel={() => setOpenVerifyOtp(false)}
          error={error}
        />
      )}
    </Modal>
  );
};
