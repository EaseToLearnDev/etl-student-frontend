import { motion } from "framer-motion";
import { useRef, useState } from "react";

// Icons
import AiIcon from "../../../components/icons/ai-icon";

// Hooks
import { useAiStore } from "../store/useAiStore";
import useIsMobile from "../../../hooks/useIsMobile";

// Utils
import { gtmEvents } from "../../../utils/gtm-events";
import { pushToDataLayer } from "../../../utils/gtm";
import cn from "../../../utils/classNames";

const AskTonyButton = () => {
  const isMobile = useIsMobile();
  const constraintsRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  // Ai Store
  const setIsHelpModalOpen = useAiStore((s) => s.setIsHelpModalOpen);
  const isAiFeatureEnabled = useAiStore((s) => s.isAiFeatureEnabled);

  return (
    <>
      {/* Invisible parent to define drag bounds */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none" />

      {isAiFeatureEnabled && (
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragMomentum={false}
          dragElastic={0.1}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => {
            setTimeout(() => setDragging(false), 100); // reset after short delay
          }}
          className={cn(
            "flex flex-col items-center gap-1 z-50",
            isMobile
              ? "fixed bottom-[75px] right-[40px]"
              : "absolute bottom-2 right-8"
          )}
          onClick={() => {
            if (dragging) return; // block click right after drag
            setIsHelpModalOpen(true);
            pushToDataLayer({
              event: gtmEvents.test_simulator_ask_tony_button_click,
              id: "ask_tony_button_click",
            });
          }}
        >
          <div className="cursor-pointer size-10 aspect-square rounded-full bg-[var(--surface-bg-tertiary)] flex justify-center items-center">
            <AiIcon width={28} height={28} />
          </div>
          <span className="font-semibold !text-xs">ASK TONY</span>
        </motion.div>
      )}
    </>
  );
};

export default AskTonyButton;
