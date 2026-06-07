import { type MeaningSource, semanticSource } from "@/app/data/meaningModel";
import ScorePill from "./ScorePill";

type VisualViewProps = {
  source?: MeaningSource;
};

export default function VisualView({ source = semanticSource }: VisualViewProps) {
  const scenario = source.scenario;
  const score = source.fidelity.visual;

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <header className="mb-5 border-b border-zinc-100 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-zinc-950">
              Visual View
            </h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Meaning Preservation Estimate
            </p>
          </div>

          <ScorePill score={score} label="Visual meaning preservation" />
        </div>

        <p className="mt-3 text-sm leading-6 text-zinc-600">
          The visible product remains understandable because sighted users can
          infer meaning from layout, spacing, hierarchy, and familiar interface
          patterns.
        </p>
      </header>

      <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
        <div className="border-b border-zinc-200 bg-white px-5 py-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Patient Portal
              </p>
              <h3 className="mt-1 text-xl font-semibold leading-tight text-zinc-950">
                Appointment Summary
              </h3>
            </div>

            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700">
              Upcoming
            </span>
          </div>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Visit type
            </p>
            <h4 className="mt-2 text-2xl font-semibold leading-tight text-zinc-950">
              {scenario.appointmentType}
            </h4>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  Care team
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-950">
                  {scenario.careTeam}
                </p>
              </div>

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  Reason
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-950">
                  {scenario.reason}
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Next step
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-700">
              Confirm appointment
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <button className="rounded-md bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white">
                Confirm appointment
              </button>
              <button className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800">
                Contact
              </button>
            </div>
          </aside>
        </div>
      </section>

      <p className="mt-4 text-xs leading-5 text-zinc-500">
        Visual View shows how a sighted user can recover meaning from visible
        layout, even when the underlying semantic source becomes weaker.
      </p>
    </article>
  );
}
