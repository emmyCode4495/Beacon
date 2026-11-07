import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The Beacon symbol: a dish above a house, ringed by a swoosh of signal.
 * The artwork is lit on black, so it sits in a rounded tile that works as an
 * app icon on any background. Size it with className (e.g. "h-10 w-10").
 */
export function BeaconMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-block h-8 w-8 shrink-0 overflow-hidden rounded-[9px] bg-black",
        className,
      )}
    >
      <Image
        src="/logo-mark.png"
        alt=""
        fill
        sizes="64px"
        className="origin-center scale-[1.3] object-cover"
        priority
      />
    </span>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BeaconMark />
      <span className="wide text-xl font-extrabold tracking-tight">Beacon</span>
    </span>
  );
}
