type MeaningStatus = "strong" | "partial" | "risk" | "raw";

export type MeaningReportItem = {
  label: string;
  value: string;
  status: MeaningStatus;
};

type MeaningToolbarProps = {
  items: MeaningReportItem[];
};

export default function MeaningToolbar({ items }: MeaningToolbarProps) {
  return (
    <div className="meaning-toolbar">
      {items.map((item) => (
        <div key={`${item.label}-${item.value}`} className={`meaning-chip ${item.status}`}>
          <span className="meaning-chip-label">{item.label}</span>
          <span className="meaning-chip-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}