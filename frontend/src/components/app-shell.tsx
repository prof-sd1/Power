import Link from "next/link";
import { appSections, shellFacts } from "@/lib/frd";
import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

type AppShellProps = {
  activeHref: string;
  classification: string;
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AppShell({
  activeHref,
  classification,
  title,
  subtitle,
  children,
}: AppShellProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-slate-200 bg-white lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col">
            <div className="border-b border-slate-200 px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Power College
              </p>
              <h1 className="mt-1 text-lg font-semibold">POC-AMS</h1>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                {classification}
              </p>
            </div>

            <nav className="grid max-h-[calc(100vh-260px)] gap-1 overflow-y-auto px-3 py-4">
              {appSections.map((item) => {
                const Icon = item.icon;
                const active = item.href === activeHref;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex h-11 items-center justify-between rounded-md px-3 text-sm font-medium transition ${
                      active
                        ? "bg-slate-950 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} />
                      {item.label}
                    </span>
                    {active ? <span className="text-xs uppercase">Current</span> : null}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto border-t border-slate-200 p-4">
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Access Policy
                  </span>
                  <ShieldCheck className="text-emerald-600" size={18} />
                </div>
                <p className="text-sm font-semibold">{shellFacts[0]}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  {shellFacts[1]}. {shellFacts[2]}.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-col">
          <header className="border-b border-slate-200 bg-white px-4 py-4 md:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {classification}
            </p>
            <div className="mt-1 flex flex-col gap-2 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {title}
                </h2>
                <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
              </div>
            </div>
          </header>

          <div className="grid gap-4 p-4 md:p-6">{children}</div>
        </section>
      </div>
    </main>
  );
}
