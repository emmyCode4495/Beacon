import Link from "next/link";
import { Radio, Shield, Clock, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-dvh">
      {/* Nav */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-full bg-sky-500/30 animate-ping opacity-40" />
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Radio className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight">Beacon</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-ink-400">
          <a href="#how" className="hover:text-white transition">
            How it works
          </a>
          <a href="#plans" className="hover:text-white transition">
            Plans
          </a>
          <Link href="/docs" className="hover:text-white transition">
            For Investors
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/app"
            className="text-sm text-ink-400 hover:text-white transition hidden sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/app"
            className="btn-primary text-sm font-semibold text-white px-5 py-2.5 rounded-full"
          >
            Open App
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-sky-300 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live in your neighborhood · Powered by Starlink
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] max-w-4xl mx-auto">
            Share unlimited internet.
            <br />
            <span className="gradient-text">Keep full control.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink-400 max-w-2xl mx-auto leading-relaxed">
            Your neighbors pay for the hours or days they need. They get a unique
            code that only works on their device. When time is up — automatic
            disconnect. Your real password never leaves your server.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/app"
              className="btn-primary text-base font-semibold text-white px-8 py-3.5 rounded-full w-full sm:w-auto"
            >
              Try the demo →
            </Link>
            <a
              href="#how"
              className="glass text-base font-medium text-ink-200 px-8 py-3.5 rounded-full w-full sm:w-auto hover:bg-white/5 transition"
            >
              See how it works
            </a>
          </div>

          {/* Live status mock */}
          <div className="mt-16 max-w-md mx-auto glass-strong rounded-2xl p-5 text-left shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
                  Active session
                </span>
              </div>
              <span className="text-xs text-ink-500">Device bound</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold tracking-tight tabular-nums">
                  02:14:37
                </p>
                <p className="text-sm text-ink-400 mt-0.5">remaining on 1-day plan</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-ink-500">Code</p>
                <p className="font-mono text-sky-300 tracking-widest">B7K-9M2</p>
              </div>
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-ink-800 overflow-hidden">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Simple by design
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              How Beacon works
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                color: "sky",
                title: "Neighbor chooses a plan",
                body: "Hourly, daily, or weekly access. Transparent pricing. Pay with card, transfer, or mobile money.",
              },
              {
                step: "2",
                color: "violet",
                title: "Unique device-bound code",
                body: "A one-time code is issued and cryptographically tied to their phone. It cannot be shared or reused on another device.",
              },
              {
                step: "3",
                color: "emerald",
                title: "Auto-disconnect on expiry",
                body: "When the paid window ends, access is revoked automatically. No manual work. Your real Wi-Fi password stays private.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="glass rounded-2xl p-7 hover:border-sky-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-sky-500/15 flex items-center justify-center mb-5`}
                >
                  <span className={`text-sky-400 font-bold text-lg`}>
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-ink-400 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans teaser */}
      <section id="plans" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Flexible access
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Plans that match real life
            </h2>
            <p className="mt-3 text-ink-400 max-w-xl mx-auto">
              Neighbors only pay for the window they need. You set the prices. You
              keep the margin.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: "Quick fix", price: "₦500", time: "1 hour" },
              { label: "Evening", price: "₦1,200", time: "6 hours" },
              {
                label: "Full day",
                price: "₦2,500",
                time: "24 hours",
                popular: true,
              },
              { label: "Week", price: "₦12,000", time: "7 days" },
            ].map((p) => (
              <div
                key={p.label}
                className={`relative glass rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  p.popular
                    ? "border-sky-500/50 bg-gradient-to-b from-sky-500/10 to-transparent"
                    : "hover:border-sky-500/30"
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider bg-sky-500 text-white px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <p className="text-sm font-medium text-ink-400">{p.label}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight">{p.price}</p>
                <p className="text-sm text-ink-500 mt-1">{p.time}</p>
                <ul className="mt-6 space-y-2.5 text-sm text-ink-300 flex-1">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Full speed
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Device locked
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Instant code
                  </li>
                </ul>
                <Link
                  href="/app"
                  className={`mt-6 block text-center text-sm font-semibold py-2.5 rounded-xl transition ${
                    p.popular
                      ? "bg-sky-500 hover:bg-sky-400 text-white"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  Select
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-ink-500 mt-8">
            Prices are examples. Hosts set their own rates. Platform takes a small
            cut.
          </p>
        </div>
      </section>

      {/* Tech moat */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-3">
                Technical moat
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                Your password stays private.
                <br />
                Access is temporary & device-bound.
              </h2>
              <p className="mt-5 text-ink-400 leading-relaxed">
                Beacon never exposes the real Starlink credentials. A secondary
                gateway sits between Starlink and the local network. The captive
                portal talks only to Beacon’s API. Codes are short-lived,
                single-device, and automatically revoked.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  {
                    title: "Device fingerprint binding",
                    sub: "Code is useless on any other phone or laptop.",
                  },
                  {
                    title: "Hard expiry + server-side revocation",
                    sub: "Even if the client is offline, the gateway cuts access.",
                  },
                  {
                    title: "Host stays invisible",
                    sub: "Real SSID password lives only in your secure .env / vault.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="3"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-ink-500">{item.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-strong rounded-3xl p-8 shadow-2xl shadow-black/30">
              <div className="space-y-5 font-mono text-sm">
                {[
                  { n: "01", t: "User pays → session created", s: "expires_at = now + duration" },
                  { n: "02", t: "Unique code + device hash stored", s: "code is single-use per device" },
                  { n: "03", t: "Captive portal validates on connect", s: "checks code + device + expiry" },
                  { n: "04", t: "Background job revokes at T+0", s: "gateway whitelist removed", green: true },
                ].map((row) => (
                  <div key={row.n} className="flex items-start gap-3">
                    <span className={row.green ? "text-emerald-400" : "text-sky-400"}>
                      {row.n}
                    </span>
                    <div>
                      <p className="text-ink-300">{row.t}</p>
                      <p className="text-ink-600 text-xs mt-0.5">{row.s}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/docs"
                  className="text-sky-400 text-sm font-medium hover:text-sky-300 transition"
                >
                  Read full architecture →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investor CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-strong rounded-3xl p-10 md:p-14 shadow-2xl shadow-black/30">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Built to scale neighborhood by neighborhood
            </h2>
            <p className="mt-4 text-ink-400 max-w-xl mx-auto">
              Every Starlink (or fiber) host becomes a micro-ISP. Beacon provides
              the software layer: billing, device control, and trust. High margin.
              Low infrastructure cost for the host.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs"
                className="btn-primary text-base font-semibold text-white px-8 py-3.5 rounded-full"
              >
                Investor brief & architecture
              </Link>
              <Link
                href="/app"
                className="text-ink-300 hover:text-white transition text-sm font-medium"
              >
                Launch the live demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ink-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center">
              <Radio className="w-3 h-3 text-white" strokeWidth={2.5} />
            </div>
            <span>Beacon</span>
          </div>
          <p>Demo build · For investor conversations</p>
          <p>Your password never leaves the host environment.</p>
        </div>
      </footer>
    </div>
  );
}
