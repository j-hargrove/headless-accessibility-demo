type SourceMode = "semantic" | "nonSemantic";

type SourceLayerProps = {
  sourceMode?: SourceMode;
  mode?: SourceMode;
  selectedMode?: SourceMode;
  activeMode?: SourceMode;
  onSourceModeChange?: (mode: SourceMode) => void;
  onModeChange?: (mode: SourceMode) => void;
  setSourceMode?: (mode: SourceMode) => void;
  setMode?: (mode: SourceMode) => void;
};

export default function SourceLayer({
  sourceMode,
  mode,
  selectedMode,
  activeMode,
  onSourceModeChange,
  onModeChange,
  setSourceMode,
  setMode,
}: SourceLayerProps) {
  const currentMode =
    sourceMode ?? mode ?? selectedMode ?? activeMode ?? "semantic";

  const updateMode = (nextMode: SourceMode) => {
    onSourceModeChange?.(nextMode);
    onModeChange?.(nextMode);
    setSourceMode?.(nextMode);
    setMode?.(nextMode);
  };

  const options: Array<{
    mode: SourceMode;
    title: string;
    description: string;
  }> = [
    {
      mode: "semantic",
      title: "Semantic Source",
      description: "Structure, labels, roles, and relationships are encoded.",
    },
    {
      mode: "nonSemantic",
      title: "Non-Semantic Source",
      description: "Meaning depends mostly on visible presentation.",
    },
  ];

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-4 border-b border-zinc-100 pb-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          Source Condition
        </p>
        <h2 className="mt-1 text-base font-semibold text-zinc-950">
          Semantic Source vs. Non-Semantic Source.
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">
          Choose the underlying source condition. The visible product remains
          similar, but each interpreter receives a different quality of meaning.
        </p>
      </div>

      <div
        className="grid gap-3 md:grid-cols-2"
        role="radiogroup"
        aria-label="Choose source condition"
      >
        {options.map((option) => {
          const isSelected = currentMode === option.mode;

          return (
            <button
              key={option.mode}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => updateMode(option.mode)}
              className={`rounded-xl border p-4 text-left transition ${
                isSelected
                  ? "border-zinc-950 bg-zinc-950 text-white shadow-sm"
                  : "border-zinc-200 bg-zinc-50 text-zinc-900 hover:border-zinc-300 hover:bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-white bg-white"
                      : "border-zinc-300 bg-white"
                  }`}
                  aria-hidden="true"
                >
                  {isSelected ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-950" />
                  ) : null}
                </span>

                <div className="min-w-0">
                  <p
                    className={`text-sm font-semibold ${
                      isSelected ? "text-white" : "text-zinc-950"
                    }`}
                  >
                    {option.title}
                  </p>
                  <p
                    className={`mt-1 text-sm leading-5 ${
                      isSelected ? "text-zinc-300" : "text-zinc-600"
                    }`}
                  >
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
