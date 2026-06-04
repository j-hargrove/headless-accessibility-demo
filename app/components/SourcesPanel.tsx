type SourceReference = {
  title: string;
  source: string;
  url: string;
  relevance: string;
};

const sources: SourceReference[] = [
  {
    title: "WCAG 2.2 — Info and Relationships",
    source: "W3C WAI",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
    relevance:
      "Information, structure, and relationships should survive beyond visual presentation.",
  },
  {
    title: "WCAG 2.2 — Name, Role, Value",
    source: "W3C WAI",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
    relevance:
      "Interactive controls need programmatic names, roles, values, and state changes.",
  },
  {
    title: "WAI-ARIA 1.2",
    source: "W3C",
    url: "https://www.w3.org/TR/wai-aria-1.2/",
    relevance:
      "Roles, states, and properties make rich interfaces interpretable by assistive technologies.",
  },
  {
    title: "Core Accessibility API Mappings 1.2",
    source: "W3C",
    url: "https://www.w3.org/TR/core-aam-1.2/",
    relevance:
      "User agents expose web semantics through platform accessibility APIs.",
  },
  {
    title: "Accessible Name and Description Computation 1.2",
    source: "W3C",
    url: "https://www.w3.org/TR/accname-1.2/",
    relevance:
      "Accessible names and descriptions are computed and exposed to assistive technologies.",
  },
  {
    title: "Introduction to Structured Data",
    source: "Google Search Central",
    url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data",
    relevance:
      "Structured data helps systems understand page content and machine-readable meaning.",
  },
  {
    title: "Structured Outputs",
    source: "OpenAI Docs",
    url: "https://developers.openai.com/api/docs/guides/structured-outputs",
    relevance:
      "Schema-bound outputs preserve required fields and reduce ambiguity in headless systems.",
  },
  {
    title: "Guidelines for Human-AI Interaction",
    source: "Microsoft Research",
    url: "https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/",
    relevance:
      "AI systems should disambiguate or gracefully degrade when uncertain.",
  },
];

export default function SourcesPanel() {
  return (
    <footer className="sources-footer">
      <div className="sources-footer-inner">
        <div className="sources-footer-header">
          <span className="sources-footer-kicker">Evidence Base</span>

          <h2>Sources behind the interpretation fidelity model</h2>

          <p>
            References grounding the claim that meaning survives better when
            intent, state, relationships, constraints, and risk are explicitly
            encoded instead of left inside the visual surface alone.
          </p>
        </div>

        <div className="sources-footer-links" aria-label="Evidence sources">
          {sources.map((source) => (
            <a
              key={source.url}
              className="sources-footer-link"
              href={source.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="sources-footer-source">{source.source}</span>
              <strong>{source.title}</strong>
              <span>{source.relevance}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}