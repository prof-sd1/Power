import {
  Archive,
  Bot,
  ClipboardCheck,
  FileSignature,
  GraduationCap,
  IdCard,
  MessageSquareText,
  MonitorCheck,
  RadioTower,
  ShieldCheck,
  WalletCards,
  BookOpenCheck,
  Database,
  FileCheck2,
} from "lucide-react";

export const appSections = [
  {
    label: "Overview",
    href: "/",
    icon: MonitorCheck,
    classification: "INTERNAL / COMMAND",
  },
  {
    label: "Academic",
    href: "/academic",
    icon: GraduationCap,
    classification: "RESTRICTED / ACADEMIC",
  },
  {
    label: "Identity",
    href: "/identity",
    icon: IdCard,
    classification: "CONFIDENTIAL / IDENTITY",
  },
  {
    label: "SIS",
    href: "/sis",
    icon: FileSignature,
    classification: "RESTRICTED / REGISTRAR",
  },
  {
    label: "Compliance",
    href: "/compliance",
    icon: FileCheck2,
    classification: "STRICTLY CONFIDENTIAL / ETA",
  },
  {
    label: "Finance",
    href: "/finance",
    icon: WalletCards,
    classification: "CONFIDENTIAL / FINANCE",
  },
  {
    label: "Curriculum",
    href: "/curriculum",
    icon: BookOpenCheck,
    classification: "RESTRICTED / CONTENT",
  },
  {
    label: "Live",
    href: "/live",
    icon: RadioTower,
    classification: "SENSITIVE / LIVE DELIVERY",
  },
  {
    label: "Assessment",
    href: "/assessment",
    icon: ClipboardCheck,
    classification: "SENSITIVE / EXAMS",
  },
  {
    label: "Library",
    href: "/library",
    icon: Bot,
    classification: "RESTRICTED / CONTENT",
  },
  {
    label: "Messages",
    href: "/communication",
    icon: MessageSquareText,
    classification: "INTERNAL / COMMS",
  },
  {
    label: "Audit",
    href: "/audit",
    icon: Archive,
    classification: "STRICTLY CONFIDENTIAL / AUDIT",
  },
  {
    label: "System",
    href: "/system",
    icon: Database,
    classification: "INTERNAL / INFRASTRUCTURE",
  },
] as const;

export const overviewMetrics = [
  { label: "ETA bundle readiness", value: "83%", detail: "7 evidence groups verified" },
  { label: "Financial variance", value: "0.00 ETB", detail: "Nightly reconciliation clean" },
  { label: "Live delivery ratio", value: "94.8%", detail: "Above 90% critical floor" },
  { label: "Active holds", value: "26", detail: "18 tuition, 8 academic" },
];

export const pageLabels = {
  overview: "INTERNAL / COMMAND",
  academic: "RESTRICTED / ACADEMIC",
  identity: "CONFIDENTIAL / IDENTITY",
  sis: "RESTRICTED / REGISTRAR",
  compliance: "STRICTLY CONFIDENTIAL / ETA",
  finance: "CONFIDENTIAL / FINANCE",
  curriculum: "RESTRICTED / CONTENT",
  live: "SENSITIVE / LIVE DELIVERY",
  assessment: "SENSITIVE / EXAMS",
  library: "RESTRICTED / CONTENT",
  communication: "INTERNAL / COMMS",
  audit: "STRICTLY CONFIDENTIAL / AUDIT",
  system: "INTERNAL / INFRASTRUCTURE",
} as const;

export const rolePills = [
  "Compliance",
  "Registrar",
  "Finance",
  "Academic",
  "Instructor",
  "Student",
];

export const statusClassMap: Record<string, string> = {
  positive: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-rose-100 text-rose-800",
  info: "bg-sky-100 text-sky-800",
};

export const shellFacts = [
  "PoLP and SoD enforced",
  "RS256 identity boundary",
  "Hash-chained audit trail",
];

export const systemSnippets = [
  "PostgreSQL 16 + pgvector",
  "Redis AOF event bus",
  "MinIO AES-256 buckets",
  "Ollama local LLM",
];
