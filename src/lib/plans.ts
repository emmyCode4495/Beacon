import type { Plan } from "./types";

export const PLANS: Plan[] = [
  {
    id: "1h",
    label: "1 hour",
    description: "Quick sessions",
    durationSeconds: 3600,
    price: 500,
  },
  {
    id: "6h",
    label: "6 hours",
    description: "Evening / work block",
    durationSeconds: 21600,
    price: 1200,
  },
  {
    id: "24h",
    label: "24 hours",
    description: "Most popular",
    durationSeconds: 86400,
    price: 2500,
    popular: true,
  },
  {
    id: "7d",
    label: "7 days",
    description: "Best value",
    durationSeconds: 604800,
    price: 12000,
  },
];

export function getPlan(id: string) {
  return PLANS.find((p) => p.id === id);
}
