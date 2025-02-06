import clsx from "clsx";

type InputType = "text" | "email" | "url" | "password";

type LabelProps = {
  labelName: string;
  inputName: string;
  className?: string;
  type?: InputType;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  labelName,
  inputName,
  className,
  type = "text",
  placeholder,
  disabled,
  value,
  onChange,
}: LabelProps) {
  return (
    <label htmlFor={labelName} className="floating-label">
      <input
        id={labelName}
        type={type}
        name={inputName.toLowerCase()}
        className={clsx("input", className)}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
      <span>{inputName}</span>
    </label>
  );
}
