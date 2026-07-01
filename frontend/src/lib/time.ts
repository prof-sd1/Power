/**
 * EAT (East Africa Time) timezone utilities for POC-AMS.
 * Per FRD Section 1.5, EAT (UTC+3) is the mandatory time zone
 * for all system logs, scheduling, and legal timestamps.
 */

export const EAT_TIMEZONE = "Africa/Addis_Ababa";
export const EAT_OFFSET = "+03:00";

/**
 * Returns the current date/time in EAT as an ISO string.
 */
export function nowEAT(): string {
  return new Date().toLocaleString("en-US", { timeZone: EAT_TIMEZONE });
}

/**
 * Formats a date to a human-readable EAT string.
 * Example: "June 30, 2026, 8:15 AM EAT"
 */
export function formatEAT(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-US", {
    timeZone: EAT_TIMEZONE,
    timeZoneName: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    ...options,
  });
}

/**
 * Formats a date to a short EAT string for tables.
 * Example: "2026-06-30 08:15 EAT"
 */
export function formatEATShort(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-US", {
    timeZone: EAT_TIMEZONE,
    timeZoneName: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/**
 * Returns the current EAT timestamp for audit logging.
 * Format: ISO 8601 with EAT offset
 */
export function eatTimestamp(): string {
  const now = new Date();
  const eatOffset = 3 * 60; // EAT is UTC+3 in minutes
  const localOffset = now.getTimezoneOffset();
  const eatTime = new Date(now.getTime() + (localOffset + eatOffset) * 60_000);
  return eatTime.toISOString().replace("Z", EAT_OFFSET);
}

/**
 * Checks if a given date is within the Add/Drop window (first 14 days of semester).
 * @param semesterStart - ISO date string of semester start
 * @param dateToCheck - optional date to check (defaults to now)
 */
export function isWithinAddDropWindow(semesterStart: string, dateToCheck?: Date): boolean {
  const start = new Date(semesterStart);
  const check = dateToCheck ?? new Date();
  const diffDays = (check.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 14;
}

/**
 * Returns the remaining days until license renewal deadline.
 * Per Art. 10.2, renewal must be submitted 90 days before expiry.
 */
export function daysUntilRenewalDeadline(licenseExpiry: string): number {
  const expiry = new Date(licenseExpiry);
  const deadline = new Date(expiry.getTime() - 90 * 24 * 60 * 60 * 1000);
  const now = new Date();
  return Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

/**
 * Returns the maintenance window description.
 * Per Section 6.11: Sundays between 2:00 AM and 4:00 AM EAT.
 */
export function getMaintenanceWindow(): string {
  return "Sunday 2:00 AM – 4:00 AM EAT";
}