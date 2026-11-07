import Link from "next/link";
import { Radio } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-dvh">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink-400 hover:text-white mb-10 transition"
        >
          ← Back to Beacon
        </Link>

        <div className="mb-10">
          <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-2">
            Investor brief
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Beacon Architecture
          </h1>
          <p className="mt-3 text-ink-400 text-lg">
            How temporary, device-bound Wi-Fi access works without ever exposing
            the host’s real password.
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-10 text-ink-400">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Problem & Opportunity</h2>
            <p className="leading-relaxed">
              Starlink (and other unlimited fixed connections) deliver excellent
              bandwidth but are single-household by design. Neighbors routinely
              ask to “borrow” the network. Giving out the real password creates
              permanent access, security risk, and no monetization.
            </p>
            <p className="leading-relaxed mt-3">
              <strong className="text-ink-200">
                Beacon turns every host into a micro-ISP.
              </strong>{" "}
              Neighbors pay for the exact window they need. Access is
              automatically revoked. The host’s real credentials never leave a
              secure environment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. High-level Architecture</h2>
            <div className="glass rounded-2xl p-6 font-mono text-sm text-ink-300 space-y-2">
              <div>Starlink Dish → Host Gateway (OpenWRT / UniFi / Pi)</div>
              <div className="pl-4 text-ink-500">└─ Captive Portal / Voucher engine</div>
              <div className="pl-8 text-ink-500">└─ Talks to Beacon API (auth + session check)</div>
              <div className="mt-3">Beacon Backend (API + DB + Jobs)</div>
              <div className="pl-4 text-ink-500">├─ Payments (Paystack / Flutterwave / Stripe)</div>
              <div className="pl-4 text-ink-500">├─ Session + Device binding</div>
              <div className="pl-4 text-ink-500">└─ Expiry worker (revokes at T+0)</div>
              <div className="mt-3">Beacon Web App (Next.js)</div>
              <div className="pl-4 text-ink-500">└─ Plan selection → Payment → Code → Status</div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. Core Guarantees</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-ink-200">Password isolation</strong> — Real
                Starlink / router password lives only in the host’s .env or secrets
                manager. The app and users never see it.
              </li>
              <li>
                <strong className="text-ink-200">Device binding</strong> — Every paid
                session is tied to a device fingerprint. The same code fails on a
                different device.
              </li>
              <li>
                <strong className="text-ink-200">Hard expiry</strong> — A background
                job and the gateway itself enforce the end time.
              </li>
              <li>
                <strong className="text-ink-200">Single-use semantics</strong> — Codes
                are short-lived and scoped. Re-use attempts are rejected.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Data Model (simplified)</h2>
            <pre className="glass rounded-xl p-5 text-xs overflow-x-auto text-ink-300 leading-relaxed">
{`Host
  id, name, location_hint, gateway_id, payout_account, created_at

User (neighbor)
  id, phone_or_email, device_fingerprints[], created_at

Plan
  id, host_id, label, duration_seconds, price_kobo, active

Session
  id, user_id, host_id, plan_id
  code                  -- short human-readable
  device_hash           -- bound at purchase / first connect
  status                -- pending | active | expired | revoked
  starts_at, expires_at
  payment_ref
  created_at

GatewayEvent (audit)
  session_id, event_type, device_hash, ip, timestamp`}
            </pre>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Device Binding Flow</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                User pays → backend creates Session with status{" "}
                <code className="text-sky-300">pending</code> and a unique code.
              </li>
              <li>
                On first successful validation, the current device fingerprint is
                written to <code className="text-sky-300">device_hash</code> and
                status becomes <code className="text-sky-300">active</code>.
              </li>
              <li>
                Subsequent checks require the same device_hash. Mismatch → reject.
              </li>
              <li>
                At <code className="text-sky-300">expires_at</code> a worker sets
                status to <code className="text-sky-300">expired</code> and removes
                the device from the allow-list.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Unit Economics Sketch</h2>
            <div className="glass rounded-2xl p-6 text-sm">
              <p className="text-ink-300 mb-3">
                Example host with 8 regular neighbors:
              </p>
              <ul className="space-y-1">
                <li>Average spend per neighbor / month: ₦8,000 – ₦15,000</li>
                <li>Gross monthly GMV per host: ₦64k – ₦120k</li>
                <li>Platform take-rate (target): 12–18%</li>
                <li>
                  Host keeps majority of revenue with almost zero extra hardware
                  cost beyond a modest secondary router.
                </li>
              </ul>
              <p className="text-ink-500 mt-4 text-xs">
                Actual numbers will vary by neighborhood density and pricing power.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">7. Roadmap</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-ink-200">Now</strong> — Next.js demo +
                architecture (this package)
              </li>
              <li>
                <strong className="text-ink-200">Next</strong> — Real auth, payments
                (Paystack/Flutterwave), session API, basic admin for hosts
              </li>
              <li>
                <strong className="text-ink-200">Then</strong> — OpenWRT / UniFi
                reference gateway image + captive portal
              </li>
              <li>
                <strong className="text-ink-200">Later</strong> — Host dashboard,
                payouts, multi-SSID, analytics, mobile PWA
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/app"
            className="inline-flex justify-center items-center px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-sm font-semibold text-white"
          >
            Open the live demo
          </Link>
          <Link
            href="/"
            className="inline-flex justify-center items-center px-6 py-3 rounded-full glass text-sm font-medium text-ink-200"
          >
            Marketing site
          </Link>
        </div>

        <p className="text-center text-xs text-ink-600 mt-16">
          Beacon · Confidential for investor conversations · 2026
        </p>
      </div>
    </div>
  );
}
