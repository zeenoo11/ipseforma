import type { CSSProperties } from "react";
import type { Copy, Lang } from "./copy";

interface NavProps {
  copy: Copy;
  theme: "light" | "dark";
  onTheme: () => void;
  lang: Lang;
  onLang: (l: Lang) => void;
  onNav: (id: string) => void;
}

export function Nav({ copy, theme, onTheme, lang, onLang, onNav }: NavProps) {
  const wrap: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: "22px var(--gutter)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "color-mix(in oklab, var(--paper) 84%, transparent)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderBottom: "1px solid var(--rule)",
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--ink-soft)",
  };
  const brand: CSSProperties = {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: 22,
    letterSpacing: "-0.01em",
    color: "var(--ink)",
    textTransform: "none",
    textDecoration: "none",
    cursor: "pointer",
  };
  const navlinks: CSSProperties = { display: "flex", alignItems: "center", gap: 28 };
  const navlink: CSSProperties = {
    background: "transparent",
    border: 0,
    color: "var(--ink-soft)",
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    cursor: "pointer",
    padding: 0,
  };
  const pill: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    border: "1px solid var(--rule)",
    borderRadius: 999,
    padding: "6px 10px",
    fontFamily: "var(--mono)",
    fontSize: 10.5,
    letterSpacing: "0.14em",
  };
  const langBtn = (active: boolean): CSSProperties => ({
    background: "transparent",
    border: 0,
    padding: 0,
    color: active ? "var(--ink)" : "var(--ink-whisper)",
    fontFamily: "var(--mono)",
    fontSize: 10.5,
    letterSpacing: "0.14em",
    cursor: "pointer",
  });

  return (
    <nav style={wrap}>
      <a style={brand} onClick={() => onNav("top")}>
        <span style={{ fontStyle: "italic" }}>i</span>pseforma
        <span style={{ color: "var(--ink-whisper)" }}>.</span>
      </a>
      <div style={navlinks} className="navlinks-desktop">
        <button style={navlink} onClick={() => onNav("philosophy")}>
          {copy.nav.philosophy}
        </button>
        <a
          href="https://blog.ipseforma.com"
          target="_blank"
          rel="noreferrer"
          style={{ ...navlink, textDecoration: "none" }}
        >
          {copy.nav.blog} ↗
        </a>
        <button style={navlink} onClick={() => onNav("contact")}>
          {copy.nav.contact}
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={pill} role="group" aria-label="language">
          <button onClick={() => onLang("en")} style={langBtn(lang === "en")}>
            EN
          </button>
          <span style={{ color: "var(--ink-whisper)" }}>/</span>
          <button onClick={() => onLang("ko")} style={langBtn(lang === "ko")}>
            KO
          </button>
        </div>
        <button className="iconbtn" onClick={onTheme} aria-label="toggle theme">
          {theme === "dark" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.8 6.8 0 0 0 9.8 9.8z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}

interface HeroProps {
  copy: Copy;
  heroIndex: number;
}

export function Hero({ copy, heroIndex }: HeroProps) {
  const t = copy.heroTitles[heroIndex % copy.heroTitles.length];

  const sec: CSSProperties = {
    position: "relative",
    padding:
      "calc(var(--gutter) * 2.6) var(--gutter) calc(var(--gutter) * 1.2) var(--gutter)",
    paddingTop: "min(26vh, 260px)",
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    alignContent: "center",
  };
  const vol: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 52,
  };
  const rule: CSSProperties = { flex: "0 0 56px", height: 1, background: "var(--ink)" };
  const foliono: CSSProperties = {
    fontFamily: "var(--mono)",
    fontSize: 10.5,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--ink-whisper)",
  };
  const title: CSSProperties = {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontWeight: 300,
    fontSize: "clamp(72px, 14.5vw, 232px)",
    lineHeight: 0.92,
    letterSpacing: "-0.035em",
    color: "var(--ink)",
    margin: 0,
  };
  const ampersand: CSSProperties = {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontWeight: 300,
    color: "var(--ink-whisper)",
  };
  const leadWrap: CSSProperties = {
    marginTop: 44,
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "calc(var(--gutter)/1.2)",
    alignItems: "end",
  };
  const aside: CSSProperties = {
    textAlign: "right",
    fontFamily: "var(--mono)",
    fontSize: 10.5,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--ink-whisper)",
    whiteSpace: "nowrap",
  };
  const scroll: CSSProperties = {
    position: "absolute",
    left: "var(--gutter)",
    bottom: 30,
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontFamily: "var(--mono)",
    fontSize: 10.5,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--ink-whisper)",
  };

  return (
    <section id="top" style={sec}>
      <div style={vol} className="reveal" data-delay="1">
        <div style={rule} />
        <span style={foliono}>{copy.heroEyebrow}</span>
      </div>

      <h1 style={title} className="reveal" data-delay="2">
        <span>{t.a}</span>
        <span style={ampersand}>{t.amp}</span>
        <span>{t.b}</span>
      </h1>

      <div style={leadWrap}>
        <p className="prose reveal" data-delay="3" style={{ marginTop: 0 }}>
          {copy.heroLead}
        </p>
        <div style={aside} className="reveal" data-delay="4">
          {copy.heroAside}
        </div>
      </div>

      <div style={scroll} className="reveal" data-delay="5">
        <span>{copy.scrollHint}</span>
        <svg width="22" height="42" viewBox="0 0 22 42" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="0.5" y="0.5" width="21" height="41" rx="10.5" />
          <circle cx="11" cy="11" r="1.6" fill="currentColor" stroke="none">
            <animate attributeName="cy" values="10;24;10" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="2.2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  titleEm,
}: {
  eyebrow: string;
  title: string;
  titleEm: string;
}) {
  return (
    <header style={{ marginBottom: 56 }}>
      <div className="meta reveal" data-delay="1" style={{ marginBottom: 20 }}>
        {eyebrow}
      </div>
      <h2
        className="display reveal"
        data-delay="2"
        style={{
          fontSize: "clamp(40px, 6.4vw, 92px)",
          margin: 0,
          color: "var(--ink)",
          maxWidth: "22ch",
        }}
      >
        <span style={{ fontStyle: "normal" }}>{title}</span>{" "}
        <em style={{ color: "var(--ink-soft)" }}>{titleEm}</em>
      </h2>
    </header>
  );
}

export function Philosophy({ copy }: { copy: Copy }) {
  const sec: CSSProperties = {
    padding: "calc(var(--gutter) * 2) var(--gutter)",
    borderTop: "1px solid var(--rule)",
  };
  const hasBody = copy.philosophyBody && copy.philosophyBody.length > 0;

  return (
    <section id="philosophy" style={sec}>
      <SectionHeader
        eyebrow={copy.philosophyEyebrow}
        title={copy.philosophyTitle || " "}
        titleEm={copy.philosophyTitleEm}
      />
      {hasBody ? (
        <div>
          {copy.philosophyBody.map((p, i) => (
            <p
              key={i}
              className="prose reveal"
              data-delay={String(i + 1)}
              style={{ marginTop: i === 0 ? 0 : 22 }}
            >
              {p}
            </p>
          ))}
        </div>
      ) : (
        <p
          className="prose reveal"
          data-delay="1"
          style={{ fontStyle: "italic", color: "var(--ink-whisper)" }}
        >
          — to be written —
        </p>
      )}
    </section>
  );
}

export function BlogTeaser({ copy }: { copy: Copy }) {
  const sec: CSSProperties = {
    padding: "calc(var(--gutter) * 2) var(--gutter)",
    borderTop: "1px solid var(--rule)",
  };
  const head: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "5fr 7fr",
    gap: "calc(var(--gutter)/1.2)",
    alignItems: "end",
    marginBottom: 24,
  };
  const listWrap: CSSProperties = { borderTop: "1px solid var(--rule)", marginTop: 8 };
  const row: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "88px 1.1fr 2.2fr 110px",
    gap: 24,
    padding: "30px 0",
    borderBottom: "1px solid var(--rule)",
    alignItems: "baseline",
    textDecoration: "none",
    color: "inherit",
    transition: "color 0.2s ease, transform 0.3s ease",
  };
  const no: CSSProperties = {
    fontFamily: "var(--mono)",
    fontSize: 10.5,
    letterSpacing: "0.18em",
    color: "var(--ink-whisper)",
    textTransform: "uppercase",
  };
  const meta: CSSProperties = {
    fontFamily: "var(--mono)",
    fontSize: 10.5,
    letterSpacing: "0.14em",
    color: "var(--ink-whisper)",
    textTransform: "uppercase",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  };
  const title: CSSProperties = {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: "clamp(26px, 2.4vw, 34px)",
    lineHeight: 1.08,
    color: "var(--ink)",
    marginBottom: 10,
    letterSpacing: "-0.01em",
  };
  const dek: CSSProperties = {
    fontFamily: "var(--read)",
    fontWeight: 300,
    fontSize: 16,
    color: "var(--ink-soft)",
    lineHeight: 1.6,
    maxWidth: "58ch",
  };
  const readLink: CSSProperties = {
    textAlign: "right",
    fontFamily: "var(--mono)",
    fontSize: 10.5,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--ink-soft)",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    justifyContent: "flex-end",
  };

  const hostBase = "https://blog.ipseforma.com/";
  const hasPosts = copy.blogPosts && copy.blogPosts.length > 0;

  return (
    <section id="blog" style={sec}>
      <SectionHeader
        eyebrow={copy.blogEyebrow}
        title={copy.blogTitle}
        titleEm={copy.blogTitleEm}
      />
      <div style={head} className="split-grid">
        {copy.blogBody ? (
          <p className="prose reveal" data-delay="1">
            {copy.blogBody}
          </p>
        ) : (
          <span />
        )}
        <div className="reveal" data-delay="2" style={{ textAlign: "right" }}>
          <div className="meta" style={{ marginBottom: 10 }}>
            {copy.blogRecentLabel}
          </div>
          <a
            href={hostBase}
            target="_blank"
            rel="noreferrer"
            className="pill"
            style={{ textDecoration: "none" }}
          >
            <span className="dot" /> {copy.blogCta}{" "}
            <span style={{ marginLeft: 6 }}>↗</span>
          </a>
          <div className="meta" style={{ marginTop: 14 }}>
            {copy.blogDomain}
          </div>
        </div>
      </div>

      {hasPosts && (
        <div style={listWrap}>
          {copy.blogPosts.map((p, i) => (
            <a
              key={p.slug}
              href={hostBase + p.slug}
              target="_blank"
              rel="noreferrer"
              className="reveal blog-row"
              data-delay={String((i % 3) + 1)}
              style={row}
            >
              <span style={no}>{p.no}</span>
              <span style={meta}>
                <span>{p.date}</span>
                <span>
                  {p.tag} · {p.readMin} min
                </span>
              </span>
              <span>
                <div style={title}>{p.title}</div>
                <div style={dek}>{p.dek}</div>
              </span>
              <span style={readLink}>
                {copy.blogReadLabel} <span aria-hidden="true">→</span>
              </span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

export function Contact({ copy }: { copy: Copy }) {
  const sec: CSSProperties = {
    padding: "calc(var(--gutter) * 2) var(--gutter)",
    borderTop: "1px solid var(--rule)",
  };
  const wrap: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "5fr 7fr",
    gap: "calc(var(--gutter)/1.2)",
    alignItems: "end",
  };
  const mail: CSSProperties = {
    fontFamily: "var(--serif)",
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: "clamp(34px, 5vw, 72px)",
    color: "var(--ink)",
    textDecoration: "none",
    borderBottom: "1px solid var(--rule)",
    paddingBottom: 4,
  };
  return (
    <section id="contact" style={sec}>
      <SectionHeader
        eyebrow={copy.contactEyebrow}
        title={copy.contactTitle}
        titleEm={copy.contactTitleEm}
      />
      <div style={wrap} className="split-grid">
        {copy.contactBody ? (
          <p className="prose reveal" data-delay="1">
            {copy.contactBody}
          </p>
        ) : (
          <span />
        )}
        <div className="reveal" data-delay="2">
          {copy.email ? (
            <a href={"mailto:" + copy.email} style={mail}>
              {copy.email}
            </a>
          ) : (
            <span
              style={{
                ...mail,
                color: "var(--ink-whisper)",
                borderBottom: "none",
              }}
            >
              — to be added —
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export function Foot({ copy }: { copy: Copy }) {
  const sec: CSSProperties = {
    padding:
      "calc(var(--gutter) * 1.2) var(--gutter) calc(var(--gutter) * 1.4) var(--gutter)",
    borderTop: "1px solid var(--rule)",
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "calc(var(--gutter)/2)",
    alignItems: "end",
  };
  const colo: CSSProperties = {
    fontFamily: "var(--read)",
    fontWeight: 300,
    fontSize: 14,
    color: "var(--ink-soft)",
    maxWidth: "56ch",
    fontStyle: "italic",
  };
  const cop: CSSProperties = {
    fontFamily: "var(--mono)",
    fontSize: 10.5,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "var(--ink-whisper)",
  };
  return (
    <footer style={sec}>
      <div style={colo}>{copy.colophon}</div>
      <div style={cop}>{copy.copyright}</div>
    </footer>
  );
}
