import { notFound } from "next/navigation";
import { SCENARIOS, getScenario } from "@/lib/answers-data";
import ScenarioView from "@/components/answers/ScenarioView";

export function generateStaticParams() {
  return SCENARIOS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getScenario(slug);
  return {
    title: s ? `${s.question} — Valura` : "Answer — Valura",
    description: s?.verdictPlain,
  };
}

export default async function AnswerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scenario = getScenario(slug);
  if (!scenario) notFound();
  return <ScenarioView slug={slug} />;
}
