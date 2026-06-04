import {
  getFidelityScore,
  getFidelityTone,
  type InterpreterKey,
  type MeaningMode,
  type MeaningModel,
} from "@/app/data/meaningModel";

type FidelityScoreBadgeProps = {
  interpreter: InterpreterKey;
  model: MeaningModel;
  meaningMode: MeaningMode;
};

export default function FidelityScoreBadge({
  interpreter,
  model,
  meaningMode,
}: FidelityScoreBadgeProps) {
  const score = getFidelityScore(interpreter, model, meaningMode);
  const tone = getFidelityTone(score);

  return (
    <div className={`fidelity-score-badge ${tone}`}>
      <span className="fidelity-score-label">Fidelity</span>
      <strong className="fidelity-score-value">{score}%</strong>
    </div>
  );
}