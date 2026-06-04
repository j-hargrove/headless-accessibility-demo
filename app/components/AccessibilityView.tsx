import FidelityScoreBadge from "@/app/components/FidelityScoreBadge";
import MeaningToolbar from "@/app/components/MeaningToolbar";
import {
  getInterpreterReports,
  type MeaningMode,
  type MeaningModel,
} from "@/app/data/meaningModel";

type AccessibilityViewProps = {
  model: MeaningModel;
  meaningMode: MeaningMode;
};

export default function AccessibilityView({
  model,
  meaningMode,
}: AccessibilityViewProps) {
  const reports = getInterpreterReports(model, meaningMode);
  const isSemanticMode = meaningMode === "semantic";

  return (
    <section
      className={`interpreter-card accessibility-view-card ${
        !isSemanticMode ? "degraded-view-card" : ""
      }`}
    >
      <header className="interpreter-card-header">
        <div className="interpreter-card-title-row">
          <span className="interpreter-card-icon">◎</span>
          <h2 className="interpreter-card-title">Accessibility View</h2>
        </div>

        <FidelityScoreBadge
          interpreter="accessibility"
          model={model}
          meaningMode={meaningMode}
        />
      </header>

      <MeaningToolbar items={reports.accessibility} />

      <div className="interpreter-card-body">
        <div className="accessibility-tree-panel">
          <div className="accessibility-tree-kicker">
            {isSemanticMode ? "Accessibility Tree" : "Reduced Accessibility Tree"}
          </div>

          {isSemanticMode ? (
            <>
              <div className="accessibility-tree-block">
                <div className="tree-line">
                  <span className="tree-role">landmark:</span>
                  <span className="tree-value">main</span>
                </div>

                <div className="tree-line">
                  <span className="tree-role">heading level 1:</span>
                </div>

                <div className="tree-indent">
                  <span className="tree-value">{model.userGoal}</span>
                </div>
              </div>

              <div className="accessibility-tree-block">
                <div className="tree-line">
                  <span className="tree-role">region:</span>
                  <span className="tree-value">system state</span>
                </div>

                <div className="tree-indent">
                  <div className="tree-line">
                    <span className="tree-role">status:</span>
                    <span className="tree-value">{model.systemState.status}</span>
                  </div>

                  <div className="tree-line">
                    <span className="tree-role">message:</span>
                    <span className="tree-value">{model.systemState.message}</span>
                  </div>
                </div>
              </div>

              <div className="accessibility-tree-block">
                <div className="tree-line">
                  <span className="tree-role">group:</span>
                  <span className="tree-value">primary action</span>
                </div>

                <div className="tree-indent">
                  <div className="tree-line">
                    <span className="tree-role">button name:</span>
                    <span className="tree-value">{model.primaryAction.label}</span>
                  </div>

                  <div className="tree-line">
                    <span className="tree-role">button intent:</span>
                    <span className="tree-value">{model.primaryAction.intent}</span>
                  </div>
                </div>
              </div>

              <div className="accessibility-tree-block">
                <div className="tree-line">
                  <span className="tree-role">group:</span>
                  <span className="tree-value">required information</span>
                </div>

                <ul className="tree-list">
                  {model.requiredInformation.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="accessibility-tree-block tree-alert">
                <div className="tree-line">
                  <span className="tree-role">alert:</span>
                  <span className="tree-value">{model.riskWarning.severity}</span>
                </div>

                <div className="tree-indent">
                  <span className="tree-value">{model.riskWarning.message}</span>
                </div>
              </div>

              <div className="accessibility-tree-block">
                <div className="tree-line">
                  <span className="tree-role">focus order:</span>
                </div>

                <ol className="tree-list ordered">
                  <li>scenario selector</li>
                  <li>source meaning panel</li>
                  <li>interpreter card header</li>
                  <li>meaning report toolbar</li>
                  <li>system state region</li>
                  <li>primary action button</li>
                  <li>risk alert</li>
                </ol>
              </div>
            </>
          ) : (
            <>
              <div className="accessibility-tree-block degraded-tree-block">
                <div className="tree-line">
                  <span className="tree-role">landmark:</span>
                  <span className="tree-value">main</span>
                </div>

                <div className="tree-line">
                  <span className="tree-role">heading:</span>
                  <span className="tree-value">Missing semantic goal</span>
                </div>

                <div className="tree-indent">
                  <span className="tree-value">
                    The visible UI may still contain text, but the purpose of the
                    task is not encoded as portable meaning.
                  </span>
                </div>
              </div>

              <div className="accessibility-tree-block degraded-tree-block">
                <div className="tree-line">
                  <span className="tree-role">button:</span>
                  <span className="tree-value">{model.primaryAction.label}</span>
                </div>

                <div className="tree-indent">
                  <div className="tree-line">
                    <span className="tree-role">intent:</span>
                    <span className="tree-value">not available</span>
                  </div>

                  <div className="tree-line">
                    <span className="tree-role">state dependency:</span>
                    <span className="tree-value">not available</span>
                  </div>
                </div>
              </div>

              <div className="accessibility-tree-block degraded-tree-block">
                <div className="tree-line">
                  <span className="tree-role">required information:</span>
                  <span className="tree-value">not grouped</span>
                </div>

                <ul className="tree-list">
                  <li>Context must be reconstructed from nearby labels</li>
                  <li>Relationship between fields and action is unclear</li>
                  <li>Constraints are visually present but not semantically bound</li>
                </ul>
              </div>

              <div className="accessibility-tree-block tree-alert degraded-tree-block">
                <div className="tree-line">
                  <span className="tree-role">alert:</span>
                  <span className="tree-value">weak or missing relationship</span>
                </div>

                <div className="tree-indent">
                  <span className="tree-value">
                    Risk may be read as ordinary text instead of as a constraint
                    that changes whether the action is safe.
                  </span>
                </div>
              </div>

              <div className="accessibility-tree-block degraded-tree-block">
                <div className="tree-line">
                  <span className="tree-role">focus order:</span>
                </div>

                <ol className="tree-list ordered">
                  <li>scenario selector</li>
                  <li>visible heading or text block</li>
                  <li>button label</li>
                  <li>nearby supporting text</li>
                  <li>possible warning text</li>
                </ol>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}