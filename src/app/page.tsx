import Link from "next/link";
import type { CSSProperties } from "react";
import { Wordmark } from "@/components/Logo";
import { LiveVoucher } from "@/components/LiveVoucher";
import { InView } from "@/components/InView";
import { PLANS } from "@/lib/plans";
import { formatNaira } from "@/lib/utils";

const STEPS = [
  {
    title: "A neighbour buys a pass",
    body: "They pick 1 hour, 6 hours, a day or a week and pay by card, bank transfer or mobile money.",
    proof: "₦2,500 for 24 hours",
  },
  {
    title: "A code is locked to their phone",
    body: "The code is issued the moment payment clears and tied to that one device. Forwarding it to a friend does nothing.",
    proof: "B7K-9M2",
  },
  {
    title: "Access ends on time",
    body: "At expiry your gateway takes the device off the allow-list. You never chase anyone, and your real password was never shared.",
    proof: "Revoked at 19:02:11",
  },
];

const GUARANTEES = [
  {
    title: "Locked to one device",
    body: "The code is bound to a device fingerprint, so it fails on any other phone or laptop.",
  },
  {
    title: "Hard stop, even offline",
    body: "The gateway enforces the end time itself. A neighbour closing the app doesn't extend anything.",
  },
  {
    title: "Password stays in your vault",
    body: "The real Wi-Fi password lives only in your secure environment. Neighbours and the app never see it.",
  },
];

const LOG = [
  { t: "19:02:11", e: "Payment confirmed", d: "₦2,500 for 24 hours" },
  { t: "19:02:12", e: "Code issued", d: "B7K-9M2" },
  { t: "19:04:40", e: "Device bound", d: "a3f9…c21e" },
  { t: "19:04:41", e: "Access granted", d: "allow-list +1" },
  { t: "+24h", e: "Access revoked", d: "allow-list −1", end: true },
];

function perHour(price: number, seconds: number) {
  return price / (seconds / 3600);
}

export default function LandingPage() {
  const maxPerHour = Math.max(...PLANS.map((p) => perHour(p.price, p.durationSeconds)));

  return (
    <div className="min-h-dvh">
      {/* Nav */}
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
          <a href="#rates" className="hover:text-ink hover:underline underline-offset-4">
            Rates
          </a>
          <a href="#security" className="hover:text-ink hover:underline underline-offset-4">
            Security
          </a>
          <Link href="/docs" className="hover:text-ink hover:underline underline-offset-4">
            Investors
          </Link>
        </nav>
        <Link href="/app" className="btn btn-outline !px-4 !py-2 text-sm">
          Open app
        </Link>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8 md:pb-28 md:pt-16">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <div>
            <h1 className="wide text-[clamp(2.4rem,6.2vw,4.6rem)] font-extrabold leading-[1.02] tracking-tight">
              Neighbours buy hours. Your password stays yours.
            </h1>
            <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-ink-soft">
              Share your Starlink with the whole compound without handing out
              the Wi-Fi password. Neighbours pay in naira for the time they
              need, get a code that works on one device, and are cut off the
              moment it runs out.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <Link href="/app" className="btn btn-primary sm:px-8">
                Try the demo
              </Link>
              <a
                href="#how"
                className="py-2 text-center font-semibold underline decoration-2 underline-offset-[6px] hover:decoration-signal"
              >
                See how it works
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[22rem] lg:max-w-none lg:pl-6">
            <LiveVoucher className="pass-drop" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="perf-rule scroll-mt-4">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <h2 className="wide max-w-2xl text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl">
            Three things happen, and you do none of them
          </h2>
          <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {STEPS.map((s, i) => (
              <li key={s.title} className="border-t-[3px] border-ink pt-5">
                <p className="font-mono text-sm font-medium text-ink-soft">
                  Step {i + 1}
                </p>
                <h3 className="mt-3 text-xl font-bold leading-snug">{s.title}</h3>
                <p className="mt-3 max-w-[26rem] leading-relaxed text-ink-soft">
                  {s.body}
                </p>
                <p className="mt-5 inline-block rounded-md border border-line bg-sheet px-3 py-1.5 font-mono text-sm">
                  {s.proof}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Rates */}
      <section id="rates" className="on-ultra scroll-mt-4 bg-ultra text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="wide text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl">
              Pay for the hours you use
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-white/85">
              Longer passes cost less per hour, so regulars stay on a weekly
              plan and one-off visitors can still buy a single hour.
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/75">
              These prices are examples. Hosts set their own rates and Beacon
              keeps a small share of each sale.
            </p>
          </div>

          <InView>
          <ul>
            {PLANS.map((p, i) => {
              const ph = perHour(p.price, p.durationSeconds);
              return (
                <li
                  key={p.id}
                  className="border-t-2 border-dashed border-white/30 py-6 first:border-t-0 first:pt-0"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <p className="wide text-2xl font-extrabold">{p.label}</p>
                      <p className="mt-1 flex items-center gap-2 text-sm text-white/80">
                        {p.popular ? (
                          <span className="rounded bg-signal px-1.5 py-0.5 text-xs font-bold text-ink">
                            Most chosen
                          </span>
                        ) : (
                          p.description
                        )}
                      </p>
                    </div>
                    <p className="wide text-3xl font-extrabold tabular-nums md:text-4xl">
                      {formatNaira(p.price)}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <div
                      className="gauge-ink flex-1"
                      role="img"
                      aria-label={`${formatNaira(Math.round(ph))} an hour`}
                    >
                      <span
                        className="draw"
                        style={{ width: `${(ph / maxPerHour) * 100}%`, "--i": i } as CSSProperties}
                      />
                    </div>
                    <p className="w-24 text-right font-mono text-sm tabular-nums text-white/85">
                      {formatNaira(Math.round(ph))}/hr
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          </InView>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="scroll-mt-4">
        <div className="mx-auto grid max-w-6xl items-start gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="wide text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl">
              Your password never leaves your gateway
            </h2>
            <p className="mt-5 max-w-[32rem] leading-relaxed text-ink-soft">
              A second gateway sits between Starlink and your neighbours. The
              captive portal only talks to Beacon&rsquo;s API, so neighbours get
              short-lived codes and never the network itself.
            </p>
            <dl className="mt-10">
              {GUARANTEES.map((g) => (
                <div key={g.title} className="border-t border-line-strong py-5">
                  <dt className="font-bold">{g.title}</dt>
                  <dd className="mt-1 max-w-[30rem] text-ink-soft">{g.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl bg-ink p-6 text-paper sm:p-8">
            <p className="font-mono text-sm text-paper/70">
              Gateway log for pass B7K-9M2
            </p>
            <InView>
            <ul className="mt-6 font-mono text-sm">
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
                    <span className={row.end ? "font-semibold text-signal" : "font-semibold"}>
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

      {/* Investors */}
      <section className="perf-rule">
        <div className="mx-auto grid max-w-6xl items-end gap-8 px-5 py-20 sm:px-8 md:grid-cols-[1fr_auto] md:py-24">
          <div>
            <h2 className="wide max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl">
              Every dish on the street can be a small ISP
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">
              Beacon is the software layer for billing, device control and
              trust. Hosts need only a modest second router. We take a share of
              every pass sold.
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

      {/* Footer */}
      <footer className="border-t border-line-strong">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-ink-soft sm:px-8 md:flex-row md:items-center md:justify-between">
          <Wordmark className="text-ink [&>span:last-child]:text-base" />
          <p>Demo build for investor conversations</p>
          <p>Your password never leaves the host environment.</p>
        </div>
      </footer>
    </div>
  );
}
