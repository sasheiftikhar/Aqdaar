import type { ReactNode } from "react";

type BrowserFrameProps = {
  url?: string;
  children: ReactNode;
  className?: string;
};

/** A reusable macOS-style window chrome used for the product mockups. */
export default function BrowserFrame({
  url = "console.aqdaar.co",
  children,
  className,
}: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-[#0b0b0d] shadow-2xl ${className ?? ""}`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate rounded bg-black/40 px-2 py-0.5 text-[11px] text-faint">
          🔒 {url}
        </span>
      </div>
      {children}
    </div>
  );
}
