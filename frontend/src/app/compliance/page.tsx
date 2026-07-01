import { AppShell } from "@/components/app-shell";
import { pageLabels, statusClassMap } from "@/lib/frd";
import { CalendarClock, FileCheck2, Gauge, UploadCloud } from "lucide-react";

const ratios = [
  ["BA MIS", "100%", "1,420", "Compliant"],
  ["BA Accounting and Finance", "100%", "1,260", "Compliant"],
  ["BA Management", "100%", "1,318", "Compliant"],
];

export default function CompliancePage() {
  return (
    <AppShell
      classification={pageLabels.compliance}
      title="Online Delivery Compliance"
      subtitle="Directive 806/2013 delivery ratios, live-hour proof, historical imports, and ETA readiness."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Online delivery ratio", "100%"],
          ["ETA threshold", "60%"],
          ["Evidence gaps", "0"],
          ["Historical semesters", "5"],
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
            <Gauge size={20} />
            <h3 className="font-semibold">Program ratio proof</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Program</th>
                  <th className="px-4 py-3 font-semibold">Digital ratio</th>
                  <th className="px-4 py-3 font-semibold">Logged hours</th>
                  <th className="px-4 py-3 font-semibold">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {ratios.map(([program, ratio, hours, state]) => (
                  <tr key={program}>
                    <td className="px-4 py-3 font-semibold">{program}</td>
                    <td className="px-4 py-3">{ratio}</td>
                    <td className="px-4 py-3">{hours}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded px-2 py-1 text-xs font-semibold ${statusClassMap.positive}`}>
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
            <FileCheck2 size={20} />
            <h3 className="font-semibold">Evidence package</h3>
          </div>
          <div className="mt-4 grid gap-3">
            {["Attendance logs", "Recording manifests", "Instructor credentials", "Financial category export"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm">
                <span>{item}</span>
                <span className="font-semibold">Ready</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <UploadCloud size={20} />
            <h3 className="font-semibold">Historical reconstruction</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Validated CSV batches</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Rejected rows</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Signed import logs</span>
              <span className="font-semibold">Complete</span>
            </div>
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <CalendarClock size={20} />
            <h3 className="font-semibold">Renewal countdown</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {["180-day readiness", "90-day filing", "Inspector export"].map((item) => (
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
