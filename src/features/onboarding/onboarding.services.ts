import type { OnboardingPhase } from "./onboarding.types";
import useOnboardingStore from "./hooks/useOnboardingStore";

export const switchPhase = (p: OnboardingPhase) => {
  const {setCurrentPhase} = useOnboardingStore.getState();
  setCurrentPhase(p);
};
