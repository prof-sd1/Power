import { AppShell } from "@/components/app-shell";
import { pageLabels } from "@/lib/frd";
import { Bot, Library, Search, KeyRound } from "lucide-react";

export default function LibraryPage() {
  return (
    <AppShell
      classification={pageLabels.library}
      title="AI Study Assistant and Digital Library"
      subtitle="Local RAG boundary, search index, and versioned learning materials."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Indexed assets", "1,284"],
          ["PDF transcripts", "842"],
          ["Search latency", "42 ms"],
          ["Prompt violations", "0"],
        ].map(([label, value]) => (
          <article key={label} className="rounded-md border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <Bot size={20} />
            <h3 className="font-semibold">Local RAG boundary</h3>
          </div>
          <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-600">
            Ollama runs on the local node, pgvector stores embeddings, and no student prompt leaves the institution boundary.
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Redaction checks</span>
              <span className="font-semibold">Passing</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Embeddings refreshed</span>
              <span className="font-semibold">Nightly</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Answer grounding</span>
              <span className="font-semibold">Syllabus only</span>
            </div>
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <Search size={20} />
            <h3 className="font-semibold">Library search lanes</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              "Syllabus lookup",
              "Lecture transcript search",
              "Citation and policy retrieval",
            ].map((item) => (
              <div key={item} className="rounded-md bg-slate-50 p-3 text-sm">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-md bg-emerald-50 p-3 text-sm text-emerald-900">
            <KeyRound size={18} />
            Search is restricted to local sources and approved course materials.
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <Library size={20} />
            <h3 className="font-semibold">Content classes</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              ["Course packs", "Versioned, instructor-owned until publish."],
              ["Library holdings", "Searchable and tagged for program level."],
              ["Offline bundles", "Signed and time-bound for permitted downloads."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-md border border-slate-200 p-3">
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-slate-950" />
            <h3 className="font-semibold">Usage snapshot</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Daily searches</span>
              <span className="font-semibold">2,918</span>
            </div>
            <div className="flex items-center justify-between">
              <span>AI answers generated</span>
              <span className="font-semibold">463</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Files awaiting OCR</span>
              <span className="font-semibold">19</span>
            </div>
          </div>
        </article>
      </section>
    </AppShell>
  );
}

