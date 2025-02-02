import clsx from "clsx";
import { ReactNode } from "react";

type ButtonVariant =
  | "btn-neutral"
  | "btn-primary"
  | "btn-secondary"
  | "btn-accent"
  | "btn-info"
  | "btn-success"
  | "btn-warning"
  | "btn-error"
  | "btn-ghost"
  | "btn-link";

type ButtonSize = "btn-xs" | "btn-sm" | "btn-lg" | "btn-xl";

type ButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
};

export default function Button({
  children,
  onClick,
  className,
  variant = "btn-neutral",
  size,
  type = "button",
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "btn",
        variant,
        size,
        {
          "opacity-50 cursor-not-allowed": disabled,
          "opacity-70 cursor-not-allowed": loading,
        },
        className
      )}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          {children}
          <span className="loading loading-spinner"></span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
