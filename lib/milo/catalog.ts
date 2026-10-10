export type MiloAssetStatus = "ready" | "pending";

export type MiloState =
  | "welcome"
  | "pointingRight"
  | "explaining"
  | "thinking"
  | "listening"
  | "reading"
  | "speaking"
  | "writing"
  | "recording"
  | "correct"
  | "tryAgain"
  | "celebrating"
  | "unlock"
  | "calendar"
  | "trophy"
  | "error"
  | "connection"
  | "loading"
  | "streak"
  | "locked"
  | "almostThere"
  | "perfectScore"
  | "dailyWelcome"
  | "birthday";

export type MiloAsset = {
  state: MiloState;
  src: string;
  alt: string;
  status: MiloAssetStatus;
  purpose: string;
};

const base = "/assets/mascot/milo";

export const MILO_ASSETS: Record<MiloState, MiloAsset> = {
  welcome: { state: "welcome", src: `${base}/welcome/milo-welcome.png`, alt: "Milo welcoming the student", status: "ready", purpose: "General welcome" },
  pointingRight: { state: "pointingRight", src: `${base}/navigation/milo-pointing-right.png`, alt: "Milo pointing to the next step", status: "ready", purpose: "Navigation and next step" },
  explaining: { state: "explaining", src: `${base}/learning/milo-explaining.png`, alt: "Milo explaining", status: "ready", purpose: "Explanations and tips" },
  thinking: { state: "thinking", src: `${base}/learning/milo-thinking.png`, alt: "Milo thinking", status: "ready", purpose: "AI analysis and reflection" },
  listening: { state: "listening", src: `${base}/skills/milo-listening.png`, alt: "Milo listening", status: "ready", purpose: "Listening activities" },
  reading: { state: "reading", src: `${base}/skills/milo-reading.png`, alt: "Milo reading", status: "ready", purpose: "Reading activities" },
  speaking: { state: "speaking", src: `${base}/skills/milo-speaking.png`, alt: "Milo speaking", status: "ready", purpose: "Speaking activities" },
  writing: { state: "writing", src: `${base}/skills/milo-writing.png`, alt: "Milo writing", status: "ready", purpose: "Writing activities" },
  recording: { state: "recording", src: `${base}/skills/milo-recording.png`, alt: "Milo recording audio", status: "ready", purpose: "Audio recording" },
  correct: { state: "correct", src: `${base}/feedback/milo-correct.png`, alt: "Milo celebrating a correct answer", status: "ready", purpose: "Positive feedback" },
  tryAgain: { state: "tryAgain", src: `${base}/feedback/milo-try-again.png`, alt: "Milo encouraging another try", status: "ready", purpose: "Retry feedback" },
  celebrating: { state: "celebrating", src: `${base}/feedback/milo-celebrating.png`, alt: "Milo celebrating", status: "ready", purpose: "Milestones" },
  unlock: { state: "unlock", src: `${base}/navigation/milo-unlock.png`, alt: "Milo unlocking the next activity", status: "ready", purpose: "Unlock feedback" },
  calendar: { state: "calendar", src: `${base}/learning/milo-calendar.png`, alt: "Milo with a calendar", status: "ready", purpose: "Calendar and deadlines" },
  trophy: { state: "trophy", src: `${base}/rewards/milo-trophy.png`, alt: "Milo with a trophy", status: "ready", purpose: "Rewards and certificates" },

  // Pending assets are deliberately registered before UI integration so no page invents a one-off Milo.
  error: { state: "error", src: `${base}/system/milo-error.png`, alt: "Milo showing a friendly error", status: "pending", purpose: "Recoverable errors" },
  connection: { state: "connection", src: `${base}/system/milo-connection.png`, alt: "Milo checking the connection", status: "pending", purpose: "Network problems" },
  loading: { state: "loading", src: `${base}/system/milo-loading.png`, alt: "Milo waiting while the platform loads", status: "pending", purpose: "Loading and AI processing" },
  streak: { state: "streak", src: `${base}/rewards/milo-streak.png`, alt: "Milo celebrating a learning streak", status: "pending", purpose: "Streaks" },
  locked: { state: "locked", src: `${base}/navigation/milo-locked.png`, alt: "Milo beside a locked activity", status: "pending", purpose: "Locked activities" },
  almostThere: { state: "almostThere", src: `${base}/feedback/milo-almost-there.png`, alt: "Milo encouraging the student who is almost there", status: "pending", purpose: "Near mastery feedback" },
  perfectScore: { state: "perfectScore", src: `${base}/rewards/milo-perfect-score.png`, alt: "Milo celebrating a perfect score", status: "pending", purpose: "100 out of 100" },
  dailyWelcome: { state: "dailyWelcome", src: `${base}/welcome/milo-daily-welcome.png`, alt: "Milo welcoming the student back", status: "pending", purpose: "Daily welcome" },
  birthday: { state: "birthday", src: `${base}/seasonal/milo-birthday.png`, alt: "Milo celebrating a birthday", status: "pending", purpose: "Birthday celebration" }
};

export const MILO_PENDING_ASSETS = Object.values(MILO_ASSETS).filter((asset) => asset.status === "pending");

export function getMiloAsset(state: MiloState): MiloAsset {
  return MILO_ASSETS[state];
}

export function getMiloFeedbackState(score?: number): MiloState {
  if (typeof score !== "number") return "explaining";
  if (score >= 100) return "perfectScore";
  if (score >= 90) return "celebrating";
  if (score >= 80) return "correct";
  if (score >= 60) return "thinking";
  return "tryAgain";
}
