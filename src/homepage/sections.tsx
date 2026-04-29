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
  const globalNav: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: 44,
    background: "var(--colors-surface-black)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: "0 20px",
  };

  const subNav: CSSProperties = {
    position: "fixed",
    top: 44,
    left: 0,
    right: 0,
    height: 52,
    background: "rgba(245, 245, 247, 0.8)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 var(--gutter)",
    borderBottom: "1px solid var(--colors-hairline)",
    zIndex: 99,
  };

  const globalLink: CSSProperties = {
    color: "#f5f5f7",
    fontSize: 12,
    margin: "0 10px",
    textDecoration: "none",
    opacity: 0.8,
  };

  const subNavTitle: CSSProperties = {
    fontSize: 21,
    fontWeight: 600,
    color: "var(--colors-ink)",
    cursor: "pointer",
  };

  const subNavLinks: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 20,
  };

  const subNavLink: CSSProperties = {
    fontSize: 12,
    color: "var(--colors-ink)",
    textDecoration: "none",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
  };

  return (
    <>
      <div style={globalNav}>
        <a style={globalLink} onClick={() => onNav("top")}>ipseforma</a>
        <div style={{ flex: 1 }} />
        <button
          onClick={onTheme}
          style={{ ...globalLink, background: "none", border: "none", cursor: "pointer" }}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
        <div style={{ display: "flex", gap: 8, marginLeft: 20 }}>
          <button onClick={() => onLang("en")} style={{ ...globalLink, background: "none", border: "none", cursor: "pointer", opacity: lang === "en" ? 1 : 0.5 }}>EN</button>
          <button onClick={() => onLang("ko")} style={{ ...globalLink, background: "none", border: "none", cursor: "pointer", opacity: lang === "ko" ? 1 : 0.5 }}>KO</button>
        </div>
      </div>
      <div style={subNav}>
        <div style={subNavTitle} onClick={() => onNav("top")}>
          {copy.brand}
        </div>
        <div style={subNavLinks}>
          <button style={subNavLink} onClick={() => onNav("philosophy")}>{copy.nav.philosophy}</button>
          <a href="https://blog.ipseforma.com" target="_blank" rel="noreferrer" style={subNavLink}>{copy.nav.blog}</a>
          <button style={subNavLink} onClick={() => onNav("contact")}>{copy.nav.contact}</button>
          <button className="button-primary" style={{ padding: "4px 12px", fontSize: 12 }} onClick={() => onNav("contact")}>
            Connect
          </button>
        </div>
      </div>
      <div style={{ height: 96 }} />
    </>
  );
}

interface HeroProps {
  copy: Copy;
  heroIndex: number;
}

export function Hero({ copy, heroIndex }: HeroProps) {
  const t = copy.heroTitles[heroIndex % copy.heroTitles.length];

  return (
    <section id="top" className="product-tile product-tile-light" style={{ minHeight: "80vh", justifyContent: "center" }}>
      <h1 className="typography-hero-display reveal" data-delay="1" style={{ marginBottom: 8 }}>
        {t.a}{t.amp}{t.b}
      </h1>
      <p className="typography-lead reveal" data-delay="2" style={{ marginBottom: 24, maxWidth: "600px" }}>
        {copy.heroLead}
      </p>
      <div className="reveal" data-delay="3" style={{ display: "flex", gap: 20 }}>
        <a href="#philosophy" className="button-primary">Learn more</a>
        <a href="mailto:hello@ipseforma.com" className="text-link" style={{ alignSelf: "center", fontSize: 17 }}>Connect ›</a>
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
  const hasBody = copy.philosophyBody && copy.philosophyBody.length > 0;

  return (
    <section id="philosophy" className="product-tile product-tile-dark">
      <h2 className="typography-display-lg reveal" data-delay="1" style={{ marginBottom: 16 }}>
        {copy.philosophyTitle} {copy.philosophyTitleEm}
      </h2>
      {hasBody ? (
        <div style={{ maxWidth: "600px" }}>
          {copy.philosophyBody.map((p, i) => (
            <p
              key={i}
              className="typography-body reveal"
              data-delay={String(i + 2)}
              style={{ marginBottom: 16 }}
            >
              {p}
            </p>
          ))}
        </div>
      ) : (
        <p
          className="typography-body reveal"
          data-delay="2"
          style={{ fontStyle: "italic", opacity: 0.5 }}
        >
          — to be written —
        </p>
      )}
    </section>
  );
}

export function BlogTeaser({ copy }: { copy: Copy }) {
  const hostBase = "https://blog.ipseforma.com/";
  const hasPosts = copy.blogPosts && copy.blogPosts.length > 0;

  const rowStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    padding: "24px 0",
    borderBottom: "1px solid var(--colors-hairline)",
    textDecoration: "none",
    width: "100%",
    maxWidth: "600px",
  };

  return (
    <section id="blog" className="product-tile product-tile-light">
      <h2 className="typography-display-lg reveal" data-delay="1" style={{ marginBottom: 16 }}>
        {copy.blogTitle}
      </h2>
      <div style={{ maxWidth: "600px", width: "100%", textAlign: "left" }}>
        {hasPosts ? (
          copy.blogPosts.map((p, i) => (
            <a
              key={p.slug}
              href={hostBase + p.slug}
              target="_blank"
              rel="noreferrer"
              className="reveal"
              data-delay={String(i + 2)}
              style={rowStyle}
            >
              <div className="typography-body" style={{ fontWeight: 600, color: "var(--colors-ink)" }}>{p.title}</div>
              <div className="typography-body" style={{ opacity: 0.6, fontSize: 14 }}>{p.date} · {p.readMin} min read</div>
              <div className="text-link" style={{ marginTop: 8, fontSize: 14 }}>Read more ›</div>
            </a>
          ))
        ) : (
          <p className="typography-body reveal" data-delay="2" style={{ textAlign: "center" }}>
            Check out the latest at <a href={hostBase} target="_blank" rel="noreferrer" className="text-link">{copy.blogDomain}</a>
          </p>
        )}
      </div>
      <div className="reveal" data-delay="4" style={{ marginTop: 40 }}>
        <a href={hostBase} target="_blank" rel="noreferrer" className="button-primary">
          {copy.blogCta}
        </a>
      </div>
    </section>
  );
}

export function Contact({ copy }: { copy: Copy }) {
  return (
    <section id="contact" className="product-tile product-tile-parchment">
      <h2 className="typography-display-lg reveal" data-delay="1" style={{ marginBottom: 16 }}>
        {copy.contactTitle}
      </h2>
      <p className="typography-lead reveal" data-delay="2" style={{ marginBottom: 32, maxWidth: "600px" }}>
        {copy.contactBody || "Feel free to reach out for collaborations or just a friendly hello."}
      </p>
      <div className="reveal" data-delay="3">
        {copy.email ? (
          <a href={"mailto:" + copy.email} className="button-primary">
            {copy.email}
          </a>
        ) : (
          <span className="typography-body" style={{ opacity: 0.5 }}>
            — email to be added —
          </span>
        )}
      </div>
    </section>
  );
}

export function Foot({ copy }: { copy: Copy }) {
  const footerStyle: CSSProperties = {
    background: "var(--colors-canvas-parchment)",
    padding: "64px var(--gutter)",
    color: "var(--colors-ink-muted-80)",
    borderTop: "1px solid var(--colors-hairline)",
  };

  const columnStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  };

  return (
    <footer style={footerStyle}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 40 }}>
        <div style={columnStyle}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Explore</div>
          <a href="#philosophy" className="typography-dense-link text-link" style={{ color: "inherit" }}>Philosophy</a>
          <a href="https://blog.ipseforma.com" target="_blank" rel="noreferrer" className="typography-dense-link text-link" style={{ color: "inherit" }}>Blog</a>
          <a href="#contact" className="typography-dense-link text-link" style={{ color: "inherit" }}>Contact</a>
        </div>
        <div style={columnStyle}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Connect</div>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="typography-dense-link text-link" style={{ color: "inherit" }}>GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="typography-dense-link text-link" style={{ color: "inherit" }}>LinkedIn</a>
        </div>
        <div style={{ ...columnStyle, gridColumn: "span 2" }}>
          <div className="typography-body" style={{ fontStyle: "italic", opacity: 0.6 }}>
            {copy.colophon || "Crafted with intentionality and a focus on minimalist digital experiences."}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--colors-hairline)", paddingTop: 20, fontSize: 12, opacity: 0.5 }}>
        {copy.copyright}
      </div>
    </footer>
  );
}
