import { AppShell } from "@/components/app-shell";
import { pageLabels, systemSnippets } from "@/lib/frd";
import { Database, HardDrive, Bot, RadioTower, ShieldCheck } from "lucide-react";

export default function SystemPage() {
  return (
    <AppShell
      classification={pageLabels.system}
      title="System Operations"
      subtitle="Primary node services, storage, cache, LLM runtime, and access boundaries."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Primary DB", "PostgreSQL 16"],
          ["Cache bus", "Redis AOF"],
          ["Object storage", "MinIO"],
          ["LLM runtime", "Ollama"],
        ].map(([label, value]) => (
          <article key={label} className="rounded-md border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <Database size={20} />
            <h3 className="font-semibold">Service stack</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {systemSnippets.map((item) => (
              <div key={item} className="rounded-md border border-slate-200 p-3 text-sm">
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} />
            <h3 className="font-semibold">Access boundaries</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Admin tooling</span>
              <span className="font-semibold">VPN only</span>
            </div>
            <div className="flex items-center justify-between">
              <span>System admin read access</span>
              <span className="font-semibold">No finance or grades</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Backup target</span>
              <span className="font-semibold">Local encrypted drive</span>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <HardDrive size={20} />
            <h3 className="font-semibold">Storage posture</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Archive buckets</span>
              <span className="font-semibold">Encrypted</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Retention jobs</span>
              <span className="font-semibold">Nightly</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Recovery exports</span>
              <span className="font-semibold">Ready</span>
            </div>
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <Bot size={20} />
            <h3 className="font-semibold">AI and live services</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              ["Ollama", "Local model only."],
              ["LiveKit", "WebRTC rooms and media routing."],
              ["Redis", "Events, blacklists, and queues."],
            ].map(([label, desc]) => (
              <div key={label} className="rounded-md bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  );
}

