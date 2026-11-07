"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Radio, User, ChevronLeft, Check, Loader2 } from "lucide-react";
import { PLANS } from "@/lib/plans";
import { generateCode, formatCountdown, formatNaira } from "@/lib/utils";
import type { Plan, Session } from "@/lib/types";

type Screen = "auth" | "home" | "checkout" | "success" | "connect" | "profile";

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

  return (
    <div className="min-h-dvh flex flex-col max-w-lg mx-auto relative">
      {/* AUTH */}
      {screen === "auth" && (
        <div className="flex-1 flex flex-col justify-center px-6 py-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 shadow-lg shadow-sky-500/30 mb-5">
              <Radio className="w-6 h-6 text-white" strokeWidth={2.2} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome to Beacon</h1>
            <p className="text-ink-400 mt-2 text-sm">
              Sign in to get temporary access to unlimited internet
            </p>
          </div>

          <div className="glass-strong rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-xs font-medium text-ink-400 mb-1.5 block">
                Phone or email
              </label>
              <input
                type="text"
                placeholder="you@example.com or +234..."
                className="w-full bg-ink-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-ink-600 focus:border-sky-500/50 focus:outline-none transition"
                defaultValue="demo@beacon.app"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-400 mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-ink-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-ink-600 focus:border-sky-500/50 focus:outline-none transition"
                defaultValue="demo1234"
              />
            </div>
            <button
              onClick={() => setScreen("home")}
              className="btn-primary w-full py-3.5 rounded-xl text-sm font-semibold text-white mt-2"
            >
              Continue
            </button>
            <p className="text-center text-xs text-ink-500 pt-1">
              Demo: any credentials work
            </p>
          </div>
          <p className="text-center text-xs text-ink-600 mt-8">
            By continuing you agree that access is temporary and device-bound.
          </p>
        </div>
      )}

      {/* HOME */}
      {screen === "home" && (
        <>
          <header className="px-5 pt-6 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center">
                <Radio className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-semibold">Beacon</span>
            </div>
            <button
              onClick={() => setScreen("profile")}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-ink-300"
            >
              <User className="w-4 h-4" />
            </button>
          </header>

          <main className="flex-1 px-5 pb-28 overflow-y-auto">
            {session && session.status === "active" ? (
              <div className="glass-strong rounded-2xl p-5 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      Live
                    </span>
                  </div>
                  <span className="text-xs text-ink-500">
                    {session.planLabel} plan
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-4xl font-bold tracking-tight tabular-nums">
                      {formatCountdown(remaining)}
                    </p>
                    <p className="text-sm text-ink-400 mt-1">remaining</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-ink-500 mb-1">Your code</p>
                    <p className="font-mono text-lg text-sky-300 tracking-widest">
                      {session.code}
                    </p>
                  </div>
                </div>
                <div className="mt-5 h-1.5 rounded-full bg-ink-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-1000"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <button
                  onClick={() => setScreen("connect")}
                  className="mt-5 w-full py-3 rounded-xl bg-white/8 hover:bg-white/12 text-sm font-medium transition"
                >
                  How to connect →
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold tracking-tight mb-1">Get online</h2>
                <p className="text-sm text-ink-400 mb-5">
                  Choose how long you need unlimited internet
                </p>
                <div className="space-y-3">
                  {PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelected(plan)}
                      className={`w-full text-left glass rounded-2xl p-4 flex items-center justify-between transition-all ${
                        selected.id === plan.id
                          ? "border-sky-500/50 bg-gradient-to-r from-sky-500/10 to-transparent"
                          : "hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-semibold">{plan.label}</p>
                          <p className="text-xs text-ink-500 mt-0.5">
                            {plan.description}
                          </p>
                        </div>
                        {plan.popular && (
                          <span className="text-[10px] font-bold uppercase bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full">
                            Best
                          </span>
                        )}
                      </div>
                      <p className="text-lg font-bold">{formatNaira(plan.price)}</p>
                    </button>
                  ))}
                </div>
              </>
            )}
          </main>

          {!session && (
            <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-ink-950 via-ink-950/95 to-transparent pt-10 max-w-lg mx-auto">
              <button
                onClick={startCheckout}
                className="btn-primary w-full py-4 rounded-2xl text-sm font-semibold text-white"
              >
                Continue with {selected.label} · {formatNaira(selected.price)}
              </button>
            </div>
          )}
        </>
      )}

      {/* CHECKOUT */}
      {screen === "checkout" && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <Loader2 className="w-12 h-12 text-sky-400 animate-spin mb-6" />
          <h2 className="text-xl font-bold">
            {checkoutPhase === 0
              ? "Processing payment…"
              : "Generating device-bound code…"}
          </h2>
          <p className="text-sm text-ink-400 mt-2 max-w-xs">
            {checkoutPhase === 0
              ? "Securing your device-bound access code"
              : "Binding to this browser fingerprint"}
          </p>
        </div>
      )}

      {/* SUCCESS */}
      {screen === "success" && session && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center mb-6">
            <Check className="w-9 h-9 text-emerald-400" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">You’re connected</h2>
          <p className="text-ink-400 mt-2 text-sm">
            Your access code is ready and locked to this device
          </p>

          <div className="glass-strong rounded-2xl p-6 w-full mt-8">
            <p className="text-xs text-ink-500 uppercase tracking-wider mb-2">
              Connection code
            </p>
            <p className="text-3xl font-mono font-bold text-sky-300 tracking-[0.25em]">
              {session.code}
            </p>
            <p className="text-xs text-ink-500 mt-3">
              Valid for {session.planLabel} · Expires automatically
            </p>
          </div>

          <button
            onClick={() => setScreen("home")}
            className="btn-primary w-full py-3.5 rounded-xl text-sm font-semibold text-white mt-8"
          >
            Go to dashboard
          </button>
          <button
            onClick={() => setScreen("connect")}
            className="mt-3 text-sm text-ink-400 hover:text-white transition"
          >
            Show connection steps
          </button>
        </div>
      )}

      {/* CONNECT */}
      {screen === "connect" && (
        <>
          <header className="px-5 pt-6 pb-2 flex items-center gap-3">
            <button
              onClick={() => setScreen("home")}
              className="w-9 h-9 rounded-full glass flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="font-semibold">How to connect</h1>
          </header>
          <main className="flex-1 px-5 py-6 space-y-4 overflow-y-auto">
            {[
              {
                n: "1",
                title: "Open Wi-Fi settings",
                body: (
                  <>
                    On your phone, go to Settings → Wi-Fi and look for the network
                    named{" "}
                    <span className="text-sky-300 font-medium">Beacon-Guest</span>{" "}
                    (or the name your host set).
                  </>
                ),
              },
              {
                n: "2",
                title: "Enter your code",
                body: (
                  <>
                    When the captive portal appears, enter the code below. It only
                    works on this device.
                    <p className="mt-3 font-mono text-xl text-sky-300 tracking-widest">
                      {session?.code ?? "—"}
                    </p>
                  </>
                ),
              },
              {
                n: "3",
                title: "You’re online",
                body: "Access lasts until the timer ends. No need to re-enter the code if you stay connected. When time is up you are automatically disconnected.",
              },
            ].map((step) => (
              <div key={step.n} className="glass rounded-2xl p-5">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center flex-shrink-0 text-sky-400 font-bold text-sm">
                    {step.n}
                  </div>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="text-sm text-ink-400 mt-1">{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="glass-strong rounded-2xl p-4 text-center text-xs text-ink-500">
              Real Starlink password is never shared. Access is temporary and
              device-bound.
            </div>
          </main>
        </>
      )}

      {/* PROFILE */}
      {screen === "profile" && (
        <>
          <header className="px-5 pt-6 pb-2 flex items-center gap-3">
            <button
              onClick={() => setScreen("home")}
              className="w-9 h-9 rounded-full glass flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="font-semibold">Account</h1>
          </header>
          <main className="flex-1 px-5 py-6">
            <div className="glass rounded-2xl p-5 mb-4">
              <p className="text-sm text-ink-400">Signed in as</p>
              <p className="font-medium mt-0.5">demo@beacon.app</p>
            </div>
            <div className="glass rounded-2xl divide-y divide-white/5 overflow-hidden">
              <button className="w-full text-left px-5 py-4 text-sm hover:bg-white/5 transition flex justify-between">
                <span>Past sessions</span>
                <span className="text-ink-500">→</span>
              </button>
              <button className="w-full text-left px-5 py-4 text-sm hover:bg-white/5 transition flex justify-between">
                <span>Payment methods</span>
                <span className="text-ink-500">→</span>
              </button>
              <button
                onClick={() => {
                  setSession(null);
                  setScreen("auth");
                }}
                className="w-full text-left px-5 py-4 text-sm text-rose-400 hover:bg-white/5 transition"
              >
                Sign out
              </button>
            </div>
            <p className="text-center text-xs text-ink-600 mt-10">
              Beacon demo · Investor preview ·{" "}
              <Link href="/" className="text-sky-400 hover:underline">
                Marketing site
              </Link>
            </p>
          </main>
        </>
      )}
    </div>
  );
}
