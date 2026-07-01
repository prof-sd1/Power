import { AppShell } from "@/components/app-shell";
import { pageLabels, overviewMetrics } from "@/lib/frd";
import { Archive, Bot, MonitorCheck, ShieldCheck } from "lucide-react";

const moduleMap = [
  ["Identity", "KYC, MFA, session risk, and applicant verification."],
  ["SIS", "Admissions, registration, grades, transcripts, and graduation audit."],
  ["Compliance", "Online delivery proof, historical reconstruction, and ETA evidence."],
  ["Academic", "Course activation, grading, content versioning."],
  ["Finance", "Wallets, holds, ledger and approvals."],
  ["Curriculum", "Syllabus versions, ABR videos, DRM, and production readiness."],
  ["Live", "LiveKit rooms, attendance, recording state, and pacing."],
  ["Assessment", "Exam launch, proctoring signals, submission locks, and integrity cases."],
  ["Library", "Local RAG, digital resources, search, and offline bundles."],
  ["Messages", "SMS/email notices, delivery receipts, and escalation templates."],
  ["Audit", "ETA bundle and historical reconstruction."],
  ["System", "Platform services and access boundaries."],
];

const routeLinks = [
  ["Identity", "/identity"],
  ["SIS", "/sis"],
  ["Compliance", "/compliance"],
  ["Academic", "/academic"],
  ["Finance", "/finance"],
  ["Curriculum", "/curriculum"],
  ["Live", "/live"],
  ["Assessment", "/assessment"],
  ["Library", "/library"],
  ["Messages", "/communication"],
  ["Audit", "/audit"],
  ["System", "/system"],
];

export default function Home() {
  return (
    <AppShell
      classification={pageLabels.overview}
      title="Operations Command"
      subtitle="A classified front door for the college stack, with each module split into its own page."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewMetrics.map((metric) => (
          <article key={metric.label} className="rounded-md border border-slate-200 bg-white p-4">
            <p className="text-sm font-medium text-slate-500">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{metric.value}</p>
            <p className="mt-3 text-sm text-slate-600">{metric.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <MonitorCheck size={20} />
            <h3 className="font-semibold">Module map</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {moduleMap.map(([title, desc]) => (
              <div key={title} className="rounded-md border border-slate-200 p-3">
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} />
            <h3 className="font-semibold">Classification notes</h3>
          </div>
          <div className="mt-4 grid gap-3">
            {[
              "Identity pages handle KYC and session risk without exposing grades.",
              "Finance pages keep the ledger and approvals isolated.",
              "Assessment pages expose proctoring and case data to authorized staff only.",
              "Audit pages expose signed evidence and historical imports only.",
              "System pages show infrastructure without grade or wallet data.",
            ].map((item) => (
              <div key={item} className="rounded-md bg-slate-50 p-3 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <Bot size={20} />
            <h3 className="font-semibold">Key controls</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            {[
              "Student holds propagate instantly into course and exam access.",
              "Live delivery drops below threshold raise alerts.",
              "Historical reconstruction is admin-only.",
            ].map((item) => (
              <div key={item} className="rounded-md border border-slate-200 px-3 py-2">
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <Archive size={20} />
            <h3 className="font-semibold">Next pages</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {routeLinks.map(([label, href]) => (
              <a key={label} href={href} className="rounded-md bg-slate-50 p-3 text-sm font-medium text-slate-800 hover:bg-slate-100">
                {label}
              </a>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  );
}