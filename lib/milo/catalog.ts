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
  | "traveler"
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
const pending = (state: MiloState, src: string, alt: string, purpose: string): MiloAsset => ({ state, src, alt, status: "pending", purpose });

// IMPORTANT: an asset is only marked ready after its PNG is physically verified in /public.
// This prevents registered-but-missing mascot paths from producing broken images in production.
export const MILO_ASSETS: Record<MiloState, MiloAsset> = {
  welcome: pending("welcome", `${base}/welcome/milo-welcome.png`, "Milo welcoming the student", "General welcome"),
  pointingRight: pending("pointingRight", `${base}/navigation/milo-pointing-right.png`, "Milo pointing to the next step", "Navigation and next step"),
  explaining: pending("explaining", `${base}/learning/milo-explaining.png`, "Milo explaining", "Explanations and tips"),
  thinking: pending("thinking", `${base}/learning/milo-thinking.png`, "Milo thinking", "AI analysis and reflection"),
  listening: pending("listening", `${base}/skills/milo-listening.png`, "Milo listening", "Listening activities"),
  reading: pending("reading", `${base}/skills/milo-reading.png`, "Milo reading", "Reading activities"),
  speaking: pending("speaking", `${base}/skills/milo-speaking.png`, "Milo speaking", "Speaking activities"),
  writing: pending("writing", `${base}/skills/milo-writing.png`, "Milo writing", "Writing activities"),
  recording: pending("recording", `${base}/skills/milo-recording.png`, "Milo recording audio", "Audio recording"),
  correct: pending("correct", `${base}/feedback/milo-correct.png`, "Milo celebrating a correct answer", "Positive feedback"),
  tryAgain: pending("tryAgain", `${base}/feedback/milo-try-again.png`, "Milo encouraging another try", "Retry feedback"),
  celebrating: pending("celebrating", `${base}/feedback/milo-celebrating.png`, "Milo celebrating", "Milestones"),
  unlock: pending("unlock", `${base}/navigation/milo-unlock.png`, "Milo unlocking the next activity", "Unlock feedback"),
  calendar: pending("calendar", `${base}/learning/milo-calendar.png`, "Milo with a calendar", "Calendar and deadlines"),
  trophy: pending("trophy", `${base}/rewards/milo-trophy.png`, "Milo with a trophy", "Rewards and certificates"),
  traveler: pending("traveler", `${base}/maps/milo-traveler.png`, "Milo traveling through the course map", "Persistent player marker that moves from point to point on platform course maps"),
  error: pending("error", `${base}/system/milo-error.png`, "Milo showing a friendly error", "Recoverable errors"),
  connection: pending("connection", `${base}/system/milo-connection.png`, "Milo checking the connection", "Network problems"),
  loading: pending("loading", `${base}/system/milo-loading.png`, "Milo waiting while the platform loads", "Loading and AI processing"),
  streak: pending("streak", `${base}/rewards/milo-streak.png`, "Milo celebrating a learning streak", "Streaks"),
  locked: pending("locked", `${base}/navigation/milo-locked.png`, "Milo beside a locked activity", "Locked activities"),
  almostThere: pending("almostThere", `${base}/feedback/milo-almost-there.png`, "Milo encouraging the student who is almost there", "Near mastery feedback"),
  perfectScore: pending("perfectScore", `${base}/rewards/milo-perfect-score.png`, "Milo celebrating a perfect score", "100 out of 100"),
  dailyWelcome: pending("dailyWelcome", `${base}/welcome/milo-daily-welcome.png`, "Milo welcoming the student back", "Daily welcome"),
  birthday: pending("birthday", `${base}/seasonal/milo-birthday.png`, "Milo celebrating a birthday", "Birthday celebration")
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
