import { type ReactNode } from "react";
import { cn } from "../../lib/utils";
import type { BookingStatus } from "../../types";

type BadgeVariant =
  | "default"
  | "amber"
  | "blue"
  | "green"
  | "gray"
  | "red"
  | "verified";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-bg text-muted",
  amber: "bg-amber-light text-amber",
  blue: "bg-blue-100 text-blue-700",
  green: "bg-primary-light text-primary",
  gray: "bg-gray-200 text-gray-600",
  red: "bg-red-100 text-error",
  verified: "bg-primary text-white",
};

export default function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: BookingStatus }) {
  const map: Record<BookingStatus, { variant: BadgeVariant; label: string }> = {
    requested: { variant: "amber", label: "Diminta" },
    confirmed: { variant: "blue", label: "Dikonfirmasi" },
    ongoing: { variant: "green", label: "Berjalan" },
    returned: { variant: "gray", label: "Selesai" },
    cancelled: { variant: "red", label: "Dibatalkan" },
  };
  const { variant, label } = map[status];
  return <Badge variant={variant}>{label}</Badge>;
}
