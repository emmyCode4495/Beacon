# Beacon

**Share unlimited internet. Keep full control.**

Beacon is a Next.js web platform that lets Starlink (or any unlimited fixed connection) owners share temporary, paid, device-bound access with neighbors — without ever giving out the real Wi-Fi password.

When the paid period ends, access is automatically revoked.

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** / **Lucide** (icons)

## Quick start

```bash
cd beacon-next
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Route | Purpose |
|-------|---------|
| `/` | Marketing / landing |
| `/app` | Interactive product demo |
| `/docs` | Architecture + investor brief |

## Product logic

1. Neighbor chooses a plan (1 h / 6 h / 24 h / 7 d).
2. Pays (simulated in demo).
3. Backend issues a unique **connection code** bound to that device.
4. User connects to the host’s guest network; captive portal validates code + device + expiry.
5. At `expires_at` access is revoked automatically.

The real Starlink / router password stays in the host’s secure environment.

## Demo notes

- Any credentials work on the sign-in screen.
- Payment is simulated; a realistic code is generated and a live countdown starts.
- When the timer hits zero the session disappears.

Built for investor conversations and neighborhood pilot design.
