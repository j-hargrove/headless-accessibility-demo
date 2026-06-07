import {
  getMeaning PreservationScore,
  getMeaning PreservationTone,
  type InterpreterKey,
  type MeaningMode,
  type MeaningModel,
} from "@/app/data/meaningModel";

type Meaning PreservationScoreBadgeProps = {
  interpreter: InterpreterKey;
  model: MeaningModel;
  meaningMode: MeaningMode;
};

export default function Meaning PreservationScoreBadge({
  interpreter,
  model,
  meaningMode,
}: Meaning PreservationScoreBadgeProps) {
  const score = getMeaning PreservationScore(interpreter, model, meaningMode);
  const tone = getMeaning PreservationTone(score);

  return (
    <div className={`fidelity-score-badge ${tone}`}>
      <span className="fidelity-score-label">Meaning Preservation</span>
      <strong className="fidelity-score-value">{score}%</strong>
    </div>
  );
}