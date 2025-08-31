import type React from "react"
import cn from "../utils/classNames"

export interface SkeletonProps {
  className?: string
  variant?: "text" | "circular" | "rectangular" | "rounded"
  width?: string | number
  height?: string | number
  animation?: "pulse" | "wave" | "none"
}

export interface SkeletonTextProps {
  lines?: number
  className?: string
  lastLineWidth?: string
}

export interface SkeletonCardProps {
  showAvatar?: boolean
  showTitle?: boolean
  showDescription?: boolean
  titleLines?: number
  descriptionLines?: number
  className?: string
}


export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "rectangular",
  width,
  height,
  animation = "pulse",
  ...props
}) => {
  const baseClasses = "bg-[var(--skeleton-bg)]"

  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-none",
    rounded: "rounded-md",
  }

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%]",
    none: "",
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === "number" ? `${width}px` : width
  if (height) style.height = typeof height === "number" ? `${height}px` : height

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], animationClasses[animation], className)}
      style={style}
      {...props}
    />
  )
}
