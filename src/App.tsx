/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Cpu,
  ExternalLink,
  FileText,
  Github,
  Layout,
  Mail,
  Menu,
  Moon,
  Pencil,
  PenTool,
  Plus,
  Save,
  Sun,
  Trash2,
  X,
} from "lucide-react";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ToeflApp } from "./toefl/ToeflApp";

type View = "home" | "apps" | "blog";
type Theme = "light" | "dark";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    title: "Project Alpha",
    category: "Design System",
    description: "A scalable design system for modern web products.",
    image: "https://picsum.photos/seed/alpha/800/600",
    tags: ["React", "Tailwind", "TypeScript"],
  },
  {
    title: "Project Beta",
    category: "E-commerce",
    description: "A structured commerce experience with clear UX flows.",
    image: "https://picsum.photos/seed/beta/800/600",
    tags: ["Next.js", "Stripe", "Framer Motion"],
  },
  {
    title: "Project Gamma",
    category: "Analytics",
    description: "A clean dashboard for actionable product insights.",
    image: "https://picsum.photos/seed/gamma/800/600",
    tags: ["D3.js", "Python", "FastAPI"],
  },
];

const AVAILABLE_APPS = [
  {
    id: "toefl",
    name: "TOEFL Writing",
    icon: <PenTool size={20} />,
    description: "Practice for the updated TOEFL Writing task.",
    available: true,
  },
  {
    id: "writer",
    name: "Creative Writer",
    icon: <BookOpen size={20} />,
    description: "Writing workflow assistant.",
    available: false,
  },
  {
    id: "coder",
    name: "Code Helper",
    icon: <Cpu size={20} />,
    description: "Refactoring and debugging support.",
    available: false,
  },
  {
    id: "designer",
    name: "Design Critic",
    icon: <Layout size={20} />,
    description: "UI and UX review support.",
    available: false,
  },
];

export default function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const [currentView, setCurrentView] = useState<View>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const isDark = theme === "dark";

  useEffect(() => {
    const raw = localStorage.getItem("ipseforma-blog-posts");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as BlogPost[];
      setBlogPosts(parsed);
    } catch {
      setBlogPosts([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ipseforma-blog-posts", JSON.stringify(blogPosts));
  }, [blogPosts]);

  const sortedPosts = useMemo(
    () =>
      [...blogPosts].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      ),
    [blogPosts]
  );

  const clearBlogForm = () => {
    setPostTitle("");
    setPostContent("");
    setEditingPostId(null);
  };

  const handleSavePost = () => {
    if (!postTitle.trim() || !postContent.trim()) return;
    const now = new Date().toISOString();

    if (editingPostId) {
      setBlogPosts((prev) =>
        prev.map((post) =>
          post.id === editingPostId
            ? {
                ...post,
                title: postTitle.trim(),
                content: postContent.trim(),
                updatedAt: now,
              }
            : post
        )
      );
      clearBlogForm();
      return;
    }

    const newPost: BlogPost = {
      id: crypto.randomUUID(),
      title: postTitle.trim(),
      content: postContent.trim(),
      createdAt: now,
      updatedAt: now,
    };
    setBlogPosts((prev) => [newPost, ...prev]);
    clearBlogForm();
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPostId(post.id);
    setPostTitle(post.title);
    setPostContent(post.content);
  };

  const handleDeletePost = (postId: string) => {
    setBlogPosts((prev) => prev.filter((post) => post.id !== postId));
    if (editingPostId === postId) clearBlogForm();
  };

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
            <button
              onClick={() => setCurrentView("blog")}
              className={
                currentView === "blog"
                  ? isDark
                    ? "text-white"
                    : "text-slate-900"
                  : isDark
                  ? "text-white/50 hover:text-white"
                  : "text-slate-500 hover:text-slate-900"
              }
            >
              Blog
            </button>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`rounded-lg border p-2 transition-colors ${
                isDark
                  ? "border-white/20 text-white/70 hover:text-white"
                  : "border-slate-300 text-slate-600 hover:text-slate-900"
              }`}
              aria-label="테마 전환"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`rounded-lg border p-2 ${
                isDark ? "border-white/20 text-white/70" : "border-slate-300 text-slate-600"
              }`}
              aria-label="테마 전환"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className={isDark ? "text-white/80" : "text-slate-700"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            <button
              onClick={() => {
                setCurrentView("blog");
                setIsMenuOpen(false);
              }}
              className="text-xl font-semibold uppercase tracking-widest"
            >
              Blog
            </button>
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
                <BlurFade delay={0.05}>
                  <p
                    className={`mb-4 text-xs font-medium uppercase tracking-[0.3em] ${
                      isDark ? "text-slate-300/70" : "text-slate-500"
                    }`}
                  >
                    Portfolio
                  </p>
                </BlurFade>
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
                    <button
                      onClick={() => {
                        const section = document.getElementById("work");
                        if (section) section.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-colors ${
                        isDark
                          ? "border-slate-500/50 hover:bg-slate-700/30"
                          : "border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      View Projects <ExternalLink size={14} />
                    </button>
                  </div>
                </BlurFade>
              </div>
            </section>

            <section id="work" className="px-6 py-16 md:px-24 md:py-20">
              <div className="mx-auto max-w-6xl">
                <BlurFade delay={0.05} inView>
                  <h2 className="mb-10 text-3xl font-serif italic md:text-4xl">Selected Projects</h2>
                </BlurFade>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {PROJECTS.map((project, idx) => (
                    <BlurFade key={project.title} delay={idx * 0.1} inView>
                      <article
                        className={`relative overflow-hidden rounded-xl border ${
                          isDark ? "border-slate-700/80 bg-slate-900/50" : "border-slate-200 bg-white"
                        }`}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="h-52 w-full object-cover"
                        />
                        <div className="space-y-3 p-5">
                          <p className={isDark ? "text-xs text-slate-300/70" : "text-xs text-slate-500"}>
                            {project.category}
                          </p>
                          <h3 className="text-xl font-semibold">{project.title}</h3>
                          <p className={isDark ? "text-sm text-slate-300/80" : "text-sm text-slate-600"}>
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`rounded-full border px-2.5 py-1 text-[10px] ${
                                  isDark
                                    ? "border-slate-600 text-slate-300"
                                    : "border-slate-300 text-slate-600"
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <BorderBeam
                          colorFrom={isDark ? "#64748b" : "#94a3b8"}
                          colorTo={isDark ? "#e2e8f0" : "#475569"}
                          duration={8}
                        />
                      </article>
                    </BlurFade>
                  ))}
                </div>
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
                      <button onClick={() => setSelectedApp(null)}>
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

        {currentView === "blog" && (
          <section className="relative px-6 py-16 md:px-24 md:py-20">
            <DotPattern
              width={20}
              height={20}
              cr={1}
              className={isDark ? "text-white/[0.07]" : "text-slate-700/[0.1]"}
            />
            <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <BlurFade delay={0.05}>
                  <h2 className="mb-6 text-3xl font-serif italic md:text-4xl">Blog Manager</h2>
                </BlurFade>

                <div
                  className={`space-y-4 rounded-xl border p-5 ${
                    isDark ? "border-slate-700/80 bg-slate-900/40" : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="space-y-2">
                    <label className={isDark ? "text-xs text-slate-300" : "text-xs text-slate-600"}>
                      제목
                    </label>
                    <input
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      placeholder="블로그 제목"
                      className={`w-full rounded-lg border px-3 py-2 text-sm outline-none ${
                        isDark
                          ? "border-slate-600 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                          : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={isDark ? "text-xs text-slate-300" : "text-xs text-slate-600"}>
                      내용
                    </label>
                    <textarea
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      rows={10}
                      placeholder="블로그 내용을 작성하세요."
                      className={`w-full rounded-lg border px-3 py-2 text-sm outline-none ${
                        isDark
                          ? "border-slate-600 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                          : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSavePost}
                      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm ${
                        isDark
                          ? "border-slate-500 bg-slate-800/50 hover:bg-slate-700/60"
                          : "border-slate-300 bg-slate-50 hover:bg-slate-100"
                      }`}
                    >
                      {editingPostId ? <Save size={14} /> : <Plus size={14} />}
                      {editingPostId ? "수정 저장" : "새 글 저장"}
                    </button>
                    {editingPostId && (
                      <button
                        onClick={clearBlogForm}
                        className={`rounded-lg border px-4 py-2 text-sm ${
                          isDark ? "border-slate-600 text-slate-200" : "border-slate-300 text-slate-700"
                        }`}
                      >
                        취소
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div
                  className={`rounded-xl border ${
                    isDark ? "border-slate-700/80 bg-slate-900/40" : "border-slate-200 bg-white"
                  }`}
                >
                  <div
                    className={`flex items-center justify-between border-b px-5 py-4 ${
                      isDark ? "border-slate-700/80" : "border-slate-200"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest">
                      <FileText size={14} />
                      Posts
                    </span>
                    <span className={isDark ? "text-xs text-slate-400" : "text-xs text-slate-500"}>
                      총 {sortedPosts.length}개
                    </span>
                  </div>

                  {sortedPosts.length === 0 ? (
                    <div className={isDark ? "p-8 text-sm text-slate-400" : "p-8 text-sm text-slate-500"}>
                      작성된 글이 없습니다.
                    </div>
                  ) : (
                    <ul className="divide-y divide-slate-200/60 dark:divide-slate-700/70">
                      {sortedPosts.map((post) => (
                        <li key={post.id} className="p-5">
                          <div className="mb-2 flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-base font-semibold">{post.title}</h3>
                              <p className={isDark ? "text-xs text-slate-400" : "text-xs text-slate-500"}>
                                업데이트: {new Date(post.updatedAt).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditPost(post)}
                                className={`rounded-md border p-2 ${
                                  isDark
                                    ? "border-slate-600 text-slate-200 hover:bg-slate-800/60"
                                    : "border-slate-300 text-slate-700 hover:bg-slate-100"
                                }`}
                                aria-label="글 수정"
                              >
                                <Pencil size={13} />
                              </button>
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className={`rounded-md border p-2 ${
                                  isDark
                                    ? "border-slate-600 text-slate-200 hover:bg-slate-800/60"
                                    : "border-slate-300 text-slate-700 hover:bg-slate-100"
                                }`}
                                aria-label="글 삭제"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                          <p className={isDark ? "line-clamp-3 text-sm text-slate-300/85" : "line-clamp-3 text-sm text-slate-700"}>
                            {post.content}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
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
              aria-label="이메일"
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
              aria-label="깃허브"
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
