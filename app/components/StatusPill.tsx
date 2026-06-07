import { getStatusClasses } from "./statusColors";

type StatusPillProps = {
  children: string;
};

export default function StatusPill({ children }: StatusPillProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-medium ${getStatusClasses(
        children
      )}`}
    >
      {children}
    </span>
  );
}
