import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard, MessageSquare, BarChart2, Database, FileText, Users,
  Settings, CreditCard, ClipboardList, Bell, Search, ChevronDown,
  PanelLeftClose, PanelLeftOpen, Menu, PanelRightClose, PanelRightOpen,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { EsaLogo, AgentDot } from "./EsaLogo";
import { MOCK_DATA_SOURCES, AGENT_META, type AgentKey } from "@/lib/mockData";
import { useRole, ROLE_LABELS, ROLE_COLORS, type Permission } from "@/lib/roleContext";
import { cn } from "@/lib/utils";

const ALL_NAV = [
  { to: "/dashboard", label: "Dashboard",   icon: LayoutDashboard, permission: null },
  { to: "/chat",      label: "AI Chat",      icon: MessageSquare,   permission: "run_queries" as Permission },
  { to: "/analytics", label: "Analytics",    icon: BarChart2,       permission: "view_analytics" as Permission },
  { to: "/data",      label: "Data Sources", icon: Database,        permission: null },
  { to: "/reports",   label: "Reports",      icon: FileText,        permission: null },
  { to: "/search",    label: "Search",       icon: Search,          permission: null },
  { to: "/team",      label: "Team",         icon: Users,           permission: "invite_users" as Permission },
  { to: "/settings",  label: "Settings",     icon: Settings,        permission: null },
  { to: "/billing",   label: "Billing",      icon: CreditCard,      permission: "manage_billing" as Permission },
  { to: "/audit",     label: "Audit Logs",   icon: ClipboardList,   permission: "view_audit_logs" as Permission },
];

export function DashboardLayout({
  title,
  children,
  right,
  hideRight = false,
  activeAgents = [],
}: {
  title: string;
  children: ReactNode;
  right?: ReactNode;
  hideRight?: boolean;
  activeAgents?: AgentKey[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightOpen, setRightOpen] = useState(!hideRight);
  const location = useLocation();
  const { user, can } = useRole();

  // Filter nav by role permissions
  const NAV = ALL_NAV.filter((item) => item.permission === null || can(item.permission));

  const sidebarWidth = sidebarCollapsed ? 64 : 220;

  return (
    <div className="min-h-screen flex bg-[#F7F8FC]">

      {/* ── SIDEBAR ── */}
      <>
        {/* mobile overlay backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={cn(
            "bg-surface border-r border-border flex flex-col shrink-0 transition-all duration-300 z-40",
            // mobile: fixed overlay
            "fixed md:relative inset-y-0 left-0",
            // mobile hide/show
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          )}
          style={{ width: sidebarWidth }}
        >
          {/* logo + workspace */}
          <div className="px-4 pt-5 pb-3 flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <EsaLogo withWord={!sidebarCollapsed} />
              {!sidebarCollapsed && (
                <button className="mt-2 flex items-center gap-1 text-[12px] text-text-secondary hover:text-text-primary truncate max-w-full">
                  <span className="truncate">{user.workspace}</span>
                  <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                </button>
              )}
            </div>
            {/* collapse toggle — desktop only */}
            <button
              className="hidden md:flex text-text-tertiary hover:text-text-primary p-1 shrink-0"
              onClick={() => setSidebarCollapsed((v) => !v)}
              aria-label="Toggle sidebar"
            >
              {sidebarCollapsed
                ? <PanelLeftOpen className="w-4 h-4" />
                : <PanelLeftClose className="w-4 h-4" />}
            </button>
          </div>

          <div className="h-px bg-border" />

          {/* nav links */}
          <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
            {NAV.map((item) => {
              const active =
                location.pathname === item.to ||
                (item.to !== "/dashboard" && location.pathname.startsWith(item.to));
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 h-9 rounded-md px-3 text-[13.5px] transition-colors relative",
                    active
                      ? "text-primary font-medium"
                      : "text-text-secondary hover:bg-secondary hover:text-text-primary",
                  )}
                  style={active ? { background: "rgba(79,110,247,0.08)" } : undefined}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  {active && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r bg-primary" />
                  )}
                  <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="h-px bg-border" />

          {/* user row */}
          <div className="p-3 flex items-center gap-2">
            <Link to="/profile" className="flex items-center gap-2 flex-1 min-w-0 group">
              <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white text-[12px] font-semibold"
                   style={{ background: "linear-gradient(135deg,#4F6EF7,#9B72F7)" }}>
                {user.initials}
              </div>
              {!sidebarCollapsed && (
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] text-text-primary truncate group-hover:text-primary">{user.name}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium text-white"
                          style={{ background: ROLE_COLORS[user.role] }}>
                      {ROLE_LABELS[user.role]}
                    </span>
                  </div>
                </div>
              )}
            </Link>
          </div>
        </aside>
      </>

      {/* ── MAIN ── */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* topbar */}
        <div
          className="h-14 border-b border-border flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20"
          style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)" }}
        >
          <div className="flex items-center gap-3">
            {/* hamburger — always visible to open sidebar */}
            <button
              className="p-1.5 hover:bg-secondary rounded-md text-text-secondary"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
            {/* collapse toggle — desktop, shown in header when sidebar is collapsed */}
            {sidebarCollapsed && (
              <button
                className="hidden md:flex p-1.5 hover:bg-secondary rounded-md text-text-secondary"
                onClick={() => setSidebarCollapsed(false)}
                aria-label="Expand sidebar"
              >
                <PanelLeftOpen className="w-4 h-4" strokeWidth={1.5} />
              </button>
            )}
            <h1 className="text-[15px] font-semibold text-text-primary">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-secondary rounded-md text-text-secondary">
              <Search className="w-4.5 h-4.5" strokeWidth={1.5} />
            </button>
            <button className="p-2 hover:bg-secondary rounded-md text-text-secondary relative">
              <Bell className="w-4.5 h-4.5" strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-danger" />
            </button>
            <Link to="/profile"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-semibold"
              style={{ background: "linear-gradient(135deg,#4F6EF7,#9B72F7)" }}>
              {user.initials}
            </Link>
          </div>
        </div>

        {/* page content */}
        <div className="flex-1 flex flex-col min-h-0">{children}</div>
      </main>

      {/* ── OPTIONAL RIGHT PANEL ── */}
      {!hideRight && rightOpen && (
        <aside style={{ width: 260, flexShrink: 0, display: "flex", flexDirection: "column" }}
               className="bg-surface border-l border-border">
          <div className="h-10 px-4 flex items-center justify-between border-b border-border shrink-0">
            <span className="text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Workspace</span>
            <button
              onClick={() => setRightOpen(false)}
              className="p-1 hover:bg-secondary rounded text-text-tertiary hover:text-text-primary"
              aria-label="Close panel"
            >
              <PanelRightClose className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {right ?? <DefaultRightPanel activeAgents={activeAgents} />}
          </div>
        </aside>
      )}

      {/* re-open button when panel is closed */}
      {!hideRight && !rightOpen && (
        <button
          onClick={() => setRightOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 w-5 h-14 bg-surface border border-border border-r-0 rounded-l-lg shadow-l1 flex items-center justify-center text-text-tertiary hover:text-text-primary z-20"
          aria-label="Open panel"
        >
          <PanelRightOpen className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

export function DefaultRightPanel({ activeAgents = [] as AgentKey[] }: { activeAgents?: AgentKey[] }) {
  return (
    <>
      {/* Agent Orchestration — like the chat page panel */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Agent Orchestration</h3>
          {activeAgents.length > 0 && (
            <span className="flex gap-1">
              {[0,1,2].map((d) => (
                <span key={d} className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${d*0.15}s` }} />
              ))}
            </span>
          )}
        </div>

        {/* SVG flow diagram */}
        <div className="rounded-xl border border-border bg-secondary/40 p-3 mb-3">
          <svg viewBox="0 0 220 110" className="w-full h-[90px]">
            {/* Query node */}
            <circle cx="28" cy="55" r="16" fill="#F0F2FA" stroke="#D6DCF0" strokeWidth="1" />
            <text x="28" y="59" textAnchor="middle" fontSize="10" fontWeight="600" fill="#4B526B">Q</text>
            {/* Agent nodes */}
            {(Object.keys(AGENT_META) as AgentKey[]).map((k, i) => {
              const meta = AGENT_META[k];
              const isActive = activeAgents.includes(k);
              const cy = 18 + i * 24;
              return (
                <g key={k}>
                  <path d={`M 44 55 Q 130 55 188 ${cy}`} fill="none"
                        stroke={isActive ? meta.color : "#E4E8F4"}
                        strokeWidth={isActive ? 1.5 : 1}
                        strokeDasharray={isActive ? "5 3" : "2 4"}
                        opacity={isActive ? 0.8 : 0.4} />
                  <circle cx="192" cy={cy} r="12"
                          fill={isActive ? meta.color : "#F7F8FC"}
                          stroke={isActive ? meta.color : "#E4E8F4"}
                          strokeWidth="1" />
                  <text x="192" y={cy + 4} textAnchor="middle" fontSize="9"
                        fill={isActive ? "white" : "#8A93B0"} fontWeight="600">
                    {meta.name[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Agent list */}
        <div className="space-y-2">
          {(Object.keys(AGENT_META) as AgentKey[]).map((k) => {
            const meta = AGENT_META[k];
            const isActive = activeAgents.includes(k);
            return (
              <div key={k} className="flex items-center gap-2 text-[12px]">
                <span className="w-2 h-2 rounded-full shrink-0 transition-all"
                      style={{
                        background: isActive ? meta.color : "#D6DCF0",
                        boxShadow: isActive ? `0 0 6px ${meta.color}88` : "none",
                      }} />
                <span className={`font-medium flex-1 ${isActive ? "text-text-primary" : "text-text-tertiary"}`}>
                  {meta.name} Agent
                </span>
                {isActive ? (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full text-white font-medium"
                        style={{ background: meta.color }}>Used</span>
                ) : (
                  <span className="text-[10px] text-text-tertiary">Ready</span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* Data Sources */}
      <section>
        <h3 className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-3">Data Sources</h3>
        <div className="space-y-1.5">
          {MOCK_DATA_SOURCES.slice(0, 4).map((s) => (
            <div key={s.id} className="flex items-center gap-2 text-[12px]">
              <Database className="w-3.5 h-3.5 text-text-tertiary shrink-0" strokeWidth={1.5} />
              <span className="text-text-primary truncate flex-1">{s.name}</span>
              <span className={cn(
                "w-1.5 h-1.5 rounded-full shrink-0",
                s.status === "Active" ? "bg-success" : s.status === "Syncing" ? "bg-warning" : "bg-danger",
              )} />
            </div>
          ))}
          <Link to="/data" className="block text-[12px] text-primary mt-2 hover:underline">+ Add Source</Link>
        </div>
      </section>
    </>
  );
}
