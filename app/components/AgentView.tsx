import { MeaningSource } from "@/app/data/meaningModel";

type AgentViewProps = {
  model: MeaningSource;
  sourceMode: "semantic" | "nonSemantic";
};

const semanticFindings = [
  {
    label: "Detected intent",
    value: "Review a follow-up appointment and prepare for next action.",
    status: "High confidence",
  },
  {
    label: "Primary entity",
    value: "Follow-up visit connected to lab result review.",
    status: "Identified",
  },
  {
    label: "Available actions",
    value: "Confirm appointment, review details, contact care team.",
    status: "Actionable",
  },
  {
    label: "Relationships",
    value: "Appointment type, reason, and care team are explicitly connected.",
    status: "Mapped",
  },
  {
    label: "Missing context",
    value: "User preference and appointment history are not included.",
    status: "Limited",
  },
];

const nonSemanticFindings = [
  {
    label: "Detected intent",
    value: "Likely appointment-related content, inferred from nearby text.",
    status: "Medium confidence",
  },
  {
    label: "Primary entity",
    value: "Possible visit or medical task, but source does not define it.",
    status: "Ambiguous",
  },
  {
    label: "Available actions",
    value: "Buttons exist, but targets and task outcomes are unclear.",
    status: "Uncertain",
  },
  {
    label: "Relationships",
    value: "Text proximity suggests meaning, but relationships are not encoded.",
    status: "Missing",
  },
  {
    label: "Missing context",
    value: "Role, labels, hierarchy, and action targets require guessing.",
    status: "High risk",
  },
];

export default function AgentView({ model, sourceMode }: AgentViewProps) {
  void model;

  const isSemantic = sourceMode === "semantic";
  const findings = isSemantic ? semanticFindings : nonSemanticFindings;
  const score = isSemantic ? 84 : 52;

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <header className="mb-4 border-b border-zinc-100 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-zinc-950">
              Agent View
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
            ? "The agent can extract intent, entities, actions, and relationships from the source."
            : "The agent can infer some meaning from text, but must guess relationships and action targets."}
        </p>
      </header>

      <div className="space-y-2">
        {findings.map((finding) => (
          <div
            key={finding.label}
            className="rounded-xl border border-zinc-100 bg-zinc-50 p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                  {finding.label}
                </p>
                <p className="mt-1 text-sm leading-5 text-zinc-800">
                  {finding.value}
                </p>
              </div>

              <span className="shrink-0 rounded-full border border-zinc-200 bg-white px-2 py-1 text-[11px] font-medium text-zinc-600">
                {finding.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}