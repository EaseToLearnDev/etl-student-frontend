import { useLocation, useNavigate } from "react-router";
import useIsMobile from "../../../hooks/useIsMobile";
import { useEffect, useState } from "react";
import AiHelpModal from "../components/AiHelpModal";
import { useAiStore } from "../store/useAiStore";
import DesktopTestSimulator from "../components/desktop/DesktopTestSimulator";
import MobileTestSimulator from "../components/mobile/MobileTestSimulator";

const ViewAnswersPage = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const isHelpModalOpen = useAiStore((s) => s.isHelpModalOpen);
  const setIsHelpModalOpen = useAiStore((s) => s.setIsHelpModalOpen);

  const params = new URLSearchParams(location.search);
  const [error, setError] = useState("");

  useEffect(() => {
    const testSession = params.get("testSession");
    if (testSession) {
      setError("not_found");
    }
  }, []);

  return (
    <div>
      <>
        {error === "not_found" ? (
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

export default ViewAnswersPage;
