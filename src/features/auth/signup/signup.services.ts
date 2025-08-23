import { SignupPhase } from "./signup.types";
import useSignupStore from "./hooks/useSignupStore";

export const handleSignup = () => {

  // Validate fields

  // Move to next phase
  switchPhase(SignupPhase.Otp);
};

export const switchPhase = (p: SignupPhase) => {
  const { setCurrentPhase } = useSignupStore.getState();
  setCurrentPhase(p);
};
