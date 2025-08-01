import type { OnboardingPhase } from "./onboarding.types";
import useOnboardingStore from "./store/useOnboardingStore";

export const switchPhase = (p: OnboardingPhase) => {
  const {setCurrentPhase} = useOnboardingStore.getState();
  setCurrentPhase(p);
};
