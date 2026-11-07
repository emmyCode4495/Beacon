import { BeaconMark } from "./Logo";
import { cn } from "@/lib/utils";

interface VoucherProps {
  code: string;
  /** e.g. "24 hours" */
  plan: string;
  /** e.g. "17:42:09" */
  timeLeft: string;
  /** 0 to 100 */
  progress: number;
  /** Shown above the plan; the host who issued the pass */
  host?: string;
  live?: boolean;
  className?: string;
}

/**
 * The pass a neighbour buys: a code on top, time left on the stub.
 * Shared by the landing page, the app dashboard and the purchase screen so
 * the thing people pay for always looks the same.
 */
export function Voucher({
  code,
  plan,
  timeLeft,
  progress,
  host,
  live = true,
  className,
}: VoucherProps) {
  return (
    <div className={cn("voucher", className)}>
      <div className="px-5 pb-6 pt-5 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2">
            <BeaconMark className="h-6 w-6" />
            <span className="wide text-base font-extrabold tracking-tight">
              Beacon pass
            </span>
          </span>
          <span className="text-xs font-medium text-white/80">
            Works on one device
          </span>
        </div>

        <p className="wide lift-1 mt-8 text-2xl font-extrabold leading-tight">
          {plan}
        </p>
        {host && <p className="mt-1 text-sm text-white/80">{host}</p>}

        <p className="mt-6 text-xs text-white/80">Connection code</p>
        <p className="lift-2 mt-1 font-mono text-[2.5rem] font-semibold leading-none tracking-[0.1em] sm:text-5xl">
          {code}
        </p>
      </div>

      <div className="voucher-perf" aria-hidden />

      <div className="px-5 pb-5 pt-6 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="lift-1 font-mono text-3xl font-medium tabular-nums leading-none">
              {timeLeft}
            </p>
            <p className="mt-2 text-sm text-white/80">left on this pass</p>
          </div>
          {live && (
            <span className="mb-0.5 inline-flex items-center gap-2 text-sm font-medium">
              <span className="live-dot h-2.5 w-2.5 rounded-full bg-signal" />
              Live
            </span>
          )}
        </div>
        <div className="gauge mt-5" role="presentation">
          <span style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
        </div>
      </div>
    </div>
  );
}
