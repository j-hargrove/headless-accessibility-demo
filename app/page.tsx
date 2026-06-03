"use client";

import { useState } from "react";
import { meaningModel } from "./data/meaningModel";
import styles from "./page.module.css";

type View = "human" | "accessibility" | "agent" | "headless";

const views: View[] = ["human", "accessibility", "agent", "headless"];

export default function Home() {
  const [activeView, setActiveView] = useState<View>("human");

  return (
    <main className={styles.page}>
      <h1>Headless Accessibility</h1>

      <div className={styles.tabs}>
        {views.map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={
              activeView === view ? styles.activeTab : styles.tab
            }
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.panel}>
        {activeView === "human" && (
          <>
            <h2>{meaningModel.title}</h2>

            <p>
              <strong>Date Range:</strong> {meaningModel.dateRange}
            </p>

            <div className={styles.metricGrid}>
              {meaningModel.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className={styles.metricCard}
                >
                  <div>{metric.label}</div>
                  <div className={styles.metricValue}>
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            <button>{meaningModel.primaryAction}</button>
          </>
        )}

        {activeView === "accessibility" && (
          <>
            <h2>Accessibility View</h2>

            <ul>
              <li>Heading: {meaningModel.title}</li>
              <li>Primary Action: {meaningModel.primaryAction}</li>
              <li>Filter: {meaningModel.dateRange}</li>

              {meaningModel.metrics.map((metric) => (
                <li key={metric.label}>
                  Metric: {metric.label}, value {metric.value}
                </li>
              ))}
            </ul>
          </>
        )}

        {activeView === "agent" && (
          <>
            <h2>Agent View</h2>

            <pre>
              {JSON.stringify(
                {
                  pagePurpose: meaningModel.pagePurpose,
                  primaryTask: meaningModel.primaryAction,
                  availableActions: meaningModel.availableActions,
                  keyMetrics: meaningModel.metrics,
                },
                null,
                2
              )}
            </pre>
          </>
        )}

        {activeView === "headless" && (
          <>
            <h2>Headless View</h2>

            <pre>
              {JSON.stringify(meaningModel, null, 2)}
            </pre>
          </>
        )}
      </div>
    </main>
  );
}