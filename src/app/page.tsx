import Link from "next/link";
import type { CSSProperties } from "react";
import { Wordmark } from "@/components/Logo";
import { LiveVoucher } from "@/components/LiveVoucher";
import { InView } from "@/components/InView";
import { PLANS } from "@/lib/plans";
import { formatNaira } from "@/lib/utils";

const STEPS = [
  {
    title: "A friend buys a pass",
    body: "They choose a registered host, pick 1 hour to a week, and pay by card, transfer or mobile money through Beacon.",
    proof: "₦2,500 for 24 hours",
  },
  {
    title: "A code is locked to their phone",
    body: "The code is issued the moment payment clears and tied to that one device. Forwarding it to someone else does nothing.",
    proof: "B7K-9M2",
  },
  {
    title: "Access ends on time",
    body: "When the paid window ends, the session is revoked. You never chase anyone. Your hotspot password stays yours.",
    proof: "Revoked at 19:02:11",
  },
];

const GUARANTEES = [
  {
    title: "Locked to one device",
    body: "The code is bound to a device fingerprint, so it fails on any other phone or laptop.",
  },
  {
    title: "Hard stop on expiry",
    body: "The session timer is enforced by the platform. Closing the app does not extend access.",
  },
  {
    title: "You stay in control",
    body: "Your hotspot password is never shared. Guests only get a temporary, device-bound pass.",
  },
];

const LOG = [
  { t: "19:02:11", e: "Payment confirmed", d: "₦2,500 for 24 hours" },
  { t: "19:02:12", e: "Code issued", d: "B7K-9M2" },
  { t: "19:04:40", e: "Device bound", d: "a3f9…c21e" },
  { t: "19:04:41", e: "Access granted", d: "session active" },
  { t: "+24h", e: "Access revoked", d: "session expired", end: true },
];

function perHour(price: number, seconds: number) {
  return price / (seconds / 3600);
}

export default function LandingPage() {
  const maxPerHour = Math.max(
    ...PLANS.map((p) => perHour(p.price, p.durationSeconds))
  );

  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" aria-label="Beacon home">
          <Wordmark />
        </Link>
        <nav
          aria-label="Main"
          className="hidden items-center gap-9 text-[0.95rem] font-medium text-ink-soft md:flex"
        >
          <a href="#how" className="hover:text-ink hover:underline underline-offset-4">
            How it works
          </a>
          <a href="#plans" className="hover:text-ink hover:underline underline-offset-4">
            Plans
          </a>
          <Link href="/docs" className="hover:text-ink hover:underline underline-offset-4">
            Investors
          </Link>
        </nav>
        <Link href="/app" className="btn btn-outline !px-4 !py-2 text-sm">
          Open app
        </Link>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8 md:pb-28 md:pt-16">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-ink-soft">
              Campus · Neighbourhood · Compound
            </p>
            <h1 className="wide text-[clamp(2.4rem,6.2vw,4.6rem)] font-extrabold leading-[1.02] tracking-tight">
              Share your data. Get paid. Stay in control.
            </h1>
            <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-ink-soft">
              Anyone with mobile data (or Wi‑Fi) can host. Friends pay through
              Beacon for the hours they need, get a code locked to their phone,
              and are cut off when time is up. Your password never leaves your
              device.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <Link href="/app" className="btn btn-primary sm:px-8">
                Try the demo
              </Link>
              <a
                href="#how"
                className="text-center text-sm font-semibold text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink"
              >
                See how it works
              </a>
            </div>
            <p className="mt-6 text-sm text-ink-soft">
              Works with phone hotspot, home Wi‑Fi, Starlink, or any shared
              connection.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <LiveVoucher />
          </div>
        </div>
      </section>

      <section className="border-y border-line-strong bg-sheet/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-2">
          <div className="rounded-2xl border border-line-strong bg-paper p-7">
            <p className="text-xs font-bold uppercase tracking-widest text-ink-soft">
              Host
            </p>
            <h2 className="wide mt-2 text-2xl font-extrabold">You have data</h2>
            <p className="mt-3 text-ink-soft leading-relaxed">
              Turn on your hotspot (or share your Wi‑Fi). Set your prices. Share
              your Beacon link or QR with friends on campus or in the area. They
              pay you through the platform. You earn while your connection is
              working.
            </p>
          </div>
          <div className="rounded-2xl border border-line-strong bg-paper p-7">
            <p className="text-xs font-bold uppercase tracking-widest text-ink-soft">
              Guest
            </p>
            <h2 className="wide mt-2 text-2xl font-extrabold">You need data</h2>
            <p className="mt-3 text-ink-soft leading-relaxed">
              Buy a pass for the time you need. Get a unique code locked to your
              phone. Connect to your host’s network. When the timer ends, access
              stops — no awkward conversations.
            </p>
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <InView>
          <p className="text-sm font-semibold uppercase tracking-widest text-ink-soft">
            Simple by design
          </p>
          <h2 className="wide mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            How Beacon works
          </h2>
        </InView>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <InView key={step.title} delay={i * 0.08}>
              <div className="rounded-2xl border border-line-strong bg-paper p-6 h-full">
                <p className="text-xs font-bold uppercase tracking-widest text-ink-soft">
                  Step {i + 1}
                </p>
                <h3 className="wide mt-3 text-xl font-extrabold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {step.body}
                </p>
                <p className="mt-5 font-mono text-sm text-ink">{step.proof}</p>
              </div>
            </InView>
          ))}
        </div>
      </section>

      <section id="plans" className="border-t border-line-strong bg-sheet/30">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <InView>
            <p className="text-sm font-semibold uppercase tracking-widest text-ink-soft">
              Flexible access
            </p>
            <h2 className="wide mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Passes that match real life
            </h2>
            <p className="mt-3 max-w-xl text-ink-soft">
              Guests only pay for the window they need. Hosts set their own rates.
              Platform takes a small cut.
            </p>
          </InView>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((plan) => {
              const ph = perHour(plan.price, plan.durationSeconds);
              const bar = Math.round((ph / maxPerHour) * 100);
              return (
                <InView key={plan.id}>
                  <div
                    className={`relative flex h-full flex-col rounded-2xl border-2 bg-paper p-6 ${
                      plan.popular ? "border-ultra" : "border-line-strong"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-4 rounded-full bg-ultra px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-paper">
                        Popular
                      </span>
                    )}
                    <p className="text-sm font-medium text-ink-soft">{plan.label}</p>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight">
                      {formatNaira(plan.price)}
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">{plan.description}</p>
                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-line">
                      <div
                        className="h-full rounded-full bg-ink/40"
                        style={{ width: `${bar}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-ink-soft">
                      ~{formatNaira(Math.round(ph))}/hr
                    </p>
                    <ul className="mt-5 flex-1 space-y-2 text-sm text-ink-soft">
                      <li>✓ Full speed while host is online</li>
                      <li>✓ Device-locked code</li>
                      <li>✓ Auto end when time is up</li>
                    </ul>
                    <Link
                      href="/app"
                      className={`mt-6 block text-center text-sm font-semibold py-2.5 rounded-xl transition ${
                        plan.popular
                          ? "bg-ultra text-paper hover:opacity-90"
                          : "border border-line-strong hover:border-ink"
                      }`}
                    >
                      Select
                    </Link>
                  </div>
                </InView>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <InView>
              <p className="text-sm font-semibold uppercase tracking-widest text-ink-soft">
                Built for trust
              </p>
              <h2 className="wide mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                Temporary access. Real control.
              </h2>
            </InView>
            <ul className="mt-10 space-y-6">
              {GUARANTEES.map((g, i) => (
                <InView key={g.title} delay={i * 0.06}>
                  <li>
                    <h3 className="font-bold">{g.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {g.body}
                    </p>
                  </li>
                </InView>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-ink px-6 py-7 text-paper sm:px-8">
            <p className="text-xs font-bold uppercase tracking-widest text-paper/60">
              Session log
            </p>
            <InView>
              <ul className="mt-4 font-mono text-sm">
                {LOG.map((row, i) => (
                  <li
                    key={row.t + row.e}
                    style={{ "--i": i } as CSSProperties}
                    className="log-row grid grid-cols-[4.5rem_1fr] gap-x-4 border-t border-dashed border-paper/25 py-3.5 first:border-t-0"
                  >
                    <span className={row.end ? "text-signal" : "text-paper/70"}>
                      {row.t}
                    </span>
                    <span>
                      <span
                        className={
                          row.end ? "font-semibold text-signal" : "font-semibold"
                        }
                      >
                        {row.e}
                      </span>
                      <span className="block text-paper/70">{row.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </InView>
            <Link
              href="/docs"
              className="mt-6 inline-block text-sm font-semibold text-paper underline decoration-signal decoration-2 underline-offset-[6px]"
            >
              Read the full architecture
            </Link>
          </div>
        </div>
      </section>

      <section className="perf-rule">
        <div className="mx-auto grid max-w-6xl items-end gap-8 px-5 py-20 sm:px-8 md:grid-cols-[1fr_auto] md:py-24">
          <div>
            <h2 className="wide max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl">
              Every phone with data can earn
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">
              Beacon is the software layer for billing, device-bound passes and
              trust — on campus, in compounds, and on the street. Hosts need only
              a working connection. We take a share of every pass sold.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link href="/docs" className="btn btn-primary">
              Read the investor brief
            </Link>
            <Link href="/app" className="btn btn-outline">
              Launch the demo
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-line-strong">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-ink-soft sm:px-8 md:flex-row md:items-center md:justify-between">
          <Wordmark className="h-8" />
          <p>Demo build for investor conversations</p>
          <p>Your password never leaves the host environment.</p>
        </div>
      </footer>
    </div>
  );
}
