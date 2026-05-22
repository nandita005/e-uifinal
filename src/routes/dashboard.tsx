import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  Paperclip, Mic, MicOff, Send, TrendingUp, BarChart2, Search, Globe,
  Sparkles, ChevronRight, Bot, User, StopCircle, X, FileText,
  Upload, Link as LinkIcon, HardDrive, Lock,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  ToolCallRenderer, AgentWorkingCard, ESASearchCard, GapReportCard,
  DeepResearchCard, KnowledgeBaseUpdateCard, StrategyDocCard,
  MetricCards, GenLineChart, InsightCard, GenTable, ThinkingIndicator,
} from "@/components/GenUI";
import { MOCK_USER, SUGGESTED_PROMPTS, MOCK_CHART_REVENUE, MOCK_COMPETITORS } from "@/lib/mockData";
import { useRole } from "@/lib/roleContext";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — ESA" }] }),
  component: Dashboard,
});

type DemoKey = "strategy" | "data" | "search" | "research";
type DemoMessage = { id: string; role: "user" | "assistant"; content?: string; component?: React.ReactNode; ts: string; };

const CAPABILITIES = [
  { icon: TrendingUp, color: "#4A6CF7", bg: "rgba(74,108,247,0.08)", title: "Strategy Agent",  desc: "GTM plans, competitive analysis, decision support",     prompt: "Build a GTM strategy for our new SaaS product",    demoKey: "strategy" as DemoKey },
  { icon: BarChart2,  color: "#0FC4A7", bg: "rgba(15,196,167,0.08)", title: "Data Analyst",    desc: "Revenue trends, cohort analysis, chart generation",     prompt: "Show Q3 revenue trends and forecast Q4",           demoKey: "data"     as DemoKey },
  { icon: Search,     color: "#9B72F7", bg: "rgba(155,114,247,0.08)",title: "Search Agent",    desc: "Semantic search across docs, policies, reports",        prompt: "Find our HR remote work leave policy",             demoKey: "search"   as DemoKey },
  { icon: Globe,      color: "#F7924A", bg: "rgba(247,146,74,0.08)", title: "Research Agent",  desc: "Market sizing, competitor benchmarks, industry trends", prompt: "Benchmark our SaaS pricing against competitors",   demoKey: "research" as DemoKey },
];

// ── Animated typewriter suggestions (replaces chip buttons) ──────────────────
function uid() { return Math.random().toString(36).slice(2); }
function timestamp() { return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }
const EXAMPLE_PROMPTS = [
  "Show Q3 revenue trends and forecast Q4...",
  "Find our HR remote work leave policy...",
  "Benchmark our SaaS pricing against competitors...",
  "Analyze churn drivers over the last 6 months...",
  "Build a GTM strategy for our new product...",
  "Run a compliance gap analysis on our Q2 docs...",
];

function AnimatedPromptHint({ onClick }: { onClick: (text: string) => void }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const full = EXAMPLE_PROMPTS[idx];
    if (!deleting) {
      if (displayed.length < full.length) {
        t.current = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 42);
      } else {
        t.current = setTimeout(() => setDeleting(true), 2400);
      }
    } else {
      if (displayed.length > 0) {
        t.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 18);
      } else {
        setDeleting(false);
        setIdx((i) => (i + 1) % EXAMPLE_PROMPTS.length);
      }
    }
    return () => clearTimeout(t.current);
  }, [displayed, deleting, idx]);

  return (
    <button
      onClick={() => onClick(EXAMPLE_PROMPTS[idx].replace("...", ""))}
      className="text-left text-[13px] text-text-tertiary hover:text-text-secondary transition-colors"
    >
      <span className="italic">{displayed}</span>
      <span className="inline-block w-[1.5px] h-[13px] bg-primary/50 align-middle ml-0.5 animate-pulse" />
    </button>
  );
}

function MdText({ text }: { text: string }) {
  if (!text) return null;
  return (
    <div className="space-y-1 text-[14px] leading-[1.65]">
      {text.split("\n").map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        const html = line
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/`(.*?)`/g, "<code class='px-1 py-0.5 rounded bg-secondary text-[12px] font-mono'>$1</code>");
        if (/^\d+\./.test(line)) return <div key={i} className="pl-4" dangerouslySetInnerHTML={{ __html: html }} />;
        if (line.startsWith("- ") || line.startsWith("• ")) return <div key={i} className="pl-3 flex gap-2"><span className="text-text-tertiary mt-1">•</span><span dangerouslySetInnerHTML={{ __html: html.replace(/^[-•]\s/, "") }} /></div>;
        if (line.startsWith("#")) return <div key={i} className="font-semibold text-text-primary text-[15px]" dangerouslySetInnerHTML={{ __html: html.replace(/^#+\s/, "") }} />;
        return <div key={i} dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </div>
  );
}

// Map demo key → which agents are active
const DEMO_AGENTS: Record<DemoKey, AgentKey[]> = {
  strategy: ["strategy", "data", "research"],
  data:     ["data"],
  search:   ["search"],
  research: ["research"],
};
function useDemoSequence() {
  const [demoMessages, setDemoMessages] = useState<DemoMessage[]>([]);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clear = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = []; }, []);
  const add = useCallback((msg: DemoMessage) => setDemoMessages((p) => [...p, msg]), []);

  const runDemo = useCallback((demoKey: DemoKey, prompt: string) => {
    clear(); setDemoMessages([]); setIsDemoMode(true);
    add({ id: uid(), role: "user", content: prompt, ts: timestamp() });

    if (demoKey === "strategy") {
      timers.current.push(
        // Step 1: thinking
        setTimeout(() => add({ id: uid(), role: "assistant", ts: timestamp(), component:
          <ThinkingIndicator agentName="Strategy Agent" color="#4A6CF7" thoughts={[
            "Scanning 127 market signals from CRM, news feeds, and competitor data...",
            "Loading Q3 Data Analyst results and Research Agent findings...",
            "Comparing positioning vs Salesforce, HubSpot, Zoho, Pipedrive...",
            "Applying SOSTAC framework to build customized GTM strategy...",
            "Finalizing strategy document with risk assessment...",
          ]} />
        }), 600),
        // Step 2: working card
        setTimeout(() => add({ id: uid(), role: "assistant", ts: timestamp(), component:
          <AgentWorkingCard agentName="Strategy Agent" color="#4A6CF7" title="Building GTM Strategy"
            steps={["Gathering market events","Loading previous agent results","Comparing with 12 competitors","Building customized strategy","Finalizing strategy document"]} />
        }), 1200),
        // Step 3: final strategy doc
        setTimeout(() => add({ id: uid(), role: "assistant", ts: timestamp(), component:
          <StrategyDocCard title="GTM Strategy — New SaaS Product" sections={[
            { heading: "Executive Summary", content: "A focused land-and-expand motion targeting mid-market SaaS companies in APAC and North America, leveraging product-led growth with a sales-assist overlay for deals above $20K ARR." },
            { heading: "Target Segment", content: ["Mid-market SaaS (50–500 employees)","Revenue Operations & Strategy teams","Companies with existing CRM + BI stack","APAC-first, then North America expansion"] },
            { heading: "GTM Channels", content: ["Product-led growth: free tier with usage-based upgrade triggers","Content & SEO: benchmark reports, strategy templates","Partner ecosystem: CRM & BI integration partners","Outbound SDR for enterprise accounts (>500 employees)"] },
            { heading: "90-day Milestones", content: ["Month 1: Launch free tier, onboard 200 sign-ups","Month 2: Activate 3 integration partners, publish 4 benchmark reports","Month 3: Convert 15 free → paid, hit $45K new MRR"] },
            { heading: "Risk Factors", content: ["Competitive response from Salesforce Einstein (mitigate: speed + price)","Long enterprise sales cycles (mitigate: PLG bottom-up motion)","Data privacy regulations in APAC (mitigate: SOC2 + GDPR compliance)"] },
          ]} />
        }), 5200)
      );
    }

    if (demoKey === "data") {
      timers.current.push(
        // Thinking
        setTimeout(() => add({ id: uid(), role: "assistant", ts: timestamp(), component:
          <ThinkingIndicator agentName="Data Analyst" color="#0FC4A7" thoughts={[
            "Connecting to Q3_Revenue_2026.xlsx and Snowflake DW (4,821 rows)...",
            "Pulling revenue, churn, ARR, and NPS metrics across 6 months...",
            "Running cohort analysis — September spike detected (+5.8% vs target)...",
            "Detecting trend patterns and outliers in churn data...",
            "Generating 3 visualizations: revenue bars, churn trend, forecast...",
          ]} />
        }), 600),
        // Working card
        setTimeout(() => add({ id: uid(), role: "assistant", ts: timestamp(), component:
          <AgentWorkingCard agentName="Data Analyst" color="#0FC4A7" title="Analyzing Revenue Data"
            steps={["Connecting to data sources","Gathering Q3 revenue data","Running statistical analysis","Creating visualizations"]} />
        }), 1200),
        // Metrics
        setTimeout(() => add({ id: uid(), role: "assistant", ts: timestamp(), component:
          <MetricCards title="Q3 2026 — Key Metrics" metrics={[
            { label: "Total Revenue", value: "$61.4M", trend: "+14% QoQ", trendUp: true, color: "#0FC4A7" },
            { label: "Churn Rate",    value: "2.1%",   trend: "-0.8pp",   trendUp: true, color: "#4A6CF7" },
            { label: "New ARR",       value: "$3.1M",  trend: "+22% QoQ", trendUp: true, color: "#9B72F7" },
            { label: "NPS Score",     value: "62",     trend: "+4 pts",   trendUp: true, color: "#F7924A" },
          ]} />
        }), 4200),
        // Chart
        setTimeout(() => add({ id: uid(), role: "assistant", ts: timestamp(), component:
          <GenLineChart title="Q3 Monthly Revenue vs Target ($M)" xKey="month"
            lines={[{ key: "revenue", label: "Actual", color: "#0FC4A7" }, { key: "target", label: "Target", color: "#D6DCF0" }]}
            data={MOCK_CHART_REVENUE} />
        }), 5200),
        // Insight
        setTimeout(() => add({ id: uid(), role: "assistant", ts: timestamp(), component:
          <InsightCard type="opportunity" title="Q4 Forecast: $71.2M (+16%)"
            body="Based on Q3 momentum and pipeline data, Q4 revenue is projected at $71.2M. Key drivers: enterprise expansion (+$4.1M), new logo acquisition (+$3.8M), upsell motion (+$2.0M)."
            actions={["View Full Forecast","Export Report","Share with Team"]} />
        }), 6200)
      );
    }

    if (demoKey === "search") {
      timers.current.push(
        // Thinking
        setTimeout(() => add({ id: uid(), role: "assistant", ts: timestamp(), component:
          <ThinkingIndicator agentName="Search Agent" color="#9B72F7" thoughts={[
            "Scanning 247 documents across HR Drive, Policy DB, and Compliance Vault...",
            "Extracting 1,842 named entities (people, policies, dates, clauses)...",
            "Mapping 5,631 entity relationships and cross-references...",
            "Deploying 7 sub-agents for parallel analysis...",
            "Combining sub-agent results and detecting coverage gaps...",
          ]} />
        }), 600),
        // ESA Search card with 7 sub-agents
        setTimeout(() => add({ id: uid(), role: "assistant", ts: timestamp(), component:
          <ESASearchCard docsScanned={247} entitiesChecked={1842} relationshipsMapped={5631}
            subAgents={["Policy Extractor","Entity Recognizer","Relationship Mapper","Context Builder","Gap Analyzer","Compliance Checker","Summary Generator"]} />
        }), 1200),
        // Gap report
        setTimeout(() => add({ id: uid(), role: "assistant", ts: timestamp(), component:
          <GapReportCard coverageScore={87}
            gaps={[
              { title: "Remote Work Equipment Allowance", severity: "medium", description: "Policy does not specify reimbursement limits for home office equipment purchases." },
              { title: "Cross-border Remote Work",        severity: "high",   description: "No guidance on tax or compliance implications for employees working from a different country." },
              { title: "Mental Health Leave Provisions",  severity: "low",    description: "Mental health days are mentioned but not formally defined or quantified." },
            ]}
            recommendations={["Add equipment allowance clause","Define cross-border policy","Formalize mental health leave","Annual policy review cycle"]} />
        }), 6000)
      );
    }

    if (demoKey === "research") {
      const sources = [
        { title: "SaaS Pricing Benchmark Report 2026",       domain: "gartner.com",           url: "https://gartner.com", snippet: "Median SaaS pricing for mid-market CRM tools sits at $65/seat/month, up 12% from 2025." },
        { title: "Competitor Pricing Analysis — CRM Vendors", domain: "g2.com",                url: "https://g2.com",      snippet: "Salesforce Enterprise averages $165/user/month; HubSpot Professional at $90/user/month." },
        { title: "India SaaS Market Pricing Trends",          domain: "nasscom.in",             url: "https://nasscom.in",  snippet: "India-based SaaS companies price 30–40% below global benchmarks to capture domestic market." },
        { title: "PLG Pricing Strategies for B2B SaaS",       domain: "openviewpartners.com",   url: "https://openviewpartners.com", snippet: "Usage-based pricing models show 2.3x higher NRR compared to seat-based models." },
        { title: "2026 SaaS Pricing Survey Results",           domain: "priceintelligently.com", url: "https://priceintelligently.com", snippet: "Only 18% of SaaS companies review pricing annually; those that do grow 30% faster." },
        { title: "Competitive Intelligence: APAC CRM Market",  domain: "idc.com",               url: "https://idc.com",     snippet: "APAC CRM market growing at 19% CAGR; Zoho and Freshworks dominate SMB segment." },
      ];
      let approved = false;
      const onApprove = () => {
        if (approved) return; approved = true;
        add({ id: uid(), role: "assistant", ts: timestamp(), component:
          <KnowledgeBaseUpdateCard steps={["Downloading 6 documents","Chunking into segments","Building embedding vectors","Updating knowledge graph"]} />
        });
        const t = setTimeout(() => add({ id: uid(), role: "assistant", ts: timestamp(), component:
          <GenTable title="Competitor Pricing Benchmark"
            headers={["Vendor","Price/Seat","Users","API","SSO","NPS"]}
            rows={MOCK_COMPETITORS.map((c) => [c.name, c.price, c.users, c.api ? "✓" : "—", c.sso ? "✓" : "—", String(c.nps)])}
            highlightRow={0} />
        }), 4000);
        timers.current.push(t);
      };
      timers.current.push(
        // Thinking first
        setTimeout(() => add({ id: uid(), role: "assistant", ts: timestamp(), component:
          <ThinkingIndicator agentName="Research Agent" color="#F7924A" thoughts={[
            "Querying 6 external intelligence sources across Gartner, G2, NASSCOM...",
            "Extracting pricing data for 12 CRM vendors in APAC and North America...",
            "Cross-referencing NPS scores and feature matrices...",
            "Identifying pricing gaps and positioning opportunities...",
            "Preparing sources for review before updating knowledge base...",
          ]} />
        }), 600),
        // Deep research card
        setTimeout(() => add({ id: uid(), role: "assistant", ts: timestamp(), component:
          <DeepResearchCard sources={sources} onApprove={onApprove} />
        }), 1400),
        // Auto-approve after 7s if user doesn't click
        setTimeout(onApprove, 7000),
      );
    }
  }, [add, clear]);

  const exitDemo = useCallback(() => { clear(); setIsDemoMode(false); setDemoMessages([]); }, [clear]);
  return { demoMessages, isDemoMode, runDemo, exitDemo };
}

// ── Message bubble ────────────────────────────────────────────────────────────
function Bubble({ role, ts, children }: { role: "user" | "assistant"; ts: string; children: React.ReactNode }) {
  return (
    <div className={`flex gap-3 ${role === "user" ? "justify-end" : "justify-start"}`}
         style={{ animation: "fadeSlideIn 0.25s ease-out both" }}>
      {role === "assistant" && (
        <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center mt-0.5"
             style={{ background: "linear-gradient(135deg,#4F6EF7,#9B72F7)", boxShadow: "0 4px 12px rgba(79,110,247,0.3)" }}>
          <Bot className="w-4 h-4 text-white" strokeWidth={1.5} />
        </div>
      )}
      <div className={`max-w-[85%] min-w-0 ${role === "user" ? "" : "flex-1"}`}>
        <div className={`rounded-2xl px-4 py-3.5 ${role === "user" ? "text-white rounded-tr-sm inline-block" : "bg-white rounded-tl-sm"}`}
             style={role === "user"
               ? { background: "linear-gradient(135deg,#4F6EF7,#6B82F7)", boxShadow: "0 4px 16px rgba(79,110,247,0.25)" }
               : { boxShadow: "0 2px 12px rgba(79,110,247,0.08)", border: "1px solid rgba(79,110,247,0.1)" }}>
          {children}
          <div className={`text-[11px] mt-2 ${role === "user" ? "text-white/60 text-right" : "text-[#8A93B0]"}`}>{ts}</div>
        </div>
      </div>
      {role === "user" && (
        <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center mt-0.5 text-white"
             style={{ background: "linear-gradient(135deg,#4F6EF7,#9B72F7)" }}>
          <User className="w-4 h-4" strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}

// ── File attachment modal ─────────────────────────────────────────────────────
function FileAttachModal({ onClose, onAttach }: { onClose: () => void; onAttach: (name: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const OPTIONS = [
    { icon: Upload,    label: "Upload from device",  sub: "CSV, Excel, PDF, Word, PPT, JSON", action: () => fileRef.current?.click() },
    { icon: HardDrive, label: "Google Drive",         sub: "Connect and browse your Drive files", action: () => { onAttach("Google Drive file"); onClose(); } },
    { icon: HardDrive, label: "Dropbox",              sub: "Import from your Dropbox", action: () => { onAttach("Dropbox file"); onClose(); } },
    { icon: LinkIcon,  label: "Paste a URL",          sub: "Fetch content from any public URL", action: () => { const u = prompt("Enter URL:"); if (u) { onAttach(u); onClose(); } } },
    { icon: FileText,  label: "Paste text / code",    sub: "Paste raw text, JSON, or code snippet", action: () => { onAttach("Pasted content"); onClose(); } },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
         onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative w-full max-w-sm bg-white rounded-2xl border border-[#D6DCF0] overflow-hidden"
           style={{ boxShadow: "0 20px 64px rgba(79,110,247,0.14)" }}
           onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E4E8F4]">
          <span className="text-[14px] font-semibold text-[#0F1117]">Attach a file</span>
          <button onClick={onClose} className="p-1 hover:bg-[#F0F2FA] rounded-md text-[#8A93B0]">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-2">
          {OPTIONS.map((o) => {
            const Icon = o.icon;
            return (
              <button key={o.label} onClick={o.action}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F0F2FA] transition-colors text-left">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-[#F0F2FA]">
                  <Icon className="w-4 h-4 text-[#4F6EF7]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[#0F1117]">{o.label}</div>
                  <div className="text-[11px] text-[#8A93B0]">{o.sub}</div>
                </div>
              </button>
            );
          })}
        </div>
        <input ref={fileRef} type="file" className="hidden"
               accept=".csv,.xlsx,.xls,.pdf,.doc,.docx,.ppt,.pptx,.json,.txt"
               onChange={(e) => { const f = e.target.files?.[0]; if (f) { onAttach(f.name); onClose(); } }} />
      </div>
    </div>
  );
}

// ── Voice hook (Web Speech API) ───────────────────────────────────────────────
function useVoice(onResult: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const recRef = useRef<unknown>(null);

  const toggle = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SR) { alert("Voice input not supported in this browser. Try Chrome."); return; }
    if (listening) { (recRef.current as { stop: () => void })?.stop(); setListening(false); return; }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rec = new SR() as any;
    rec.lang = "en-US"; rec.interimResults = false; rec.maxAlternatives = 1;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => { onResult(e.results[0][0].transcript); };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    rec.start();
    setListening(true);
  }, [listening, onResult]);

  return { listening, toggle };
}

// ── TTS speak ─────────────────────────────────────────────────────────────────
function speak(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text.slice(0, 300));
  utt.rate = 1.05; utt.pitch = 1;
  window.speechSynthesis.speak(utt);
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [inputText, setInputText] = useState("");
  const [showFileModal, setShowFileModal] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const nav = useNavigate();
  const { user, can } = useRole();
  const { demoMessages, isDemoMode, runDemo, exitDemo } = useDemoSequence();

  const { messages, sendMessage, stop, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onFinish: () => {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    },
  });

  const isLoading = status === "streaming" || status === "submitted";

  const { listening, toggle: toggleVoice } = useVoice((text) => {
    setInputText((prev) => prev + (prev ? " " : "") + text);
  });

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  }, [demoMessages.length, messages.length]);

  const hasMessages = isDemoMode ? demoMessages.length > 0 : messages.length > 0;

  function submitReal(text: string) {
    if (!text.trim()) return;
    if (isDemoMode) exitDemo();
    // Navigate to chat page with the query
    nav({ to: "/chat", search: { q: text } });
    setInputText("");
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitReal(inputText); }
  }

  return (
    <DashboardLayout title="Dashboard">
      <div className="flex flex-col min-h-0" style={{ height: "calc(100vh - 56px)" }}>

        {/* ── empty state ── */}
        {!hasMessages && (
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-8"
               style={{ background: "linear-gradient(160deg, #F7F8FC 0%, #EEF1FA 100%)" }}>
            <div className="max-w-3xl mx-auto">
              {/* Role badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] px-2.5 py-1 rounded-full font-semibold text-white"
                      style={{ background: { super_admin: "#DC2626", admin: "#4F6EF7", analyst: "#0FC4A7", researcher: "#F7924A", viewer: "#9B72F7" }[user.role] }}>
                  {({ super_admin: "Super Admin", admin: "Admin", analyst: "Analyst", researcher: "Researcher", viewer: "Viewer" })[user.role]}
                </span>
                <span className="text-[13px] text-text-tertiary">{user.name}</span>
              </div>

              <h2 className="text-[26px] sm:text-[30px] font-semibold text-text-primary mb-1" style={{ fontFamily: "var(--font-display)" }}>
                Welcome back, {user.name.split(" ")[0]} 👋
              </h2>
              <p className="text-[14px] text-text-secondary mb-8">
                {user.role === "super_admin" && "Full access across all workspaces. Run queries, manage billing, and view all audit logs."}
                {user.role === "admin" && "Manage your workspace, invite team members, and run AI queries across all agents."}
                {user.role === "analyst" && "Upload datasets and run data analysis queries. Generate and download reports."}
                {user.role === "researcher" && "Run research queries and export market intelligence reports."}
                {user.role === "viewer" && "You have read-only access. Browse shared reports and insights below."}
              </p>

              {/* Viewer: read-only state */}
              {user.role === "viewer" && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-[#E4E8F4] p-6 bg-white text-center"
                       style={{ boxShadow: "0 1px 6px rgba(79,110,247,0.07)" }}>
                    <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center bg-[#F0F2FA]">
                      <Lock className="w-6 h-6 text-[#8A93B0]" strokeWidth={1.5} />
                    </div>
                    <p className="text-[14px] font-medium text-[#0F1117] mb-1">Read-only access</p>
                    <p className="text-[13px] text-[#8A93B0]">You can view and download shared reports. Contact your Admin to upgrade your role.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: "Q3 Revenue Report",  sub: "PDF · 2 hours ago",  color: "#4A6CF7" },
                      { title: "Competitor Matrix",   sub: "PPT · yesterday",    color: "#F7924A" },
                      { title: "Churn Analysis H1",   sub: "PDF · 3 days ago",   color: "#0FC4A7" },
                      { title: "NPS Trends Q1",       sub: "CSV · 2 weeks ago",  color: "#9B72F7" },
                    ].map((r) => (
                      <div key={r.title} className="flex items-center gap-3 p-4 rounded-xl border border-[#E4E8F4] bg-white hover:border-[#4F6EF7]/30 transition-colors cursor-pointer"
                           style={{ boxShadow: "0 1px 6px rgba(79,110,247,0.07)" }}>
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: r.color + "18" }}>
                          <FileText className="w-4 h-4" style={{ color: r.color }} strokeWidth={1.5} />
                        </div>
                        <div>
                          <div className="text-[13px] font-medium text-[#0F1117]">{r.title}</div>
                          <div className="text-[11px] text-[#8A93B0]">{r.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Capability cards for all non-viewer roles */}
              {user.role !== "viewer" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {CAPABILITIES
                      .filter((cap) => {
                        // Researcher: only research + search
                        if (user.role === "researcher") return cap.demoKey === "research" || cap.demoKey === "search";
                        // Analyst: data + search (no strategy/research)
                        if (user.role === "analyst") return cap.demoKey === "data" || cap.demoKey === "search";
                        // Admin, Super Admin: all 4
                        return true;
                      })
                      .map((cap) => {
                        const Icon = cap.icon;
                        return (
                          <button key={cap.title} onClick={() => runDemo(cap.demoKey, cap.prompt)}
                            className="group text-left rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-l2"
                            style={{ background: cap.bg, border: `1px solid ${cap.color}22` }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = cap.color + "55")}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = cap.color + "22")}>
                            <div className="flex items-start justify-between gap-3">
                              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: cap.color + "18" }}>
                                <Icon className="w-[18px] h-[18px]" style={{ color: cap.color }} strokeWidth={1.5} />
                              </div>
                              <ChevronRight className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
                            </div>
                            <div className="mt-3">
                              <div className="text-[14px] font-semibold text-text-primary">{cap.title}</div>
                              <div className="text-[12px] text-text-secondary mt-0.5 leading-[1.5]">{cap.desc}</div>
                            </div>
                          </button>
                        );
                      })}
                  </div>
                  <div className="mt-2">
                    <AnimatedPromptHint onClick={(text) => submitReal(text)} />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── chat messages ── */}
        {hasMessages && (
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6"
               style={{ background: "linear-gradient(160deg, #F7F8FC 0%, #EEF1FA 100%)" }}>
            <div className="max-w-3xl mx-auto space-y-5">

              {/* demo banner */}
              {isDemoMode && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-medium"
                     style={{ background: "rgba(79,110,247,0.08)", border: "1px solid rgba(79,110,247,0.2)" }}>
                  <div className="w-5 h-5 rounded-md flex items-center justify-center"
                       style={{ background: "linear-gradient(135deg,#4F6EF7,#9B72F7)" }}>
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[#4F6EF7]">Agent demo — watching ESA work in real time</span>
                  <button onClick={exitDemo} className="ml-auto flex items-center gap-1 text-[#8A93B0] hover:text-[#0F1117] transition-colors">
                    <X className="w-3.5 h-3.5" /> Exit
                  </button>
                </div>
              )}

              {/* demo messages */}
              {isDemoMode && demoMessages.map((m) => (
                <Bubble key={m.id} role={m.role} ts={m.ts}>
                  {m.role === "user"
                    ? <p className="text-[14px] leading-[1.6]">{m.content}</p>
                    : <div className="space-y-2">{m.content && <MdText text={m.content} />}{m.component}</div>}
                </Bubble>
              ))}

              {/* real AI messages — v6 uses parts[] */}
              {!isDemoMode && messages.map((m) => (
                <Bubble key={m.id} role={m.role as "user" | "assistant"} ts={timestamp()}>
                  {m.role === "user" ? (
                    <p className="text-[14px] leading-[1.6]">
                      {m.parts.filter((p) => p.type === "text").map((p) => (p as { type: "text"; text: string }).text).join("")}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {m.parts.map((part, pi) => {
                        const p = part as Record<string, unknown>;
                        if (p.type === "text") return <MdText key={pi} text={p.text as string} />;
                        if (typeof p.type === "string" && p.type.startsWith("tool-")) {
                          const toolCallId = p.toolCallId as string;
                          const toolName = (p.toolName ?? p.title) as string;
                          const state = p.state as string;
                          const result = p.output ?? p.result;
                          return state === "output"
                            ? <ToolCallRenderer key={pi} toolName={toolName} result={result} />
                            : <div key={pi} className="rounded-xl border border-border p-3 animate-pulse" style={{ background: "rgba(79,110,247,0.04)" }}>
                                <div className="flex items-center gap-2 text-[12px] text-text-tertiary">
                                  <Sparkles className="w-3.5 h-3.5 text-primary animate-spin" />
                                  {`Generating ${String(toolName ?? toolCallId ?? "").replace("show","").replace(/([A-Z])/g," $1").trim()}…`}
                                </div>
                              </div>;
                        }
                        return null;
                      })}
                    </div>
                  )}
                </Bubble>
              ))}

              {/* streaming indicator */}
              {!isDemoMode && isLoading && (
                <div className="flex gap-3" style={{ animation: "fadeSlideIn 0.2s ease-out both" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                       style={{ background: "linear-gradient(135deg,#4F6EF7,#9B72F7)", boxShadow: "0 4px 12px rgba(79,110,247,0.3)" }}>
                    <Bot className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-2"
                       style={{ boxShadow: "0 2px 12px rgba(79,110,247,0.08)", border: "1px solid rgba(79,110,247,0.1)" }}>
                    <span className="text-[13px] text-[#8A93B0]">ESA is thinking</span>
                    {[0,1,2].map((d) => <span key={d} className="w-1.5 h-1.5 rounded-full bg-[#4F6EF7] animate-bounce" style={{ animationDelay: `${d*0.15}s` }} />)}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>
        )}

        {/* ── input bar ── */}
        <div className="border-t border-[#E4E8F4] px-4 sm:px-6 py-4 shrink-0"
             style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)" }}>
          <div className="max-w-3xl mx-auto">
            {hasMessages && (
              <div className="mb-3">
                <AnimatedPromptHint onClick={(text) => submitReal(text)} />
              </div>
            )}

            {/* attached files */}
            {attachedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {attachedFiles.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[12px] font-medium text-[#4F6EF7] border border-[#4F6EF7]/20"
                        style={{ background: "rgba(79,110,247,0.07)" }}>
                    <FileText className="w-3 h-3" />
                    {f.length > 28 ? f.slice(0, 25) + "…" : f}
                    <button onClick={() => setAttachedFiles((a) => a.filter((_, j) => j !== i))} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="rounded-2xl border border-[#D6DCF0] bg-white transition-all"
                 style={{ boxShadow: "0 4px 24px rgba(79,110,247,0.10)" }}>
              <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={handleKey}
                placeholder={isDemoMode ? "Type to exit demo and ask ESA anything…" : "Ask ESA anything about your business..."}
                rows={1} className="w-full resize-none bg-transparent border-0 outline-none text-[15px] text-text-primary placeholder:text-text-tertiary px-4 pt-3.5 pb-1 min-h-[52px] max-h-[160px]"
                style={{ fieldSizing: "content" } as React.CSSProperties} />
              <div className="flex items-center justify-between px-3 pb-3">
                <div className="flex items-center gap-1 text-text-tertiary">
                  {/* File attach */}
                  <button type="button" title="Attach file"
                          onClick={() => setShowFileModal(true)}
                          className="p-1.5 hover:bg-secondary rounded-md transition-colors">
                    <Paperclip className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  {/* Voice */}
                  <button type="button" title={listening ? "Stop listening" : "Voice input"}
                          onClick={toggleVoice}
                          className={`p-1.5 rounded-md transition-colors ${listening ? "bg-red-50 text-red-500" : "hover:bg-secondary"}`}>
                    {listening ? <MicOff className="w-4 h-4" strokeWidth={1.5} /> : <Mic className="w-4 h-4" strokeWidth={1.5} />}
                  </button>
                  {listening && (
                    <span className="text-[11px] text-red-500 font-medium animate-pulse">Listening…</span>
                  )}
                  <div className="flex items-center gap-1 ml-1 px-2 py-1 rounded-md text-[11px]"
                       style={{ background: "rgba(79,110,247,0.06)", border: "0.5px solid rgba(79,110,247,0.15)" }}>
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="text-primary font-medium">ESA · OpenRouter</span>
                  </div>
                </div>
                {!isDemoMode && isLoading
                  ? <button type="button" onClick={stop}
                            className="w-9 h-9 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all"
                            style={{ boxShadow: "0 4px 12px rgba(239,68,68,0.3)" }}>
                      <StopCircle className="w-4 h-4" />
                    </button>
                  : <button type="button" onClick={() => submitReal(inputText)} disabled={!inputText.trim() && attachedFiles.length === 0}
                            className="w-9 h-9 rounded-xl text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            style={{ background: "linear-gradient(135deg,#4F6EF7,#6B82F7)", boxShadow: "0 4px 12px rgba(79,110,247,0.3)" }}>
                      <Send className="w-4 h-4" />
                    </button>}
              </div>
            </div>
            <p className="text-center text-[11px] text-text-tertiary mt-2">
              Press <kbd className="px-1 py-0.5 rounded text-[10px] bg-secondary border border-border">Enter</kbd> to send ·{" "}
              <kbd className="px-1 py-0.5 rounded text-[10px] bg-secondary border border-border">Shift+Enter</kbd> for new line
            </p>
          </div>
        </div>

        {/* File attachment modal */}
        {showFileModal && (
          <FileAttachModal
            onClose={() => setShowFileModal(false)}
            onAttach={(name) => setAttachedFiles((a) => [...a, name])}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
