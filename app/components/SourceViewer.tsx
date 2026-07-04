import { MeaningSource } from "@/app/data/meaningModel";

type SourceViewerProps = {
  source?: MeaningSource;
  currentSource?: MeaningSource;
  sourceMode?: "semantic" | "nonSemantic";
  mode?: "semantic" | "nonSemantic";
};

const semanticSourceExample = `<main>
  <article>
    <h1>Follow-up visit</h1>

    <dl>
      <div>
        <dt>Care team</dt>
        <dd>Primary care</dd>
      </div>

      <div>
        <dt>Reason</dt>
        <dd>Lab result review</dd>
      </div>
    </dl>

    <button type="button">
      Confirm appointment
    </button>
  </article>
</main>`;

const nonSemanticSourceExample = `<div>
  <div>Appointment Summary</div>
  <div>Follow-up visit</div>

  <div>
    <div>Care team</div>
    <div>Primary care</div>
  </div>

  <div>
    <div>Reason</div>
    <div>Lab result review</div>
  </div>

  <div>Confirm</div>
</div>`;

export default function SourceViewer({
  source,
  currentSource,
  sourceMode,
  mode,
}: SourceViewerProps) {
  const activeSource = source ?? currentSource;
  const activeMode = sourceMode ?? mode ?? activeSource?.mode ?? "semantic";
  const isSemantic = activeMode === "semantic";

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-2 border-b border-zinc-100 pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Source Viewer
          </p>
          <h2 className="mt-1 text-base font-semibold text-zinc-950">
            {isSemantic ? "Semantic source" : "Non-semantic source"}
          </h2>
        </div>

        <span className="w-fit rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700">
          {isSemantic ? "Structure encoded" : "Presentation only"}
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950">
        <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            {isSemantic ? "semantic.html" : "nonSemantic.html"}
          </p>
          <p className="text-xs font-medium text-zinc-500">
            {isSemantic ? "meaning available" : "meaning inferred"}
          </p>
        </div>

        <pre className="max-h-[260px] overflow-auto p-4 text-xs leading-5 text-zinc-200">
          <code>
            {isSemantic ? semanticSourceExample : nonSemanticSourceExample}
          </code>
        </pre>
      </div>

      <p className="mt-3 text-xs leading-5 text-zinc-500">
        {isSemantic
          ? "The source encodes structure, hierarchy, and relationships that preserve meaning before any presentation layer is applied."
          : "The source contains visible text only. Structure, relationships, and intent must be reconstructed from presentation alone."}
      </p>
    </section>
  );
}