import { MdClose } from "react-icons/md";
import { Modal } from "../../../components/Modal";
import useReleaseNotesStore from "../../../global/hooks/useReleaseNotesStore";
import cn from "../../../utils/classNames";
import Badge from "../../../components/Badge";
import { Theme } from "../../../utils/colors";
import { LuUsersRound } from "react-icons/lu";

const ReleaseNotesModal = () => {
  const isReleaseNotesModalOpen = useReleaseNotesStore(
    (s) => s.isReleaseNotesModalOpen
  );
  const setIsReleaseNotesModalOpen = useReleaseNotesStore(
    (s) => s.setIsReleaseNotesModalOpen
  );
  return (
    <Modal
      isOpen={isReleaseNotesModalOpen}
      onClose={() => setIsReleaseNotesModalOpen(false)}
      size="lg"
      className="p-4"
      containerClassName="scrollbar-hide overflow-hidden"
    >
      <div className="max-h-[600px]">
        {/* Modal Header */}
        <div className="fixed top-0 left-0 right-0 h-[70px] bg-[var(--surface-bg-secondary)] py-2 px-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 px-8">
            <Badge
              theme={Theme.Ocean}
              style="filled"
              className="p-2 cursor-text"
            >
              <span className="!text-[10px]">Version v1.0.0</span>
            </Badge>
          </div>
          <div
            onClick={() => setIsReleaseNotesModalOpen(false)}
            className={cn(
              "w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
              " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
            )}
          >
            <MdClose size={20} />
          </div>
        </div>

        <div className="px-4 pt-[70px] flex flex-col max-h-[530px] overflow-y-auto scrollbar-hide">
          <div className="flex gap-4 items-center  pb-5 border-b border-[var(--border-primary)]">
            <div className="size-15 aspect-square rounded-md bg-[var(--surface-bg-tertiary)] flex justify-center items-center">
              <LuUsersRound
                size={32}
                className="text-[var(--sb-ocean-bg-active)]"
              />
            </div>
            <div>
              <h2>Release Notes</h2>
              <h6 className="font-semibold text-[var(--text-secondary)]">
                Sep 24, 2025 • v1.0.0
              </h6>
            </div>
          </div>

          {/* Content */}
          <div className="mt-7 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h4 className="font-semibold leading-tight">
                EaseToLearn Student Panel
              </h4>
              <p>
                We're thrilled to announce the launch of our completely
                redesigned 'EaseToLearn Student Panel'! We've listened to your
                feedback and meticulously crafted a modern, intuitive, and
                feature-rich interface to make your learning journey more
                engaging and efficient than ever before. Get ready to experience
                a seamless and powerful learning environment!
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="!font-semibold">✨ Modern UI Revamp</h5>
              <p className="text-[var(--text-secondary)]">
                We've embraced the latest UI/UX guidelines to deliver a sleek,
                clean, and responsive design. Enjoy a more visually appealing
                and easier-to-navigate panel that makes finding what you need a
                breeze.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="!font-semibold">🌙 Introducing Dark Mode</h5>
              <p className="text-[var(--text-secondary)]">
                Protect your eyes and save battery life with our highly
                anticipated Dark Mode!
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="!font-semibold">
                📈 Interactive Activity Graph on Dashboard
              </h5>
              <p className="text-[var(--text-secondary)]">
                Stay on top of your progress with our brand-new activity graph!
                Your dashboard now features a dynamic visualization of your
                daily engagement, helping you understand your study patterns and
                stay motivated.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="!font-semibold">➡️ "Jump Back In" Feature</h5>
              <p className="text-[var(--text-secondary)]">
                Never lose your place again! Our intelligent "Jump Back In"
                feature lets you seamlessly resume your last assessment exactly
                where you left off. Focus on your studies without interruption.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="!font-semibold">
                📞 Dedicated Support Card on Dashboard
              </h5>
              <p className="text-[var(--text-secondary)]">
                Need help? We've made it even easier to get your questions
                answered! A new 'Support' card is now directly accessible from
                your dashboard, providing quick access to our support team for
                any queries or assistance you might need.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="!font-semibold">
                🖥️ Modernized Assessment Simulator
              </h5>
              <p className="text-[var(--text-secondary)]">
                While our mock test simulator already followed the familiar
                color scheme of the National Testing Agency (NTA), we've given
                the entire user interface a major modernization. This update
                provides a cleaner, more intuitive, and comfortable testing
                environment, so you can focus on your preparation with a UI that
                feels both familiar and new. Additionally, our mock test
                simulator now features a mandatory full-screen mode to replicate
                exact exam-like conditions, minimize distractions, and prevent
                the use of unfair means, ensuring a fair and focused preparation
                experience.
              </p>
            </div>
            <span className="text-center text-[var(--text-tertiary)]">
              We hope you enjoy these new updates and find them valuable in your
              learning journey with EaseToLearn. We're committed to continuously
              improving your experience!
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReleaseNotesModal;
