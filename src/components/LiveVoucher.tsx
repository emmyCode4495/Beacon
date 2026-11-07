"use client";

import { useEffect, useState } from "react";
import { Voucher } from "./Voucher";
import { Tilt } from "./Tilt";
import { formatCountdown } from "@/lib/utils";

const TOTAL = 24 * 3600;
const START = 17 * 3600 + 42 * 60 + 9; // 17:42:09 left on a 24-hour pass

/** The landing page's sample pass, counting down for real. */
export function LiveVoucher({ className }: { className?: string }) {
  const [left, setLeft] = useState(START);

  useEffect(() => {
    const id = setInterval(() => {
      setLeft((s) => (s <= 1 ? START : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={className}>
      <Tilt>
        <Voucher
          code="B7K-9M2"
          plan="24 hours"
          host="Hosted by Emeka, Block C"
          timeLeft={formatCountdown(left * 1000)}
          progress={(left / TOTAL) * 100}
        />
      </Tilt>
    </div>
  );
}
