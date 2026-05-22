import { useEffect, useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  TrendingUp, TrendingDown, Lightbulb, AlertTriangle, Zap, CheckCircle2,
  Check, Loader2, FileText, Share2, Download, Globe, ExternalLink,
  Database, Layers, BookOpen,
} from "lucide-react";

// ── Metric Cards ──────────────────────────────────────────────────────────────
interface Metric {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

export function MetricCards({ title, metrics }: { title: string; metrics: Metric[] }) {
  return (
    <div className="w-full my-2">
      {title && <div className="text-[12px] font-semibold text-text-secondary uppercase tracking-wider mb-3">{title}</div>}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {metrics.map((m, i) => (
          <div key={i} className="rounded-xl p-3.5 border border-border bg-surface"
               style={{ borderLeftWidth: 3, borderLeftColor: m.color ?? "#4F6EF7" }}>
            <div className="text-[11px] text-text-tertiary mb-1">{m.label}</div>
            <div className="text-[22px] font-bold text-text-primary leading-none" style={{ fontFamily: "var(--font-display)" }}>
              {m.value}
            </div>
            {m.trend && (
              <div className={`flex items-center gap-1 mt-1.5 text-[11px] font-medium ${m.trendUp === false ? "text-red-500" : "text-emerald-500"}`}>
                {m.trendUp === false ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                {m.trend}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Line Chart ────────────────────────────────────────────────────────────────
interface LineConfig { key: string; label: string; color: string }

export function GenLineChart({ title, xKey, lines, data }: {
  title: string; xKey: string; lines: LineConfig[]; data: Record<string, string | number>[];
}) {
  return (
    <div className="w-full my-2 bg-surface border border-border rounded-xl p-4">
      {title && <div className="text-[13px] font-semibold text-text-primary mb-4">{title}</div>}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E4E8F4" />
          <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#8892A4" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#8892A4" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E4E8F4" }} />
          {lines.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
          {lines.map((l) => (
            <Line key={l.key} type="monotone" dataKey={l.key} name={l.label} stroke={l.color}
                  strokeWidth={2} dot={{ r: 3, fill: l.color }} activeDot={{ r: 5 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Bar Chart ─────────────────────────────────────────────────────────────────
interface BarConfig { key: string; label: string; color: string }

export function GenBarChart({ title, xKey, bars, data }: {
  title: string; xKey: string; bars: BarConfig[]; data: Record<string, string | number>[];
}) {
  return (
    <div className="w-full my-2 bg-surface border border-border rounded-xl p-4">
      {title && <div className="text-[13px] font-semibold text-text-primary mb-4">{title}</div>}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E4E8F4" vertical={false} />
          <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#8892A4" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#8892A4" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E4E8F4" }} />
          {bars.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
          {bars.map((b) => (
            <Bar key={b.key} dataKey={b.key} name={b.label} fill={b.color} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Table ─────────────────────────────────────────────────────────────────────
export function GenTable({ title, headers, rows, highlightRow }: {
  title: string; headers: string[]; rows: string[][]; highlightRow?: number;
}) {
  return (
    <div className="w-full my-2 bg-surface border border-border rounded-xl overflow-hidden">
      {title && <div className="px-4 py-3 border-b border-border text-[13px] font-semibold text-text-primary">{title}</div>}
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ background: "#F7F8FC" }}>
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-2.5 text-left text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-t border-border"
                  style={ri === highlightRow ? { background: "rgba(79,110,247,0.06)" } : undefined}>
                {row.map((cell, ci) => (
                  <td key={ci} className={`px-4 py-2.5 text-text-primary ${ri === highlightRow && ci === 0 ? "font-semibold text-primary" : ""}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Insight Card ──────────────────────────────────────────────────────────────
const INSIGHT_STYLES = {
  insight:     { icon: Lightbulb,    bg: "rgba(79,110,247,0.07)",  border: "#4F6EF7", iconColor: "#4F6EF7" },
  warning:     { icon: AlertTriangle, bg: "rgba(247,146,74,0.08)", border: "#F7924A", iconColor: "#F7924A" },
  opportunity: { icon: Zap,          bg: "rgba(15,196,167,0.08)",  border: "#0FC4A7", iconColor: "#0FC4A7" },
  action:      { icon: CheckCircle2, bg: "rgba(155,114,247,0.08)", border: "#9B72F7", iconColor: "#9B72F7" },
};

export function InsightCard({ type, title, body, actions }: {
  type: "insight" | "warning" | "opportunity" | "action";
  title: string; body: string; actions?: string[];
}) {
  const style = INSIGHT_STYLES[type] ?? INSIGHT_STYLES.insight;
  const Icon = style.icon;
  return (
    <div className="w-full my-2 rounded-xl p-4" style={{ background: style.bg, border: `1px solid ${style.border}33` }}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
             style={{ background: style.border + "18" }}>
          <Icon className="w-4 h-4" style={{ color: style.iconColor }} strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-text-primary mb-1">{title}</div>
          <div className="text-[13px] text-text-secondary leading-[1.6]">{body}</div>
          {actions && actions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {actions.map((a, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md text-[12px] font-medium"
                      style={{ background: style.border + "15", color: style.iconColor }}>{a}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── AgentWorkingCard ──────────────────────────────────────────────────────────
export function AgentWorkingCard({ agentName, color, steps, title }: {
  agentName: string; color: string; steps: string[]; title: string;
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    let i = 0;
    const showNext = () => {
      if (i < steps.length) {
        setVisibleCount(i + 1);
        i++;
        setTimeout(() => { setDoneCount((d) => d + 1); setTimeout(showNext, 300); }, 500);
      }
    };
    const t = setTimeout(showNext, 100);
    return () => clearTimeout(t);
  }, [steps.length]);

  const allDone = doneCount >= steps.length;

  return (
    <div className="w-full my-2 rounded-xl p-4 bg-surface border transition-all duration-500"
         style={{ borderColor: allDone ? color + "55" : color + "33", boxShadow: allDone ? "none" : `0 0 0 2px ${color}22` }}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: color + "18" }}>
          {allDone ? <Check className="w-3.5 h-3.5" style={{ color }} /> : <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color }} />}
        </div>
        <div>
          <div className="text-[13px] font-semibold text-text-primary">{title}</div>
          <div className="text-[11px] text-text-tertiary">{agentName}</div>
        </div>
        {!allDone && (
          <div className="ml-auto text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: color + "15", color }}>Working…</div>
        )}
        {allDone && (
          <div className="ml-auto text-[11px] font-medium px-2 py-0.5 rounded-full text-emerald-600" style={{ background: "rgba(22,163,74,0.1)" }}>Done</div>
        )}
      </div>
      <div className="space-y-2">
        {steps.slice(0, visibleCount).map((step, i) => {
          const done = i < doneCount;
          return (
            <div key={i} className="flex items-center gap-2.5" style={{ animation: "fadeSlideIn 0.3s ease-out" }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                   style={{ background: done ? color + "18" : "rgba(139,147,176,0.12)", border: `1.5px solid ${done ? color + "55" : "#E4E8F4"}` }}>
                {done ? <Check className="w-3 h-3" style={{ color }} /> : <Loader2 className="w-3 h-3 animate-spin text-text-tertiary" />}
              </div>
              <span className={`text-[13px] transition-colors duration-300 ${done ? "text-text-primary" : "text-text-secondary"}`}>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Animated counter ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}

// ── ESASearchCard ─────────────────────────────────────────────────────────────
export function ESASearchCard({ docsScanned, entitiesChecked, relationshipsMapped, subAgents }: {
  docsScanned: number; entitiesChecked: number; relationshipsMapped: number; subAgents: string[];
}) {
  const docs = useCountUp(docsScanned, 1600);
  const entities = useCountUp(entitiesChecked, 2000);
  const rels = useCountUp(relationshipsMapped, 2400);
  const [agentProgress, setAgentProgress] = useState<number[]>(subAgents.map(() => 0));
  const [agentDone, setAgentDone] = useState<boolean[]>(subAgents.map(() => false));
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    subAgents.forEach((_, i) => {
      setTimeout(() => {
        let p = 0;
        const interval = setInterval(() => {
          p += 5;
          setAgentProgress((prev) => { const n = [...prev]; n[i] = Math.min(p, 100); return n; });
          if (p >= 100) {
            clearInterval(interval);
            setAgentDone((prev) => { const n = [...prev]; n[i] = true; return n; });
            if (i === subAgents.length - 1) setTimeout(() => setAllDone(true), 400);
          }
        }, 30);
      }, i * 320);
    });
  }, [subAgents.length]);

  const counters = [
    { label: "Documents Scanned", value: docs, color: "#9B72F7" },
    { label: "Entities Checked", value: entities, color: "#4A6CF7" },
    { label: "Relationships Mapped", value: rels, color: "#0FC4A7" },
  ];

  return (
    <div className="w-full my-2 bg-surface border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "rgba(155,114,247,0.12)" }}>
          <Layers className="w-3.5 h-3.5" style={{ color: "#9B72F7" }} />
        </div>
        <span className="text-[13px] font-semibold text-text-primary">ESA Multi-Agent Search</span>
        {!allDone
          ? <span className="ml-auto text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(155,114,247,0.12)", color: "#9B72F7" }}>Scanning…</span>
          : <span className="ml-auto text-[11px] px-2 py-0.5 rounded-full font-medium text-emerald-600" style={{ background: "rgba(22,163,74,0.1)" }}>Complete</span>}
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {counters.map((c) => (
            <div key={c.label} className="rounded-lg p-3 text-center" style={{ background: c.color + "0D", border: `1px solid ${c.color}22` }}>
              <div className="text-[20px] font-bold" style={{ color: c.color, fontFamily: "var(--font-display)" }}>{c.value.toLocaleString()}</div>
              <div className="text-[10px] text-text-tertiary mt-0.5 leading-tight">{c.label}</div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {subAgents.map((agent, i) => (
            <div key={agent} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                   style={{ background: agentDone[i] ? "rgba(22,163,74,0.12)" : "rgba(139,147,176,0.1)", border: `1.5px solid ${agentDone[i] ? "#16A34A55" : "#E4E8F4"}` }}>
                {agentDone[i] ? <Check className="w-3 h-3 text-emerald-600" /> : agentProgress[i] > 0 ? <Loader2 className="w-3 h-3 animate-spin text-text-tertiary" /> : null}
              </div>
              <span className="text-[12px] text-text-secondary w-36 shrink-0">{agent}</span>
              <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full transition-all duration-100"
                     style={{ width: `${agentProgress[i]}%`, background: "linear-gradient(90deg,#9B72F7,#4A6CF7)" }} />
              </div>
              <span className="text-[11px] text-text-tertiary w-8 text-right">{agentProgress[i]}%</span>
            </div>
          ))}
        </div>
        {allDone && (
          <div className="mt-3 pt-3 border-t border-border text-[12px] text-text-secondary flex items-center gap-1.5">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
            Combining results from all 7 agents…
          </div>
        )}
      </div>
    </div>
  );
}

// ── GapReportCard ─────────────────────────────────────────────────────────────
const SEV = {
  high:   { bg: "rgba(220,38,38,0.08)",  border: "#DC2626", text: "#DC2626", label: "High" },
  medium: { bg: "rgba(217,119,6,0.08)",  border: "#D97706", text: "#D97706", label: "Medium" },
  low:    { bg: "rgba(22,163,74,0.08)",  border: "#16A34A", text: "#16A34A", label: "Low" },
};

export function GapReportCard({ coverageScore, gaps, recommendations }: {
  coverageScore: number;
  gaps: Array<{ title: string; severity: "high" | "medium" | "low"; description: string }>;
  recommendations: string[];
}) {
  const [animScore, setAnimScore] = useState(0);
  useEffect(() => {
    let v = 0; const step = coverageScore / 40;
    const t = setInterval(() => { v += step; if (v >= coverageScore) { setAnimScore(coverageScore); clearInterval(t); } else setAnimScore(Math.floor(v)); }, 20);
    return () => clearInterval(t);
  }, [coverageScore]);

  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (animScore / 100) * circumference;
  const scoreColor = coverageScore >= 80 ? "#16A34A" : coverageScore >= 60 ? "#D97706" : "#DC2626";

  return (
    <div className="w-full my-2 bg-surface border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-text-tertiary" strokeWidth={1.5} />
        <span className="text-[13px] font-semibold text-text-primary">Policy Gap Report</span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-5 mb-4">
          <div className="relative w-20 h-20 shrink-0">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" fill="none" stroke="#E4E8F4" strokeWidth="6" />
              <circle cx="40" cy="40" r="36" fill="none" stroke={scoreColor} strokeWidth="6"
                strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
                transform="rotate(-90 40 40)" style={{ transition: "stroke-dashoffset 0.05s linear" }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[18px] font-bold" style={{ color: scoreColor, fontFamily: "var(--font-display)" }}>{animScore}%</span>
              <span className="text-[9px] text-text-tertiary">Coverage</span>
            </div>
          </div>
          <div>
            <div className="text-[13px] font-semibold text-text-primary mb-0.5">Policy Coverage Score</div>
            <div className="text-[12px] text-text-secondary">{gaps.length} gaps identified</div>
            <div className="text-[12px] text-text-secondary">{recommendations.length} recommendations</div>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          {gaps.map((gap, i) => {
            const s = SEV[gap.severity];
            return (
              <div key={i} className="rounded-lg p-3" style={{ background: s.bg, border: `1px solid ${s.border}33`, animation: `fadeSlideIn 0.3s ease-out ${i * 100}ms both` }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: s.border + "20", color: s.text }}>{s.label}</span>
                  <span className="text-[13px] font-medium text-text-primary">{gap.title}</span>
                </div>
                <p className="text-[12px] text-text-secondary">{gap.description}</p>
              </div>
            );
          })}
        </div>
        <div>
          <div className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-2">Recommendations</div>
          <div className="flex flex-wrap gap-2">
            {recommendations.map((r, i) => (
              <span key={i} className="px-2.5 py-1 rounded-full text-[12px] font-medium text-primary"
                    style={{ background: "rgba(79,110,247,0.08)", border: "1px solid rgba(79,110,247,0.2)" }}>{r}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── DeepResearchCard ──────────────────────────────────────────────────────────
export function DeepResearchCard({ sources, onApprove }: {
  sources: Array<{ title: string; domain: string; url: string; snippet: string }>;
  onApprove: () => void;
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showApproval, setShowApproval] = useState(false);

  useEffect(() => {
    sources.forEach((_, i) => setTimeout(() => setVisibleCount(i + 1), i * 220));
    setTimeout(() => setShowApproval(true), sources.length * 220 + 400);
  }, [sources.length]);

  return (
    <div className="w-full my-2 bg-surface border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <Globe className="w-4 h-4" style={{ color: "#F7924A" }} strokeWidth={1.5} />
        <span className="text-[13px] font-semibold text-text-primary">Deep Research</span>
        <span className="ml-auto text-[11px] text-text-tertiary">{visibleCount}/{sources.length} sources</span>
      </div>
      <div className="p-4 space-y-2">
        {sources.slice(0, visibleCount).map((src, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border"
               style={{ animation: "fadeSlideIn 0.25s ease-out both" }}>
            <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 text-[11px] font-bold text-white"
                 style={{ background: "linear-gradient(135deg,#F7924A,#F7C44A)" }}>
              {src.domain.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[11px] text-text-tertiary">{src.domain}</span>
                <ExternalLink className="w-3 h-3 text-text-tertiary" />
              </div>
              <div className="text-[13px] font-medium text-text-primary truncate">{src.title}</div>
              <div className="text-[12px] text-text-secondary mt-0.5">{src.snippet}</div>
            </div>
          </div>
        ))}
      </div>
      {showApproval && (
        <div className="px-4 pb-4" style={{ animation: "fadeSlideIn 0.3s ease-out both" }}>
          <div className="rounded-lg p-3 border border-border" style={{ background: "rgba(247,146,74,0.06)" }}>
            <div className="text-[13px] font-medium text-text-primary mb-2">
              ESA found {sources.length} sources. Approve to update knowledge base?
            </div>
            <div className="flex gap-2">
              <button onClick={onApprove}
                className="px-3.5 py-1.5 rounded-lg text-[13px] font-medium text-white hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(135deg,#F7924A,#F7C44A)" }}>
                Approve
              </button>
              <button onClick={onApprove}
                className="px-3.5 py-1.5 rounded-lg text-[13px] font-medium text-text-secondary border border-border hover:bg-secondary transition-all">
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── KnowledgeBaseUpdateCard ───────────────────────────────────────────────────
export function KnowledgeBaseUpdateCard({ steps }: { steps: string[] }) {
  const [doneCount, setDoneCount] = useState(0);
  useEffect(() => {
    steps.forEach((_, i) => setTimeout(() => setDoneCount(i + 1), i * 700 + 300));
  }, [steps.length]);
  const allDone = doneCount >= steps.length;

  return (
    <div className="w-full my-2 bg-surface border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <Database className="w-4 h-4" style={{ color: "#F7924A" }} strokeWidth={1.5} />
        <span className="text-[13px] font-semibold text-text-primary">Knowledge Base Update</span>
        {allDone && (
          <span className="ml-auto text-[11px] px-2 py-0.5 rounded-full font-medium text-emerald-600"
                style={{ background: "rgba(22,163,74,0.1)" }}>Updated ✓</span>
        )}
      </div>
      <div className="p-4 space-y-3">
        {steps.map((step, i) => {
          const done = i < doneCount;
          const active = i === doneCount;
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-500"
                   style={{ background: done ? "rgba(22,163,74,0.12)" : active ? "rgba(247,146,74,0.12)" : "#F0F2FA",
                            border: `1.5px solid ${done ? "#16A34A55" : active ? "#F7924A55" : "#E4E8F4"}` }}>
                {done ? <Check className="w-3.5 h-3.5 text-emerald-600" />
                  : active ? <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: "#F7924A" }} />
                  : <span className="w-2 h-2 rounded-full bg-border" />}
              </div>
              <span className={`text-[13px] flex-1 transition-colors duration-300 ${done ? "text-text-primary font-medium" : "text-text-tertiary"}`}>{step}</span>
              {done && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
            </div>
          );
        })}
        {allDone && (
          <div className="pt-2 border-t border-border flex items-center gap-2"
               style={{ animation: "fadeSlideIn 0.3s ease-out both" }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(22,163,74,0.12)" }}>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span className="text-[13px] font-semibold text-emerald-600">Knowledge base updated successfully</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── StrategyDocCard ───────────────────────────────────────────────────────────
export function StrategyDocCard({ title, sections }: {
  title: string;
  sections: Array<{ heading: string; content: string | string[] }>;
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    sections.forEach((_, i) => setTimeout(() => setVisibleCount(i + 1), i * 250 + 100));
  }, [sections.length]);

  return (
    <div className="w-full my-2 bg-surface border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2"
           style={{ background: "rgba(74,108,247,0.04)" }}>
        <FileText className="w-4 h-4" style={{ color: "#4A6CF7" }} strokeWidth={1.5} />
        <span className="text-[13px] font-semibold text-text-primary">{title}</span>
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{ background: "rgba(74,108,247,0.1)", color: "#4A6CF7" }}>Strategy Doc</span>
      </div>
      <div className="p-4 space-y-4">
        {sections.slice(0, visibleCount).map((sec, i) => (
          <div key={i} style={{ animation: "fadeSlideIn 0.3s ease-out both" }}>
            <div className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#4A6CF7" }}>
              {sec.heading}
            </div>
            {Array.isArray(sec.content) ? (
              <ul className="space-y-1">
                {sec.content.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-[13px] text-text-secondary">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#4A6CF7" }} />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[13px] text-text-secondary leading-[1.65]">{sec.content}</p>
            )}
          </div>
        ))}
      </div>
      {visibleCount >= sections.length && (
        <div className="px-4 pb-4 flex gap-2" style={{ animation: "fadeSlideIn 0.3s ease-out both" }}>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-white hover:opacity-90 transition-all"
                  style={{ background: "linear-gradient(135deg,#4A6CF7,#6B82F7)" }}>
            <Download className="w-3.5 h-3.5" /> Export as PDF
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-text-secondary border border-border hover:bg-secondary transition-all">
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
        </div>
      )}
    </div>
  );
}

// ── ToolCallRenderer ──────────────────────────────────────────────────────────
export function ToolCallRenderer({ toolName, result }: { toolName: string; result: unknown }) {
  if (!result) return null;
  const r = result as Record<string, unknown>;
  switch (toolName) {
    case "showMetricCards":  return <MetricCards title={r.title as string} metrics={r.metrics as Metric[]} />;
    case "showLineChart":    return <GenLineChart title={r.title as string} xKey={r.xKey as string} lines={r.lines as LineConfig[]} data={r.data as Record<string, string | number>[]} />;
    case "showBarChart":     return <GenBarChart title={r.title as string} xKey={r.xKey as string} bars={r.bars as BarConfig[]} data={r.data as Record<string, string | number>[]} />;
    case "showTable":        return <GenTable title={r.title as string} headers={r.headers as string[]} rows={r.rows as string[][]} highlightRow={r.highlightRow as number | undefined} />;
    case "showInsightCard":  return <InsightCard type={r.type as "insight"|"warning"|"opportunity"|"action"} title={r.title as string} body={r.body as string} actions={r.actions as string[] | undefined} />;
    default: return null;
  }
}

// ── ThinkingIndicator — shows agent reasoning steps as they appear ────────────
export function ThinkingIndicator({
  agentName,
  color,
  thoughts,
}: {
  agentName: string;
  color: string;
  thoughts: string[];
}) {
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    thoughts.forEach((_, i) => {
      setTimeout(() => setVisible((v) => [...v, i]), i * 600);
    });
  }, [thoughts.length]);

  return (
    <div className="w-full my-2 rounded-xl p-4"
         style={{ background: color + "08", border: `1px solid ${color}22` }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-full flex items-center justify-center"
             style={{ background: color + "20" }}>
          <Loader2 className="w-3 h-3 animate-spin" style={{ color }} />
        </div>
        <span className="text-[12px] font-semibold" style={{ color }}>
          {agentName} · Thinking
        </span>
        <div className="flex gap-0.5 ml-1">
          {[0, 1, 2].map((d) => (
            <span key={d} className="w-1 h-1 rounded-full animate-bounce"
                  style={{ background: color, animationDelay: `${d * 0.15}s` }} />
          ))}
        </div>
      </div>
      <div className="space-y-1.5 pl-7">
        {thoughts.map((thought, i) => (
          visible.includes(i) ? (
            <div key={i} className="text-[12px] text-text-secondary leading-[1.5]"
                 style={{ animation: "fadeSlideIn 0.3s ease-out both" }}>
              <span className="text-text-tertiary mr-1.5">→</span>
              {thought}
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
}
