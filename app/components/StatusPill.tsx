import { getStatusClasses, getStatusLabel } from "./statusColors";

type StatusPillProps = {
  children: string;
};

export default function StatusPill({ children }: StatusPillProps) {
  const statusLabel = getStatusLabel(children);

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border border-l-4 bg-white px-2.5 py-1.5 text-xs font-semibold leading-none shadow-sm ${getStatusClasses(
        children
      )}`}
    >
      <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em] text-slate-500">
        {statusLabel}
      </span>

      <span className="text-slate-900">{children}</span>
    </span>
  );
}