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

interface AppState {
  theme: Theme;
  lang: Lang;
  heroIndex: number;
}

const DEFAULTS: AppState = {
  theme: "light",
  lang: "en",
  heroIndex: 0,
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
  }, [state.theme]);

  useReveal([state.lang, state.heroIndex]);

  const onNav = useCallback((id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      // Offset for global nav (44px) + sub nav (52px) = 96px
      const y = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  const copy = COPY[state.lang];

  return (
    <>
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
