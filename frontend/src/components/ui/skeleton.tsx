import React from "react";
import { clsx } from "clsx";

interface SkeletonProps {
  className?: string;
  /**
   * Number of skeleton lines to render. Defaults to 1.
   */
  lines?: number;
  /**
   * If true, renders a card-shaped skeleton.
   */
  card?: boolean;
}

export function Skeleton({ className, lines = 1, card = false }: SkeletonProps) {
  if (card) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-4">
        <div className="skeleton h-4 w-1/3 mb-3" />
        <div className="skeleton h-8 w-1/2 mb-2" />
        <div className="skeleton h-3 w-2/3" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            "skeleton",
            i === 0 ? "h-4" : "h-3",
            i === lines - 1 ? "w-2/3" : "w-full",
            className
          )}
        />
      ))}
    </div>
  );
}

/**
 * Table row skeleton for loading states.
 */
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="divide-y divide-slate-200">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-4 px-4 py-3">
          {Array.from({ length: cols }).map((_, colIdx) => (
            <div
              key={colIdx}
              className="skeleton h-4 flex-1"
              style={{ width: `${100 / cols}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Metric card skeleton for dashboard loading states.
 */
export function MetricSkeleton() {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-4">
      <div className="skeleton h-3 w-1/2 mb-3" />
      <div className="skeleton h-8 w-1/3 mb-2" />
      <div className="skeleton h-3 w-2/3" />
    </div>
  );
}