import { AppShell } from "@/components/app-shell";
import { pageLabels, statusClassMap } from "@/lib/frd";
import { RadioTower, Video, Users, AlertTriangle } from "lucide-react";

const sessions = [
  ["MIS-302 A", "84", "38", "99.2%", "Healthy"],
  ["ACC-214 B", "59", "14", "76.5%", "Pacing alert"],
  ["MGT-411 A", "92", "40", "100%", "Healthy"],
];

export default function LivePage() {
  return (
    <AppShell
      activeHref="/live"
      classification={pageLabels.live}
      title="Live Classroom"
      subtitle="LiveKit sessions, attendance, recording state, and delivery pacing."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Open rooms", "14"],
          ["Concurrent students", "486"],
          ["Average join latency", "182 ms"],
          ["Recording queues", "6"],
        ].map(([label, value]) => (
          <article key={label} className="rounded-md border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-md border border-slate-200 bg-white">
          <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
            <RadioTower size={20} />
            <h3 className="font-semibold">Attendance and pacing</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Room</th>
                  <th className="px-4 py-3 font-semibold">Present</th>
                  <th className="px-4 py-3 font-semibold">Connected now</th>
                  <th className="px-4 py-3 font-semibold">Delivery</th>
                  <th className="px-4 py-3 font-semibold">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sessions.map(([room, present, connected, delivery, state]) => (
                  <tr key={room}>
                    <td className="px-4 py-3 font-semibold">{room}</td>
                    <td className="px-4 py-3">{present}</td>
                    <td className="px-4 py-3">{connected}</td>
                    <td className="px-4 py-3">{delivery}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded px-2 py-1 text-xs font-semibold ${statusClassMap[state === "Pacing alert" ? "warning" : "positive"]}`}>
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
            <Video size={20} />
            <h3 className="font-semibold">Media pipeline</h3>
          </div>
          <div className="mt-4 grid gap-3">
            {[
              "Adaptive bitrate ladder ready",
              "Session recordings queued to MinIO",
              "Fallback chat enabled behind restricted firewalls",
            ].map((item) => (
              <div key={item} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">
            A section below 90% delivery triggers a critical alert.
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <Users size={20} />
            <h3 className="font-semibold">Room health</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Average join jitter</span>
              <span className="font-semibold">23 ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Fallback sessions</span>
              <span className="font-semibold">11</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Audio/video drops</span>
              <span className="font-semibold">0</span>
            </div>
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} />
            <h3 className="font-semibold">Alerts</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              "Emergency make-up session required for ACC-214 B.",
              "Instructor connectivity fallback available for two rooms.",
              "Recording queue capacity within limit.",
            ].map((item) => (
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

