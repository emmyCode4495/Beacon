import type { Host } from "./types";

/** Demo registered hosts / vendors guests can choose from */
export const HOSTS: Host[] = [
  {
    id: "h1",
    name: "Tunde · Block C",
    location: "Unilag · Akoka campus",
    online: true,
    signal: 5,
    rating: 4.9,
    sessionsCompleted: 128,
    networkType: "Hotspot",
    priceMultiplier: 1,
  },
  {
    id: "h2",
    name: "Amaka’s Place",
    location: "Yaba · Jibowu",
    online: true,
    signal: 4,
    rating: 4.7,
    sessionsCompleted: 86,
    networkType: "Wi‑Fi",
    priceMultiplier: 1.1,
  },
  {
    id: "h3",
    name: "Chidi Starlink",
    location: "Lekki Phase 1",
    online: true,
    signal: 5,
    rating: 4.8,
    sessionsCompleted: 210,
    networkType: "Starlink",
    priceMultiplier: 1.25,
  },
  {
    id: "h4",
    name: "Hall 3 Mesh",
    location: "UI · Ibadan campus",
    online: false,
    signal: 3,
    rating: 4.5,
    sessionsCompleted: 54,
    networkType: "Hotspot",
    priceMultiplier: 0.9,
  },
  {
    id: "h5",
    name: "Fatima · Room 12",
    location: "ABU · Samaru",
    online: true,
    signal: 4,
    rating: 4.6,
    sessionsCompleted: 41,
    networkType: "Hotspot",
    priceMultiplier: 1,
  },
];

export function getHost(id: string) {
  return HOSTS.find((h) => h.id === id);
}

export function hostPrice(basePrice: number, multiplier: number) {
  return Math.round(basePrice * multiplier);
}
