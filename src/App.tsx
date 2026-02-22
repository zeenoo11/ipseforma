/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Github, Mail, ExternalLink, ArrowRight, ChevronDown, 
  MessageSquare, BookOpen, Layout, Cpu, Briefcase, 
  Send, User, Bot, X, Menu
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";

// Types
type View = "home" | "apps" | "blog" | "docs";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

interface Message {
  role: "user" | "model";
  text: string;
}

// Data
const PROJECTS: Project[] = [
  {
    title: "Project Alpha",
    category: "Design System",
    description: "A comprehensive design system for modern web applications.",
    image: "https://picsum.photos/seed/alpha/800/600",
    tags: ["React", "Tailwind", "TypeScript"]
  },
  {
    title: "Project Beta",
    category: "E-commerce",
    description: "A minimalist shopping experience focused on typography.",
    image: "https://picsum.photos/seed/beta/800/600",
    tags: ["Next.js", "Stripe", "Framer Motion"]
  },
  {
    title: "Project Gamma",
    category: "Analytics",
    description: "Visualizing complex data through simple monochrome interfaces.",
    image: "https://picsum.photos/seed/gamma/800/600",
    tags: ["D3.js", "Python", "FastAPI"]
  }
];

const SKILLS = [
  { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Prisma", "Python"] },
  { category: "Tools", items: ["Git", "Docker", "Figma", "Vercel", "AWS"] }
];

const EXPERIENCE = [
  {
    company: "Tech Innovators",
    role: "Senior Frontend Engineer",
    period: "2022 - Present",
    description: "Leading the development of high-performance web applications using React and modern CSS."
  },
  {
    company: "Creative Studio X",
    role: "Full Stack Developer",
    period: "2020 - 2022",
    description: "Built custom e-commerce solutions and interactive brand experiences."
  }
];

const AVAILABLE_APPS = [
  { id: "writer", name: "Creative Writer", icon: <BookOpen size={20} />, description: "AI-powered writing assistant." },
  { id: "coder", name: "Code Helper", icon: <Cpu size={20} />, description: "Expert in debugging and refactoring." },
  { id: "designer", name: "Design Critic", icon: <Layout size={20} />, description: "Feedback on UI/UX and aesthetics." }
];

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedApp) return;

    const userMsg: Message = { role: "user", text: inputMessage };
    setChatMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...chatMessages, userMsg].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: `You are the ${selectedApp} assistant in the ipseforma ecosystem. 
          ipseforma means 'ipse(self) + forma(form)' - a space for shaping one's self. 
          Be professional, minimalist, and helpful. Keep responses concise.`
        }
      });

      const response = await model;
      const aiMsg: Message = { role: "model", text: response.text || "Sorry, I couldn't process that." };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatMessages(prev => [...prev, { role: "model", text: "Error connecting to Gemini API." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const NavLinks = () => (
    <div className="flex flex-col md:flex-row gap-8 text-sm uppercase tracking-widest font-medium">
      <button onClick={() => { setCurrentView("home"); setIsMenuOpen(false); }} className={`hover:opacity-50 transition-opacity ${currentView === "home" ? "underline underline-offset-8" : ""}`}>Home</button>
      <button onClick={() => { setCurrentView("apps"); setIsMenuOpen(false); }} className={`hover:opacity-50 transition-opacity ${currentView === "apps" ? "underline underline-offset-8" : ""}`}>Apps</button>
      <button onClick={() => { setCurrentView("blog"); setIsMenuOpen(false); }} className="hover:opacity-50 transition-opacity cursor-not-allowed opacity-30">Blog</button>
      <button onClick={() => { setCurrentView("docs"); setIsMenuOpen(false); }} className="hover:opacity-50 transition-opacity cursor-not-allowed opacity-30">Docs</button>
    </div>
  );

  return (
    <div className="min-h-screen font-sans selection:bg-black selection:text-white bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference text-white">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-serif italic font-bold cursor-pointer"
          onClick={() => setCurrentView("home")}
        >
          ipseforma.
        </motion.div>
        
        {/* Desktop Nav */}
        <div className="hidden md:block">
          <NavLinks />
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black text-white z-40 flex flex-col items-center justify-center gap-12"
          >
            <NavLinks />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24">
        {currentView === "home" && (
          <>
            {/* Hero Section */}
            <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-24 relative overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl"
              >
                <h1 className="text-5xl md:text-9xl font-serif italic leading-tight mb-8 tracking-tighter">
                  ipseforma <br />
                  <span className="not-italic font-sans font-light text-3xl md:text-6xl text-black/40">자아를 빚어내는 공간</span>
                </h1>
                <p className="text-lg md:text-2xl text-black/60 font-light max-w-2xl leading-relaxed text-balance">
                  ipse(자아)와 forma(형상)의 결합. <br />
                  끊임없이 변화하는 나를 관찰하고, <br />
                  더 나은 모습으로 빚어가는 정적인 실험실입니다.
                </p>
                <motion.button 
                  whileHover={{ x: 10 }}
                  onClick={() => setCurrentView("apps")}
                  className="mt-12 flex items-center gap-4 text-sm uppercase tracking-widest font-bold group"
                >
                  Explore Apps <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-black/40">Scroll</span>
                <ChevronDown size={16} className="text-black/20 animate-bounce" />
              </motion.div>
            </section>

            {/* Portfolio Section */}
            <section id="work" className="py-32 px-6 md:px-24 bg-black text-white">
              <div className="mb-24">
                <h2 className="text-sm uppercase tracking-[0.4em] text-white/40 mb-4">Selected Projects</h2>
                <div className="h-px w-full bg-white/10" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                {PROJECTS.map((project, index) => (
                  <motion.div 
                    key={project.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-video overflow-hidden bg-white/5 mb-6 relative">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-white/40 mb-2">{project.category}</p>
                        <h3 className="text-2xl font-serif italic mb-4">{project.title}</h3>
                        <div className="flex gap-2">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-[10px] border border-white/20 px-2 py-1 rounded-full text-white/60">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Skills & Experience */}
            <section className="py-32 px-6 md:px-24 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                {/* Skills */}
                <div>
                  <h2 className="text-sm uppercase tracking-[0.4em] text-black/40 mb-12">Core Skills</h2>
                  <div className="space-y-12">
                    {SKILLS.map(skillGroup => (
                      <div key={skillGroup.category}>
                        <h3 className="text-xs uppercase tracking-widest font-bold mb-4">{skillGroup.category}</h3>
                        <div className="flex flex-wrap gap-3">
                          {skillGroup.items.map(skill => (
                            <span key={skill} className="px-4 py-2 bg-black/5 hover:bg-black hover:text-white transition-colors text-sm rounded-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h2 className="text-sm uppercase tracking-[0.4em] text-black/40 mb-12">Experience</h2>
                  <div className="space-y-12">
                    {EXPERIENCE.map(exp => (
                      <div key={exp.company} className="border-l border-black/10 pl-8 relative">
                        <div className="absolute w-2 h-2 bg-black rounded-full -left-[4.5px] top-2" />
                        <p className="text-xs text-black/40 mb-1">{exp.period}</p>
                        <h3 className="text-xl font-serif italic mb-1">{exp.role}</h3>
                        <p className="text-sm font-bold mb-4">{exp.company}</p>
                        <p className="text-black/60 text-sm leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {currentView === "apps" && (
          <section className="min-h-[80vh] px-6 md:px-24 py-12">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12">
                <h2 className="text-sm uppercase tracking-[0.4em] text-black/40 mb-4">ipseforma Apps</h2>
                <h1 className="text-4xl md:text-6xl font-serif italic">Choose your interface.</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {AVAILABLE_APPS.map(app => (
                  <motion.button
                    key={app.id}
                    whileHover={{ y: -5 }}
                    onClick={() => { setSelectedApp(app.id); setChatMessages([]); }}
                    className={`p-8 border text-left transition-all ${selectedApp === app.id ? "bg-black text-white border-black" : "bg-white border-black/10 hover:border-black"}`}
                  >
                    <div className="mb-6">{app.icon}</div>
                    <h3 className="text-xl font-serif italic mb-2">{app.name}</h3>
                    <p className={`text-sm ${selectedApp === app.id ? "text-white/60" : "text-black/40"}`}>{app.description}</p>
                  </motion.button>
                ))}
              </div>

              {/* Chat Interface */}
              <AnimatePresence>
                {selectedApp && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-black flex flex-col h-[600px] bg-white"
                  >
                    <div className="p-4 border-b border-black flex justify-between items-center bg-black text-white">
                      <div className="flex items-center gap-3">
                        {AVAILABLE_APPS.find(a => a.id === selectedApp)?.icon}
                        <span className="text-sm font-bold uppercase tracking-widest">
                          {AVAILABLE_APPS.find(a => a.id === selectedApp)?.name}
                        </span>
                      </div>
                      <button onClick={() => setSelectedApp(null)} className="hover:opacity-50"><X size={20} /></button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      {chatMessages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-black/20 italic">
                          <MessageSquare size={48} className="mb-4" />
                          <p>Start a conversation with {AVAILABLE_APPS.find(a => a.id === selectedApp)?.name}</p>
                        </div>
                      )}
                      {chatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[80%] p-4 rounded-sm flex gap-4 ${msg.role === "user" ? "bg-black text-white" : "bg-black/5 text-black"}`}>
                            <div className="mt-1">
                              {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <div className="prose prose-sm prose-invert max-w-none">
                              <Markdown>{msg.text}</Markdown>
                            </div>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-black/5 p-4 rounded-sm animate-pulse flex gap-4">
                            <Bot size={16} className="mt-1" />
                            <span className="text-sm italic">Thinking...</span>
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    <div className="p-4 border-t border-black flex gap-4">
                      <input 
                        type="text" 
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent outline-none text-sm"
                      />
                      <button 
                        onClick={handleSendMessage}
                        disabled={isTyping || !inputMessage.trim()}
                        className="p-2 bg-black text-white disabled:opacity-30 transition-opacity"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer id="contact" className="py-24 px-6 md:px-24 bg-black text-white">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-8xl font-serif italic mb-8">Let's connect.</h2>
            <div className="flex flex-wrap gap-6">
              <a href="mailto:hello@ipseforma.com" className="p-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                <Mail size={20} />
              </a>
              <a href="#" className="p-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                <Github size={20} />
              </a>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/20 mb-2">ipseforma Studio</p>
            <p className="text-sm font-medium">Seoul, South Korea</p>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-widest text-white/20">
          <p>© 2024 ipseforma</p>
          <p>자아를 빚어내는 공간</p>
        </div>
      </footer>
    </div>
  );
}
