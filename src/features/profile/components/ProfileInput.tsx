import type { FC, ChangeEvent } from "react";

interface ProfileInputProps {
  label: string;
  value: string;
  name: string;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const ProfileInput: FC<ProfileInputProps> = ({
  name,
  label,
  value,
  type = "text",
  placeholder = "",
  readOnly = false,
  onChange,
  error,
}) => {
  return (
    <div className="mb-5">
      <label className="block mb-3 text-[var(--text-tertiary)]">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={onChange}
        className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-[var(--text-primary)]"
      />
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default ProfileInput;
