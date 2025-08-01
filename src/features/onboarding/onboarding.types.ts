import type { ReactNode } from "react";

// Types
export enum OnboardingPhase {
    CourseCategory,
    Course,
    Plan,

}
export type OnboardingPhaseType = Record<OnboardingPhase, ReactNode>;

export interface FeatureType {
    title: string;
    subfeatures: SubFeatureType[]
}

export interface SubFeatureType {
    title: string;
    value: string | number;
}