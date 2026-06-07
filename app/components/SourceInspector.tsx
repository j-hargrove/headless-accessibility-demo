import { MeaningSource, semanticSource } from "@/app/data/meaningModel";

type SourceInspectorProps = {
  source?: MeaningSource;
  currentSource?: MeaningSource;
  sourceMode?: "semantic" | "non-semantic";
  mode?: "semantic" | "non-semantic";
};

const semanticSignals = [
  {
    label: "Hierarchy",
    value: "Heading and region structure are explicit.",
  },
  {
    label: "Labels",
    value: "Fields and actions have programmatic names.",
  },
  {
    label: "Relationships",
    value: "Reason, care team, and appointment are connected.",
  },
  {
    label: "Actions",
    value: "Button purpose and target are discoverable.",
  },
];

const nonSemanticSignals = [
  {
    label: "Hierarchy",
    value: "Hierarchy is visual, not programmatic.",
  },
  {
    label: "Labels",
    value: "Labels appear as nearby text only.",
  },
  {
    label: "Relationships",
    value: "Relationships must be inferred from layout.",
  },
  {
    label: "Actions",
    value: "Action purpose is visible but target is ambiguous.",
  },
];

export default function SourceInspector({
  source,
  currentSource,
  sourceMode,
  mode,
}: SourceInspectorProps) {
  const activeSource = source ?? currentSource ?? semanticSource;
  const activeMode = sourceMode ?? mode ?? activeSource.mode;
  const isSemantic = activeMode === "semantic";
  const signals = isSemantic ? semanticSignals : nonSemanticSignals;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-2 border-b border-zinc-100 pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Source Inspector
          </p>
          <h2 className="mt-1 text-base font-semibold text-zinc-950">
            {isSemantic
              ? "The source carries meaning before presentation."
              : "The source leaves meaning trapped in presentation."}
          </h2>
        </div>

        <span className="w-fit rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700">
          {isSemantic ? "Semantic Source" : "Non-Semantic Source"}
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {signals.map((signal) => (
          <div
            key={signal.label}
            className="rounded-xl border border-zinc-100 bg-zinc-50 p-3"
          >
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
              {signal.label}
            </p>
            <p className="mt-2 text-sm leading-5 text-zinc-800">
              {signal.value}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs leading-5 text-zinc-500">
        The inspector summarizes why the same visible product produces different
        interpretation quality when the underlying source changes.
      </p>
    </section>
  );
}