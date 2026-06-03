"use client";

import { useState } from "react";

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
            <h2>Conversion Dashboard</h2>
            <p>Conversion Rate: 42%</p>
            <p>Date Range: Last 30 Days</p>
            <button>Export Report</button>
          </>
        )}

        {activeView === "accessibility" && (
          <>
            <h2>Accessibility View</h2>
            <ul>
              <li>Heading: Conversion Dashboard</li>
              <li>Primary Action: Export Report</li>
              <li>Filter: Date Range</li>
              <li>Metric: Conversion Rate</li>
            </ul>
          </>
        )}

        {activeView === "agent" && (
          <>
            <h2>Agent View</h2>
            <pre>{`{
  "pagePurpose": "Analyze conversion performance",
  "primaryTask": "Export Report",
  "availableActions": ["Export Report"]
}`}</pre>
          </>
        )}

        {activeView === "headless" && (
          <>
            <h2>Headless View</h2>
            <pre>{`{
  "intent": "Export conversion report",
  "entities": ["conversionRate", "dateRange", "report"],
  "actions": ["exportReport"]
}`}</pre>
          </>
        )}
      </div>
    </main>
  );
}