import { MeaningSource, semanticSource } from "@/app/data/meaningModel";
import HumanView from "./HumanView";

type VisualViewProps = {
  source?: MeaningSource;
};

export default function VisualView({
  source = semanticSource,
}: VisualViewProps) {
  return <HumanView source={source} />;
}