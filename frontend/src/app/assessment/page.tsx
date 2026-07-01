import { AppShell } from "@/components/app-shell";
import { pageLabels, statusClassMap } from "@/lib/frd";
import { ClipboardCheck, Eye, Lock, ShieldAlert } from "lucide-react";

const exams = [
  ["MIS-302 Midterm", "492", "Ready", "15 min precheck"],
  ["ACC-214 Quiz 4", "188", "Financial holds", "6 blocked"],
  ["MGT-411 Final", "506", "Proctoring review", "12 cases"],
];

export default function AssessmentPage() {
  return (
    <AppShell
      classification={pageLabels.assessment}
      title="Assessment and Proctoring"
      subtitle="Exam access, integrity signals, browser locks, grade submission, and case review."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Active exam windows", "6"],
          ["Candidates today", "1,186"],
          ["Integrity flags", "23"],
          ["Grade approvals", "41"],
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
            <ClipboardCheck size={20} />
            <h3 className="font-semibold">Exam readiness</h3>
          </div>
          <div className="divide-y divide-slate-200">
            {exams.map(([exam, candidates, state, detail]) => (
              <div key={exam} className="grid gap-3 px-4 py-3 md:grid-cols-[1fr_120px_150px_140px]">
                <p className="font-semibold">{exam}</p>
                <p className="text-sm text-slate-600">{candidates}</p>
                <span className={`w-fit rounded px-2 py-1 text-xs font-semibold ${statusClassMap[state === "Ready" ? "positive" : state === "Financial holds" ? "warning" : "danger"]}`}>
                  {state}
                </span>
                <p className="text-sm text-slate-600">{detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <Lock size={20} />
            <h3 className="font-semibold">Access blocks</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            {["Financial hold", "Identity mismatch", "Expired exam token", "Browser lockdown missing"].map((item) => (
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
            <Eye size={20} />
            <h3 className="font-semibold">Proctoring signals</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Face mismatch events</span>
              <span className="font-semibold">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Focus-loss incidents</span>
              <span className="font-semibold">15</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Manual case reviews</span>
              <span className="font-semibold">12</span>
            </div>
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <ShieldAlert size={20} />
            <h3 className="font-semibold">Academic integrity lane</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {["Instructor review", "Discipline committee", "Registrar grade lock"].map((item) => (
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
