import { AppShell } from "@/components/app-shell";
import { pageLabels, statusClassMap } from "@/lib/frd";
import { Banknote, CircleDollarSign, ShieldCheck, WalletCards } from "lucide-react";

const queue = [
  ["Manual receipt above threshold", "8,450 ETB", "Finance Officer", "Senior Finance", "Checker required"],
  ["Telebirr webhook replay", "1,200 ETB", "Gateway", "Idempotency guard", "Blocked"],
  ["Refund inside add/drop window", "2,900 ETB", "Finance Officer", "Policy engine", "Approved"],
];

export default function FinancePage() {
  return (
    <AppShell
      activeHref="/finance"
      classification={pageLabels.finance}
      title="Finance Vault"
      subtitle="Ledger integrity, tuition holds, maker-checker approvals, and reconciliation."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Wallet balance total", "3.82M ETB"],
          ["Open holds", "26"],
          ["Pending approvals", "7"],
          ["Variance", "0.00 ETB"],
        ].map(([label, value]) => (
          <article key={label} className="rounded-md border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <article className="rounded-md border border-slate-200 bg-white">
          <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
            <Banknote size={20} />
            <h3 className="font-semibold">Maker-checker queue</h3>
          </div>
          <div className="divide-y divide-slate-200">
            {queue.map(([item, amount, maker, checker, state]) => (
              <div key={item} className="grid gap-3 px-4 py-3 md:grid-cols-[1fr_120px_150px_150px_130px]">
                <p className="font-semibold">{item}</p>
                <p className="text-sm font-medium">{amount}</p>
                <p className="text-sm text-slate-600">{maker}</p>
                <p className="text-sm text-slate-600">{checker}</p>
                <span className={`w-fit rounded px-2 py-1 text-xs font-semibold ${statusClassMap[state === "Blocked" ? "danger" : state === "Approved" ? "positive" : "warning"]}`}>
                  {state}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <WalletCards size={20} />
            <h3 className="font-semibold">Holds and policy</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Tuition hold</span>
              <span className="font-semibold">18 students</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Exam lock</span>
              <span className="font-semibold">6 students</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Manual waiver threshold</span>
              <span className="font-semibold">5,000 ETB</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Variance alert floor</span>
              <span className="font-semibold">0.01 ETB</span>
            </div>
          </div>
          <div className="mt-4 rounded-md bg-emerald-50 p-3 text-sm text-emerald-900">
            Nightly reconciliation matched the bank and mobile money float.
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <CircleDollarSign size={20} />
            <h3 className="font-semibold">Ledger posture</h3>
          </div>
          <div className="mt-4 grid gap-3">
            {[
              "Double-entry journal balanced",
              "Webhook idempotency keys stored",
              "Refund approvals require a second session",
            ].map((item) => (
              <div key={item} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} />
            <h3 className="font-semibold">Risk controls</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {["Velocity checks", "DLQ monitoring", "Four-eyes approval"].map((item) => (
              <div key={item} className="rounded-md bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{item}</p>
                <p className="mt-2 text-sm text-slate-600">
                  {item === "Velocity checks" ? "3 credits / 60 sec triggers a freeze." : item === "DLQ monitoring" ? "Failed calls remain visible until retried." : "Maker and checker cannot be the same person."}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  );
}

