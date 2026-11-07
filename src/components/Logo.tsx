import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo files live in /public and are trimmed to the artwork, so the height
 * class alone sets the size and the width follows the aspect ratio:
 *   logo-lockup.png  symbol + "Beacon" wordmark
 *   logo-mark.png    symbol only (dish, house and swoosh)
 *   logo-full.png    lockup with the tagline, for places with room
 * The artwork is navy and blue on a transparent background, so use it on light
 * surfaces. On a dark or blue surface, put the symbol on a white chip.
 */

/** Symbol only. Size with a height class, e.g. "h-8". */
export function BeaconMark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-mark.png"
      alt=""
      width={640}
      height={565}
      className={cn("h-8 w-auto shrink-0", className)}
    />
  );
}

/** Symbol and wordmark. Size with a height class, e.g. "h-11". */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-lockup.png"
      alt="Beacon"
      width={900}
      height={282}
      priority
      className={cn("h-11 w-auto shrink-0", className)}
    />
  );
}
