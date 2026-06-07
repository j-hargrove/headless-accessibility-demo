import { type MeaningSource } from "@/app/data/meaningModel";
import ScorePill from "./ScorePill";

type FidelityScoreBadgeProps = {
  interpreter: string;
  model: MeaningSource;
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

export default function FidelityScoreBadge({
  interpreter,
  model,
}: FidelityScoreBadgeProps) {
  const score = getMeaningPreservationScore(interpreter, model);

  return <ScorePill score={score} label={`${interpreter} meaning preservation`} />;
}
