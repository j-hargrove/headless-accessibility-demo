import { MeaningSource, semanticSource } from "@/app/data/meaningModel";

type HeadlessViewProps = {
  source?: MeaningSource;
};

export default function HeadlessView({
  source = semanticSource,
}: HeadlessViewProps) {
  const isSemantic = source.mode === "semantic";

  const semanticHeadlessOutput = {
    source: "semantic",
    interpretation: "structured meaning preserved",
    extractedMeaning: {
      appointmentType: source.scenario.appointmentType,
      careTeam: source.scenario.careTeam,
      reason: source.scenario.reason,
      primaryTask: source.scenario.primaryTask,
    },
    relationships: [
      "appointment type → follow-up visit",
      "care team → primary care",
      "reason → lab result review",
      "primary action → confirm appointment",
    ],
    availableActions: [
      {
        label: "Confirm appointment",
        target: "follow-up visit",
        outcome: "appointment confirmation",
      },
      {
        label: "Contact care team",
        target: "primary care",
        outcome: "care-team communication",
      },
    ],
    missingMeaning: [],
    fidelity: source.fidelity.headless,
  };

  const nonSemanticHeadlessOutput = {
    source: "nonSemantic",
    interpretation: "weak meaning extraction",
    extractedText: [
      "Appointment Summary",
      "Follow-up visit",
      "Primary care",
      "Lab result review",
      "Confirm",
      "Contact",
    ],
    inferredMeaning: {
      possibleTopic: "appointment or care task",
      possibleAction: "confirmation or contact",
      confidence: "low",
    },
    missingMeaning: [
      "programmatic heading hierarchy",
      "explicit labels",
      "action targets",
      "field relationships",
      "task outcome",
    ],
    relationships: [],
    availableActions: [
      {
        label: "Confirm",
        target: "unknown",
        outcome: "unknown",
      },
      {
        label: "Contact",
        target: "unknown",
        outcome: "unknown",
      },
    ],
    fidelity: source.fidelity.headless,
  };

  const headlessOutput = isSemantic
    ? semanticHeadlessOutput
    : nonSemanticHeadlessOutput;

  return (
    <article className="rounded-2xl border border-zinc-900 bg-zinc-950 p-4 text-white shadow-sm">
      <header className="mb-4 border-b border-zinc-800 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-white">
              Headless View
            </h2>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              Meaning Preservation Estimate
            </p>
          </div>

          <div className="rounded-full border border-zinc-700 bg-white px-3 py-1 text-xs font-semibold text-zinc-950">
            {source.fidelity.headless}%
          </div>
        </div>

        <p className="mt-3 text-sm leading-6 text-zinc-300">
          {isSemantic
            ? "Structured meaning remains available without relying on visual presentation."
            : "Text remains available, but relationships, targets, and task meaning collapse."}
        </p>
      </header>

      <pre className="max-h-[360px] overflow-auto rounded-xl border border-zinc-800 bg-black p-3 text-xs leading-5 text-emerald-200">
        {JSON.stringify(headlessOutput, null, 2)}
      </pre>

      <p className="mt-3 text-xs leading-5 text-zinc-500">
        Headless View exposes what machines can recover from the source without
        using the visual interface as a crutch.
      </p>
    </article>
  );
}