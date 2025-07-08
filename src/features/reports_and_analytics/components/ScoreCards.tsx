type ThemeType = "primary" | "secondary" | "tertiary" | "Quaternary" | "default";

interface ScoreCardsProps {
  type?: ThemeType;
  title?: string;
  value?: string | number;
  description?: string;
}


const Theme = {
  primary: "sb-ocean",
  secondary: "sb-sunglow",
  tertiary: "sb-sage",
  Quaternary: "sb-valencia",
  default: "sb-neutral"
}

const ScoreCards = ({type , title, value, description}: ScoreCardsProps) => {
  const colorPrefix = Theme[type] || Theme["default"]
  const bgColor = `var(--${colorPrefix}-bg-disabled)`;
  const borderColor = `var(--${colorPrefix}-bg-active)`;
  return (
    <>
      <div className="flex flex-col items-start gap-[20px] rounded border-l-[8px] p-[20px] w-[24%] min-w-[250px] font-[Urbanist] overflow-x-hidden transition-colors" style={{backgroundColor: bgColor, borderColor: borderColor}}>
        <p className="text-[14px] font-semibold leading-[20px] tracking-[0.1px]">
          {title}
        </p>

        <div className="flex items-end gap-y-[20px] w-full justify-between">
          <h3 className="font-bold leading-[40px]">
            {value}
          </h3>
          <p className="text-[#0D6FEC] text-[14px] font-medium leading-[20px] tracking-[0.1px]" style={{color: borderColor}}>
            {description}
          </p>
        </div>
    </div>
    </>
  ) 
}

export default ScoreCards