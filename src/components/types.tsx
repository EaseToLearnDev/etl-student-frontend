import type { ReactNode } from "react";

export type ThemeType = "primary" | "success" | "error" | "neutral" | "default";

export interface Column<T> {
    header: string;
    accessor?: keyof T;
    render?: (row: T) => ReactNode;
    className?: string;
}