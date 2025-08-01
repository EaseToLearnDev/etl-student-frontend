import type { ReactNode } from "react";

// Types
export enum SignupPhase {
    Signup = 'signup',
    Otp = 'otp',
    ChangeNumber = 'changeNumber',
}

export type SignupPhasesType = Record<SignupPhase, ReactNode>;