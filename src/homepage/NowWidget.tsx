import { useEffect, useState, type CSSProperties } from "react";
import type { Copy } from "./copy";

interface Props {
  copy: Copy;
}

export function NowWidget({ copy }: Props) {
  const [now, setNow] = useState(new Date());
  const [open, setOpen] = useState(true);

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
    top: "calc(var(--gutter) + 62px)",
    right: "var(--gutter)",
    zIndex: 6,
    width: 248,
    padding: "14px 16px",
    background: "color-mix(in oklab, var(--paper) 82%, transparent)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid var(--rule)",
    borderRadius: 14,
    fontFamily: "var(--mono)",
    fontSize: 10.5,
    letterSpacing: "0.08em",
    color: "var(--ink-soft)",
    boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
  };

  const head: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: open ? 10 : 0,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: "var(--ink-whisper)",
  };

  const dot: CSSProperties = {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "oklch(0.68 0.14 150)",
    boxShadow: "0 0 0 4px oklch(0.68 0.14 150 / 0.16)",
    display: "inline-block",
    marginRight: 8,
    verticalAlign: "middle",
    animation: "ipsePulse 2.6s ease-in-out infinite",
  };

  const row: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    padding: "5px 0",
    borderTop: "1px dashed var(--rule)",
  };

  return (
    <div className="now-widget" style={wrap} aria-label="Now widget">
      <div style={head}>
        <span>
          <span style={dot} /> {copy.nowLabel}
        </span>
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            background: "transparent",
            border: 0,
            color: "var(--ink-whisper)",
            fontFamily: "var(--mono)",
            fontSize: 10.5,
            letterSpacing: "0.16em",
            cursor: "pointer",
          }}
          aria-label="toggle now widget"
        >
          {open ? "—" : "+"}
        </button>
      </div>
      {open && (
        <div>
          {copy.nowItems.map((it, i) => (
            <div key={i} style={row}>
              <span style={{ color: "var(--ink-whisper)" }}>{it.k}</span>
              <span
                style={{
                  color: "var(--ink)",
                  textAlign: "right",
                  maxWidth: "64%",
                  fontFamily: "var(--read)",
                  fontSize: 12,
                  letterSpacing: 0,
                }}
              >
                {it.v}
              </span>
            </div>
          ))}
          <div style={{ ...row, marginTop: 4 }}>
            <span style={{ color: "var(--ink-whisper)" }}>{copy.localTime}</span>
            <span
              style={{
                color: "var(--ink)",
                fontVariantNumeric: "tabular-nums",
                fontFamily: "var(--mono)",
                fontSize: 11,
              }}
            >
              {hhmm} KST
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
