import { type SourceMode } from "@/app/data/meaningModel";
import StatusPill from "./StatusPill";

type SurvivalStripProps = {
  sourceMode?: SourceMode;
  mode?: SourceMode;
};

const semanticSignals = [
  {
    label: "Appointment type",
    status: "Preserved",
  },
  {
    label: "Care team",
    status: "Preserved",
  },
  {
    label: "Reason",
    status: "Preserved",
  },
  {
    label: "Primary task",
    status: "Preserved",
  },
  {
    label: "Actions",
    status: "Preserved",
  },
];

const nonSemanticSignals = [
  {
    label: "Appointment type",
    status: "Inferred",
  },
  {
    label: "Care team",
    status: "Partial",
  },
  {
    label: "Reason",
    status: "Partial",
  },
  {
    label: "Primary task",
    status: "Ambiguous",
  },
  {
    label: "Actions",
    status: "Degraded",
  },
];

export default function SurvivalStrip({
  sourceMode,
  mode,
}: SurvivalStripProps) {
  const activeMode = sourceMode ?? mode ?? "semantic";
  const signals =
    activeMode === "semantic" ? semanticSignals : nonSemanticSignals;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Meaning Survival
          </p>
          <h2 className="mt-1 text-base font-semibold text-zinc-950">
            What survives across interpreters?
          </h2>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-5">
        {signals.map((signal) => (
          <div
            key={signal.label}
            className="rounded-xl border border-zinc-200 bg-zinc-50 p-3"
          >
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
              {signal.label}
            </p>
            <StatusPill>{signal.status}</StatusPill>
          </div>
        ))}
      </div>
    </section>
  );
}
