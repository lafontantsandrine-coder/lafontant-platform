import Link from "next/link";
import { MiloCourseMapMarker } from "@/components/milo/MiloCourseMapMarker";
import type { CourseMapNodeState } from "@/lib/milo/course-map";

type JourneyNode = {
  id: string;
  section: string;
  order: number;
};

const icons: Record<string, string> = {
  cover: "📖", journey: "🧭", mission: "🎯", vocabulary: "📚",
  "vocabulary-practice": "🧩", grammar: "✍️", "grammar-practice": "🔐",
  listening: "🎧", reading: "📖", speaking: "🎙️", writing: "✏️", "exit-ticket": "🏆"
};

export function MiloJourneyMap({
  nodes,
  nodeStates,
  currentNodeId,
  language,
  level,
  unit
}: {
  nodes: JourneyNode[];
  nodeStates: Record<string, CourseMapNodeState>;
  currentNodeId: string | null;
  language: string;
  level: string;
  unit: string;
}) {
  const completed = nodes.filter((node) => nodeStates[node.id] === "completed").length;
  const percent = Math.round((completed / nodes.length) * 100);

  return (
    <section className="milo-world" aria-label="Milo course journey">
      <div className="milo-world__sky" aria-hidden="true">
        <span className="milo-world__cloud milo-world__cloud--one" />
        <span className="milo-world__cloud milo-world__cloud--two" />
        <span className="milo-world__mountains" />
        <span className="milo-world__castle">🏰</span>
      </div>

      <header className="milo-world__header">
        <div>
          <span className="badge">Milo's journey</span>
          <h2>Your route through this unit</h2>
          <p>Follow the path with Milo. Completed activities stay green and future stops remain locked.</p>
        </div>
        <div className="milo-world__progress" aria-label={`${completed} of ${nodes.length} activities completed`}>
          <strong>{completed} / {nodes.length}</strong>
          <div className="progress"><span style={{ width: `${percent}%` }} /></div>
          <b>{percent}%</b>
        </div>
      </header>

      <div className="milo-world__route">
        <svg className="milo-world__path" viewBox="0 0 1200 390" preserveAspectRatio="none" aria-hidden="true">
          <path d="M35 275 C180 355 245 315 315 235 S470 115 570 185 S760 330 875 235 S1040 90 1170 135" />
        </svg>
        {nodes.map((node, index) => {
          const state = nodeStates[node.id];
          const isCurrent = node.id === currentNodeId;
          const label = node.section.replaceAll("-", " ");
          return (
            <div key={node.id} className={`milo-world__node milo-world__node--${index + 1}`} data-map-node={state}>
              {isCurrent && <MiloCourseMapMarker label={`Current point: ${label}`} arriving />}
              {state === "locked" ? (
                <div className="milo-world__stop milo-world__stop--locked" aria-label={`${label}, locked`}>
                  <span>{icons[node.section] ?? "🔒"}</span>
                </div>
              ) : (
                <Link className={`milo-world__stop milo-world__stop--${state}`} href={`/lesson/${language}/${level}/${unit}/${node.section}`} aria-label={`${label}, ${state}`}>
                  <span>{state === "completed" ? "✓" : icons[node.section] ?? index + 1}</span>
                </Link>
              )}
              <strong className="milo-world__label">{index + 1}. {label}</strong>
              <small>{state === "completed" ? "Completed" : state === "current" ? "You are here" : "Locked"}</small>
            </div>
          );
        })}
      </div>

      <footer className="milo-world__legend">
        <span><i className="legend-dot legend-dot--done">✓</i> Completed</span>
        <span><i className="legend-dot legend-dot--current" /> Current</span>
        <span><i className="legend-dot legend-dot--locked">🔒</i> Locked</span>
        <span className="milo-world__goal">🏰 Finish the route to reach the unit goal</span>
      </footer>
    </section>
  );
}
