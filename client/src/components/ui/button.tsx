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

type LoadingVariant =
  | "loading-spinner"
  | "loading-dots"
  | "loading-ring"
  | "loading-ball"
  | "loading-bars"
  | "loading-infinity";

type ButtonProps = {
  children?: ReactNode;
  id?: string;
  onClick?: () => void;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  loadingVariant?: LoadingVariant;
};

export default function Button({
  children,
  id,
  onClick,
  className,
  variant = "btn-neutral",
  loadingVariant = "loading-spinner",
  size,
  type = "button",
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <button
      id={id}
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
          <span className={clsx("loading", loadingVariant)}></span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
