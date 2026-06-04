import FidelityScoreBadge from "@/app/components/FidelityScoreBadge";
import MeaningToolbar from "@/app/components/MeaningToolbar";
import {
  getInterpreterReports,
  type MeaningMode,
  type MeaningModel,
} from "@/app/data/meaningModel";

type HeadlessViewProps = {
  model: MeaningModel;
  meaningMode: MeaningMode;
};

export default function HeadlessView({ model, meaningMode }: HeadlessViewProps) {
  const reports = getInterpreterReports(model, meaningMode);

  const isSemanticMode = meaningMode === "semantic";

  const semanticStructure = isSemanticMode
    ? {
        scenarioId: model.id,
        label: model.label,
        userGoal: model.userGoal,
        primaryAction: {
          label: model.primaryAction.label,
          intent: model.primaryAction.intent,
        },
        systemState: {
          status: model.systemState.status,
          message: model.systemState.message,
        },
        requiredInformation: model.requiredInformation,
        riskWarning: {
          severity: model.riskWarning.severity,
          message: model.riskWarning.message,
        },
        interpretationFidelity: reports.headless,
      }
    : {
        visualSurfaceOnly: true,
        exposedMeaning: null,
        inferredSignals: {
          visibleLabel: model.primaryAction.label,
          possibleScenario: model.label,
        },
        missingSemanticFields: [
          "userGoal",
          "primaryAction.intent",
          "systemState.meaning",
          "requiredInformation",
          "riskWarning.severity",
          "riskWarning.message",
        ],
        interpretationFidelity: reports.headless,
      };

  return (
    <section
      className={`interpreter-card headless-view-card ${
        !isSemanticMode ? "degraded-view-card" : ""
      }`}
    >
      <header className="interpreter-card-header">
        <div className="interpreter-card-title-row">
          <span className="interpreter-card-icon">{"{ }"}</span>
          <h2 className="interpreter-card-title">Headless View</h2>
        </div>

        <FidelityScoreBadge
          interpreter="headless"
          model={model}
          meaningMode={meaningMode}
        />
      </header>

      <MeaningToolbar items={reports.headless} />

      <div className="interpreter-card-body">
        <div className="headless-panel">
          <div className="headless-kicker">
            {isSemanticMode
              ? "Semantic Meaning Structure"
              : "No Portable Meaning Structure"}
          </div>

          <p className="headless-description">
            {isSemanticMode
              ? "This view exposes the underlying meaning without relying on visual UI."
              : "Without semantic meaning, the headless system receives only weak surface signals and cannot reliably preserve intent."}
          </p>

          <pre className="headless-code-block">
            <code>{JSON.stringify(semanticStructure, null, 2)}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}