import FidelityScoreBadge from "@/app/components/FidelityScoreBadge";
import MeaningToolbar from "@/app/components/MeaningToolbar";
import {
  getInterpreterReports,
  type MeaningMode,
  type MeaningModel,
} from "@/app/data/meaningModel";

type AgentViewProps = {
  model: MeaningModel;
  meaningMode: MeaningMode;
};

export default function AgentView({ model, meaningMode }: AgentViewProps) {
  const reports = getInterpreterReports(model, meaningMode);

  return (
    <section className="interpreter-card agent-view-card">
      <header className="interpreter-card-header">
        <div className="interpreter-card-title-row">
          <span className="interpreter-card-icon">◇</span>
          <h2 className="interpreter-card-title">Agent View</h2>
        </div>

        <FidelityScoreBadge
          interpreter="agent"
          model={model}
          meaningMode={meaningMode}
        />
      </header>

      <MeaningToolbar items={reports.agent} />

      <div className="interpreter-card-body">
        <div className="agent-panel">
          <div className="agent-section">
            <div className="agent-section-label">Task Interpretation</div>
            <p className="agent-primary-text">
              {meaningMode === "semantic"
                ? model.userGoal
                : "Probable task inferred from visible labels and layout. Intent is not explicitly encoded."}
            </p>
          </div>

          <div className="agent-section">
            <div className="agent-section-label">Primary Entity</div>
            <p className="agent-muted-text">
              {meaningMode === "semantic" ? model.label : "Unconfirmed task context"}
            </p>
          </div>

          <div className="agent-section">
            <div className="agent-section-label">Available Actions</div>

            <ul className="agent-list">
              <li>{model.primaryAction.label}</li>
              <li>
                {meaningMode === "semantic"
                  ? "Check required information"
                  : "Infer required information from nearby text"}
              </li>
              <li>
                {meaningMode === "semantic"
                  ? "Evaluate risk before acting"
                  : "Risk may be missed or underweighted"}
              </li>
            </ul>
          </div>

          <div className="agent-section-grid">
            <div className="agent-mini-card">
              <span className="agent-mini-label">Confidence</span>
              <strong className="agent-mini-value">
                {meaningMode === "semantic"
                  ? model.riskWarning.severity === "high"
                    ? "Low"
                    : "Medium"
                  : "Low"}
              </strong>
            </div>

            <div className="agent-mini-card">
              <span className="agent-mini-label">Risk Level</span>
              <strong className="agent-mini-value">
                {meaningMode === "semantic"
                  ? model.riskWarning.severity
                  : "uncertain"}
              </strong>
            </div>
          </div>

          <div className="agent-section">
            <div className="agent-section-label">
              {meaningMode === "semantic" ? "Required Context" : "Missing Context"}
            </div>

            <ul className="agent-list warning">
              {meaningMode === "semantic" ? (
                model.requiredInformation.map((item) => <li key={item}>{item}</li>)
              ) : (
                <>
                  <li>Explicit user goal</li>
                  <li>Action intent</li>
                  <li>System state meaning</li>
                  <li>Risk severity</li>
                </>
              )}
            </ul>
          </div>

          <div className="agent-section">
            <div className="agent-section-label">Relationships</div>

            <ul className="agent-list">
              <li>
                {meaningMode === "semantic"
                  ? "Intent maps to primary action"
                  : "Intent must be guessed from label"}
              </li>
              <li>
                {meaningMode === "semantic"
                  ? "System state affects next step"
                  : "System state is visually implied"}
              </li>
              <li>
                {meaningMode === "semantic"
                  ? "Risk warning modifies confidence"
                  : "Risk relationship is not reliable"}
              </li>
            </ul>
          </div>

          <div className="agent-next-step">
            <span className="agent-next-step-label">Agent Next Step</span>
            <strong>
              {meaningMode === "semantic"
                ? model.riskWarning.severity === "high"
                  ? "Verify scope before recommending approval."
                  : model.primaryAction.intent
                : "Do not act automatically. Ask for clarification before recommending the next step."}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}