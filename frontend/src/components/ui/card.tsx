import React, { type ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

const paddingClasses = {
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export function Card({ children, className, padding = "md" }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-md border border-slate-200 bg-white",
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function CardHeader({ title, icon, action, className }: CardHeaderProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between border-b border-slate-200 -mx-4 -mt-4 px-4 py-3 mb-4",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="text-slate-600">{icon}</span>}
        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  detail?: string;
  trend?: "up" | "down" | "neutral";
}

export function MetricCard({ label, value, detail, trend }: MetricCardProps) {
  return (
    <Card>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </p>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        {trend === "up" && (
          <span className="text-xs font-semibold text-emerald-600">↑</span>
        )}
        {trend === "down" && (
          <span className="text-xs font-semibold text-rose-600">↓</span>
        )}
      </div>
      {detail && <p className="mt-1 text-sm text-slate-600">{detail}</p>}
    </Card>
  );
}