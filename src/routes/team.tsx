import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Plus, X, Check, Clock } from "lucide-react";
import { MOCK_TEAM } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/team")({
  head: () => ({ meta: [{ title: "Team — ESA" }] }),
  component: Team,
});

const ROLES = ["Super Admin", "Admin", "Analyst", "Researcher", "Viewer"];

// Mock pending invites — Abc and Xyz from Simplify
const INITIAL_INVITES = [
  { id: "inv_1", name: "Abc Kumar",  email: "abc@simplify.io",  role: "Analyst",    sent: "2 hours ago",  status: "pending" as const },
  { id: "inv_2", name: "Xyz Sharma", email: "xyz@simplify.io",  role: "Viewer",     sent: "yesterday",    status: "pending" as const },
];

function InviteModal({ onClose, onInvite }: {
  onClose: () => void;
  onInvite: (email: string, role: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Analyst");
  const [sent, setSent] = useState(false);

  function handleSend() {
    if (!email.trim()) return;
    onInvite(email.trim(), role);
    setSent(true);
    setTimeout(onClose, 1200);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-[#D6DCF0] overflow-hidden"
           style={{ boxShadow: "0 20px 64px rgba(79,110,247,0.14)" }}
           onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4E8F4]">
          <span className="text-[15px] font-semibold text-[#0F1117]">Invite a teammate</span>
          <button onClick={onClose} className="p-1 hover:bg-[#F0F2FA] rounded-md text-[#8A93B0]">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          {sent ? (
            <div className="flex flex-col items-center py-4 gap-3">
              <div className="w-12 h-12 rounded-full bg-[#16A34A]/10 flex items-center justify-center">
                <Check className="w-6 h-6 text-[#16A34A]" />
              </div>
              <p className="text-[14px] font-medium text-[#0F1117]">Invite sent to {email}</p>
            </div>
          ) : (
            <>
              <div>
                <label className="text-[13px] font-medium text-[#0F1117] mb-1.5 block">Email address</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="colleague@company.com"
                  className="w-full h-10 px-3.5 rounded-lg border border-[#D6DCF0] text-[14px] text-[#0F1117] placeholder:text-[#8A93B0] focus:outline-none focus:border-[#4F6EF7] transition-colors"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#0F1117] mb-1.5 block">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-lg border border-[#D6DCF0] text-[14px] text-[#0F1117] focus:outline-none focus:border-[#4F6EF7] transition-colors appearance-none"
                >
                  {ROLES.map((r) => <option key={r}>{r}</option>)}
                </select>
                <p className="text-[11px] text-[#8A93B0] mt-1">
                  {role === "Viewer" && "Can view shared reports and charts only."}
                  {role === "Analyst" && "Can upload data and run AI queries."}
                  {role === "Researcher" && "Can run queries and export research reports."}
                  {role === "Admin" && "Can manage team, data sources, and LLM keys."}
                  {role === "Super Admin" && "Full access across all workspaces."}
                </p>
              </div>
              <button
                onClick={handleSend}
                disabled={!email.trim()}
                className="w-full h-10 rounded-lg bg-[#4F6EF7] hover:bg-[#3D5BE8] text-white text-[14px] font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Send Invite
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const TABS = ["Members", "Pending Invites"];

function Team() {
  const [tab, setTab] = useState("Members");
  const [showInvite, setShowInvite] = useState(false);
  const [invites, setInvites] = useState(INITIAL_INVITES);
  const [members, setMembers] = useState(MOCK_TEAM);

  function handleInvite(email: string, role: string) {
    const name = email.split("@")[0];
    setInvites((prev) => [...prev, {
      id: `inv_${Date.now()}`,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email,
      role,
      sent: "just now",
      status: "pending" as const,
    }]);
  }

  function handleRoleChange(id: string, role: string) {
    setMembers((prev) => prev.map((m) => m.id === id ? { ...m, role } : m));
  }

  function handleRevoke(id: string) {
    setInvites((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <DashboardLayout title="Team">
      <div className="p-6 max-w-5xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 border-b border-[#E4E8F4] w-full">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                      className={cn("pb-3 px-1 mr-5 text-[14px] border-b-2 -mb-px transition-colors",
                        tab === t ? "text-[#0F1117] border-[#4F6EF7]" : "text-[#8A93B0] border-transparent hover:text-[#0F1117]")}>
                {t}
                {t === "Pending Invites" && invites.length > 0 && (
                  <span className="ml-1.5 text-[11px] px-1.5 py-0.5 rounded-full bg-[#4F6EF7]/10 text-[#4F6EF7] font-medium">
                    {invites.length}
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={() => setShowInvite(true)}
              className="ml-auto mb-3 h-9 px-4 rounded-lg bg-[#4F6EF7] hover:bg-[#3D5BE8] text-white text-[13px] font-medium flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" /> Invite Member
            </button>
          </div>
        </div>

        {/* Members tab */}
        {tab === "Members" && (
          <div className="bg-white border border-[#E4E8F4] rounded-xl overflow-hidden"
               style={{ boxShadow: "0 1px 6px rgba(79,110,247,0.07)" }}>
            <table className="w-full text-[13px]">
              <thead>
                <tr style={{ background: "#F7F8FC" }}>
                  {["Member", "Role", "Team", "Last Active", "Status"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-[#8A93B0] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.id} className="border-t border-[#E4E8F4] hover:bg-[#F7F8FC] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-semibold shrink-0"
                             style={{ background: "linear-gradient(135deg,#4F6EF7,#9B72F7)" }}>
                          {m.initials}
                        </div>
                        <div>
                          <div className="text-[13px] font-medium text-[#0F1117]">{m.name}</div>
                          <div className="text-[11px] text-[#8A93B0]">{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={m.role}
                        onChange={(e) => handleRoleChange(m.id, e.target.value)}
                        className="bg-[#F0F2FA] border border-[#E4E8F4] rounded-lg px-2.5 py-1 text-[12px] text-[#0F1117] focus:outline-none focus:border-[#4F6EF7] transition-colors"
                      >
                        {ROLES.map((r) => <option key={r}>{r}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-[#4B526B]">{m.team}</td>
                    <td className="px-4 py-3 text-[#8A93B0]">{m.lastActive}</td>
                    <td className="px-4 py-3">
                      <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium",
                        m.status === "Active" ? "bg-[#16A34A]/10 text-[#16A34A]" : "bg-[#D97706]/10 text-[#D97706]")}>
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pending Invites tab */}
        {tab === "Pending Invites" && (
          <div className="space-y-3">
            {invites.length === 0 && (
              <div className="text-center py-12 text-[14px] text-[#8A93B0]">No pending invites</div>
            )}
            {invites.map((inv) => (
              <div key={inv.id} className="bg-white border border-[#E4E8F4] rounded-xl px-5 py-4 flex items-center gap-4"
                   style={{ boxShadow: "0 1px 6px rgba(79,110,247,0.07)" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-semibold shrink-0"
                     style={{ background: "linear-gradient(135deg,#4F6EF7,#9B72F7)" }}>
                  {inv.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-[#0F1117]">{inv.name}</div>
                  <div className="text-[12px] text-[#8A93B0]">{inv.email}</div>
                </div>
                <span className="text-[12px] px-2.5 py-1 rounded-full font-medium text-[#4F6EF7]"
                      style={{ background: "rgba(79,110,247,0.08)" }}>
                  {inv.role}
                </span>
                <div className="flex items-center gap-1 text-[11px] text-[#8A93B0]">
                  <Clock className="w-3 h-3" /> {inv.sent}
                </div>
                <button
                  onClick={() => handleRevoke(inv.id)}
                  className="p-1.5 hover:bg-[#F0F2FA] rounded-lg text-[#8A93B0] hover:text-[#DC2626] transition-colors"
                  title="Revoke invite"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showInvite && (
        <InviteModal
          onClose={() => setShowInvite(false)}
          onInvite={handleInvite}
        />
      )}
    </DashboardLayout>
  );
}
