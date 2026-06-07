import { type MeaningSource } from "@/app/data/meaningModel";

type FidelityTone = "strong" | "mixed" | "weak";

type FidelityScoreBadgeProps = {
  interpreter: string;
  model: MeaningSource;
  meaningMode?: string;
};

function getMeaningPreservationScore(
  interpreter: string,
  model: MeaningSource
): number {
  const fidelity = model.fidelity as Record<string, number | undefined>;
  const score = fidelity?.[interpreter];

  if (typeof score !== "number") {
    return 0;
  }

  return score;
}

function getMeaningPreservationTone(score: number): FidelityTone {
  if (score >= 85) {
    return "strong";
  }

  if (score >= 60) {
    return "mixed";
  }

  return "weak";
}

export default function FidelityScoreBadge({
  interpreter,
  model,
}: FidelityScoreBadgeProps) {
  const score = getMeaningPreservationScore(interpreter, model);
  const tone = getMeaningPreservationTone(score);

  return (
    <div className={`fidelity-score-badge ${tone}`}>
      <span className="fidelity-score-label">Meaning Preservation</span>
      <strong className="fidelity-score-value">{score}%</strong>
    </div>
  );
}
