export type PlanId = "1h" | "6h" | "24h" | "7d";

export interface Plan {
  id: PlanId;
  label: string;
  description: string;
  durationSeconds: number;
  price: number; // NGN
  popular?: boolean;
}

export type SessionStatus = "pending" | "active" | "expired" | "revoked";

export interface Host {
  id: string;
  name: string;
  /** Short area label e.g. "Unilag · Faculty of Science" */
  location: string;
  /** Host is currently sharing / online */
  online: boolean;
  /** Optional signal / quality hint 1–5 */
  signal: number;
  /** Optional rating 0–5 */
  rating: number;
  /** Number of completed sessions (social proof) */
  sessionsCompleted: number;
  /** Network type shown to guests */
  networkType: "Hotspot" | "Wi‑Fi" | "Starlink" | "Fiber";
  /** Price multiplier vs base plans (1 = standard) */
  priceMultiplier: number;
}

export interface Session {
  id: string;
  code: string;
  planId: PlanId;
  planLabel: string;
  hostId: string;
  hostName: string;
  status: SessionStatus;
  deviceHash: string | null;
  startsAt: number | null;
  expiresAt: number;
  totalSeconds: number;
  createdAt: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}
