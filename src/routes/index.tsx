import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Play, Check, X, TrendingUp, BarChart2, Search, Globe,
  Layers, Cloud, Shield, ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EsaLogo } from "@/components/EsaLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ESA — Enterprise Strategy Agent" },
      { name: "description", content: "AI-powered enterprise intelligence. Strategy. Data. Research. Search. All in one query." },
    ],
  }),
  component: Landing,
});

// ── Typing animation ──────────────────────────────────────────────────────────
const BRIEFS = [
  "Build a fraud-detection agent for our bank",
  "Benchmark our SaaS pricing against competitors",
  "Analyze Q3 revenue and forecast Q4",
];

function TypingBrief() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const full = BRIEFS[idx];
    if (!deleting) {
      if (text.length < full.length) {
        t.current = setTimeout(() => setText(full.slice(0, text.length + 1)), 45);
      } else {
        t.current = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (text.length > 0) {
        t.current = setTimeout(() => setText(text.slice(0, -1)), 22);
      } else {
        setDeleting(false);
        setIdx((i) => (i + 1) % BRIEFS.length);
      }
    }
    return () => clearTimeout(t.current);
  }, [text, deleting, idx]);

  return (
    <div className="rounded-xl px-4 py-3.5 text-[14px] text-[#0F1117] min-h-[48px]"
         style={{ background: "rgba(79,110,247,0.06)", border: "0.5px solid rgba(79,110,247,0.18)" }}>
      <span>{text}</span>
      <span className="inline-block w-[2px] h-4 bg-[#4F6EF7] animate-pulse align-middle ml-0.5" />
    </div>
  );
}

// ── Scroll-aware nav ──────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[60px] transition-all duration-200"
         style={{
           background: scrolled ? "rgba(247,248,252,0.92)" : "transparent",
           backdropFilter: scrolled ? "blur(20px)" : "none",
           borderBottom: scrolled ? "0.5px solid #E4E8F4" : "0.5px solid transparent",
         }}>
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <EsaLogo />
        <div className="hidden md:flex items-center gap-8 text-[14px] text-[#4B526B]">
          <a href="#" className="hover:text-[#0F1117] transition-colors">Home</a>
          <a href="#features" className="hover:text-[#0F1117] transition-colors">Features</a>
          <a href="#pricing" className="hover:text-[#0F1117] transition-colors">Pricing</a>
          <a href="#" className="hover:text-[#0F1117] transition-colors">Docs</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="h-9 px-4 rounded-lg text-[14px] text-[#4B526B] border border-[#D6DCF0] hover:bg-[#F0F2FA] flex items-center transition-colors">
            Log In
          </Link>
          <Link to="/login" className="h-9 px-5 rounded-lg text-[14px] font-medium bg-[#4F6EF7] text-white hover:bg-[#3D5BE8] flex items-center transition-colors"
                style={{ boxShadow: "0 0 20px rgba(79,110,247,0.22)" }}>
            Start Free Trial
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Tab strip data ────────────────────────────────────────────────────────────
const TABS = ["Plan", "Research", "Strategy", "Analyse"];

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      {/* gradient bg */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "linear-gradient(135deg, #F7F8FC 0%, #EEF1FA 55%, #F0F4FF 100%)" }} />
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: "absolute", top: 0, left: 0, width: 600, height: 400, background: "radial-gradient(ellipse 600px 400px at 15% 20%, rgba(79,110,247,0.10) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 500, height: 350, background: "radial-gradient(ellipse 500px 350px at 85% 80%, rgba(247,146,74,0.06) 0%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-[760px] mx-auto text-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium text-[#4F6EF7]"
              style={{ background: "rgba(79,110,247,0.10)", border: "0.5px solid rgba(79,110,247,0.3)" }}>
          ✦ AI-First Enterprise Intelligence
        </span>
        <h1 className="mt-6 text-[44px] md:text-[64px] font-bold text-[#0F1117] leading-[1.05] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-display)" }}>
          AI-powered enterprise<br />
          <span style={{ background: "linear-gradient(135deg, #4F6EF7, #0FC4A7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            intelligence
          </span>, one interface
        </h1>
        <p className="mt-6 text-[18px] md:text-[20px] text-[#4B526B] max-w-[560px] mx-auto leading-[1.5]">
          Strategy. Data. Research. Search. All in one query.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <Link to="/login" className="h-12 px-7 rounded-[10px] bg-[#4F6EF7] text-white text-[16px] font-medium flex items-center gap-2 animate-pulse-glow hover:bg-[#3D5BE8] transition-colors">
            Launch Trial Now <ArrowRight className="w-4 h-4" />
          </Link>
          <button className="h-12 px-6 rounded-[10px] border border-[#D6DCF0] bg-white text-[#0F1117] text-[15px] flex items-center gap-2 hover:bg-[#F0F2FA] transition-colors">
            <Play className="w-4 h-4" /> Watch Demo
          </button>
        </div>
      </div>

      {/* ── Architecture diagram ── */}
      <div className="relative mt-14 max-w-[1100px] mx-auto">
        <div className="grid md:grid-cols-3 gap-0 rounded-2xl overflow-hidden"
             style={{ boxShadow: "0 4px 24px rgba(79,110,247,0.10), 0 1px 4px rgba(0,0,0,0.06)" }}>

          {/* Col 1 — Your Brief */}
          <div className="p-6 border-r border-[#E4E8F4]"
               style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(16px)" }}>
            <h3 className="text-center text-[17px] font-semibold text-[#0F1117] mb-4"
                style={{ fontFamily: "var(--font-display)" }}>Your Brief</h3>
            <TypingBrief />
            <div className="my-5 flex justify-center">
              <EsaLogo size={28} withWord={false} />
            </div>
            <div className="text-center text-[10px] font-semibold text-[#8A93B0] tracking-[0.12em]">
              PLAIN ENGLISH
            </div>
          </div>

          {/* Col 2 — ESA Platform with 4 agents */}
          <div className="p-6 border-r border-[#E4E8F4]"
               style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(16px)" }}>
            <h3 className="text-center text-[17px] font-semibold text-[#0F1117] mb-4"
                style={{ fontFamily: "var(--font-display)" }}>ESA Platform</h3>
            {/* ESA hero chip */}
            <div className="rounded-2xl p-5 mb-4 text-center"
                 style={{ background: "linear-gradient(135deg,#1a0a3e 0%,#2d0a5e 50%,#3d1080 100%)", border: "1px solid rgba(120,80,220,0.4)" }}>
              <div className="text-[44px] font-bold leading-none mb-1"
                   style={{ color: "#a78bfa", fontFamily: "var(--font-display)" }}>ESA</div>
              <div className="text-[10px] tracking-[0.18em] font-medium"
                   style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-mono)" }}>
                ENTERPRISE STRATEGY AGENT
              </div>
            </div>
            {/* 4 agents */}
            <div className="text-[10px] text-[#8A93B0] tracking-[0.12em] text-center mb-2">4 SPECIALIZED AGENTS</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Strategy Agent", color: "#4A6CF7", bg: "rgba(74,108,247,0.08)" },
                { label: "Data Analyst",   color: "#0FC4A7", bg: "rgba(15,196,167,0.08)" },
                { label: "Search Agent",   color: "#9B72F7", bg: "rgba(155,114,247,0.08)" },
                { label: "Research Agent", color: "#F7924A", bg: "rgba(247,146,74,0.08)", active: true },
              ].map((a) => (
                <div key={a.label}
                     className="rounded-[10px] px-3 py-2.5 text-[12px] font-medium"
                     style={{
                       background: a.bg,
                       border: a.active ? `1.5px solid ${a.color}` : `1px solid ${a.color}33`,
                       color: a.color,
                     }}>
                  {a.label}
                </div>
              ))}
            </div>
          </div>

          {/* Col 3 — Output */}
          <div className="p-6"
               style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(16px)" }}>
            <h3 className="text-center text-[17px] font-semibold text-[#0F1117] mb-4"
                style={{ fontFamily: "var(--font-display)" }}>Insights & Reports</h3>
            <div className="space-y-2.5">
              {[
                { icon: TrendingUp, label: "Strategy Documents", color: "#4A6CF7" },
                { icon: BarChart2,  label: "Data Visualizations", color: "#0FC4A7" },
                { icon: Search,     label: "Knowledge Search",    color: "#9B72F7" },
                { icon: Globe,      label: "Market Research",     color: "#F7924A" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl px-3 py-2.5 border border-[#E4E8F4] bg-white hover:border-[#D6DCF0] transition-colors group cursor-default">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                       style={{ background: color + "15" }}>
                    <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.5} />
                  </div>
                  <span className="text-[13px] font-medium text-[#0F1117]">{label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#8A93B0] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#E4E8F4] flex flex-wrap gap-2">
              {["PDF", "PPT", "CSV", "PNG"].map((f) => (
                <span key={f} className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#4B526B]"
                      style={{ background: "#F0F2FA", border: "0.5px solid #D6DCF0" }}>{f}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom trust bar */}
        <div className="rounded-b-2xl px-8 py-3.5 flex flex-wrap items-center justify-center gap-8 text-[13px] text-[#4B526B] -mt-px"
             style={{ background: "rgba(79,110,247,0.05)", border: "0.5px solid rgba(79,110,247,0.12)", borderTop: "none" }}>
          <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-[#8A93B0]" strokeWidth={1.5} /> Model-agnostic</span>
          <span className="flex items-center gap-2"><Cloud className="w-4 h-4 text-[#8A93B0]" strokeWidth={1.5} /> Multi-cloud / on-prem / BYO</span>
          <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#8A93B0]" strokeWidth={1.5} /> Your data stays yours</span>
        </div>
      </div>

      {/* ── Tab strip ── */}
      <div className="relative mt-12 max-w-[860px] mx-auto">
        <div className="flex items-center justify-center gap-1 p-1.5 rounded-full mx-auto w-fit"
             style={{ background: "rgba(15,17,23,0.85)" }}>
          {TABS.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)}
                    className="px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-200"
                    style={activeTab === i
                      ? { background: "linear-gradient(135deg,#4F6EF7,#9B72F7)", color: "#fff" }
                      : { color: "rgba(255,255,255,0.6)" }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Live preview panel */}
        <div className="mt-4 rounded-2xl overflow-hidden border border-[#E4E8F4]"
             style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(16px)", boxShadow: "0 4px 24px rgba(79,110,247,0.10)" }}>
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#E4E8F4]"
               style={{ background: "#F0F2FA" }}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-3 text-[11px] text-[#8A93B0]">ESA · {TABS[activeTab]}</span>
            <span className="ml-auto flex items-center gap-1 text-[10px] text-[#16A34A] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" /> live
            </span>
          </div>
          <div className="p-6 text-center">
            <p className="text-[13px] text-[#4B526B]">
              {activeTab === 0 && "Plan your enterprise strategy with AI-powered insights and competitive analysis."}
              {activeTab === 1 && "Deep research across 300+ MCPs, academic databases, and market intelligence feeds."}
              {activeTab === 2 && "Build GTM plans, competitive strategies, and decision frameworks with the Strategy Agent."}
              {activeTab === 3 && "Statistical analysis, pattern detection, and chart generation from your business data."}
            </p>
            <div className="mt-4 flex justify-center gap-2 flex-wrap">
              {["Ask ESA anything...", "Show Q3 trends", "Benchmark pricing"].map((p) => (
                <span key={p} className="px-3 py-1.5 rounded-full text-[12px] text-[#4B526B] border border-[#E4E8F4] bg-white">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Feature cards with scroll reveal ─────────────────────────────────────────
const FEATURES = [
  { agent: "Strategy Agent", color: "#4A6CF7", icon: TrendingUp, desc: "Business strategies, GTM plans, competitive analysis, decision support", keywords: ["strategy", "GTM", "growth"] },
  { agent: "Data Analyst",   color: "#0FC4A7", icon: BarChart2,  desc: "Statistical analysis, pattern detection, chart generation from your data", keywords: ["analyze", "trends", "visualize"] },
  { agent: "Search Agent",   color: "#9B72F7", icon: Search,     desc: "Semantic search across internal documents, policies, reports", keywords: ["find", "policy", "document"] },
  { agent: "Research Agent", color: "#F7924A", icon: Globe,      desc: "External market research, competitor benchmarking, industry trends", keywords: ["market", "benchmark", "competitor"] },
];

function FeatureCard({ f, delay }: { f: typeof FEATURES[0]; delay: number }) {
  const { ref, visible } = useReveal();
  const Icon = f.icon;
  return (
    <div ref={ref}
         className="bg-white border border-[#D6DCF0] rounded-2xl p-7 transition-all duration-300 cursor-default"
         style={{
           opacity: visible ? 1 : 0,
           transform: visible ? "translateY(0)" : "translateY(16px)",
           transitionDelay: `${delay}ms`,
           boxShadow: "0 1px 6px rgba(79,110,247,0.07)",
         }}
         onMouseEnter={(e) => {
           e.currentTarget.style.transform = "translateY(-3px)";
           e.currentTarget.style.boxShadow = `0 8px 32px rgba(79,110,247,0.10)`;
           e.currentTarget.style.borderLeftColor = f.color;
           e.currentTarget.style.borderLeftWidth = "2px";
         }}
         onMouseLeave={(e) => {
           e.currentTarget.style.transform = "translateY(0)";
           e.currentTarget.style.boxShadow = "0 1px 6px rgba(79,110,247,0.07)";
           e.currentTarget.style.borderLeftColor = "#D6DCF0";
           e.currentTarget.style.borderLeftWidth = "0.5px";
         }}>
      <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: f.color + "1A" }}>
        <Icon className="w-5 h-5" style={{ color: f.color }} strokeWidth={1.5} />
      </div>
      <h3 className="mt-4 text-[16px] font-semibold text-[#0F1117]">{f.agent}</h3>
      <p className="mt-2 text-[14px] text-[#4B526B] leading-[1.6]">{f.desc}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {f.keywords.map((k) => (
          <span key={k} className="px-2.5 py-1 rounded-md text-[12px] text-[#8A93B0]"
                style={{ background: "#F0F2FA", border: "0.5px solid #D6DCF0" }}>{k}</span>
        ))}
      </div>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="py-20 px-6" style={{ background: "#F0F2FA" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <div className="text-[11px] font-semibold text-[#4F6EF7] tracking-[0.1em] mb-3">WHAT ESA CAN DO</div>
          <h2 className="text-[36px] font-bold text-[#0F1117]" style={{ fontFamily: "var(--font-display)" }}>
            One query. Four agents. Infinite insight.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {FEATURES.map((f, i) => <FeatureCard key={f.agent} f={f} delay={i * 80} />)}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: "Starter",
    price: { INR: "₹2,999", USD: "$35" },
    popular: false,
    cta: "Start Free Trial",
    features: [
      ["1 Workspace", true],
      ["3 Users", true],
      ["100 queries / month", true],
      ["2 data sources", true],
      ["Default LLM only", true],
      ["PDF export", true],
      ["Custom LLM support", false],
      ["RBAC (multi-user roles)", false],
      ["Audit logs", false],
      ["SSO (SAML / Okta)", false],
      ["Priority support", false],
    ],
  },
  {
    name: "Growth",
    price: { INR: "₹9,999", USD: "$119" },
    popular: true,
    cta: "Start Free Trial",
    features: [
      ["3 Workspaces", true],
      ["25 Users", true],
      ["1,000 queries / month", true],
      ["10 data sources", true],
      ["Custom LLM support", true],
      ["PDF / PPT / CSV export", true],
      ["RBAC (multi-user roles)", true],
      ["Audit logs (team-level)", true],
      ["SSO (Google, Microsoft)", false],
      ["SAML / Okta SSO", false],
      ["Priority support", false],
    ],
  },
  {
    name: "Enterprise",
    price: { INR: "Custom", USD: "Custom" },
    popular: false,
    cta: "Contact Sales",
    features: [
      ["Unlimited Workspaces", true],
      ["Unlimited Users", true],
      ["Unlimited queries", true],
      ["Unlimited data sources", true],
      ["Custom LLM support", true],
      ["All export formats", true],
      ["RBAC (all roles)", true],
      ["Audit logs (all workspaces)", true],
      ["SAML / Okta SSO", true],
      ["On-prem / private cloud", true],
      ["Priority support + CSM", true],
    ],
  },
];

function Pricing() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [annual, setAnnual] = useState(false);

  function displayPrice(p: { INR: string; USD: string }) {
    const base = p[currency];
    if (base === "Custom") return "Custom";
    if (!annual) return base;
    // 20% off annual
    const num = parseFloat(base.replace(/[₹$,]/g, ""));
    const disc = Math.round(num * 0.8);
    return currency === "INR" ? `₹${disc.toLocaleString("en-IN")}` : `$${disc}`;
  }

  return (
    <section id="pricing" className="py-20 px-6"
             style={{ background: "linear-gradient(135deg, #F7F8FC 0%, #EEF1FA 100%)" }}>
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-8">
          <div className="text-[11px] font-semibold text-[#4F6EF7] tracking-[0.1em] mb-3">PRICING</div>
          <h2 className="text-[36px] font-bold text-[#0F1117]" style={{ fontFamily: "var(--font-display)" }}>
            Simple, transparent pricing
          </h2>
        </div>

        {/* Toggles */}
        <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
          <div className="inline-flex rounded-full p-1" style={{ background: "#F0F2FA", border: "0.5px solid #D6DCF0" }}>
            {(["INR", "USD"] as const).map((c) => (
              <button key={c} onClick={() => setCurrency(c)}
                      className="px-4 py-1.5 rounded-full text-[13px] transition-colors"
                      style={currency === c ? { background: "#fff", border: "0.5px solid #4F6EF7", color: "#0F1117" } : { color: "#8A93B0" }}>
                {c === "INR" ? "₹ INR" : "$ USD"}
              </button>
            ))}
          </div>
          <div className="inline-flex rounded-full p-1 items-center" style={{ background: "#F0F2FA", border: "0.5px solid #D6DCF0" }}>
            {(["Monthly", "Annual"] as const).map((b) => (
              <button key={b} onClick={() => setAnnual(b === "Annual")}
                      className="px-4 py-1.5 rounded-full text-[13px] transition-colors flex items-center gap-1.5"
                      style={(b === "Annual") === annual ? { background: "#fff", border: "0.5px solid #4F6EF7", color: "#0F1117" } : { color: "#8A93B0" }}>
                {b}
                {b === "Annual" && <span className="text-[10px] font-semibold text-[#16A34A]">−20%</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PLANS.map((p) => (
            <div key={p.name} className="relative bg-white rounded-2xl p-8 transition-all duration-200 hover:-translate-y-1"
                 style={{
                   border: p.popular ? "1.5px solid #4F6EF7" : "0.5px solid #D6DCF0",
                   boxShadow: p.popular ? "0 4px 24px rgba(79,110,247,0.12)" : "0 1px 6px rgba(79,110,247,0.07)",
                 }}>
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#4F6EF7] text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-[13px] font-semibold text-[#4B526B] tracking-[0.08em] uppercase">{p.name}</div>
              <div className="mt-3 text-[40px] font-bold text-[#0F1117] leading-none" style={{ fontFamily: "var(--font-display)" }}>
                {displayPrice(p.price)}
                {displayPrice(p.price) !== "Custom" && (
                  <span className="text-[14px] font-normal text-[#8A93B0]">/mo</span>
                )}
              </div>
              <div className="text-[12px] text-[#8A93B0] mt-1">
                billed {annual ? "annually" : "monthly"}
                {annual && displayPrice(p.price) !== "Custom" && (
                  <span className="ml-1 text-[#16A34A] font-medium">· 20% off</span>
                )}
              </div>
              <Link to="/login"
                    className={`mt-6 w-full h-11 rounded-lg font-medium text-[14px] flex items-center justify-center transition-colors ${
                      p.cta === "Contact Sales"
                        ? "border border-[#D6DCF0] text-[#0F1117] hover:bg-[#F0F2FA]"
                        : "bg-[#4F6EF7] text-white hover:bg-[#3D5BE8]"
                    }`}>
                {p.cta}
              </Link>
              <div className="h-px bg-[#E4E8F4] my-6" />
              <ul className="space-y-3">
                {p.features.map(([label, ok], i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px]">
                    {ok
                      ? <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                      : <X className="w-4 h-4 text-[#8A93B0] shrink-0 mt-0.5" />}
                    <span className={ok ? "text-[#4B526B]" : "text-[#8A93B0] line-through"}>{label as string}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trial banner */}
        <div className="mt-8 rounded-xl px-8 py-5 text-center text-[14px] text-[#0F1117]"
             style={{ background: "rgba(79,110,247,0.07)", border: "0.5px solid rgba(79,110,247,0.2)" }}>
          🎉 Start with a 14-day free trial of the Growth plan — no credit card required.{" "}
          <Link to="/login" className="text-[#4F6EF7] font-medium hover:underline">Get Started Free →</Link>
        </div>

        {/* Billing notes */}
        <div className="mt-6 grid sm:grid-cols-2 gap-3 text-[12px] text-[#4B526B]">
          {[
            "Annual billing gives 20% discount on monthly prices",
            "Payment: Credit/Debit Card, UPI (INR), Net Banking, Stripe (USD)",
            "INR invoices include GST details — all invoices downloadable as PDF",
            "RBAC (multi-user roles) available on Growth and Enterprise plans only",
          ].map((note) => (
            <div key={note} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
              {note}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[#D6DCF0]" style={{ background: "#F0F2FA" }}>
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-[13px] text-[#4B526B]">
        <div>
          <EsaLogo />
          <p className="mt-3">AI-first enterprise intelligence for modern teams.</p>
        </div>
        <div>
          <div className="text-[#0F1117] font-semibold mb-3">Product</div>
          <ul className="space-y-2">
            {["Features", "Pricing", "Docs", "Changelog", "Status"].map((i) => (
              <li key={i}><a href="#" className="hover:text-[#0F1117] transition-colors">{i}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[#0F1117] font-semibold mb-3">Company</div>
          <ul className="space-y-2">
            {["About", "Blog", "Careers", "Press"].map((i) => (
              <li key={i}><a href="#" className="hover:text-[#0F1117] transition-colors">{i}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[#0F1117] font-semibold mb-3">Legal</div>
          <ul className="space-y-2">
            {["Terms of Service", "Privacy Policy", "Cookie Policy", "Security"].map((i) => (
              <li key={i}><a href="#" className="hover:text-[#0F1117] transition-colors">{i}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#D6DCF0] text-[12px] text-[#8A93B0]">
        © 2026 ESA. All rights reserved.
      </div>
    </footer>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
function Landing() {
  return (
    <div style={{ background: "linear-gradient(135deg, #F7F8FC 0%, #EEF1FA 55%, #F0F4FF 100%)", backgroundAttachment: "fixed" }}>
      <Nav />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}
