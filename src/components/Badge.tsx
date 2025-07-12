import type React from "react"
import cn from "../utils/classNames"

type ThemeType = "ocean" | "sunglow" | "sakura" | "pumpkin" | "valencia" | "greenHaze" | "neutral"
interface BadgeProps {
    icon?: React.ReactNode,
    text: string,
    className?: string,
    style: ThemeType
}

const Badge = ({ icon, text, className, style = "neutral" }: BadgeProps) => {
    const themeMap: Record<ThemeType, string> = {
        ocean: "--sb-ocean-bg-active",
        sunglow: "--sb-sunglow-bg-active",
        sakura: "--sb-sakura-bg-active",
        pumpkin: "--sb-pumpkin-bg-active",
        valencia: "--sb-valencia-bg-active",
        greenHaze: "--sb-green-haze-bg-active",
        neutral: "--sb-neutral-bg-active",
    };

    const theme = themeMap[style];

    return (
        <div className={cn("cursor-pointer flex justify-center items-center py-2 px-4 gap-1 border-1 rounded-full", className,)} style={{ borderColor: `var(${theme})`, color: `var(${theme})` }}>
            {icon ? icon : null}
            <h6>{text}</h6>
        </div>
    )
}

export default Badge