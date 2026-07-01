import { AppShell } from "@/components/app-shell";
import { pageLabels, statusClassMap } from "@/lib/frd";
import { FileSignature, GraduationCap, ListChecks, ScrollText } from "lucide-react";

const applications = [
  ["APP-2026-0388", "BA MIS", "KYC verified", "Interview"],
  ["APP-2026-0394", "BA Accounting and Finance", "Finance pending", "Hold"],
  ["APP-2026-0401", "BA Management", "Accepted", "Enroll"],
];

export default function SisPage() {
  return (
    <AppShell
      classification={pageLabels.sis}
      title="Student Information System"
      subtitle="Admissions state, course registration, academic records, and transcript controls."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Applicants", "328"],
          ["Active students", "1,486"],
          ["Registration blocks", "26"],
          ["Transcript requests", "18"],
        ].map(([label, value]) => (
          <article key={label} className="rounded-md border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <article className="rounded-md border border-slate-200 bg-white">
          <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
            <FileSignature size={20} />
            <h3 className="font-semibold">Admissions pipeline</h3>
          </div>
          <div className="divide-y divide-slate-200">
            {applications.map(([id, program, state, action]) => (
              <div key={id} className="grid gap-3 px-4 py-3 md:grid-cols-[150px_1fr_150px_120px]">
                <p className="font-semibold">{id}</p>
                <p className="text-sm text-slate-600">{program}</p>
                <p className="text-sm text-slate-600">{state}</p>
                <span className={`w-fit rounded px-2 py-1 text-xs font-semibold ${statusClassMap[action === "Enroll" ? "positive" : action === "Hold" ? "warning" : "info"]}`}>
                  {action}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <ListChecks size={20} />
            <h3 className="font-semibold">Registration rules</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            {["Prerequisites passed", "Tuition threshold met", "Section capacity open", "Program limited to approved BA tracks"].map((item) => (
              <div key={item} className="rounded-md border border-slate-200 px-3 py-2">
                {item}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <GraduationCap size={20} />
            <h3 className="font-semibold">Graduation audit</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Credit completion checks</span>
              <span className="font-semibold">212</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Online participation evidence</span>
              <span className="font-semibold">100%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Financial clearance pending</span>
              <span className="font-semibold">14</span>
            </div>
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <ScrollText size={20} />
            <h3 className="font-semibold">Records vault</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {["Locked grades", "Digital transcripts", "Disciplinary holds"].map((item) => (
              <div key={item} className="rounded-md bg-slate-50 p-3 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  );
}
