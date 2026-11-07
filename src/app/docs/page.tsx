import Link from "next/link";
import type { ReactNode } from "react";
import { Wordmark } from "@/components/Logo";

const SECTIONS = [
  { id: "problem", title: "Problem and opportunity" },
  { id: "architecture", title: "Architecture" },
  { id: "guarantees", title: "Core guarantees" },
  { id: "data", title: "Data model" },
  { id: "binding", title: "Device binding flow" },
  { id: "economics", title: "Unit economics" },
  { id: "roadmap", title: "Roadmap" },
];

const ROADMAP = [
  {
    when: "Now",
    what: "Next.js demo and architecture (this package).",
  },
  {
    when: "Next",
    what: "Real sign-in, payments (Paystack, Flutterwave), a session API and a basic admin for hosts.",
  },
  {
    when: "Then",
    what: "An OpenWRT / UniFi reference gateway image with a captive portal.",
  },
  {
    when: "Later",
    what: "Host dashboard, payouts, multiple SSIDs, analytics and a mobile PWA.",
  },
];

const ECONOMICS = [
  ["Average spend per neighbour, per month", "₦8,000 – ₦15,000"],
  ["Gross monthly sales per host (8 neighbours)", "₦64k – ₦120k"],
  ["Platform take rate (target)", "12 – 18%"],
];

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded border border-line bg-sheet px-1.5 py-0.5 font-mono text-[0.88em] text-ink">
      {children}
    </code>
  );
}

function Section({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 border-t-[3px] border-ink pt-6">
      <h2 className="wide text-2xl font-extrabold leading-tight tracking-tight">
        <span className="mr-3 font-mono text-base font-medium text-ink-soft">{n}</span>
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-[1.0625rem] leading-7 text-ink-soft [&_strong]:font-bold [&_strong]:text-ink">
        {children}
      </div>
    </section>
  );
}

function Panel({ children, label }: { children: ReactNode; label: string }) {
  return (
    <figure className="rounded-xl bg-ink p-5 text-paper">
      <figcaption className="mb-3 font-mono text-xs text-paper/70">{label}</figcaption>
      <div className="overflow-x-auto font-mono text-sm leading-relaxed">{children}</div>
    </figure>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" aria-label="Beacon home">
          <Wordmark />
        </Link>
        <Link href="/app" className="btn btn-outline !px-4 !py-2 text-sm">
          Open app
        </Link>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-24 pt-10 sm:px-8 lg:grid-cols-[13rem_1fr] lg:gap-16 lg:pt-16">
        {/* Contents */}
        <aside className="hidden lg:block">
          <nav aria-label="Contents" className="sticky top-8">
            <p className="mb-3 text-sm font-bold">Investor brief</p>
            <ol className="space-y-2 border-l-2 border-dashed border-line-strong pl-4 text-sm">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-ink-soft hover:text-ink hover:underline underline-offset-4">
                    <span className="mr-2 font-mono text-xs">{i + 1}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="max-w-3xl">
          <h1 className="wide text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.03] tracking-tight">
            How Beacon works, end to end
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            How temporary, device-bound Wi-Fi access works without ever exposing
            the host&rsquo;s real password.
          </p>

          <div className="mt-14 space-y-14">
            <Section id="problem" n={1} title="Problem and opportunity">
              <p>
                Starlink and other unlimited fixed connections deliver excellent
                bandwidth but are often single-user by design — yet people constantly need to share. Neighbours
                routinely ask to &ldquo;borrow&rdquo; the network. Giving out
                the real password creates permanent access, a security risk and
                no income.
              </p>
              <p>
                <strong>Beacon turns every host into a micro-ISP.</strong>{" "}
                Neighbours pay for the exact window they need, access is revoked
                automatically, and the host&rsquo;s real credentials never leave
                a secure environment.
              </p>
            </Section>

            <Section id="architecture" n={2} title="Architecture">
              <Panel label="From the dish to the app">
                <div>Starlink dish → Host gateway (OpenWRT / UniFi / Pi)</div>
                <div className="pl-4 text-paper/70">└─ Captive portal and voucher engine</div>
                <div className="pl-8 text-paper/70">└─ Talks to Beacon API (auth and session check)</div>
                <div className="mt-3">Beacon backend (API, database, jobs)</div>
                <div className="pl-4 text-paper/70">├─ Payments (Paystack / Flutterwave / Stripe)</div>
                <div className="pl-4 text-paper/70">├─ Sessions and device binding</div>
                <div className="pl-4 text-paper/70">└─ Expiry worker (revokes at T+0)</div>
                <div className="mt-3">Beacon web app (Next.js)</div>
                <div className="pl-4 text-paper/70">└─ Plan, payment, code, status</div>
              </Panel>
            </Section>

            <Section id="guarantees" n={3} title="Core guarantees">
              <ul className="space-y-4">
                <li>
                  <strong>Password isolation.</strong> The real Starlink or
                  router password lives only in the host&rsquo;s <Code>.env</Code>{" "}
                  or secrets manager. The app and its users never see it.
                </li>
                <li>
                  <strong>Device binding.</strong> Every paid session is tied to
                  a device fingerprint. The same code fails on a different
                  device.
                </li>
                <li>
                  <strong>Hard expiry.</strong> A background job and the gateway
                  itself both enforce the end time.
                </li>
                <li>
                  <strong>Single-use codes.</strong> Codes are short-lived and
                  scoped. Re-use attempts are rejected.
                </li>
              </ul>
            </Section>

            <Section id="data" n={4} title="Data model">
              <Panel label="Simplified">
                <pre>{`Host
  id, name, location_hint, gateway_id, payout_account, created_at

User (neighbour)
  id, phone_or_email, device_fingerprints[], created_at

Plan
  id, host_id, label, duration_seconds, price_kobo, active

Session
  id, user_id, host_id, plan_id
  code                  -- short, human-readable
  device_hash           -- bound at purchase / first connect
  status                -- pending | active | expired | revoked
  starts_at, expires_at
  payment_ref
  created_at

GatewayEvent (audit)
  session_id, event_type, device_hash, ip, timestamp`}</pre>
              </Panel>
            </Section>

            <Section id="binding" n={5} title="Device binding flow">
              <ol className="space-y-4">
                {[
                  <>
                    The neighbour pays. The backend creates a session with
                    status <Code>pending</Code> and a unique code.
                  </>,
                  <>
                    On the first successful check, the device fingerprint is
                    written to <Code>device_hash</Code> and the status becomes{" "}
                    <Code>active</Code>.
                  </>,
                  <>Every later check needs the same device_hash. A mismatch is rejected.</>,
                  <>
                    At <Code>expires_at</Code> a worker sets the status to{" "}
                    <Code>expired</Code> and removes the device from the
                    allow-list.
                  </>,
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-sm font-semibold text-paper">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="economics" n={6} title="Unit economics">
              <p>An example host with 8 regular neighbours:</p>
              <dl className="rounded-xl border border-line bg-sheet">
                {ECONOMICS.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex flex-col gap-1 border-t border-line px-5 py-4 first:border-t-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <dt>{k}</dt>
                    <dd className="wide font-extrabold tabular-nums text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <p>
                The host keeps most of the revenue and needs almost no extra
                hardware beyond a modest second router. Real numbers will vary
                with neighbourhood density and pricing power.
              </p>
            </Section>

            <Section id="roadmap" n={7} title="Roadmap">
              <ul>
                {ROADMAP.map((r) => (
                  <li
                    key={r.when}
                    className="grid grid-cols-[4.5rem_1fr] gap-4 border-t-2 border-dashed border-line-strong py-4 first:border-t-0 first:pt-0"
                  >
                    <span className="font-bold text-ink">{r.when}</span>
                    <span>{r.what}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <div className="perf-rule mt-16 flex flex-col gap-3 pt-8 sm:flex-row">
            <Link href="/app" className="btn btn-primary">
              Open the live demo
            </Link>
            <Link href="/" className="btn btn-outline">
              Back to the website
            </Link>
          </div>

          <p className="mt-12 text-sm text-ink-soft">
            Beacon. Confidential, for investor conversations. 2026.
          </p>
        </article>
      </div>
    </div>
  );
}
