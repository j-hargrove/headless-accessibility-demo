import { type MeaningSource, semanticSource } from "@/app/data/meaningModel";

type InterpretationFidelityPanelProps = {
  meaningModel?: MeaningSource;
  model?: MeaningSource;
  selectedMeaningSource?: MeaningSource;
  source?: MeaningSource;
};

export default function InterpretationFidelityPanel({
  meaningModel,
  model,
  selectedMeaningSource,
  source,
}: InterpretationFidelityPanelProps) {
  const data =
    source ?? selectedMeaningSource ?? meaningModel ?? model ?? semanticSource;

  const fidelity = data.fidelity;

  const scores = [
    { label: "Visual", value: fidelity.visual },
    { label: "Accessibility", value: fidelity.accessibility },
    { label: "Agent", value: fidelity.agent },
    { label: "Headless", value: fidelity.headless },
  ];

  const average = Math.round(
    scores.reduce((total, item) => total + item.value, 0) / scores.length
  );

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Interpretation Fidelity
          </p>
          <h2 className="mt-1 text-lg font-semibold text-zinc-950">
            Did the meaning survive?
          </h2>
        </div>

        <div className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700">
          {average}% average
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {scores.map((score) => (
          <div
            key={score.label}
            className="rounded-xl border border-zinc-200 bg-zinc-50 p-3"
          >
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              {score.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-zinc-950">
              {score.value}%
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
