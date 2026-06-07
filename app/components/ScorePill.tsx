import { getScoreClasses } from "./statusColors";

type ScorePillProps = {
  score: number;
  label?: string;
};

export default function ScorePill({ score, label }: ScorePillProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold ${getScoreClasses(
        score
      )}`}
      aria-label={label ? `${label}: ${score}%` : `${score}%`}
    >
      {score}%
    </span>
  );
}
