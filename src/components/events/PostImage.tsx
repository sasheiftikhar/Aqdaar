import Image from "next/image";

/**
 * An event's Instagram creative, cropped to fill its slot.
 *
 * The five posts aren't one shape — three are square, two are 4:5 portrait — so
 * every slot fixes its own ratio and `object-cover` centre-crops whatever lands
 * in it. Square slots are what the feed and recaps use, since that's the native
 * ratio of the majority and costs the least crop.
 */

const RATIOS = {
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
  "16:9": "aspect-[16/9]",
} as const;

export default function PostImage({
  src,
  alt,
  ratio = "1:1",
  href,
  priority,
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px",
}: {
  src: string;
  alt: string;
  ratio?: keyof typeof RATIOS;
  /** Instagram permalink — makes the image click through to the post. */
  href?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const frame = (
    <div
      className={`${RATIOS[ratio]} relative w-full overflow-hidden rounded-2xl border border-border bg-surface-2`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover/img:scale-[1.04]"
      />
    </div>
  );

  if (!href) return frame;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group/img block"
      aria-label={`${alt} — open on Instagram`}
    >
      {frame}
    </a>
  );
}
