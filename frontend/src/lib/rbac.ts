import type { UserRole } from "./auth";

/**
 * RBAC permission matrix for POC-AMS.
 * Maps each role to the set of pages/modules they can access.
 * Based on Section 8.12 Permission Matrix of FRD.md.
 */

export type PageRoute =
  | "/"
  | "/academic"
  | "/identity"
  | "/sis"
  | "/compliance"
  | "/finance"
  | "/curriculum"
  | "/live"
  | "/assessment"
  | "/library"
  | "/communication"
  | "/audit"
  | "/system"
  | "/identity/login"
  | "/identity/register";

const rolePageAccess: Record<UserRole, PageRoute[]> = {
  applicant: ["/", "/identity/login", "/identity/register"],
  student: [
    "/",
    "/academic",
    "/curriculum",
    "/live",
    "/assessment",
    "/library",
    "/communication",
  ],
  instructor: [
    "/",
    "/academic",
    "/curriculum",
    "/live",
    "/assessment",
    "/library",
    "/communication",
  ],
  academic_head: [
    "/",
    "/academic",
    "/curriculum",
    "/live",
    "/assessment",
    "/sis",
    "/communication",
  ],
  registrar: [
    "/",
    "/sis",
    "/compliance",
    "/audit",
    "/academic",
    "/communication",
  ],
  finance_officer: ["/", "/finance", "/communication"],
  librarian: ["/", "/library", "/curriculum", "/communication"],
  system_admin: ["/", "/system", "/identity", "/communication"],
  compliance_officer: [
    "/",
    "/compliance",
    "/audit",
    "/sis",
    "/finance",
    "/academic",
    "/identity",
    "/system",
    "/communication",
  ],
  agency_inspector: ["/", "/compliance", "/audit"],
  disciplinary_committee: ["/", "/assessment", "/sis", "/communication"],
};

export function canAccessPage(role: UserRole | null, page: PageRoute): boolean {
  if (!role) return false;
  const allowed = rolePageAccess[role];
  return allowed?.includes(page) ?? false;
}

export function getAccessiblePages(role: UserRole): PageRoute[] {
  return rolePageAccess[role] ?? [];
}

/**
 * Sidebar navigation items with RBAC gating.
 * Each item specifies which roles can see it.
 */
export interface NavItem {
  label: string;
  href: PageRoute;
  roles: UserRole[];
}

export const navItems: NavItem[] = [
  { label: "Overview", href: "/", roles: ["applicant", "student", "instructor", "academic_head", "registrar", "finance_officer", "librarian", "system_admin", "compliance_officer", "agency_inspector", "disciplinary_committee"] },
  { label: "Academic", href: "/academic", roles: ["student", "instructor", "academic_head", "registrar", "compliance_officer", "disciplinary_committee"] },
  { label: "Identity", href: "/identity", roles: ["system_admin", "compliance_officer"] },
  { label: "SIS", href: "/sis", roles: ["academic_head", "registrar", "compliance_officer", "disciplinary_committee"] },
  { label: "Compliance", href: "/compliance", roles: ["registrar", "compliance_officer", "agency_inspector"] },
  { label: "Finance", href: "/finance", roles: ["finance_officer", "compliance_officer"] },
  { label: "Curriculum", href: "/curriculum", roles: ["student", "instructor", "academic_head", "librarian"] },
  { label: "Live", href: "/live", roles: ["student", "instructor", "academic_head"] },
  { label: "Assessment", href: "/assessment", roles: ["student", "instructor", "academic_head", "disciplinary_committee"] },
  { label: "Library", href: "/library", roles: ["student", "instructor", "academic_head", "librarian"] },
  { label: "Messages", href: "/communication", roles: ["student", "instructor", "academic_head", "registrar", "finance_officer", "librarian", "system_admin", "compliance_officer", "disciplinary_committee"] },
  { label: "Audit", href: "/audit", roles: ["registrar", "compliance_officer", "agency_inspector"] },
  { label: "System", href: "/system", roles: ["system_admin", "compliance_officer"] },
];