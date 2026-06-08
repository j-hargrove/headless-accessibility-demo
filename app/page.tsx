"use client";

import { useMemo, useState } from "react";
import {
  MeaningSource,
  nonSemanticSource,
  semanticSource,
} from "@/app/data/meaningModel";
import SourceLayer from "@/app/components/SourceLayer";
import SourceViewer from "@/app/components/SourceViewer";
import SurvivalStrip from "@/app/components/SurvivalStrip";
import InterpreterViewGrid from "@/app/components/InterpreterViewGrid";
import SourceInspector from "@/app/components/SourceInspector";
import ProjectSources from "./components/ProjectSources";
import ColorSignalNormalizer from "./components/ColorSignalNormalizer";

type SourceMode = "semantic" | "nonSemantic";

export default function Home() {
  const [selectedMode, setSelectedMode] = useState<SourceMode>("semantic");

  const source: MeaningSource = useMemo(() => {
    return selectedMode === "semantic" ? semanticSource : nonSemanticSource;
  }, [selectedMode]);

  return (
    <>
      <ColorSignalNormalizer />

      <main className="min-h-screen bg-zinc-50 px-4 py-6 text-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <header className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Headless Accessibility Demo
            </p>

            <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              Semantic Source vs. Non-Semantic Source.
            </h1>

            <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
              What meaning survives?
            </p>

            <p className="mt-4 max-w-4xl text-sm leading-6 text-zinc-600">
              This demo compares how the same product scenario is interpreted by
              visual, accessibility, agent, and headless views when the
              underlying source either preserves or loses semantic structure.
            </p>
          </header>

          <SourceLayer
            selectedMode={selectedMode}
            sourceMode={selectedMode}
            mode={selectedMode}
            onModeChange={setSelectedMode}
            onSourceModeChange={setSelectedMode}
            setSourceMode={setSelectedMode}
          />

          <SourceViewer
            source={source}
            currentSource={source}
            sourceMode={selectedMode}
            mode={selectedMode}
          />

          <SourceInspector
            source={source}
            currentSource={source}
            sourceMode={selectedMode}
            mode={selectedMode}
          />

          <SurvivalStrip sourceMode={selectedMode} mode={selectedMode} />

          <InterpreterViewGrid
            source={source}
            currentSource={source}
            sourceMode={selectedMode}
          />
        </div>

        <ProjectSources />
      </main>
    </>
  );
}