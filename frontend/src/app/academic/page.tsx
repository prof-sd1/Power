import { AppShell } from "@/components/app-shell";
import { pageLabels, statusClassMap } from "@/lib/frd";
import { BookOpenCheck, CalendarClock, CheckCircle2, AlertTriangle, GraduationCap } from "lucide-react";

const courses = [
  ["MIS-302", "A", "M. Bekele", "180", "176", "Compliant"],
  ["ACC-214", "B", "S. Alemu", "150", "118", "Pacing alert"],
  ["MGT-411", "A", "T. Dawit", "210", "213", "Compliant"],
];

const gates = [
  { label: "Master's verified", ok: true },
  { label: "Digital pedagogy valid", ok: true },
  { label: "Workload cap", ok: false },
];

export default function AcademicPage() {
  return (
    <AppShell
      classification={pageLabels.academic}
      title="Academic Core"
      subtitle="Course publishing, delivery pacing, syllabus versioning, and instructor eligibility checks."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Sections published", "148"],
          ["Modules in production", "27"],
          ["Proctoring snapshots", "12,004"],
          ["Grade lock events", "394"],
        ].map(([label, value]) => (
          <article key={label} className="rounded-md border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-md border border-slate-200 bg-white">
          <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
            <CalendarClock size={20} />
            <h3 className="font-semibold">Live contact hour enforcement</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Course</th>
                  <th className="px-4 py-3 font-semibold">Section</th>
                  <th className="px-4 py-3 font-semibold">Instructor</th>
                  <th className="px-4 py-3 font-semibold">Scheduled</th>
                  <th className="px-4 py-3 font-semibold">Delivered</th>
                  <th className="px-4 py-3 font-semibold">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {courses.map(([course, section, instructor, scheduled, delivered, state]) => (
                  <tr key={`${course}-${section}`}>
                    <td className="px-4 py-3 font-semibold">{course}</td>
                    <td className="px-4 py-3">{section}</td>
                    <td className="px-4 py-3">{instructor}</td>
                    <td className="px-4 py-3">{scheduled} min</td>
                    <td className="px-4 py-3">{delivered} min</td>
                    <td className="px-4 py-3">
                      <span className={`rounded px-2 py-1 text-xs font-semibold ${statusClassMap[state.includes("alert") ? "warning" : "positive"]}`}>
                        {state}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <BookOpenCheck size={20} />
            <h3 className="font-semibold">Activation gates</h3>
          </div>
          <div className="mt-4 grid gap-3">
            {gates.map((gate) => (
              <div key={gate.label} className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2">
                <span className="text-sm font-medium">{gate.label}</span>
                {gate.ok ? <CheckCircle2 className="text-emerald-600" size={18} /> : <AlertTriangle className="text-amber-600" size={18} />}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm font-medium text-amber-900">
            Workload cap blocks publication until the Academic Head resolves the assignment.
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <GraduationCap size={20} />
            <h3 className="font-semibold">Syllabus and content state</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Courses with version history</span>
              <span className="font-semibold">89</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Content items awaiting review</span>
              <span className="font-semibold">14</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Lockable grade rows</span>
              <span className="font-semibold">1,204</span>
            </div>
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-slate-950" />
            <h3 className="font-semibold">Workflow lane</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {["Draft", "Review", "Publish"].map((step, index) => (
              <div key={step} className="rounded-md border border-slate-200 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Step {index + 1}
                </p>
                <p className="mt-2 font-semibold">{step}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {index === 0 ? "Instructor uploads material." : index === 1 ? "HoD checks quality and compliance." : "Registrar locks the final version."}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  );
}

