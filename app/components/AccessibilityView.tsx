import { MeaningModel } from "@/app/data/meaningModel";

type AccessibilityViewProps = {
  model: MeaningModel;
  sourceMode: "semantic" | "non-semantic";
};

const semanticRows = [
  {
    label: "Landmark",
    value: "main region identified",
    status: "Preserved",
  },
  {
    label: "Heading",
    value: "Follow-up appointment details",
    status: "Preserved",
  },
  {
    label: "Labels",
    value: "appointment type, care team, reason",
    status: "Preserved",
  },
  {
    label: "Focus order",
    value: "details before actions",
    status: "Preserved",
  },
  {
    label: "Relationships",
    value: "actions connected to appointment",
    status: "Preserved",
  },
];

const nonSemanticRows = [
  {
    label: "Landmark",
    value: "generic container",
    status: "Weak",
  },
  {
    label: "Heading",
    value: "visual text only",
    status: "Unclear",
  },
  {
    label: "Labels",
    value: "nearby text, not programmatically tied",
    status: "Missing",
  },
  {
    label: "Focus order",
    value: "source order does not match task order",
    status: "Weak",
  },
  {
    label: "Relationships",
    value: "appointment/action connection inferred visually",
    status: "Missing",
  },
];

export default function AccessibilityView({
  model,
  sourceMode,
}: AccessibilityViewProps) {
  void model;

  const isSemantic = sourceMode === "semantic";
  const rows = isSemantic ? semanticRows : nonSemanticRows;
  const score = isSemantic ? 90 : 46;

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <header className="mb-4 border-b border-zinc-100 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-zinc-950">
              Accessibility View
            </h2>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              Meaning Preservation Estimate
            </p>
          </div>

          <div className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700">
            {score}%
          </div>
        </div>

        <p className="mt-3 text-sm leading-6 text-zinc-600">
          {isSemantic
            ? "Assistive technology can understand structure, labels, order, and task relationships."
            : "Assistive technology receives text, but much of the structure and task meaning is unavailable."}
        </p>
      </header>

      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-xl border border-zinc-100 bg-zinc-50 p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                  {row.label}
                </p>
                <p className="mt-1 text-sm leading-5 text-zinc-800">
                  {row.value}
                </p>
              </div>

              <span className="shrink-0 rounded-full border border-zinc-200 bg-white px-2 py-1 text-[11px] font-medium text-zinc-600">
                {row.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}