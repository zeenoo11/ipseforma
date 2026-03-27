/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Github,
  Mail,
  Menu,
  Moon,
  PenTool,
  Sun,
  X,
} from "lucide-react";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ToeflApp } from "./toefl/ToeflApp";

type View = "home" | "apps";
type Theme = "light" | "dark";

const AVAILABLE_APPS = [
  {
    id: "toefl",
    name: "TOEFL Writing",
    icon: <PenTool size={20} />,
    description: "Practice for the updated TOEFL Writing task.",
    available: true,
  },
];

export default function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const [currentView, setCurrentView] = useState<View>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen font-sans transition-colors ${
        isDark
          ? "bg-[#0b1020] text-slate-100 selection:bg-slate-100 selection:text-slate-900"
          : "bg-[#f6f8fc] text-slate-900 selection:bg-slate-900 selection:text-slate-100"
      }`}
    >
      <nav
        className={`fixed top-0 z-50 w-full border-b px-6 py-5 backdrop-blur-xl ${
          isDark
            ? "border-white/10 bg-[#0b1020]/75"
            : "border-slate-200 bg-[#f6f8fc]/80"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            onClick={() => setCurrentView("home")}
            className="text-xl font-serif italic font-bold"
          >
            ipseforma.
          </button>

          <div className="hidden items-center gap-6 text-sm font-medium uppercase tracking-widest md:flex">
            <button
              onClick={() => setCurrentView("home")}
              className={
                currentView === "home"
                  ? isDark
                    ? "text-white"
                    : "text-slate-900"
                  : isDark
                  ? "text-white/50 hover:text-white"
                  : "text-slate-500 hover:text-slate-900"
              }
            >
              Home
            </button>
            <button
              onClick={() => setCurrentView("apps")}
              className={
                currentView === "apps"
                  ? isDark
                    ? "text-white"
                    : "text-slate-900"
                  : isDark
                  ? "text-white/50 hover:text-white"
                  : "text-slate-500 hover:text-slate-900"
              }
            >
              Apps
            </button>
            <a
              href="https://blog.ipseforma.com"
              className={
                isDark
                  ? "text-white/50 hover:text-white"
                  : "text-slate-500 hover:text-slate-900"
              }
            >
              Blog
            </a>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`rounded-lg border p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                isDark
                  ? "border-white/20 text-white/70 hover:text-white"
                  : "border-slate-300 text-slate-600 hover:text-slate-900"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`rounded-lg border p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                isDark ? "border-white/20 text-white/70 hover:bg-white/10" : "border-slate-300 text-slate-600 hover:bg-slate-100"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className={`rounded-lg p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                isDark ? "text-white/80 hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 ${
              isDark ? "bg-[#0b1020]" : "bg-[#f6f8fc]"
            }`}
          >
            <button
              onClick={() => {
                setCurrentView("home");
                setIsMenuOpen(false);
              }}
              className="text-xl font-semibold uppercase tracking-widest"
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentView("apps");
                setIsMenuOpen(false);
              }}
              className="text-xl font-semibold uppercase tracking-widest"
            >
              Apps
            </button>
            <a
              href="https://blog.ipseforma.com"
              className="text-xl font-semibold uppercase tracking-widest"
            >
              Blog
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        {currentView === "home" && (
          <>
            <section className="relative overflow-hidden px-6 py-24 md:px-24 md:py-28">
              <DotPattern
                width={22}
                height={22}
                cr={1.1}
                className={isDark ? "text-white/[0.08]" : "text-slate-700/[0.10]"}
              />
              <div className="relative mx-auto max-w-6xl">
                <BlurFade delay={0.1}>
                  <h1 className="mb-6 text-5xl font-serif italic tracking-tight md:text-7xl">
                    Ipse + Forma
                  </h1>
                </BlurFade>
                <BlurFade delay={0.15}>
                  <p
                    className={`max-w-2xl text-base leading-relaxed md:text-lg ${
                      isDark ? "text-slate-300/75" : "text-slate-600"
                    }`}
                  >
                    ipse(자아) + forma(형성) 는 자아를 만들어간다는 의미로, 성향, 가치관,
                    취미, 철학을 찾아가는 공간입니다.
                  </p>
                </BlurFade>
                <BlurFade delay={0.2}>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <button
                      onClick={() => setCurrentView("apps")}
                      className={`inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-colors ${
                        isDark
                          ? "border-slate-500/50 bg-slate-700/30 hover:bg-slate-700/50"
                          : "border-slate-300 bg-white hover:bg-slate-50"
                      }`}
                    >
                      Open Apps <ArrowRight size={14} />
                    </button>
                  </div>
                </BlurFade>
              </div>
            </section>

          </>
        )}

        {currentView === "apps" && (
          <section className="relative px-6 py-16 md:px-24 md:py-20">
            <DotPattern
              width={20}
              height={20}
              cr={1}
              className={isDark ? "text-white/[0.07]" : "text-slate-700/[0.1]"}
            />
            <div className="relative mx-auto max-w-6xl">
              <BlurFade delay={0.05}>
                <h2 className="mb-8 text-3xl font-serif italic md:text-4xl">Applications</h2>
              </BlurFade>

              <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {AVAILABLE_APPS.map((app, idx) => (
                  <BlurFade key={app.id} delay={0.08 * idx}>
                    <button
                      onClick={() => app.available && setSelectedApp(app.id)}
                      className={`h-full rounded-xl border p-5 text-left transition-all ${
                        selectedApp === app.id
                          ? isDark
                            ? "border-slate-300 bg-slate-800/50"
                            : "border-slate-500 bg-white"
                          : isDark
                          ? "border-slate-700/80 bg-slate-900/40"
                          : "border-slate-200 bg-white"
                      } ${!app.available && "opacity-60"}`}
                    >
                      <div className={isDark ? "mb-4 text-slate-200" : "mb-4 text-slate-700"}>
                        {app.icon}
                      </div>
                      <h3 className="mb-2 text-base font-semibold">{app.name}</h3>
                      <p className={isDark ? "text-xs text-slate-300/75" : "text-xs text-slate-600"}>
                        {app.description}
                      </p>
                      {!app.available && (
                        <span className="mt-3 inline-block text-[10px] uppercase tracking-wider text-slate-400">
                          Coming Soon
                        </span>
                      )}
                    </button>
                  </BlurFade>
                ))}
              </div>

              <AnimatePresence>
                {selectedApp && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className={`overflow-hidden rounded-xl border ${
                      isDark ? "border-slate-700/80 bg-slate-900/40" : "border-slate-200 bg-white"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-between border-b px-5 py-3 ${
                        isDark ? "border-slate-700/80" : "border-slate-200"
                      }`}
                    >
                      <span className="text-sm font-medium uppercase tracking-widest">
                        {AVAILABLE_APPS.find((a) => a.id === selectedApp)?.name}
                      </span>
                      <button
                        onClick={() => setSelectedApp(null)}
                        className={`rounded-md p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                          isDark ? "hover:bg-slate-800 text-slate-400 hover:text-white" : "hover:bg-slate-100 text-slate-500 hover:text-slate-900"
                        }`}
                        aria-label="앱 닫기"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {selectedApp === "toefl" ? (
                      <div className="min-h-[800px]">
                        <ToeflApp />
                      </div>
                    ) : (
                      <div className="flex h-[320px] items-center justify-center text-sm text-slate-500">
                        이 모듈은 준비 중입니다.
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        )}
      </main>

      <footer
        className={`border-t px-6 py-16 md:px-24 ${
          isDark ? "border-slate-700/80" : "border-slate-200"
        }`}
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-2xl font-serif italic">Contact</h2>
          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href="mailto:connect@ipseforma.com"
              className={`inline-flex items-center justify-center rounded-lg border p-2.5 ${
                isDark ? "border-slate-600 text-slate-200" : "border-slate-300 text-slate-700"
              }`}
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://github.com/zeenoo11"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center rounded-lg border p-2.5 ${
                isDark ? "border-slate-600 text-slate-200" : "border-slate-300 text-slate-700"
              }`}
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          </div>
          <div className={`flex justify-end text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            <span>@2026 ipseforma</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
