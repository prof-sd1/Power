import React, { type ReactNode } from "react";
import { clsx } from "clsx";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: "badge-success",
  warning: "badge-warning",
  danger: "badge-error",
  info: "bg-sky-100 text-sky-800 border border-sky-200",
  neutral: "badge-neutral",
};

export function Badge({ variant = "neutral", children, className }: BadgeProps) {
  return (
    <span className={clsx("badge", variantClasses[variant], className)}>
      {children}
    </span>
  );
}

/**
 * Maps a status string to a badge variant.
 * Useful for consistent status display across pages.
 */
export function statusBadgeVariant(status: string): BadgeVariant {
  const s = status.toLowerCase();
  if (s.includes("compliant") || s.includes("verified") || s.includes("approved") || s.includes("healthy") || s.includes("ready") || s.includes("enroll")) {
    return "success";
  }
  if (s.includes("alert") || s.includes("warning") || s.includes("pending") || s.includes("review") || s.includes("hold") || s.includes("waiting")) {
    return "warning";
  }
  if (s.includes("blocked") || s.includes("error") || s.includes("danger") || s.includes("rejected") || s.includes("frozen")) {
    return "danger";
  }
  return "info";
}