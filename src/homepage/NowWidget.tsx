import { useEffect, useState, type CSSProperties } from "react";
import type { Copy } from "./copy";

interface Props {
  copy: Copy;
}

export function NowWidget({ copy }: Props) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 20);
    return () => clearInterval(id);
  }, []);

  const hhmm = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const wrap: CSSProperties = {
    position: "fixed",
    top: "calc(var(--gutter) + 70px)",
    right: "var(--gutter)",
    zIndex: 6,
    padding: "10px 14px",
    background: "color-mix(in oklab, var(--paper) 82%, transparent)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid var(--rule)",
    borderRadius: 999,
    fontFamily: "var(--mono)",
    fontSize: 10.5,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--ink-soft)",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
  };

  const dot: CSSProperties = {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "oklch(0.68 0.14 150)",
    display: "inline-block",
    animation: "ipsePulse 2.6s ease-in-out infinite",
  };

  return (
    <div className="now-widget" style={wrap} aria-label="Local time">
      <span style={dot} />
      <span>{copy.localTime}</span>
      <span
        style={{
          color: "var(--ink)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {hhmm} KST
      </span>
    </div>
  );
}
