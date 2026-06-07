import { MeaningModel } from "@/app/data/meaningModel";
import styles from "./InterpretationMeaning PreservationPanel.module.css";

type InterpretationMeaning PreservationPanelProps = {
  meaningModel?: MeaningModel;
  model?: MeaningModel;
  selectedMeaningModel?: MeaningModel;
};

type RiskWarning = {
  severity?: string;
  message?: string;
};

type PrimaryAction = {
  label?: string;
  intent?: string;
};

type SystemState = {
  status?: string;
  message?: string;
};

type LooseMeaningModel = Partial<MeaningModel> & {
  userGoal?: string;
  primaryAction?: PrimaryAction;
  systemState?: SystemState;
  riskWarning?: RiskWarning;
};

type Meaning PreservationStatus = "preserved" | "partial" | "lost";

function firstText(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  return "";
}

function getRiskLevel(severity?: string): Meaning PreservationStatus {
  const normalizedSeverity = severity?.toLowerCase();

  if (normalizedSeverity === "high" || normalizedSeverity === "danger") {
    return "lost";
  }

  if (normalizedSeverity === "medium" || normalizedSeverity === "warning") {
    return "partial";
  }

  return "preserved";
}

function getStatusLabel(status: Meaning PreservationStatus): string {
  if (status === "preserved") {
    return "Preserved";
  }

  if (status === "partial") {
    return "Partial";
  }

  return "At risk";
}

export default function InterpretationMeaning PreservationPanel({
  meaningModel,
  model,
  selectedMeaningModel,
}: InterpretationMeaning PreservationPanelProps) {
  const data = (meaningModel ?? model ?? selectedMeaningModel ?? {}) as LooseMeaningModel;

  const userGoal = firstText(data.userGoal) || "No user goal exposed.";

  const primaryAction =
    firstText(data.primaryAction?.label) || "No primary action exposed.";

  const primaryIntent =
    firstText(data.primaryAction?.intent) || "No action intent exposed.";

  const systemStatus = firstText(data.systemState?.status) || "Unknown";

  const systemMessage =
    firstText(data.systemState?.message) || "No system state message exposed.";

  const riskSeverity = firstText(data.riskWarning?.severity) || "none";

  const riskMessage =
    firstText(data.riskWarning?.message) || "No risk warning exposed.";

  const riskLevel = getRiskLevel(riskSeverity);

  return (
    <section className={styles.section} aria-labelledby="fidelity-title">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Meaning Preservation Estimate</span>
        <h2 id="fidelity-title">Did the meaning survive?</h2>
      </div>

      <div className={styles.grid}>
        <article className={`${styles.card} ${styles.preserved}`}>
          <div className={styles.cardTop}>
            <span className={styles.cardLabel}>Goal</span>
            <span className={styles.status}>{getStatusLabel("preserved")}</span>
          </div>

          <p>{userGoal}</p>
        </article>

        <article className={`${styles.card} ${styles.preserved}`}>
          <div className={styles.cardTop}>
            <span className={styles.cardLabel}>Action</span>
            <span className={styles.status}>{getStatusLabel("preserved")}</span>
          </div>

          <p>{primaryAction}</p>
          <small>{primaryIntent}</small>
        </article>

        <article className={`${styles.card} ${styles.partial}`}>
          <div className={styles.cardTop}>
            <span className={styles.cardLabel}>State</span>
            <span className={styles.status}>{getStatusLabel("partial")}</span>
          </div>

          <p>{systemStatus}</p>
          <small>{systemMessage}</small>
        </article>

        <article className={`${styles.card} ${styles[riskLevel]}`}>
          <div className={styles.cardTop}>
            <span className={styles.cardLabel}>Risk</span>
            <span className={styles.status}>{getStatusLabel(riskLevel)}</span>
          </div>

          <p>{riskSeverity}</p>
          <small>{riskMessage}</small>
        </article>
      </div>
    </section>
  );
}