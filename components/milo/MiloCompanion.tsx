import { getMiloAsset, MiloState } from "@/lib/milo/catalog";

type MiloSize = "reaction" | "companion" | "hero";

type MiloCompanionProps = {
  state: MiloState;
  size?: MiloSize;
  message?: string;
  className?: string;
};

const sizes: Record<MiloSize, number> = {
  reaction: 72,
  companion: 132,
  hero: 220
};

export function MiloCompanion({ state, size = "companion", message, className = "" }: MiloCompanionProps) {
  const asset = getMiloAsset(state);

  // Pending art never renders a broken image. The UI can be wired now and the final PNG added later.
  if (asset.status !== "ready") return null;

  const width = sizes[size];

  return (
    <aside
      className={`milo-companion milo-companion--${size} ${className}`.trim()}
      data-milo-state={state}
      aria-label={message ? `Milo: ${message}` : asset.alt}
    >
      <img
        src={asset.src}
        alt={asset.alt}
        width={width}
        height={width}
        loading={size === "hero" ? "eager" : "lazy"}
        style={{ width, height: "auto", objectFit: "contain" }}
      />
      {message && <p className="milo-companion__message">{message}</p>}
    </aside>
  );
}
