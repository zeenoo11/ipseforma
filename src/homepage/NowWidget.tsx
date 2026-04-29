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
    bottom: 24,
    right: "var(--gutter)",
    zIndex: 10,
    padding: "8px 12px",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid var(--colors-hairline)",
    borderRadius: 999,
    fontFamily: "var(--font-body)",
    fontSize: 12,
    color: "var(--colors-ink)",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  };

  const dot: CSSProperties = {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "var(--colors-primary)",
    display: "inline-block",
  };

  return (
    <div className="now-widget" style={wrap} aria-label="Local time">
      <span style={dot} />
      <span style={{ opacity: 0.6 }}>{copy.localTime}</span>
      <span
        style={{
          fontWeight: 600,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {hhmm} KST
      </span>
    </div>
  );
}
