export type SourceMode = "semantic" | "nonSemantic";

export type MeaningSignal = {
  id: string;
  label: string;
  type: "heading" | "label" | "role" | "relationship" | "action" | "state" | "context";
  strength: "strong" | "partial" | "missing";
  description: string;
};

export type ProductEntity = {
  id: string;
  label: string;
  type: string;
  description: string;
};

export type ProductAction = {
  id: string;
  label: string;
  target: string;
  description: string;
  available: boolean;
};

export type ProductRelationship = {
  from: string;
  relation: string;
  to: string;
};

export type InterpreterMeaningPreservation = {
  visual: number;
  human?: number;
  accessibility: number;
  agent: number;
  headless: number;
};

export type MeaningSource = {
  mode: SourceMode;
  title: string;
  description: string;
  sourceSummary: string;
  intent: string;
  context: string;
  scenario: {
    appointmentType: string;
    careTeam: string;
    reason: string;
    primaryTask: string;
  };
  entities: ProductEntity[];
  actions: ProductAction[];
  relationships: ProductRelationship[];
  signals: MeaningSignal[];
  missingContext: string[];
  fidelity: InterpreterMeaningPreservation;
};

export const semanticSource: MeaningSource = {
  mode: "semantic",
  title: "Semantic Source",
  description:
    "Meaning is expressed through explicit structure: headings, labels, roles, relationships, and available actions.",
  sourceSummary:
    "This source exposes the product intent directly. Interpreters do not have to infer meaning from layout alone.",
  intent: "Help a patient review a follow-up appointment for lab result discussion.",
  context: "Healthcare appointment summary",
  scenario: {
    appointmentType: "Follow-up visit",
    careTeam: "Primary care",
    reason: "Lab result review",
    primaryTask: "Confirm appointment details and prepare for the visit",
  },
  entities: [
    {
      id: "appointment",
      label: "Appointment",
      type: "event",
      description: "A scheduled follow-up visit with a care team.",
    },
    {
      id: "careTeam",
      label: "Primary care",
      type: "team",
      description: "The clinical team responsible for the appointment.",
    },
    {
      id: "reason",
      label: "Lab result review",
      type: "clinical-context",
      description: "The reason the patient is being seen.",
    },
    {
      id: "preparation",
      label: "Visit preparation",
      type: "task-support",
      description: "Guidance that helps the patient arrive ready for the appointment.",
    },
  ],
  actions: [
    {
      id: "confirmAppointment",
      label: "Confirm appointment",
      target: "appointment",
      description: "Confirm that the patient will attend the visit.",
      available: true,
    },
    {
      id: "reviewLabResults",
      label: "Review lab results",
      target: "reason",
      description: "Open related lab results before the visit.",
      available: true,
    },
    {
      id: "messageCareTeam",
      label: "Message care team",
      target: "careTeam",
      description: "Ask the primary care team a question before the appointment.",
      available: true,
    },
  ],
  relationships: [
    {
      from: "appointment",
      relation: "hasReason",
      to: "reason",
    },
    {
      from: "appointment",
      relation: "managedBy",
      to: "careTeam",
    },
    {
      from: "preparation",
      relation: "supports",
      to: "appointment",
    },
  ],
  signals: [
    {
      id: "page-heading",
      label: "Page heading",
      type: "heading",
      strength: "strong",
      description: "The page has a clear heading that describes the appointment summary.",
    },
    {
      id: "appointment-label",
      label: "Appointment type label",
      type: "label",
      strength: "strong",
      description: "The appointment type is explicitly labeled as a follow-up visit.",
    },
    {
      id: "care-team-label",
      label: "Care team label",
      type: "label",
      strength: "strong",
      description: "The responsible care team is explicitly identified.",
    },
    {
      id: "reason-relationship",
      label: "Reason relationship",
      type: "relationship",
      strength: "strong",
      description: "The reason is structurally connected to the appointment.",
    },
    {
      id: "available-actions",
      label: "Available actions",
      type: "action",
      strength: "strong",
      description: "Actions are named, discoverable, and connected to their targets.",
    },
  ],
  missingContext: ["Exact appointment time", "Clinician name", "Lab result severity"],
  fidelity: {
    visual: 95,
    accessibility: 90,
    agent: 84,
    headless: 92,
  },
};

export const nonSemanticSource: MeaningSource = {
  mode: "nonSemantic",
  title: "Non-Semantic Source",
  description:
    "Meaning is mostly trapped in visual presentation. Interpreters must infer purpose from layout, proximity, and styling.",
  sourceSummary:
    "This source may look usable to a sighted human, but much of the meaning is not explicitly available underneath the interface.",
  intent: "A patient-facing appointment card appears to show visit information, but the structure does not expose the intent clearly.",
  context: "Healthcare appointment summary with weak structure",
  scenario: {
    appointmentType: "Follow-up visit",
    careTeam: "Primary care",
    reason: "Lab result review",
    primaryTask: "Infer what this card is for and decide what to do next",
  },
  entities: [
    {
      id: "visualCard",
      label: "Visual card",
      type: "presentation",
      description: "A styled container that visually groups appointment content.",
    },
    {
      id: "textBlocks",
      label: "Text blocks",
      type: "presentation",
      description: "Unlabeled text that depends on visual proximity for meaning.",
    },
    {
      id: "buttons",
      label: "Buttons",
      type: "generic-controls",
      description: "Controls that may not expose clear purpose or target.",
    },
  ],
  actions: [
    {
      id: "primaryButton",
      label: "Continue",
      target: "unknown",
      description: "A generic action with an unclear target.",
      available: true,
    },
    {
      id: "secondaryButton",
      label: "Details",
      target: "unknown",
      description: "A secondary action that does not clearly identify what details will open.",
      available: true,
    },
  ],
  relationships: [
    {
      from: "textBlocks",
      relation: "visuallyNear",
      to: "visualCard",
    },
    {
      from: "buttons",
      relation: "visuallyInside",
      to: "visualCard",
    },
  ],
  signals: [
    {
      id: "page-heading",
      label: "Page heading",
      type: "heading",
      strength: "partial",
      description: "The page may appear to have a heading, but the structure does not clearly expose it.",
    },
    {
      id: "appointment-label",
      label: "Appointment type label",
      type: "label",
      strength: "missing",
      description: "The appointment type is present as text but not explicitly labeled.",
    },
    {
      id: "care-team-label",
      label: "Care team label",
      type: "label",
      strength: "missing",
      description: "The care team is visible but not structurally identified.",
    },
    {
      id: "reason-relationship",
      label: "Reason relationship",
      type: "relationship",
      strength: "missing",
      description: "The reason is visually nearby but not structurally connected to the appointment.",
    },
    {
      id: "available-actions",
      label: "Available actions",
      type: "action",
      strength: "partial",
      description: "Actions exist, but their purpose and target are ambiguous.",
    },
  ],
  missingContext: [
    "What the page is for",
    "Which text describes the appointment",
    "Which action is primary",
    "What each button affects",
    "How the reason relates to the visit",
  ],
  fidelity: {
    visual: 86,
    accessibility: 46,
    agent: 52,
    headless: 34,
  },
};

export const meaningSources: Record<SourceMode, MeaningSource> = {
  semantic: semanticSource,
  nonSemantic: nonSemanticSource,
};

export function getMeaningSource(mode: SourceMode): MeaningSource {
  if (mode === "semantic") {
    return semanticSource;
  }

  if (mode === "nonSemantic") {
    return nonSemanticSource;
  }

  return semanticSource;
}