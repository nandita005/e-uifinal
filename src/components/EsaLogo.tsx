import { AGENT_META, type AgentKey } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export function EsaLogo({ size = 24, withWord = true, className = "" }: { size?: number; withWord?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id="esa-grad" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0%" stopColor="#4F6EF7" />
            <stop offset="50%" stopColor="#9B72F7" />
            <stop offset="100%" stopColor="#F7924A" />
          </linearGradient>
        </defs>
        <path d="M16 2L29 9v14L16 30 3 23V9z" stroke="url(#esa-grad)" strokeWidth="2" fill="rgba(79,110,247,0.06)" />
        <path d="M16 10v12M10 13l6 3 6-3M10 19l6 3 6-3" stroke="url(#esa-grad)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
      {withWord && <span style={{ fontFamily: "var(--font-display)" }} className="font-semibold text-text-primary text-[20px] leading-none">ESA</span>}
    </div>
  );
}

export function AgentBadge({ agent, size = "sm" }: { agent: AgentKey; size?: "xs" | "sm" }) {
  const meta = AGENT_META[agent];
  const px = size === "xs" ? "0 6px" : "0 8px";
  const fs = size === "xs" ? 10 : 11;
  return (
    <span
      className="inline-flex items-center rounded-full font-medium border whitespace-nowrap"
      style={{
        height: size === "xs" ? 18 : 20,
        padding: px,
        fontSize: fs,
        background: meta.color + "22",
        color: meta.color,
        borderColor: meta.color + "55",
      }}
    >
      {meta.name}
    </span>
  );
}

export function AgentDot({ agent, active = false }: { agent: AgentKey; active?: boolean }) {
  const meta = AGENT_META[agent];
  return (
    <span
      className="inline-block rounded-full"
      style={{
        width: 8, height: 8,
        background: meta.color,
        boxShadow: active ? `0 0 0 4px ${meta.color}33` : undefined,
      }}
    />
  );
}
