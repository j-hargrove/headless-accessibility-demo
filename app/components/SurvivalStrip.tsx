type SurvivalStripProps = {
  sourceMode?: "semantic" | "non-semantic";
  mode?: "semantic" | "non-semantic";
};

const semanticItems = [
  {
    label: "Visible presentation",
    status: "Survives",
  },
  {
    label: "Labels",
    status: "Survives",
  },
  {
    label: "Relationships",
    status: "Survives",
  },
  {
    label: "Action targets",
    status: "Survives",
  },
  {
    label: "Task meaning",
    status: "Survives",
  },
];

const nonSemanticItems = [
  {
    label: "Visible presentation",
    status: "Mostly survives",
  },
  {
    label: "Labels",
    status: "Weak",
  },
  {
    label: "Relationships",
    status: "Missing",
  },
  {
    label: "Action targets",
    status: "Ambiguous",
  },
  {
    label: "Task meaning",
    status: "Inferred",
  },
];

export default function SurvivalStrip({
  sourceMode,
  mode,
}: SurvivalStripProps) {
  const activeMode = sourceMode ?? mode ?? "semantic";
  const isSemantic = activeMode === "semantic";
  const items = isSemantic ? semanticItems : nonSemanticItems;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-2 border-b border-zinc-100 pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            What Survived?
          </p>
          <h2 className="mt-1 text-base font-semibold text-zinc-950">
            {isSemantic
              ? "Meaning remains available across interpreters."
              : "Presentation remains visible, but structure weakens."}
          </h2>
        </div>

        <span className="w-fit rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700">
          {isSemantic ? "Semantic Source" : "Non-Semantic Source"}
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-5">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-zinc-100 bg-zinc-50 p-3"
          >
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
              {item.label}
            </p>
            <p className="mt-2 text-sm font-semibold text-zinc-900">
              {item.status}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}