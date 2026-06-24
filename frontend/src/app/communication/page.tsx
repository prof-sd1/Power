import { AppShell } from "@/components/app-shell";
import { pageLabels, statusClassMap } from "@/lib/frd";
import { BellRing, MailCheck, MessageSquareText, Send } from "lucide-react";

const campaigns = [
  ["Maintenance notice", "Students and staff", "SMS + Email", "Delivered"],
  ["Finance hold reminder", "26 students", "SMS", "Queued"],
  ["Exam precheck alert", "MIS-302 candidates", "Email", "Delivered"],
];

export default function CommunicationPage() {
  return (
    <AppShell
      activeHref="/communication"
      classification={pageLabels.communication}
      title="Communication Service"
      subtitle="Operational notices, SMS/email delivery receipts, escalation templates, and audit logging."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Messages today", "3,824"],
          ["Delivery success", "99.1%"],
          ["Failed retries", "12"],
          ["Active templates", "38"],
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
            <Send size={20} />
            <h3 className="font-semibold">Campaign queue</h3>
          </div>
          <div className="divide-y divide-slate-200">
            {campaigns.map(([campaign, audience, channel, state]) => (
              <div key={campaign} className="grid gap-3 px-4 py-3 md:grid-cols-[1fr_170px_120px_120px]">
                <p className="font-semibold">{campaign}</p>
                <p className="text-sm text-slate-600">{audience}</p>
                <p className="text-sm text-slate-600">{channel}</p>
                <span className={`w-fit rounded px-2 py-1 text-xs font-semibold ${statusClassMap[state === "Delivered" ? "positive" : "warning"]}`}>
                  {state}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <BellRing size={20} />
            <h3 className="font-semibold">Escalations</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            {["P1 finance variance", "Live delivery below threshold", "Maintenance window notice", "Data retention wipe report"].map((item) => (
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
            <MailCheck size={20} />
            <h3 className="font-semibold">Delivery receipts</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span>SMS provider ACK</span>
              <span className="font-semibold">99.3%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Email bounce rate</span>
              <span className="font-semibold">0.7%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Audit log writes</span>
              <span className="font-semibold">Complete</span>
            </div>
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <MessageSquareText size={20} />
            <h3 className="font-semibold">Template controls</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {["Bilingual variants", "Role-scoped sending", "Immutable content history"].map((item) => (
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
