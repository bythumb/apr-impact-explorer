"use client";

import { useEffect, useState } from "react";

function pad(n) {
  return String(n).padStart(2, "0");
}

// In-character clock: starts at the time on the screenshot, advances at +1s/sec
// like a real terminal. We use a fixed seed so server & client render identically
// on first paint; then the clock starts ticking on the client.
const SEED = { h: 23, m: 35, s: 46 };

export default function TerminalHeader({ rightStatus = "READY" }) {
  const [time, setTime] = useState(SEED);

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        let s = t.s + 1;
        let m = t.m;
        let h = t.h;
        if (s === 60) {
          s = 0;
          m += 1;
        }
        if (m === 60) {
          m = 0;
          h = (h + 1) % 24;
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="header">
      <div className="left">
        APR RECORDS{"\n"}
        IMPACT EXPLORER &nbsp;//&nbsp; FY 2005-2009 &nbsp;//&nbsp; SOURCE: RIAA, NIELSEN SOUNDSCAN
      </div>
      <div className="right">
        <span>&gt; </span>
        <span className="ready">{rightStatus}</span>
        {"\n"}
        {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
      </div>
    </header>
  );
}
