"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  User,
  ChevronLeft,
  Check,
  Loader2,
  Radio,
  Wallet,
  MapPin,
  Signal,
  Star,
} from "lucide-react";
import { Wordmark } from "@/components/Logo";
import { Voucher } from "@/components/Voucher";
import { Tilt } from "@/components/Tilt";
import { PLANS } from "@/lib/plans";
import { HOSTS, hostPrice } from "@/lib/hosts";
import { generateCode, formatCountdown, formatNaira } from "@/lib/utils";
import type { Plan, Session, Host } from "@/lib/types";

type Role = "guest" | "host" | null;
type Screen =
  | "auth"
  | "role"
  | "hosts"
  | "home"
  | "checkout"
  | "success"
  | "connect"
  | "profile"
  | "host";

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

function SignalBars({ level }: { level: number }) {
  return (
    <span className="inline-flex items-end gap-0.5" aria-label={`Signal ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`w-1 rounded-sm ${n <= level ? "bg-ok" : "bg-line-strong"}`}
          style={{ height: 4 + n * 2 }}
        />
      ))}
    </span>
  );
}

export default function AppPage() {
  const [screen, setScreen] = useState<Screen>("auth");
  const [role, setRole] = useState<Role>(null);
  const [selectedHost, setSelectedHost] = useState<Host | null>(null);
  const [selected, setSelected] = useState<Plan>(PLANS.find((p) => p.popular)!);
  const [session, setSession] = useState<Session | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [checkoutPhase, setCheckoutPhase] = useState(0);
  const [hostFilter, setHostFilter] = useState<"all" | "online">("online");
  const [hostEarnings] = useState(18500);
  const [hostActiveGuests] = useState(2);

  const visibleHosts = useMemo(() => {
    const list = hostFilter === "online" ? HOSTS.filter((h) => h.online) : HOSTS;
    return [...list].sort((a, b) => Number(b.online) - Number(a.online));
  }, [hostFilter]);

  const payAmount = selectedHost
    ? hostPrice(selected.price, selectedHost.priceMultiplier)
    : selected.price;

  useEffect(() => {
    if (!session || session.status !== "active") return;
    const tick = () => {
      const left = Math.max(0, session.expiresAt - Date.now());
      setRemaining(left);
      if (left <= 0) setSession(null);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [session]);

  const startCheckout = useCallback(() => {
    if (!selectedHost) return;
    setScreen("checkout");
    setCheckoutPhase(0);
    setTimeout(() => setCheckoutPhase(1), 1200);
    setTimeout(() => {
      const code = generateCode();
      const now = Date.now();
      setSession({
        id: crypto.randomUUID(),
        code,
        planId: selected.id,
        planLabel: selected.label,
        hostId: selectedHost.id,
        hostName: selectedHost.name,
        status: "active",
        deviceHash: "demo-device-" + Math.random().toString(36).slice(2, 10),
        startsAt: now,
        expiresAt: now + selected.durationSeconds * 1000,
        totalSeconds: selected.durationSeconds,
        createdAt: now,
      });
      setScreen("success");
    }, 2600);
  }, [selected, selectedHost]);

  const progressPct =
    session && session.totalSeconds > 0
      ? Math.min(100, (remaining / (session.totalSeconds * 1000)) * 100)
      : 0;

  const pickRole = (r: "guest" | "host") => {
    setRole(r);
    if (r === "host") setScreen("host");
    else setScreen("hosts");
  };

  const selectHost = (h: Host) => {
    if (!h.online) return;
    setSelectedHost(h);
    setScreen("home");
  };

  return (
    <div className="relative mx-auto flex min-h-dvh max-w-lg flex-col bg-paper text-ink">
      <div className="flex flex-1 flex-col">
        {/* AUTH */}
        {screen === "auth" && (
          <div className="flex flex-1 flex-col justify-center px-6 py-12">
            <div className="mb-10 text-center">
              <Wordmark className="mx-auto h-10" />
              <h1 className="wide mt-6 text-2xl font-extrabold tracking-tight">
                Share data. Get paid.
              </h1>
              <p className="mt-2 text-sm text-ink-soft">
                Hosts earn. Guests pick a vendor and buy a pass.
              </p>
            </div>
            <div className="space-y-4 rounded-2xl border border-line-strong bg-sheet p-6">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                  Phone or email
                </label>
                <input
                  type="text"
                  defaultValue="demo@beacon.app"
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-ultra focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                  Password
                </label>
                <input
                  type="password"
                  defaultValue="demo1234"
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:border-ultra focus:outline-none"
                />
              </div>
              <button
                onClick={() => setScreen("role")}
                className="btn btn-primary mt-2 w-full !py-3.5"
              >
                Continue
              </button>
              <p className="pt-1 text-center text-xs text-ink-soft">
                Demo: any credentials work
              </p>
            </div>
          </div>
        )}

        {/* ROLE */}
        {screen === "role" && (
          <div className="flex flex-1 flex-col justify-center px-6 py-12">
            <h1 className="wide text-2xl font-extrabold">How are you using Beacon?</h1>
            <p className="mt-2 text-ink-soft">You can switch later in Account.</p>
            <div className="mt-8 space-y-4">
              <button
                onClick={() => pickRole("host")}
                className="flex w-full items-start gap-4 rounded-2xl border-2 border-line-strong bg-sheet p-5 text-left transition hover:border-ultra"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ultra/10 text-ultra">
                  <Radio className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-bold">I have data — I want to host</span>
                  <span className="mt-1 block text-sm text-ink-soft">
                    Register as a vendor. Friends find you and buy passes.
                  </span>
                </span>
              </button>
              <button
                onClick={() => pickRole("guest")}
                className="flex w-full items-start gap-4 rounded-2xl border-2 border-line-strong bg-sheet p-5 text-left transition hover:border-ultra"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-signal/20 text-ink">
                  <Wallet className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-bold">I need data — I want a pass</span>
                  <span className="mt-1 block text-sm text-ink-soft">
                    Choose a registered host nearby, then buy hours.
                  </span>
                </span>
              </button>
            </div>
          </div>
        )}

        {/* HOST PICKER (vendors) */}
        {screen === "hosts" && (
          <>
            <header className="flex items-center justify-between px-5 pb-3 pt-6">
              <Wordmark className="h-9" />
              <button
                onClick={() => setScreen("profile")}
                aria-label="Account"
                className="flex h-10 w-10 items-center justify-center rounded-lg border-[1.5px] border-line-strong bg-sheet hover:border-ink"
              >
                <User className="h-[18px] w-[18px]" />
              </button>
            </header>
            <main className="flex-1 overflow-y-auto px-5 pb-8">
              <h1 className="wide text-2xl font-extrabold">Choose a host</h1>
              <p className="mt-1 text-sm text-ink-soft">
                Registered vendors near you. Pick who you want data from.
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setHostFilter("online")}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${
                    hostFilter === "online"
                      ? "bg-ink text-paper"
                      : "border border-line-strong bg-sheet text-ink-soft"
                  }`}
                >
                  Online now
                </button>
                <button
                  onClick={() => setHostFilter("all")}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${
                    hostFilter === "all"
                      ? "bg-ink text-paper"
                      : "border border-line-strong bg-sheet text-ink-soft"
                  }`}
                >
                  All hosts
                </button>
              </div>

              <ul className="mt-5 space-y-3">
                {visibleHosts.map((h) => {
                  const disabled = !h.online;
                  return (
                    <li key={h.id}>
                      <button
                        onClick={() => selectHost(h)}
                        disabled={disabled}
                        className={`flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition ${
                          disabled
                            ? "cursor-not-allowed border-line bg-sheet/50 opacity-60"
                            : "border-line-strong bg-sheet hover:border-ultra"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                            h.online
                              ? "bg-ok/15 text-ok"
                              : "bg-line text-ink-soft"
                          }`}
                        >
                          {h.name.charAt(0)}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="truncate font-bold">{h.name}</span>
                            {h.online ? (
                              <span className="shrink-0 rounded-full bg-ok/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ok">
                                Online
                              </span>
                            ) : (
                              <span className="shrink-0 rounded-full bg-line px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-soft">
                                Offline
                              </span>
                            )}
                          </span>
                          <span className="mt-1 flex items-center gap-1 text-sm text-ink-soft">
                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{h.location}</span>
                          </span>
                          <span className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink-soft">
                            <span className="inline-flex items-center gap-1">
                              <SignalBars level={h.signal} />
                              <span className="ml-1">{h.networkType}</span>
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Star className="h-3 w-3 fill-signal text-signal" />
                              {h.rating.toFixed(1)}
                            </span>
                            <span>{h.sessionsCompleted} passes</span>
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {visibleHosts.length === 0 && (
                <p className="mt-10 text-center text-sm text-ink-soft">
                  No hosts match this filter. Try “All hosts”.
                </p>
              )}
            </main>
          </>
        )}

        {/* HOST DASHBOARD */}
        {screen === "host" && (
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
            <main className="flex-1 overflow-y-auto px-5 pb-10 pt-2">
              <h1 className="wide text-2xl font-extrabold">Host dashboard</h1>
              <p className="mt-1 text-sm text-ink-soft">
                You’re listed as a vendor. Guests can find and pay you.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-line-strong bg-sheet p-4">
                  <p className="text-xs font-medium text-ink-soft">This week</p>
                  <p className="mt-1 text-2xl font-extrabold tabular-nums">
                    {formatNaira(hostEarnings)}
                  </p>
                </div>
                <div className="rounded-xl border border-line-strong bg-sheet p-4">
                  <p className="text-xs font-medium text-ink-soft">Active guests</p>
                  <p className="mt-1 text-2xl font-extrabold tabular-nums">
                    {hostActiveGuests}
                  </p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-line-strong bg-sheet p-5">
                <h2 className="font-bold">You’re discoverable</h2>
                <p className="mt-2 text-sm text-ink-soft">
                  Guests see your name, area, network type, and online status when
                  they choose a host.
                </p>
                <ol className="mt-4 space-y-3 text-sm text-ink-soft">
                  <li className="flex gap-3">
                    <span className="font-bold text-ink">1.</span>
                    Turn on hotspot or share your Wi‑Fi.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-ink">2.</span>
                    Stay marked Online in Beacon.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-ink">3.</span>
                    Guests pick you → pay → get a code for your network.
                  </li>
                </ol>
                <button className="btn btn-primary mt-5 w-full">
                  Copy my invite link
                </button>
              </div>
            </main>
          </>
        )}

        {/* GUEST PLANS (after host selected) */}
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
                  <h1 className="wide mb-2 text-2xl font-extrabold">
                    Your pass is running
                  </h1>
                  <p className="mb-5 text-sm text-ink-soft">
                    Via {session.hostName}
                  </p>
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
                  {selectedHost && (
                    <button
                      onClick={() => setScreen("hosts")}
                      className="mb-4 flex w-full items-center gap-3 rounded-xl border border-line-strong bg-sheet px-3 py-3 text-left hover:border-ink"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ok/15 text-sm font-bold text-ok">
                        {selectedHost.name.charAt(0)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold">
                          {selectedHost.name}
                        </span>
                        <span className="block truncate text-xs text-ink-soft">
                          {selectedHost.location} · {selectedHost.networkType}
                        </span>
                      </span>
                      <span className="text-xs font-semibold text-ultra">Change</span>
                    </button>
                  )}
                  <h1 className="wide text-2xl font-extrabold">Choose a pass</h1>
                  <p className="mb-6 mt-2 text-ink-soft">
                    Prices from this host. Code locks to this phone.
                  </p>
                  <div role="radiogroup" aria-label="Pass length" className="space-y-3">
                    {PLANS.map((plan) => {
                      const on = selected.id === plan.id;
                      const price = selectedHost
                        ? hostPrice(plan.price, selectedHost.priceMultiplier)
                        : plan.price;
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
                            {on && (
                              <span className="pop h-2.5 w-2.5 rounded-full bg-ultra" />
                            )}
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
                            {formatNaira(price)}
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
              {checkoutPhase === 0
                ? "Confirming your payment"
                : "Issuing your code"}
            </h1>
            <p className="mt-2 text-ink-soft">
              {selectedHost
                ? `Paying ${selectedHost.name} for ${selected.label}`
                : "Keep this screen open."}
            </p>
            <ul className="mt-8 space-y-4" aria-live="polite">
              {[
                {
                  label: "Payment confirmed",
                  done: checkoutPhase >= 1,
                  active: checkoutPhase === 0,
                },
                {
                  label: "Code issued for this host",
                  done: false,
                  active: checkoutPhase === 1,
                },
                {
                  label: "Locked to this phone",
                  done: false,
                  active: false,
                },
              ].map((s) => (
                <li key={s.label} className="flex items-center gap-3">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                      s.done
                        ? "border-ok bg-ok text-white"
                        : s.active
                          ? "border-ultra"
                          : "border-line-strong"
                    }`}
                  >
                    {s.done ? (
                      <Check className="h-4 w-4" strokeWidth={3} />
                    ) : s.active ? (
                      <Loader2 className="h-4 w-4 animate-spin text-ultra" />
                    ) : null}
                  </span>
                  <span
                    className={s.done || s.active ? "font-medium" : "text-ink-soft"}
                  >
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* SUCCESS */}
        {screen === "success" && session && (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ok/15">
              <Check className="h-8 w-8 text-ok" strokeWidth={2.5} />
            </div>
            <h1 className="wide text-2xl font-extrabold">You’re set</h1>
            <p className="mt-2 text-sm text-ink-soft">
              {session.hostName} · {session.planLabel} · locked to this device
            </p>
            <div className="mt-8 w-full">
              <Tilt>
                <Voucher
                  code={session.code}
                  plan={session.planLabel}
                  timeLeft={formatCountdown(session.expiresAt - Date.now())}
                  progress={100}
                />
              </Tilt>
            </div>
            <button
              onClick={() => setScreen("home")}
              className="btn btn-primary mt-8 w-full"
            >
              Go to dashboard
            </button>
            <button
              onClick={() => setScreen("connect")}
              className="mt-3 text-sm font-semibold text-ink-soft underline underline-offset-4"
            >
              How to connect
            </button>
          </div>
        )}

        {/* CONNECT */}
        {screen === "connect" && (
          <>
            <BackHeader title="How to connect" onBack={() => setScreen("home")} />
            <main className="flex-1 overflow-y-auto px-5 py-6">
              {session && (
                <p className="mb-4 rounded-xl border border-line bg-sheet px-4 py-3 text-sm">
                  Host: <strong>{session.hostName}</strong>
                </p>
              )}
              <ol className="space-y-5">
                {[
                  {
                    n: "1",
                    title: "Connect to this host’s network",
                    body: "Open Settings → Wi‑Fi and join the network name they shared (hotspot or Wi‑Fi).",
                  },
                  {
                    n: "2",
                    title: "Enter your Beacon code if asked",
                    body: (
                      <>
                        Some hosts use a voucher field. Enter:
                        <span className="mt-2 block font-mono text-xl tracking-widest text-ultra">
                          {session?.code ?? "—"}
                        </span>
                      </>
                    ),
                  },
                  {
                    n: "3",
                    title: "Online until the timer ends",
                    body: "When time is up the session expires. Buy another pass from the same or a different host.",
                  },
                ].map((step) => (
                  <li
                    key={step.n}
                    className="flex gap-4 rounded-xl border border-line-strong bg-sheet p-5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ultra/10 text-sm font-bold text-ultra">
                      {step.n}
                    </span>
                    <div>
                      <p className="font-bold">{step.title}</p>
                      <div className="mt-1 text-sm text-ink-soft">{step.body}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </main>
          </>
        )}

        {/* PROFILE */}
        {screen === "profile" && (
          <>
            <BackHeader
              title="Account"
              onBack={() =>
                setScreen(
                  role === "host" ? "host" : selectedHost ? "home" : "hosts"
                )
              }
            />
            <main className="flex-1 px-5 py-6">
              <div className="rounded-xl border border-line bg-sheet p-5">
                <p className="text-sm text-ink-soft">Signed in as</p>
                <p className="mt-0.5 font-semibold">demo@beacon.app</p>
                <p className="mt-2 text-xs text-ink-soft">
                  Mode: {role === "host" ? "Host" : "Guest"}
                  {selectedHost && role === "guest"
                    ? ` · Host: ${selectedHost.name}`
                    : ""}
                </p>
              </div>
              <ul className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-sheet">
                {role === "guest" && (
                  <li>
                    <button
                      onClick={() => setScreen("hosts")}
                      className="flex w-full justify-between px-5 py-4 text-left font-medium hover:bg-paper"
                    >
                      Change host / vendor
                    </button>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => setScreen("role")}
                    className="flex w-full justify-between px-5 py-4 text-left font-medium hover:bg-paper"
                  >
                    Switch Host / Guest
                  </button>
                </li>
                <li>
                  <button className="flex w-full justify-between px-5 py-4 text-left font-medium hover:bg-paper">
                    Past passes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSession(null);
                      setSelectedHost(null);
                      setRole(null);
                      setScreen("auth");
                    }}
                    className="w-full px-5 py-4 text-left font-semibold text-signal-deep hover:bg-paper"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
              <p className="mt-10 text-center text-xs text-ink-soft">
                Beacon demo.{" "}
                <Link
                  href="/"
                  className="font-semibold text-ultra underline underline-offset-4"
                >
                  Website
                </Link>
              </p>
            </main>
          </>
        )}
      </div>

      {screen === "home" && !session && selectedHost && (
        <div className="fixed inset-x-0 bottom-0 mx-auto max-w-lg border-t border-line bg-paper px-5 pb-5 pt-4">
          <button onClick={startCheckout} className="btn btn-primary w-full !py-4">
            Pay {formatNaira(payAmount)} for {selected.label}
          </button>
        </div>
      )}
    </div>
  );
}
