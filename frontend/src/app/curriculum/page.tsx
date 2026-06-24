import { AppShell } from "@/components/app-shell";
import { pageLabels, statusClassMap } from "@/lib/frd";
import { BookOpenCheck, Clapperboard, GitBranch, LockKeyhole } from "lucide-react";

const production = [
  ["MIS-302 Database Systems", "READY_FOR_REVIEW", "42 / 45 hrs", "HoD review"],
  ["ACC-214 Cost Accounting", "IN_PRODUCTION", "31 / 48 hrs", "Instructor"],
  ["MGT-411 Strategic Management", "PUBLISHED", "52 / 50 hrs", "Students"],
];

export default function CurriculumPage() {
  return (
    <AppShell
      activeHref="/curriculum"
      classification={pageLabels.curriculum}
      title="Curriculum and Content"
      subtitle="Course hierarchy, syllabus versions, media processing, DRM, and content production readiness."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Published courses", "148"],
          ["Review queue", "14"],
          ["HLS transcodes", "326"],
          ["Offline licenses", "912"],
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
            <Clapperboard size={20} />
            <h3 className="font-semibold">Production dashboard</h3>
          </div>
          <div className="divide-y divide-slate-200">
            {production.map(([course, state, hours, owner]) => (
              <div key={course} className="grid gap-3 px-4 py-3 md:grid-cols-[1fr_160px_130px_120px]">
                <p className="font-semibold">{course}</p>
                <span className={`w-fit rounded px-2 py-1 text-xs font-semibold ${statusClassMap[state === "PUBLISHED" ? "positive" : state === "IN_PRODUCTION" ? "warning" : "info"]}`}>
                  {state}
                </span>
                <p className="text-sm text-slate-600">{hours}</p>
                <p className="text-sm text-slate-600">{owner}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <BookOpenCheck size={20} />
            <h3 className="font-semibold">Course activation gates</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            {["Instructor credential", "Digital pedagogy certificate", "Workload cap", "Copyright declaration"].map((item) => (
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
            <GitBranch size={20} />
            <h3 className="font-semibold">Version control</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Syllabus versions</span>
              <span className="font-semibold">231</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Mandatory change reasons</span>
              <span className="font-semibold">Enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Superseded content</span>
              <span className="font-semibold">Archived</span>
            </div>
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <LockKeyhole size={20} />
            <h3 className="font-semibold">DRM and offline mode</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {["AES-256 packages", "7-day heartbeat", "Clock tamper revocation"].map((item) => (
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
