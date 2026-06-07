import { type MeaningSource, semanticSource } from "@/app/data/meaningModel";
import ScorePill from "./ScorePill";
import StatusPill from "./StatusPill";

type AccessibilityViewProps = {
  model?: MeaningSource;
  source?: MeaningSource;
  sourceMode?: "semantic" | "nonSemantic";
};

export default function AccessibilityView({
  model,
  source,
  sourceMode,
}: AccessibilityViewProps) {
  const activeSource = source ?? model ?? semanticSource;
  const activeMode = sourceMode ?? activeSource.mode;
  const score = activeSource.fidelity.accessibility;
  const scenario = activeSource.scenario;

  const isSemantic = activeMode === "semantic";

  const screenReaderLines = isSemantic
    ? [
        "Region: Main content",
        "Heading level 1: Appointment Summary",
        `Heading level 2: ${scenario.appointmentType}`,
        `Description list: Care team, ${scenario.careTeam}`,
        `Description list: Reason, ${scenario.reason}`,
        `Button: Confirm appointment`,
        "Button: Contact care team",
      ]
    : [
        "Group",
        "Text: Appointment Summary",
        `Text: ${scenario.appointmentType}`,
        `Text: ${scenario.careTeam}`,
        `Text: ${scenario.reason}`,
        "Button",
        "Button",
      ];

  const interpretation = isSemantic
    ? {
        task: "Confirm appointment details",
        structure: "Preserved",
        action: "Clear",
      }
    : {
        task: "Inferred from nearby text",
        structure: "Weak",
        action: "Unclear",
      };

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <header className="mb-4 border-b border-zinc-100 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-zinc-950">
              Accessibility View
            </h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Screen reader interpretation
            </p>
          </div>

          <ScorePill score={score} label="Accessibility meaning preservation" />
        </div>

        <p className="mt-3 text-sm leading-6 text-zinc-600">
          A simulated non-visual reading of the same experience through
          headings, landmarks, labels, roles, and focusable controls.
        </p>
      </header>

      <section className="rounded-xl border border-zinc-200 bg-zinc-950 p-4 text-white">
        <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Screen reader transcript
          </p>
          <StatusPill>{interpretation.structure}</StatusPill>
        </div>

        <ol className="space-y-2">
          {screenReaderLines.map((line, index) => (
            <li
              key={`${line}-${index}`}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs leading-5 text-zinc-200"
            >
              {line}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Interpreted task
          </p>
          <p className="mt-1 text-sm leading-6 text-zinc-800">
            {interpretation.task}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Action clarity
          </p>
          <div className="mt-2">
            <StatusPill>{interpretation.action}</StatusPill>
          </div>
        </div>
      </section>
    </article>
  );
}
