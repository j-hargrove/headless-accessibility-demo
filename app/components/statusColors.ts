export type SignalTone = "strong" | "mixed" | "weak" | "neutral";

export function getScoreTone(score: number): SignalTone {
  if (score >= 85) return "strong";
  if (score >= 60) return "mixed";
  return "weak";
}

export function getStatusTone(status: string): SignalTone {
  const value = status.trim().toLowerCase();

  const strongStatuses = [
    "preserved",
    "high confidence",
    "identified",
    "actionable",
    "mapped",
    "clear",
    "encoded",
    "available",
    "understood",
    "strong",
    "high",
  ];

  const mixedStatuses = [
    "limited",
    "partial",
    "mixed",
    "inferred",
    "ambiguous",
    "degraded",
    "moderate",
  ];

  const weakStatuses = [
    "weak",
    "unclear",
    "missing",
    "lost",
    "low",
    "absent",
    "not available",
    "not mapped",
  ];

  if (strongStatuses.includes(value)) return "strong";
  if (mixedStatuses.includes(value)) return "mixed";
  if (weakStatuses.includes(value)) return "weak";

  return "neutral";
}

export function getToneClasses(tone: SignalTone): string {
  if (tone === "strong") {
    return "border-emerald-300 bg-emerald-50 text-emerald-800";
  }

  if (tone === "mixed") {
    return "border-amber-300 bg-amber-50 text-amber-800";
  }

  if (tone === "weak") {
    return "border-rose-300 bg-rose-50 text-rose-800";
  }

  return "border-zinc-300 bg-zinc-50 text-zinc-700";
}

export function getScoreClasses(score: number): string {
  return getToneClasses(getScoreTone(score));
}

export function getStatusClasses(status: string): string {
  return getToneClasses(getStatusTone(status));
}
