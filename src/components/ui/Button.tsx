import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg" | "block";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const variants: Record<Variant, string> = {
    primary:
      "bg-primary text-white hover:bg-primary-dark active:scale-[0.98] shadow-sm",
    secondary:
      "bg-primary-light text-primary hover:bg-primary-light/70 active:scale-[0.98]",
    ghost: "text-ink hover:bg-bg active:scale-[0.98]",
    outline:
      "border border-border text-ink bg-card hover:bg-bg active:scale-[0.98]",
    danger: "bg-error text-white hover:bg-error/90 active:scale-[0.98]",
  };

  const sizes: Record<Size, string> = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-3 text-sm",
    lg: "px-6 py-4 text-base",
    block: "w-full px-4 py-3.5 text-sm",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-btn font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none select-none",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="spinner" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
