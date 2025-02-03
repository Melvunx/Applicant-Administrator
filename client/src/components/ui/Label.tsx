import clsx from "clsx";

type InputType = "text" | "email" | "url" | "password";

type LabelProps = {
  labelName: string;
  inputName: string;
  className?: string;
  type?: InputType;
  placeholder?: string;
};

export default function Input({
  labelName,
  inputName,
  className,
  type = "text",
  placeholder,
}: LabelProps) {
  return (
    <label htmlFor={labelName} className="floating-label">
      <input
        id={labelName}
        type={type}
        name={inputName.toLowerCase()}
        className={clsx("input", className)}
        placeholder={placeholder}
      />
      <span>{inputName}</span>
    </label>
  );
}
