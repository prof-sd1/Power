"use client";

import React from "react";
import { Wifi, WifiOff } from "lucide-react";
import { useNetworkStatus } from "@/lib/hooks";

/**
 * Network status indicator for low-bandwidth environments.
 * Per FRD Section 2.1, students in Finote Selam may access via 3G or unstable broadband.
 * This component provides real-time connectivity feedback.
 */
export function NetworkBadge() {
  const { isOnline, connectionType, isLowBandwidth } = useNetworkStatus();

  if (isLowBandwidth) {
    return (
      <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 border border-amber-200">
        <Wifi size={12} />
        <span>{connectionType?.toUpperCase()}</span>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div className="flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 border border-rose-200">
        <WifiOff size={12} />
        <span>Offline</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
      <Wifi size={12} />
      <span>{connectionType?.toUpperCase() || "Online"}</span>
    </div>
  );
}

/**
 * Data sovereignty footer component.
 * Per FRD Section 5.7.1: "No student PII or institutional financial data may traverse international borders."
 */
export function DataSovereigntyFooter() {
  return (
    <div className="border-t border-slate-200 bg-white px-4 py-3">
      <p className="text-center text-xs text-slate-500">
        All data is stored in Ethiopia per the Ethiopian Data Protection Proclamation.
        No student PII leaves national borders.
      </p>
    </div>
  );
}