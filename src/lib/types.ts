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

export interface Session {
  id: string;
  code: string;
  planId: PlanId;
  planLabel: string;
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
