import { AppShell } from "@/components/app-shell";
import { pageLabels } from "@/lib/frd";
import { Archive, FileCheck2, ShieldCheck, CalendarClock } from "lucide-react";

const events = [
  ["ETA bundle generation", "Signed", "2 min ago"],
  ["Historical reconstruction import", "Queued", "18 min ago"],
  ["Nightly integrity check", "Passed", "Today 00:00 EAT"],
];

export default function AuditPage() {
  return (
    <AppShell
      classification={pageLabels.audit}
      title="Audit and Compliance"
      subtitle="Hash chains, renewal evidence, historical reconstruction, and signed exports."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Evidence groups", "7/7"],
          ["Signed exports", "41"],
          ["Open discrepancies", "0"],
          ["Next renewal window", "180 days"],
        ].map(([label, value]) => (
          <article key={label} className="rounded-md border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-md border border-slate-200 bg-white">
          <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
            <FileCheck2 size={20} />
            <h3 className="font-semibold">Compliance bundle timeline</h3>
          </div>
          <div className="divide-y divide-slate-200">
            {events.map(([event, state, time]) => (
              <div key={event} className="grid gap-2 px-4 py-3 md:grid-cols-[1fr_120px_150px]">
                <p className="font-semibold">{event}</p>
                <p className="text-sm text-slate-600">{state}</p>
                <p className="text-sm text-slate-600">{time}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <Archive size={20} />
            <h3 className="font-semibold">Historical reconstruction</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Imported semesters</span>
              <span className="font-semibold">5</span>
            </div>
            <div className="flex items-center justify-between">
              <span>CSV uploads</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Audit chain integrity</span>
              <span className="font-semibold">Green</span>
            </div>
          </div>
          <div className="mt-4 rounded-md bg-emerald-50 p-3 text-sm text-emerald-900">
            The current hash chain validates against the genesis record.
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} />
            <h3 className="font-semibold">Policy checkpoints</h3>
          </div>
          <div className="mt-4 grid gap-3">
            {[
              "PoLP applied to all service accounts",
              "Maker and checker sessions are separate",
              "Export bundles are signed and immutable",
            ].map((item) => (
              <div key={item} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <CalendarClock size={20} />
            <h3 className="font-semibold">Renewal posture</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {["6 months out", "90 days out", "60 seconds export"].map((item) => (
              <div key={item} className="rounded-md bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{item}</p>
                <p className="mt-2 text-sm text-slate-600">
                  {item === "6 months out" ? "Bundle becomes mandatory." : item === "90 days out" ? "Draft report auto-assembled." : "Compliance officer signs export."}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  );
}

