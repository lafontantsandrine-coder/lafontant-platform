import { getMiloAsset } from "@/lib/milo/catalog";

export function MiloCourseMapMarker({
  label = "You are here",
  arriving = false
}: {
  label?: string;
  arriving?: boolean;
}) {
  const traveler = getMiloAsset("traveler");
  if (traveler.status !== "ready") return null;

  return (
    <div
      className={`milo-map-marker${arriving ? " milo-map-marker--arriving" : ""}`}
      aria-label={`Milo traveler. ${label}`}
      data-milo-map-marker="traveler"
    >
      <img src={traveler.src} alt={traveler.alt} width={96} height={96} />
      <span className="milo-map-marker__label">{label}</span>
    </div>
  );
}
