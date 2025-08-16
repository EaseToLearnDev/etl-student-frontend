import { MathJax } from "better-react-mathjax";
import cn from "../utils/classNames";

interface RadioProps {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

/**
 * Radio component renders a custom styled radio button with a label.
 */
const Radio = ({ text, onChange, checked }: RadioProps) => {
  return (
    <label className="flex items-center gap-4 cursor-pointer w-full">
      <input
        name="option"
        type="radio"
        value={text}
        checked={checked}
        onChange={onChange}
        className={cn(
          "appearance-none w-[14px] h-[14px] aspect-square border-1 border-[var(--border-primary)] rounded-full outline-none transition-all duration-200 ease-in-out",
          "checked:bg-[var(--sb-ocean-bg-active)] checked:border-none checked:w-[16px] checked:h-[16px]"
        )}
      />
      <MathJax>
        <h6 className="select-none">
          <div
            className="math-container"
            dangerouslySetInnerHTML={{
              __html: text.trim().replace(/[\r\n]+/g, ""),
            }}
          />
        </h6>
      </MathJax>
    </label>
  );
};

export default Radio;
