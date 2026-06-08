import styles from "./SemanticSignalTags.module.css";

export type SemanticSignalType =
  | "entity"
  | "action"
  | "state"
  | "risk"
  | "missing"
  | "success"
  | "structure"
  | "semantic"
  | "default";

export type SemanticSignalTag = {
  label: string;
  type?: SemanticSignalType;
};

type SemanticSignalTagsProps = {
  tags: SemanticSignalTag[];
  compact?: boolean;
};

export default function SemanticSignalTags({
  tags,
  compact = false,
}: SemanticSignalTagsProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div
      className={`${styles.signalTags} ${
        compact ? styles.signalTagsCompact : ""
      }`}
      aria-label="Semantic meaning signals"
    >
      {tags.map((tag) => {
        const type = tag.type ?? "default";

        return (
          <span
            key={`${type}-${tag.label}`}
            className={styles.signalTag}
            data-type={type}
          >
            <span className={styles.signalType}>{type}</span>
            <span className={styles.signalLabel}>{tag.label}</span>
          </span>
        );
      })}
    </div>
  );
}