import { useLocation, useNavigate } from "react-router";
import useIsMobile from "../../../hooks/useIsMobile";
import AiHelpModal from "./AiHelpModal";
import { useAiStore } from "../store/useAiStore";
import DesktopTestSimulator from "./desktop/DesktopTestSimulator";
import MobileTestSimulator from "./mobile/MobileTestSimulator";

interface ViewAnswersProps {
  testSession: string;
}
const ViewAnswers = ({ testSession }: ViewAnswersProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const isHelpModalOpen = useAiStore((s) => s.isHelpModalOpen);
  const setIsHelpModalOpen = useAiStore((s) => s.setIsHelpModalOpen);

  return (
    <div>
      <>
        {!testSession ? (
          <h1>TEST NOT FOUND!</h1>
        ) : !isMobile ? (
          <DesktopTestSimulator mode={"answers"} />
        ) : (
          <MobileTestSimulator mode={"answers"} />
        )}
        <AiHelpModal
          isOpen={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
        />
      </>
    </div>
  );
};

export default ViewAnswers;
