"use client";

import { useState, useEffect, useCallback } from "react";
import type { FormEvent, ReactNode } from "react";
import Link from "next/link";
import { User, ChevronLeft, Check, Loader2 } from "lucide-react";
import { Wordmark } from "@/components/Logo";
import { Voucher } from "@/components/Voucher";
import { Tilt } from "@/components/Tilt";
import { PLANS } from "@/lib/plans";
import { generateCode, formatCountdown, formatNaira } from "@/lib/utils";
import type { Plan, Session } from "@/lib/types";

type Screen = "auth" | "home" | "checkout" | "success" | "connect" | "profile";

function BackHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <header className="flex items-center gap-3 px-5 pb-2 pt-6">
      <button
        onClick={onBack}
        aria-label="Back"
        className="flex h-10 w-10 items-center justify-center rounded-lg border-[1.5px] border-line-strong bg-sheet hover:border-ink"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <h1 className="wide text-lg font-extrabold">{title}</h1>
    </header>
  );
}

export default function AppPage() {
  const [screen, setScreen] = useState<Screen>("auth");
  const [selected, setSelected] = useState<Plan>(PLANS.find((p) => p.popular)!);
  const [session, setSession] = useState<Session | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [checkoutPhase, setCheckoutPhase] = useState(0);

  // Countdown
  useEffect(() => {
    if (!session || session.status !== "active") return;
    const tick = () => {
      const left = Math.max(0, session.expiresAt - Date.now());
      setRemaining(left);
      if (left <= 0) {
        setSession(null);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [session]);

  const startCheckout = useCallback(() => {
    setScreen("checkout");
    setCheckoutPhase(0);
    setTimeout(() => setCheckoutPhase(1), 1200);
    setTimeout(() => {
      const code = generateCode();
      const now = Date.now();
      const newSession: Session = {
        id: crypto.randomUUID(),
        code,
        planId: selected.id,
        planLabel: selected.label,
        status: "active",
        deviceHash: "demo-device-" + Math.random().toString(36).slice(2, 10),
        startsAt: now,
        expiresAt: now + selected.durationSeconds * 1000,
        totalSeconds: selected.durationSeconds,
        createdAt: now,
      };
      setSession(newSession);
      setScreen("success");
    }, 2600);
  }, [selected]);

  const progressPct =
    session && session.totalSeconds > 0
      ? Math.min(100, (remaining / (session.totalSeconds * 1000)) * 100)
      : 0;

  const onSignIn = (e: FormEvent) => {
    e.preventDefault();
    setScreen("home");
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col sm:border-x sm:border-line">
      <div key={screen} className="screen-in flex flex-1 flex-col">
      {/* AUTH */}
      {screen === "auth" && (
        <div className="flex flex-1 flex-col justify-center px-6 py-12">
          <Wordmark className="mb-12 h-12 self-start" />
          <h1 className="wide text-3xl font-extrabold leading-tight tracking-tight">
            Sign in to buy a pass
          </h1>
          <p className="mt-3 text-ink-soft">
            You&rsquo;ll get a code that works on this phone only.
          </p>

          <form onSubmit={onSignIn} className="mt-8 space-y-5">
            <div>
              <label htmlFor="id" className="mb-1.5 block text-sm font-semibold">
                Phone or email
              </label>
              <input
                id="id"
                name="id"
                type="text"
                autoComplete="username"
                placeholder="you@example.com or +234…"
                className="field"
                defaultValue="demo@beacon.app"
              />
            </div>
            <div>
              <label htmlFor="pw" className="mb-1.5 block text-sm font-semibold">
                Password
              </label>
              <input
                id="pw"
                name="pw"
                type="password"
                autoComplete="current-password"
                placeholder="Your password"
                className="field"
                defaultValue="demo1234"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full !py-3.5">
              Continue
            </button>
            <p className="text-center text-sm text-ink-soft">
              This is a demo, so any details will work.
            </p>
          </form>
          <p className="mt-10 text-center text-xs leading-relaxed text-ink-soft">
            By continuing you agree that access is temporary and tied to one
            device.
          </p>
        </div>
      )}

      {/* HOME */}
      {screen === "home" && (
        <>
          <header className="flex items-center justify-between px-5 pb-4 pt-6">
            <Wordmark className="h-9" />
            <button
              onClick={() => setScreen("profile")}
              aria-label="Account"
              className="flex h-10 w-10 items-center justify-center rounded-lg border-[1.5px] border-line-strong bg-sheet hover:border-ink"
            >
              <User className="h-[18px] w-[18px]" />
            </button>
          </header>

          <main className="flex-1 overflow-y-auto px-5 pb-32 pt-2">
            {session && session.status === "active" ? (
              <>
                <h1 className="wide mb-5 text-2xl font-extrabold">
                  Your pass is running
                </h1>
                <Tilt>
                  <Voucher
                    code={session.code}
                    plan={session.planLabel}
                    timeLeft={formatCountdown(remaining)}
                    progress={progressPct}
                  />
                </Tilt>
                <button
                  onClick={() => setScreen("connect")}
                  className="btn btn-outline mt-6 w-full"
                >
                  How to connect
                </button>
              </>
            ) : (
              <>
                <h1 className="wide text-2xl font-extrabold">Get online</h1>
                <p className="mb-6 mt-2 text-ink-soft">
                  Pick how long you need unlimited internet.
                </p>
                <div role="radiogroup" aria-label="Pass length" className="space-y-3">
                  {PLANS.map((plan) => {
                    const on = selected.id === plan.id;
                    return (
                      <button
                        key={plan.id}
                        role="radio"
                        aria-checked={on}
                        onClick={() => setSelected(plan)}
                        className={`flex w-full items-center gap-4 rounded-xl border-2 px-4 py-4 text-left transition-colors ${
                          on
                            ? "border-ultra bg-sheet"
                            : "border-line bg-transparent hover:border-line-strong"
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                            on ? "border-ultra" : "border-line-strong"
                          }`}
                          aria-hidden
                        >
                          {on && <span className="pop h-2.5 w-2.5 rounded-full bg-ultra" />}
                        </span>
                        <span className="flex-1">
                          <span className="block font-bold">{plan.label}</span>
                          <span className="mt-0.5 flex items-center gap-2 text-sm text-ink-soft">
                            {plan.description}
                            {plan.popular && (
                              <span className="rounded bg-signal px-1.5 py-0.5 text-xs font-bold text-ink">
                                Most chosen
                              </span>
                            )}
                          </span>
                        </span>
                        <span className="wide text-lg font-extrabold tabular-nums">
                          {formatNaira(plan.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </main>
        </>
      )}

      {/* CHECKOUT */}
      {screen === "checkout" && (
        <div className="flex flex-1 flex-col justify-center px-6">
          <h1 className="wide text-2xl font-extrabold leading-tight">
            {checkoutPhase === 0 ? "Confirming your payment" : "Issuing your code"}
          </h1>
          <p className="mt-2 text-ink-soft">
            Keep this screen open. It takes a few seconds.
          </p>
          <ul className="mt-8 space-y-4" aria-live="polite">
            {[
              { label: "Payment confirmed", done: checkoutPhase >= 1, active: checkoutPhase === 0 },
              { label: "Code issued", done: false, active: checkoutPhase === 1 },
              { label: "Locked to this phone", done: false, active: false },
            ].map((s) => (
              <li key={s.label} className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                    s.done ? "border-ok bg-ok text-white" : "border-line-strong"
                  }`}
                >
                  {s.done ? (
                    <Check className="pop h-4 w-4" strokeWidth={3} />
                  ) : s.active ? (
                    <Loader2 className="h-4 w-4 animate-spin text-ultra" />
                  ) : null}
                </span>
                <span className={s.done || s.active ? "font-semibold" : "text-ink-soft"}>
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SUCCESS */}
      {screen === "success" && session && (
        <div className="flex flex-1 flex-col justify-center px-6 py-10">
          <h1 className="wide text-3xl font-extrabold leading-tight tracking-tight">
            Your pass is ready
          </h1>
          <p className="mb-8 mt-3 text-ink-soft">
            The code works on this phone only and expires on its own.
          </p>

          <div className="pass-flip">
            <Tilt>
              <Voucher
                code={session.code}
                plan={session.planLabel}
                timeLeft={formatCountdown(remaining || session.totalSeconds * 1000)}
                progress={progressPct || 100}
              />
            </Tilt>
          </div>

          <button
            onClick={() => setScreen("connect")}
            className="btn btn-primary mt-8 w-full !py-3.5"
          >
            Connect to the Wi-Fi
          </button>
          <button
            onClick={() => setScreen("home")}
            className="btn mt-2 w-full text-ink-soft hover:text-ink"
          >
            Go to dashboard
          </button>
        </div>
      )}

      {/* CONNECT */}
      {screen === "connect" && (
        <>
          <BackHeader title="How to connect" onBack={() => setScreen("home")} />
          <main className="flex-1 overflow-y-auto px-5 py-6">
            <ol className="relative space-y-8">
              {(
                [
                  {
                    title: "Open Wi-Fi settings",
                    body: (
                      <>
                        On your phone, open Settings, then Wi-Fi, and choose the
                        network called{" "}
                        <strong className="font-bold text-ink">Beacon-Guest</strong>{" "}
                        (or the name your host set).
                      </>
                    ),
                  },
                  {
                    title: "Enter your code",
                    body: (
                      <>
                        When the sign-in page opens, type the code below. It only
                        works on this phone.
                        <span className="mt-3 block rounded-lg bg-ultra px-4 py-3 text-center font-mono text-2xl font-semibold tracking-[0.12em] text-white">
                          {session?.code ?? "No active pass"}
                        </span>
                      </>
                    ),
                  },
                  {
                    title: "You’re online",
                    body: "You stay connected until the timer ends, with no need to enter the code again. When time is up you are disconnected automatically.",
                  },
                ] as { title: string; body: ReactNode }[]
              ).map((step, i, all) => (
                <li key={step.title} className="relative flex gap-4">
                  {i < all.length - 1 && (
                    <span
                      className="absolute left-[15px] top-9 -bottom-8 border-l-2 border-dashed border-line-strong"
                      aria-hidden
                    />
                  )}
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-sm font-semibold text-paper">
                    {i + 1}
                  </span>
                  <div className="pt-0.5">
                    <h2 className="font-bold">{step.title}</h2>
                    <div className="mt-1 leading-relaxed text-ink-soft">{step.body}</div>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 border-t-2 border-dashed border-line-strong pt-5 text-sm text-ink-soft">
              The host&rsquo;s real Wi-Fi password is never shared. Your access is
              temporary and tied to this device.
            </p>
          </main>
        </>
      )}

      {/* PROFILE */}
      {screen === "profile" && (
        <>
          <BackHeader title="Account" onBack={() => setScreen("home")} />
          <main className="flex-1 px-5 py-6">
            <div className="rounded-xl border border-line bg-sheet p-5">
              <p className="text-sm text-ink-soft">Signed in as</p>
              <p className="mt-0.5 font-semibold">demo@beacon.app</p>
            </div>
            <ul className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-sheet">
              <li>
                <button className="flex w-full justify-between px-5 py-4 text-left font-medium hover:bg-paper">
                  Past passes
                </button>
              </li>
              <li>
                <button className="flex w-full justify-between px-5 py-4 text-left font-medium hover:bg-paper">
                  Payment methods
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSession(null);
                    setScreen("auth");
                  }}
                  className="w-full px-5 py-4 text-left font-semibold text-signal-deep hover:bg-paper"
                >
                  Sign out
                </button>
              </li>
            </ul>
            <p className="mt-10 text-center text-xs text-ink-soft">
              Beacon demo for investors.{" "}
              <Link href="/" className="font-semibold text-ultra underline underline-offset-4">
                Back to the website
              </Link>
            </p>
          </main>
        </>
      )}
      </div>

      {/* Sits outside the animated screen so it stays pinned to the window */}
      {screen === "home" && !session && (
        <div className="fixed inset-x-0 bottom-0 mx-auto max-w-lg border-t border-line bg-paper px-5 pb-5 pt-4">
          <button onClick={startCheckout} className="btn btn-primary w-full !py-4">
            Pay {formatNaira(selected.price)} for {selected.label}
          </button>
        </div>
      )}
    </div>
  );
}
