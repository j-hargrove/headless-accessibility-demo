export function getStatusLabel(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (
    normalizedStatus.includes("preserved") ||
    normalizedStatus.includes("survives") ||
    normalizedStatus.includes("complete") ||
    normalizedStatus.includes("clear")
  ) {
    return "signal";
  }

  if (
    normalizedStatus.includes("lost") ||
    normalizedStatus.includes("missing") ||
    normalizedStatus.includes("absent")
  ) {
    return "loss";
  }

  if (
    normalizedStatus.includes("degraded") ||
    normalizedStatus.includes("fragile") ||
    normalizedStatus.includes("unclear") ||
    normalizedStatus.includes("risk")
  ) {
    return "risk";
  }

  if (
    normalizedStatus.includes("semantic") ||
    normalizedStatus.includes("structure") ||
    normalizedStatus.includes("heading") ||
    normalizedStatus.includes("label") ||
    normalizedStatus.includes("role")
  ) {
    return "structure";
  }

  return "status";
}

export function getStatusClasses(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (
    normalizedStatus.includes("preserved") ||
    normalizedStatus.includes("survives") ||
    normalizedStatus.includes("complete") ||
    normalizedStatus.includes("clear")
  ) {
    return "border-l-emerald-500";
  }

  if (
    normalizedStatus.includes("lost") ||
    normalizedStatus.includes("missing") ||
    normalizedStatus.includes("absent")
  ) {
    return "border-l-red-500";
  }

  if (
    normalizedStatus.includes("degraded") ||
    normalizedStatus.includes("fragile") ||
    normalizedStatus.includes("unclear") ||
    normalizedStatus.includes("risk")
  ) {
    return "border-l-orange-500";
  }

  if (
    normalizedStatus.includes("semantic") ||
    normalizedStatus.includes("structure") ||
    normalizedStatus.includes("heading") ||
    normalizedStatus.includes("label") ||
    normalizedStatus.includes("role")
  ) {
    return "border-l-cyan-500";
  }

  return "border-l-slate-400";
}

export function getScoreClasses(score: number) {
  if (score >= 85) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (score >= 65) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-red-200 bg-red-50 text-red-700";
}