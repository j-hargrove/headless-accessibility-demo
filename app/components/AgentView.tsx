import { type MeaningSource, semanticSource } from "@/app/data/meaningModel";
import ScorePill from "./ScorePill";
import StatusPill from "./StatusPill";

type AgentViewProps = {
  model?: MeaningSource;
  source?: MeaningSource;
  sourceMode?: "semantic" | "nonSemantic";
};

export default function AgentView({
  model,
  source,
  sourceMode,
}: AgentViewProps) {
  const activeSource = source ?? model ?? semanticSource;
  const activeMode = sourceMode ?? activeSource.mode;
  const score = activeSource.fidelity.agent;
  const scenario = activeSource.scenario;

  const isSemantic = activeMode === "semantic";

  const agentRead = isSemantic
    ? {
        confidence: "High confidence",
        pagePurpose: "Help the user review and confirm an upcoming appointment.",
        primaryEntity: "Appointment",
        primaryTask: "Confirm appointment details and prepare for the visit.",
        nextAction: "Confirm appointment",
        risk: "Limited",
        reasoning:
          "The source exposes a clear scenario, labeled entities, available actions, and relationships between the visit type, care team, reason, and primary task.",
      }
    : {
        confidence: "Medium confidence",
        pagePurpose:
          "Likely an appointment-related card, inferred from visible grouping and nearby text.",
        primaryEntity: "Ambiguous",
        primaryTask:
          "Possibly confirm the appointment, but the action depends on visual context.",
        nextAction: "Uncertain",
        risk: "High risk",
        reasoning:
          "The visual layout suggests meaning, but the source does not reliably encode relationships, labels, or task intent for an agent to act on safely.",
      };

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <header className="mb-4 border-b border-zinc-100 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-zinc-950">
              Agent View
            </h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Machine interpretation
            </p>
          </div>

          <ScorePill score={score} label="Agent meaning preservation" />
        </div>

        <p className="mt-3 text-sm leading-6 text-zinc-600">
          A simulated agent readout of page purpose, entities, tasks,
          confidence, risk, and action opportunities.
        </p>
      </header>

      <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-zinc-200 pb-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Agent interpretation
          </p>
          <StatusPill>{agentRead.confidence}</StatusPill>
        </div>

        <dl className="space-y-3">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Page purpose
            </dt>
            <dd className="mt-1 text-sm leading-6 text-zinc-800">
              {agentRead.pagePurpose}
            </dd>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 bg-white p-3">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Primary entity
              </dt>
              <dd className="mt-2 text-sm font-medium text-zinc-900">
                {agentRead.primaryEntity}
              </dd>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-3">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Next action
              </dt>
              <dd className="mt-2">
                <StatusPill>{agentRead.nextAction}</StatusPill>
              </dd>
            </div>
          </div>

          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Primary task
            </dt>
            <dd className="mt-1 text-sm leading-6 text-zinc-800">
              {agentRead.primaryTask}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Reasoning
            </dt>
            <dd className="mt-1 text-sm leading-6 text-zinc-800">
              {agentRead.reasoning}
            </dd>
          </div>
        </dl>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-zinc-200 pt-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Action risk
          </p>
          <StatusPill>{agentRead.risk}</StatusPill>
        </div>
      </section>

      <p className="mt-3 text-xs leading-5 text-zinc-500">
        Scenario source: {scenario.appointmentType}, {scenario.careTeam},{" "}
        {scenario.reason}.
      </p>
    </article>
  );
}
