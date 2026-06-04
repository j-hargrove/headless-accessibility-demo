"use client";

import { useMemo, useState } from "react";
import AccessibilityView from "@/app/components/AccessibilityView";
import AgentView from "@/app/components/AgentView";
import HeadlessView from "@/app/components/HeadlessView";
import HumanView from "@/app/components/HumanView";
import ScenarioExplorer from "@/app/components/ScenarioExplorer";
import SourcesPanel from "@/app/components/SourcesPanel";
import {
  scenarios,
  type MeaningMode,
  type ScenarioId,
} from "@/app/data/meaningModel";

export default function InterpreterViewGrid() {
  const [activeScenarioId, setActiveScenarioId] =
    useState<ScenarioId>("export-report");

  const [meaningMode, setMeaningMode] = useState<MeaningMode>("semantic");

  const activeScenario = useMemo(() => {
    return (
      scenarios.find((scenario) => scenario.id === activeScenarioId) ??
      scenarios[0]
    );
  }, [activeScenarioId]);

  const isSemanticMode = meaningMode === "semantic";

  return (
    <section className="interpreter-view-section">
      <div className="interpreter-view-section-header">
        <p className="section-kicker">Interpretation Fidelity</p>
        <h1>One meaning model, four interpretations</h1>
        <p>
          The same underlying meaning is rendered for different interpreters:
          humans, assistive technology, AI agents, and headless systems.
        </p>
      </div>

      <ScenarioExplorer
        activeScenarioId={activeScenarioId}
        onScenarioChange={setActiveScenarioId}
      />

      <div className="meaning-mode-toggle" aria-label="Meaning mode">
        <button
          type="button"
          className={`meaning-mode-button ${isSemanticMode ? "active" : ""}`}
          onClick={() => setMeaningMode("semantic")}
        >
          With Semantic Meaning
        </button>

        <button
          type="button"
          className={`meaning-mode-button ${
            !isSemanticMode ? "active warning" : ""
          }`}
          onClick={() => setMeaningMode("non-semantic")}
        >
          Without Semantic Meaning
        </button>
      </div>

      {isSemanticMode ? (
        <section className="source-meaning-panel">
          <div className="source-meaning-header">
            <span className="source-meaning-kicker">Source Meaning</span>
            <span
              className={`source-meaning-risk ${activeScenario.riskWarning.severity}`}
            >
              {activeScenario.riskWarning.severity} risk
            </span>
          </div>

          <h2 className="source-meaning-goal">{activeScenario.userGoal}</h2>

          <div className="source-meaning-grid">
            <div className="source-meaning-item">
              <span>Primary action</span>
              <strong>{activeScenario.primaryAction.label}</strong>
            </div>

            <div className="source-meaning-item">
              <span>System state</span>
              <strong>{activeScenario.systemState.status}</strong>
            </div>

            <div className="source-meaning-item">
              <span>Intent</span>
              <strong>{activeScenario.primaryAction.intent}</strong>
            </div>

            <div className="source-meaning-item">
              <span>Risk warning</span>
              <strong>{activeScenario.riskWarning.message}</strong>
            </div>
          </div>
        </section>
      ) : (
        <section className="source-meaning-panel non-semantic-panel">
          <div className="source-meaning-header">
            <span className="source-meaning-kicker">No Semantic Meaning</span>
            <span className="source-meaning-risk high">meaning degraded</span>
          </div>

          <h2 className="source-meaning-goal">
            Visual surface only. Intent, state, constraints, and risk are not
            explicitly encoded.
          </h2>

          <div className="source-meaning-grid">
            <div className="source-meaning-item degraded">
              <span>Primary action</span>
              <strong>Visible label only</strong>
            </div>

            <div className="source-meaning-item degraded">
              <span>System state</span>
              <strong>Must be inferred</strong>
            </div>

            <div className="source-meaning-item degraded">
              <span>Intent</span>
              <strong>Not encoded</strong>
            </div>

            <div className="source-meaning-item degraded">
              <span>Risk warning</span>
              <strong>Easy to miss or misclassify</strong>
            </div>
          </div>
        </section>
      )}

      <div className="interpreter-view-grid">
        <HumanView model={activeScenario} meaningMode={meaningMode} />
        <AccessibilityView model={activeScenario} meaningMode={meaningMode} />
        <AgentView model={activeScenario} meaningMode={meaningMode} />
        <HeadlessView model={activeScenario} meaningMode={meaningMode} />
      </div>

      <SourcesPanel />
    </section>
  );
}