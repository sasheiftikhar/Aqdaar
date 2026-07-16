type BrandTileProps = {
  label: string;
  color: string;
  size?: number;
};

/**
 * A small rounded "app icon" built from initials — avoids shipping any
 * third-party logos/images while keeping the grid visually varied.
 */
export default function BrandTile({ label, color, size = 34 }: BrandTileProps) {
  const initials = label
    .replace(/[^a-zA-Z0-9& ]/g, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-lg text-[13px] font-bold text-black/90"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(140deg, ${color}, ${color}cc)`,
        boxShadow: `0 0 0 1px ${color}55, 0 6px 16px -8px ${color}`,
      }}
      aria-hidden
    >
      {initials}
    </span>
  );
}
