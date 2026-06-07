import { MeaningSource, semanticSource } from "@/app/data/meaningModel";

type HumanViewProps = {
  source?: MeaningSource;
};

export default function HumanView({ source = semanticSource }: HumanViewProps) {
  const scenario = source.scenario;

  const score =
    "visual" in source.fidelity
      ? source.fidelity.visual
      : "human" in source.fidelity
        ? source.fidelity.human
        : source.mode === "semantic"
          ? 95
          : 86;

  const appointmentType = scenario.appointmentType || "Follow-up visit";
  const careTeam = scenario.careTeam || "Primary care";
  const reason = scenario.reason || "Lab result review";
  const primaryAction = scenario.primaryAction || "Confirm appointment";

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <header className="mb-4 border-b border-zinc-100 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-zinc-950">
              Visual View
            </h2>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              Meaning Preservation Estimate
            </p>
          </div>

          <div className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700">
            {score}%
          </div>
        </div>

        <p className="mt-3 text-sm leading-6 text-zinc-600">
          The visible product remains mostly understandable because sighted
          users can infer meaning from layout, spacing, and visual hierarchy.
        </p>
      </header>

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                Appointment Summary
              </p>
              <h3 className="mt-1 text-lg font-semibold text-zinc-950">
                {appointmentType}
              </h3>
            </div>

            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700">
              Upcoming
            </span>
          </div>

          <dl className="space-y-3">
            <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                Care team
              </dt>
              <dd className="mt-1 text-sm font-medium text-zinc-900">
                {careTeam}
              </dd>
            </div>

            <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                Reason
              </dt>
              <dd className="mt-1 text-sm font-medium text-zinc-900">
                {reason}
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex flex-wrap gap-2">
            <button className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white">
              {primaryAction}
            </button>
            <button className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-800">
              Contact care team
            </button>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-zinc-500">
        Visual View shows why presentation can still work for sighted users even
        when the underlying source becomes weaker.
      </p>
    </article>
  );
}