import type { MeaningReportItem } from "@/app/components/MeaningToolbar";

export type ScenarioId = "export-report" | "schedule-follow-up" | "approve-access";
export type MeaningMode = "semantic" | "non-semantic";
export type InterpreterKey = "human" | "accessibility" | "agent" | "headless";

export type MeaningModel = {
  id: ScenarioId;
  label: string;
  userGoal: string;
  primaryAction: {
    label: string;
    intent: string;
  };
  systemState: {
    status: string;
    message: string;
  };
  requiredInformation: string[];
  riskWarning: {
    severity: "low" | "medium" | "high";
    message: string;
  };
};

export type InterpreterReports = {
  human: MeaningReportItem[];
  accessibility: MeaningReportItem[];
  agent: MeaningReportItem[];
  headless: MeaningReportItem[];
};

export const scenarios: MeaningModel[] = [
  {
    id: "export-report",
    label: "Export Report",
    userGoal: "Export the completed monthly accessibility report for compliance review.",
    primaryAction: {
      label: "Export Report",
      intent:
        "Generate and download the finalized accessibility report for the selected month.",
    },
    systemState: {
      status: "ready",
      message:
        "The report is complete and ready to export. No unresolved accessibility checks remain.",
    },
    requiredInformation: [
      "Selected report period: May 2026",
      "Report type: Accessibility Compliance",
      "Format: PDF",
      "Destination: Local download",
    ],
    riskWarning: {
      severity: "medium",
      message:
        "Exporting the wrong report period may create a compliance mismatch.",
    },
  },
  {
    id: "schedule-follow-up",
    label: "Schedule Follow-up",
    userGoal:
      "Schedule a follow-up appointment to review lab results with the primary care team.",
    primaryAction: {
      label: "Schedule Appointment",
      intent: "Book the next available follow-up visit for lab result review.",
    },
    systemState: {
      status: "available",
      message:
        "Follow-up appointment slots are available with the primary care team.",
    },
    requiredInformation: [
      "Appointment type: Follow-up visit",
      "Care team: Primary care",
      "Reason: Lab result review",
      "Preferred format: In-person or telehealth",
    ],
    riskWarning: {
      severity: "medium",
      message:
        "Scheduling the wrong appointment type may delay review of the lab results.",
    },
  },
  {
    id: "approve-access",
    label: "Approve Access",
    userGoal:
      "Approve temporary account access for a contractor working on the analytics dashboard.",
    primaryAction: {
      label: "Approve Temporary Access",
      intent:
        "Grant limited-time access to the analytics dashboard for the selected contractor.",
    },
    systemState: {
      status: "pending approval",
      message:
        "The access request is waiting for approval and includes a defined expiration date.",
    },
    requiredInformation: [
      "Requester: Contractor",
      "System: Analytics dashboard",
      "Access level: View only",
      "Expiration: 7 days",
    ],
    riskWarning: {
      severity: "high",
      message:
        "Approving access without checking scope and expiration may expose sensitive analytics data.",
    },
  },
];

export const meaningModel: MeaningModel = scenarios[0];

function getSemanticReports(model: MeaningModel): InterpreterReports {
  if (model.id === "export-report") {
    return {
      human: [
        { label: "Context", value: "Clear", status: "strong" },
        { label: "Intent", value: "Visible", status: "strong" },
        { label: "Next step", value: "Available", status: "strong" },
        { label: "Risk", value: "Visible", status: "strong" },
        { label: "Meaning", value: "High", status: "strong" },
      ],
      accessibility: [
        { label: "Context", value: "Present", status: "strong" },
        { label: "Intent", value: "Named", status: "strong" },
        { label: "Next step", value: "Available", status: "strong" },
        { label: "Risk", value: "Announced", status: "partial" },
        { label: "Meaning", value: "Strong", status: "strong" },
      ],
      agent: [
        { label: "Context", value: "Partial", status: "partial" },
        { label: "Intent", value: "Inferred", status: "partial" },
        { label: "Next step", value: "Likely", status: "partial" },
        { label: "Risk", value: "Detected", status: "risk" },
        { label: "Meaning", value: "Partial", status: "partial" },
      ],
      headless: [
        { label: "Context", value: "Encoded", status: "raw" },
        { label: "Intent", value: "Explicit", status: "raw" },
        { label: "Next step", value: "Mapped", status: "raw" },
        { label: "Risk", value: "Encoded", status: "raw" },
        { label: "Meaning", value: "Exposed", status: "raw" },
      ],
    };
  }

  if (model.id === "schedule-follow-up") {
    return {
      human: [
        { label: "Context", value: "Clear", status: "strong" },
        { label: "Intent", value: "Visible", status: "strong" },
        { label: "Next step", value: "Book", status: "strong" },
        { label: "Risk", value: "Moderate", status: "risk" },
        { label: "Meaning", value: "High", status: "strong" },
      ],
      accessibility: [
        { label: "Context", value: "Present", status: "strong" },
        { label: "Intent", value: "Named", status: "strong" },
        { label: "Next step", value: "Actionable", status: "strong" },
        { label: "Risk", value: "Partial", status: "partial" },
        { label: "Meaning", value: "Strong", status: "strong" },
      ],
      agent: [
        { label: "Context", value: "Medical", status: "partial" },
        { label: "Intent", value: "Inferred", status: "partial" },
        { label: "Next step", value: "Schedule", status: "partial" },
        { label: "Risk", value: "Needs Type", status: "risk" },
        { label: "Meaning", value: "Partial", status: "partial" },
      ],
      headless: [
        { label: "Context", value: "Encoded", status: "raw" },
        { label: "Intent", value: "Explicit", status: "raw" },
        { label: "Next step", value: "Mapped", status: "raw" },
        { label: "Risk", value: "Encoded", status: "raw" },
        { label: "Meaning", value: "Exposed", status: "raw" },
      ],
    };
  }

  return {
    human: [
      { label: "Context", value: "Sensitive", status: "risk" },
      { label: "Intent", value: "Visible", status: "strong" },
      { label: "Next step", value: "Approve", status: "strong" },
      { label: "Risk", value: "High", status: "risk" },
      { label: "Meaning", value: "Caution", status: "risk" },
    ],
    accessibility: [
      { label: "Context", value: "Present", status: "strong" },
      { label: "Intent", value: "Named", status: "strong" },
      { label: "Next step", value: "Available", status: "partial" },
      { label: "Risk", value: "High", status: "risk" },
      { label: "Meaning", value: "Partial", status: "partial" },
    ],
    agent: [
      { label: "Context", value: "Security", status: "partial" },
      { label: "Intent", value: "Inferred", status: "partial" },
      { label: "Next step", value: "Verify", status: "risk" },
      { label: "Risk", value: "High", status: "risk" },
      { label: "Meaning", value: "Risky", status: "risk" },
    ],
    headless: [
      { label: "Context", value: "Encoded", status: "raw" },
      { label: "Intent", value: "Explicit", status: "raw" },
      { label: "Next step", value: "Gated", status: "raw" },
      { label: "Risk", value: "Encoded", status: "raw" },
      { label: "Meaning", value: "Exposed", status: "raw" },
    ],
  };
}

function getNonSemanticReports(model: MeaningModel): InterpreterReports {
  if (model.id === "export-report") {
    return {
      human: [
        { label: "Context", value: "Weak", status: "partial" },
        { label: "Intent", value: "Guess", status: "partial" },
        { label: "Next step", value: "Visible", status: "partial" },
        { label: "Risk", value: "Easy to miss", status: "risk" },
        { label: "Meaning", value: "Reduced", status: "risk" },
      ],
      accessibility: [
        { label: "Context", value: "Sparse", status: "partial" },
        { label: "Intent", value: "Unclear", status: "risk" },
        { label: "Next step", value: "Partial", status: "partial" },
        { label: "Risk", value: "Weak", status: "risk" },
        { label: "Meaning", value: "Reduced", status: "risk" },
      ],
      agent: [
        { label: "Context", value: "Low", status: "risk" },
        { label: "Intent", value: "Ambiguous", status: "risk" },
        { label: "Next step", value: "Guess", status: "risk" },
        { label: "Risk", value: "Under-read", status: "risk" },
        { label: "Meaning", value: "Low", status: "risk" },
      ],
      headless: [
        { label: "Context", value: "Missing", status: "risk" },
        { label: "Intent", value: "Missing", status: "risk" },
        { label: "Next step", value: "Unmapped", status: "risk" },
        { label: "Risk", value: "Missing", status: "risk" },
        { label: "Meaning", value: "Collapsed", status: "risk" },
      ],
    };
  }

  if (model.id === "schedule-follow-up") {
    return {
      human: [
        { label: "Context", value: "Somewhat clear", status: "partial" },
        { label: "Intent", value: "Guess", status: "partial" },
        { label: "Next step", value: "Clickable", status: "partial" },
        { label: "Risk", value: "Easy to miss", status: "risk" },
        { label: "Meaning", value: "Reduced", status: "risk" },
      ],
      accessibility: [
        { label: "Context", value: "Sparse", status: "partial" },
        { label: "Intent", value: "Unclear", status: "risk" },
        { label: "Next step", value: "Partial", status: "partial" },
        { label: "Risk", value: "Weak", status: "risk" },
        { label: "Meaning", value: "Reduced", status: "risk" },
      ],
      agent: [
        { label: "Context", value: "Low", status: "risk" },
        { label: "Intent", value: "Ambiguous", status: "risk" },
        { label: "Next step", value: "Guess", status: "risk" },
        { label: "Risk", value: "Type unclear", status: "risk" },
        { label: "Meaning", value: "Low", status: "risk" },
      ],
      headless: [
        { label: "Context", value: "Missing", status: "risk" },
        { label: "Intent", value: "Missing", status: "risk" },
        { label: "Next step", value: "Unmapped", status: "risk" },
        { label: "Risk", value: "Missing", status: "risk" },
        { label: "Meaning", value: "Collapsed", status: "risk" },
      ],
    };
  }

  return {
    human: [
      { label: "Context", value: "Unstable", status: "risk" },
      { label: "Intent", value: "Guess", status: "partial" },
      { label: "Next step", value: "Visible", status: "partial" },
      { label: "Risk", value: "High", status: "risk" },
      { label: "Meaning", value: "Reduced", status: "risk" },
    ],
    accessibility: [
      { label: "Context", value: "Sparse", status: "partial" },
      { label: "Intent", value: "Weak", status: "risk" },
      { label: "Next step", value: "Partial", status: "partial" },
      { label: "Risk", value: "High", status: "risk" },
      { label: "Meaning", value: "Reduced", status: "risk" },
    ],
    agent: [
      { label: "Context", value: "Low", status: "risk" },
      { label: "Intent", value: "Ambiguous", status: "risk" },
      { label: "Next step", value: "Verify", status: "risk" },
      { label: "Risk", value: "High", status: "risk" },
      { label: "Meaning", value: "Low", status: "risk" },
    ],
    headless: [
      { label: "Context", value: "Missing", status: "risk" },
      { label: "Intent", value: "Missing", status: "risk" },
      { label: "Next step", value: "Unmapped", status: "risk" },
      { label: "Risk", value: "Missing", status: "risk" },
      { label: "Meaning", value: "Collapsed", status: "risk" },
    ],
  };
}

export function getInterpreterReports(
  model: MeaningModel,
  meaningMode: MeaningMode = "semantic",
): InterpreterReports {
  return meaningMode === "semantic"
    ? getSemanticReports(model)
    : getNonSemanticReports(model);
}

export function getFidelityScore(
  interpreter: InterpreterKey,
  model: MeaningModel,
  meaningMode: MeaningMode = "semantic",
): number {
  if (meaningMode === "semantic") {
    if (interpreter === "human") return model.id === "approve-access" ? 92 : 96;
    if (interpreter === "accessibility") return model.id === "approve-access" ? 84 : 89;
    if (interpreter === "agent") return model.id === "approve-access" ? 68 : 74;
    return 100;
  }

  if (interpreter === "human") return model.id === "approve-access" ? 61 : 66;
  if (interpreter === "accessibility") return model.id === "approve-access" ? 46 : 52;
  if (interpreter === "agent") return model.id === "approve-access" ? 31 : 38;
  return 12;
}

export function getFidelityTone(score: number): "high" | "medium" | "low" {
  if (score >= 85) return "high";
  if (score >= 60) return "medium";
  return "low";
}