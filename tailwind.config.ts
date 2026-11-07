import type { Config } from "tailwindcss";

/**
 * Beacon palette
 * paper   cool off-white page, like uncoated voucher stock
 * sheet   lighter surface for fields and chips
 * ink     deep indigo-black for text
 * ultra   ultramarine, the ballpoint / cheque blue; the brand colour
 * signal  safety orange, the beacon light; used sparingly
 */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#EDF0F4",
        sheet: "#F9FAFC",
        ink: { DEFAULT: "#0E1233", soft: "#454B6B" },
        line: { DEFAULT: "#CDD2DE", strong: "#9AA2B8" },
        ultra: { DEFAULT: "#2236D3", deep: "#18269B" },
        signal: { DEFAULT: "#FF5A1F", deep: "#B53A08" },
        ok: "#0E7A52",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
