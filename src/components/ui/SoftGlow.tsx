/**
 * A dreamy, blurred pastel gradient blob used as an ambient section backdrop,
 * centered in the section. Deliberately very low-opacity so the pure-black base
 * stays intact — just a faint hint of the lavender → butter → mint gradient.
 */
export default function SoftGlow({
  className = "",
  position = "center",
}: {
  className?: string;
  position?: "top" | "center";
}) {
  const pos =
    position === "top"
      ? "left-1/2 top-0 -translate-x-1/2"
      : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";
  return (
    <div
      aria-hidden
      className={`bg-soft-gradient pointer-events-none absolute ${pos} h-[360px] w-[720px] rounded-full opacity-[0.07] blur-[140px] ${className}`}
    />
  );
}
