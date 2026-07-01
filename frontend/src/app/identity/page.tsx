import { AppShell } from "@/components/app-shell";
import { pageLabels, statusClassMap } from "@/lib/frd";
import { Fingerprint, IdCard, KeyRound, ShieldAlert } from "lucide-react";

const applicants = [
  ["APP-2026-0418", "National ID match", "Registrar", "Verified"],
  ["APP-2026-0422", "Document face mismatch", "Registrar", "Review"],
  ["APP-2026-0427", "Duplicate phone number", "Identity Officer", "Blocked"],
];

const sessionControls = [
  ["MFA coverage", "98.6%", "Hardware key required for finance approvals."],
  ["High-risk logins", "4", "Step-up challenge enforced before access."],
  ["Password resets", "11", "Out-of-band verification recorded."],
];

export default function IdentityPage() {
  return (
    <AppShell
      classification={pageLabels.identity}
      title="Identity and KYC"
      subtitle="Applicant verification, account provisioning, MFA, and session risk controls."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["KYC queue", "42"],
          ["Verified today", "31"],
          ["Step-up challenges", "9"],
          ["Locked accounts", "3"],
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
            <IdCard size={20} />
            <h3 className="font-semibold">KYC verification lane</h3>
          </div>
          <div className="divide-y divide-slate-200">
            {applicants.map(([id, check, owner, state]) => (
              <div key={id} className="grid gap-3 px-4 py-3 md:grid-cols-[150px_1fr_160px_110px]">
                <p className="font-semibold">{id}</p>
                <p className="text-sm text-slate-600">{check}</p>
                <p className="text-sm text-slate-600">{owner}</p>
                <span className={`w-fit rounded px-2 py-1 text-xs font-semibold ${statusClassMap[state === "Verified" ? "positive" : state === "Blocked" ? "danger" : "warning"]}`}>
                  {state}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <Fingerprint size={20} />
            <h3 className="font-semibold">Provisioning gates</h3>
          </div>
          <div className="mt-4 grid gap-3">
            {["KYC verified", "Admission accepted", "Initial payment received"].map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm">
                <span>{item}</span>
                <span className="font-semibold">{index < 2 ? "Ready" : "Waiting"}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-md bg-sky-50 p-3 text-sm text-sky-900">
            Student IDs are generated only after finance confirms the first enrollment payment.
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <KeyRound size={20} />
            <h3 className="font-semibold">Session controls</h3>
          </div>
          <div className="mt-4 grid gap-3">
            {sessionControls.map(([label, value, detail]) => (
              <div key={label} className="rounded-md border border-slate-200 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{label}</p>
                  <p className="text-sm font-semibold">{value}</p>
                </div>
                <p className="mt-1 text-sm text-slate-600">{detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <ShieldAlert size={20} />
            <h3 className="font-semibold">Fraud signals</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {["Duplicate National ID", "Shared device fingerprint", "Impossible travel"].map((item) => (
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
