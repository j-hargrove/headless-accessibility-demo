"use client";

import { useEffect } from "react";

type Tone = "strong" | "mixed" | "weak" | "neutral";

function getScoreTone(score: number): Tone {
  if (score >= 85) return "strong";
  if (score >= 60) return "mixed";
  return "weak";
}

function getStatusTone(text: string): Tone {
  const value = text.trim().toLowerCase();

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

function getToneStyles(tone: Tone): Partial<CSSStyleDeclaration> {
  if (tone === "strong") {
    return {
      borderColor: "rgb(110 231 183)",
      backgroundColor: "rgb(236 253 245)",
      color: "rgb(6 95 70)",
    };
  }

  if (tone === "mixed") {
    return {
      borderColor: "rgb(252 211 77)",
      backgroundColor: "rgb(255 251 235)",
      color: "rgb(146 64 14)",
    };
  }

  if (tone === "weak") {
    return {
      borderColor: "rgb(253 164 175)",
      backgroundColor: "rgb(255 241 242)",
      color: "rgb(159 18 57)",
    };
  }

  return {
    borderColor: "rgb(212 212 216)",
    backgroundColor: "rgb(250 250 250)",
    color: "rgb(63 63 70)",
  };
}

function applySignalStyle(element: HTMLElement, tone: Tone) {
  const styles = getToneStyles(tone);

  element.style.display = "inline-flex";
  element.style.alignItems = "center";
  element.style.flexShrink = "0";
  element.style.borderRadius = "9999px";
  element.style.borderWidth = "1px";
  element.style.borderStyle = "solid";
  element.style.padding = "0.25rem 0.75rem";
  element.style.fontSize = "0.75rem";
  element.style.lineHeight = "1rem";
  element.style.fontWeight = "600";

  element.style.borderColor = styles.borderColor ?? "";
  element.style.backgroundColor = styles.backgroundColor ?? "";
  element.style.color = styles.color ?? "";
}

export default function ColorSignalNormalizer() {
  useEffect(() => {
    const candidates = Array.from(
      document.querySelectorAll<HTMLElement>("span, div")
    );

    candidates.forEach((element) => {
      const text = element.textContent?.trim() ?? "";

      if (!text) return;

      const isScore = /^\d{1,3}%$/.test(text);
      const statusTone = getStatusTone(text);

      if (!isScore && statusTone === "neutral") return;

      const tone = isScore
        ? getScoreTone(Number.parseInt(text.replace("%", ""), 10))
        : statusTone;

      applySignalStyle(element, tone);
    });
  }, []);

  return null;
}
