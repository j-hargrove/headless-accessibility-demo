"use client";

import { useState } from "react";
import { meaningModel } from "./data/meaningModel";

type View = "human" | "accessibility" | "agent" | "headless";

const views: View[] = ["human", "accessibility", "agent", "headless"];

export default function Home() {
  const [activeView, setActiveView] = useState<View>("human");

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "48px 24px",
      }}
    >
      <h1>Headless Accessibility</h1>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {views.map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            style={{
              border: "1px solid #ccc",
              background: activeView === view ? "#111" : "#fff",
              color: activeView === view ? "#fff" : "#111",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          background: "#fff",
          padding: "24px",
          marginTop: "24px",
        }}
      >
        {activeView === "human" && (
          <>
            <h2>{meaningModel.title}</h2>
            <p>Conversion Rate: {meaningModel.conversionRate}</p>
            <p>Date Range: {meaningModel.dateRange}</p>
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
              <li>Metric: {meaningModel.conversionRate}</li>
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
            <pre>{JSON.stringify(meaningModel, null, 2)}</pre>
          </>
        )}
      </div>
    </main>
  );
}