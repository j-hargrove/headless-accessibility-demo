const sources = [
  {
    label: "WCAG 2.2 — Success Criterion 1.3.1: Info and Relationships",
    description:
      "Documents the accessibility principle that information, structure, and relationships must survive when presentation changes.",
    href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
  },
  {
    label: "W3C WAI — Page Structure Tutorial",
    description:
      "Explains how headings, landmarks, and content structure help assistive technologies interpret a page.",
    href: "https://www.w3.org/WAI/tutorials/page-structure/",
  },
  {
    label: "W3C WAI — Headings Tutorial",
    description:
      "Shows how headings communicate page organization and support navigation for assistive technologies.",
    href: "https://www.w3.org/WAI/tutorials/page-structure/headings/",
  },
  {
    label: "MDN — HTML: Meaning and Structure",
    description:
      "Defines HTML as the layer that gives web content meaning and structure, separate from presentation.",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    label: "MDN — WAI-ARIA Roles",
    description:
      "Documents how roles add semantic meaning that screen readers and other tools can interpret.",
    href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles",
  },
  {
    label: "WAI-ARIA Specification",
    description:
      "Defines ARIA as a framework for improving accessibility and interoperability of web applications.",
    href: "https://w3c.github.io/aria/",
  },
  {
    label: "HTML Living Standard",
    description:
      "The living HTML specification that defines the semantic foundation of web documents and applications.",
    href: "https://html.spec.whatwg.org/",
  },
];

export default function ProjectSources() {
  return (
    <footer className="mt-10 border-t border-zinc-200 pt-6">
      <div className="mb-4 max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          Sources
        </p>
        <h2 className="mt-1 text-lg font-semibold tracking-tight text-zinc-950">
          What this demo is documenting
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          This demo connects established accessibility principles with a newer
          product-design question: can the meaning of an interface survive when
          the visual presentation is removed, transformed, or interpreted by a
          non-visual system?
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {sources.map((source) => (
          <a
            key={source.href}
            href={source.href}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
          >
            <h3 className="text-sm font-semibold leading-5 text-zinc-950 group-hover:underline">
              {source.label}
            </h3>
            <p className="mt-2 text-xs leading-5 text-zinc-600">
              {source.description}
            </p>
          </a>
        ))}
      </div>
    </footer>
  );
}
