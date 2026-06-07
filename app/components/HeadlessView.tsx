import { type MeaningSource, semanticSource } from "@/app/data/meaningModel";
import ScorePill from "./ScorePill";
import StatusPill from "./StatusPill";

type HeadlessViewProps = {
  source?: MeaningSource;
  model?: MeaningSource;
};

export default function HeadlessView({
  source,
  model,
}: HeadlessViewProps) {
  const activeSource = source ?? model ?? semanticSource;
  const score = activeSource.fidelity.headless;
  const isSemantic = activeSource.mode === "semantic";

  const headlessPayload = isSemantic
    ? {
        intent: "Confirm appointment details and prepare for the visit",
        context: "Patient portal appointment summary",
        entities: [
          {
            id: "appointment",
            label: activeSource.scenario.appointmentType,
            type: "visit",
          },
          {
            id: "care-team",
            label: activeSource.scenario.careTeam,
            type: "provider-group",
          },
          {
            id: "reason",
            label: activeSource.scenario.reason,
            type: "visit-reason",
          },
        ],
        actions: [
          {
            id: "confirm-appointment",
            label: "Confirm appointment",
            target: "appointment",
          },
          {
            id: "contact-care-team",
            label: "Contact care team",
            target: "care-team",
          },
        ],
        relationships: [
          "appointment belongs to patient portal",
          "care team supports appointment",
          "reason explains appointment",
          "confirm appointment acts on appointment",
        ],
      }
    : {
        intent: "unknown",
        context: "visual card-like content",
        entities: [
          {
            id: "block-1",
            label: activeSource.scenario.appointmentType,
            type: "text",
          },
          {
            id: "block-2",
            label: activeSource.scenario.careTeam,
            type: "text",
          },
          {
            id: "block-3",
            label: activeSource.scenario.reason,
            type: "text",
          },
        ],
        actions: [
          {
            id: "button-1",
            label: "Confirm appointment",
            target: "unknown",
          },
          {
            id: "button-2",
            label: "Contact care team",
            target: "unknown",
          },
        ],
        relationships: [
          "relationship inferred from visual proximity",
          "button targets not explicitly encoded",
          "task intent not reliably available",
        ],
      };

  const interpretation = isSemantic
    ? {
        structure: "Preserved",
        relationships: "Mapped",
        task: "Actionable",
      }
    : {
        structure: "Missing",
        relationships: "Unclear",
        task: "Weak",
      };

  return (
    <article className="rounded-2xl border border-zinc-900 bg-zinc-950 p-4 text-white shadow-sm">
      <header className="mb-4 border-b border-white/10 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-white">
              Headless View
            </h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
              Structured meaning output
            </p>
          </div>

          <ScorePill score={score} label="Headless meaning preservation" />
        </div>

        <p className="mt-3 text-sm leading-6 text-zinc-300">
          A simulated headless payload showing what remains when visual
          presentation is removed.
        </p>
      </header>

      <div className="mb-4 grid gap-2 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Structure
          </p>
          <StatusPill>{interpretation.structure}</StatusPill>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Relationships
          </p>
          <StatusPill>{interpretation.relationships}</StatusPill>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Task
          </p>
          <StatusPill>{interpretation.task}</StatusPill>
        </div>
      </div>

      <pre className="max-h-80 overflow-auto rounded-xl border border-white/10 bg-black/40 p-3 text-xs leading-5 text-zinc-200">
        {JSON.stringify(headlessPayload, null, 2)}
      </pre>
    </article>
  );
}
