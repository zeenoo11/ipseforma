/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from "react";
import { COPY, type Lang } from "./homepage/copy";
import { useReveal } from "./homepage/useReveal";
import { NowWidget } from "./homepage/NowWidget";
import {
  BlogTeaser,
  Contact,
  Foot,
  Hero,
  Nav,
  Philosophy,
} from "./homepage/sections";

type Theme = "light" | "dark";
type Density = "airy" | "balanced" | "dense";

interface AppState {
  theme: Theme;
  lang: Lang;
  heroIndex: number;
  density: Density;
}

const DEFAULTS: AppState = {
  theme: "light",
  lang: "en",
  heroIndex: 0,
  density: "balanced",
};

export default function App() {
  const [state, setState] = useState<AppState>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ipseforma-state");
      if (raw) setState((s) => ({ ...s, ...JSON.parse(raw) }));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("ipseforma-state", JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-dark", state.theme === "dark");
    const d =
      state.density === "airy" ? 1.08 : state.density === "dense" ? 0.92 : 1;
    const g =
      state.density === "airy"
        ? "clamp(28px, 6vw, 112px)"
        : state.density === "dense"
        ? "clamp(18px, 4vw, 64px)"
        : "clamp(24px, 5vw, 88px)";
    root.style.setProperty("--density", String(d));
    root.style.setProperty("--gutter", g);
  }, [state.theme, state.density]);

  useReveal([state.lang, state.heroIndex]);

  const [prog, setProg] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProg(max > 0 ? h.scrollTop / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [state.lang]);

  const onNav = useCallback((id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  const copy = COPY[state.lang];

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 2,
          width: `${prog * 100}%`,
          background: "var(--ink)",
          zIndex: 15,
          transition: "width 0.08s linear",
        }}
      />

      <Nav
        copy={copy}
        theme={state.theme}
        onTheme={() =>
          setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }))
        }
        lang={state.lang}
        onLang={(l) => setState((s) => ({ ...s, lang: l }))}
        onNav={onNav}
      />

      <NowWidget copy={copy} />

      <main>
        <Hero copy={copy} heroIndex={state.heroIndex} />
        <Philosophy copy={copy} />
        <BlogTeaser copy={copy} />
        <Contact copy={copy} />
        <Foot copy={copy} />
      </main>
    </>
  );
}
