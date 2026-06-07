import { type MeaningSource, semanticSource } from "@/app/data/meaningModel";
import VisualView from "./VisualView";
import AccessibilityView from "./AccessibilityView";
import AgentView from "./AgentView";
import HeadlessView from "./HeadlessView";

type InterpreterViewGridProps = {
  model?: MeaningSource;
  source?: MeaningSource;
  currentSource?: MeaningSource;
  sourceMode?: "semantic" | "nonSemantic";
};

export default function InterpreterViewGrid({
  model,
  source,
  currentSource,
  sourceMode,
}: InterpreterViewGridProps) {
  const activeSource = source ?? currentSource ?? model ?? semanticSource;
  const activeSourceMode = sourceMode ?? activeSource.mode;

  return (
    <section aria-label="Interpreter views" className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Interpreter Views
          </p>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-950">
            Same source condition, different interpretation paths.
          </h2>
        </div>

        <span className="w-fit rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm">
          {activeSourceMode === "semantic"
            ? "Semantic Source"
            : "Non-Semantic Source"}
        </span>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-2">
        <VisualView source={activeSource} />
        <AccessibilityView model={activeSource} sourceMode={activeSourceMode} />
        <AgentView model={activeSource} sourceMode={activeSourceMode} />
        <HeadlessView source={activeSource} />
      </div>
    </section>
  );
}
