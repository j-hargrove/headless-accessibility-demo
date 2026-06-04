"use client";

import type { ScenarioId } from "@/app/data/meaningModel";
import { scenarios } from "@/app/data/meaningModel";

type ScenarioExplorerProps = {
  activeScenarioId: ScenarioId;
  onScenarioChange: (scenarioId: ScenarioId) => void;
};

export default function ScenarioExplorer({
  activeScenarioId,
  onScenarioChange,
}: ScenarioExplorerProps) {
  return (
    <div className="scenario-explorer">
      <div className="scenario-explorer-label">Scenario Explorer</div>

      <div className="scenario-button-row">
        {scenarios.map((scenario) => {
          const isActive = scenario.id === activeScenarioId;

          return (
            <button
              key={scenario.id}
              type="button"
              className={`scenario-button ${isActive ? "active" : ""}`}
              onClick={() => onScenarioChange(scenario.id)}
            >
              {scenario.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}