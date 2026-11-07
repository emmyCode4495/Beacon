"use client";

import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Tilts its child in 3D toward the mouse, with a soft glare that follows the
 * pointer. Mouse only: touch scrolling is left alone, and nothing moves for
 * people who prefer reduced motion.
 */
export function Tilt({
  children,
  className,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees */
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.setAttribute("data-active", "");
      el.style.setProperty("--ry", `${(px - 0.5) * 2 * max}deg`);
      el.style.setProperty("--rx", `${-(py - 0.5) * 2 * max}deg`);
      el.style.setProperty("--gx", `${px * 100}%`);
      el.style.setProperty("--gy", `${py * 100}%`);
    });
  };

  const leave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.removeAttribute("data-active");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      className={cn("tilt", className)}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {children}
      <div className="tilt-glare" aria-hidden />
    </div>
  );
}
