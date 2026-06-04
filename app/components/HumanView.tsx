import FidelityScoreBadge from "@/app/components/FidelityScoreBadge";
import MeaningToolbar from "@/app/components/MeaningToolbar";
import {
  getInterpreterReports,
  type MeaningMode,
  type MeaningModel,
} from "@/app/data/meaningModel";

type HumanViewProps = {
  model: MeaningModel;
  meaningMode: MeaningMode;
};

export default function HumanView({ model, meaningMode }: HumanViewProps) {
  const reports = getInterpreterReports(model, meaningMode);
  const isSemanticMode = meaningMode === "semantic";

  return (
    <section
      className={`interpreter-card human-view-card ${
        !isSemanticMode ? "human-ambiguous-view-card" : ""
      }`}
    >
      <header className="interpreter-card-header">
        <div className="interpreter-card-title-row">
          <span className="interpreter-card-icon">◉</span>
          <h2 className="interpreter-card-title">Human View</h2>
        </div>

        <FidelityScoreBadge
          interpreter="human"
          model={model}
          meaningMode={meaningMode}
        />
      </header>

      <MeaningToolbar items={reports.human} />

      <div className="interpreter-card-body">
        <div className="human-ui-panel">
          <div className="human-ui-meta-row">
            <span className="human-ui-kicker">
              {isSemanticMode ? "Product / Scenario" : "Visible Interface"}
            </span>

            <span
              className={`human-ui-ready-badge ${
                !isSemanticMode ? "ambiguous" : ""
              }`}
            >
              {isSemanticMode ? model.systemState.status : "appears actionable"}
            </span>
          </div>

          <h3 className="human-ui-heading">{model.userGoal}</h3>

          <p className="human-ui-description">
            {isSemanticMode
              ? "The interface gives the user enough context to understand what is happening and what action is available."
              : "A person can still infer the task from layout, labels, and surrounding text, but the meaning is more fragile and depends on interpretation."}
          </p>

          <div className="human-ui-status-grid">
            <div className="human-ui-status-card">
              <span className="human-ui-status-label">
                {isSemanticMode ? "Task Readiness" : "User Interpretation"}
              </span>

              <strong
                className={`human-ui-status-value ${
                  !isSemanticMode ? "ambiguous" : ""
                }`}
              >
                {isSemanticMode
                  ? model.systemState.message
                  : "Likely understandable from context"}
              </strong>
            </div>

            <div className="human-ui-status-card">
              <span className="human-ui-status-label">
                {isSemanticMode ? "Primary Action" : "Action Recognition"}
              </span>

              <strong
                className={`human-ui-status-value ${
                  !isSemanticMode ? "ambiguous" : ""
                }`}
              >
                {isSemanticMode
                  ? model.primaryAction.label
                  : `${model.primaryAction.label} is visible`}
              </strong>
            </div>
          </div>

          <div className="human-ui-chip-row">
            {isSemanticMode ? (
              model.requiredInformation.map((item) => (
                <span key={item}>{item}</span>
              ))
            ) : (
              <>
                <span>Labels still visible</span>
                <span>Context inferred from layout</span>
                <span>Risk requires attention</span>
                <span>Meaning not portable</span>
              </>
            )}
          </div>

          <div
            className={`human-ui-risk-banner ${
              !isSemanticMode ? "ambiguous" : ""
            }`}
          >
            <strong>
              {isSemanticMode
                ? `${model.riskWarning.severity} risk`
                : "risk visible, meaning fragile"}
            </strong>

            <span>
              {isSemanticMode
                ? model.riskWarning.message
                : "A human may notice the warning, but the interface is relying on visual attention instead of carrying the risk as explicit meaning."}
            </span>
          </div>

          <div className="human-ui-actions">
            <button type="button" className="human-ui-primary-button">
              {model.primaryAction.label}
            </button>

            <button type="button" className="human-ui-secondary-button">
              {isSemanticMode ? "Review" : "Inspect"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}