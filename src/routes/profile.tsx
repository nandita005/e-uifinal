import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { MOCK_USER } from "@/lib/mockData";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — ESA" }] }),
  component: Profile,
});

function Profile() {
  return (
    <DashboardLayout title="Profile">
      <div className="p-6 max-w-4xl mx-auto space-y-5">
        <div className="bg-surface border border-border rounded-2xl p-8 shadow-l1 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-[24px] font-semibold"
               style={{ background: "linear-gradient(135deg,#4F6EF7,#9B72F7)" }}>{MOCK_USER.initials}</div>
          <div className="flex-1">
            <h2 className="text-[22px] font-semibold text-text-primary" style={{ fontFamily: "var(--font-display)" }}>{MOCK_USER.name}</h2>
            <p className="text-[13px] text-text-secondary">{MOCK_USER.designation} · {MOCK_USER.workspace}</p>
            <p className="text-[12px] text-text-tertiary mt-1">{MOCK_USER.email}</p>
          </div>
          <span className="text-[11px] px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">{MOCK_USER.role}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Queries", value: MOCK_USER.queriesThisMonth },
            { label: "Reports", value: MOCK_USER.reportsGenerated },
            { label: "Agents Used", value: MOCK_USER.agentsUsed.length },
            { label: "Plan", value: MOCK_USER.plan },
          ].map((m) => (
            <div key={m.label} className="bg-surface border border-border rounded-xl p-4 shadow-l1">
              <div className="text-[12px] text-text-tertiary">{m.label}</div>
              <div className="text-[24px] font-bold text-text-primary mt-1" style={{ fontFamily: "var(--font-display)" }}>{m.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 shadow-l1">
          <h3 className="text-[14px] font-semibold text-text-primary mb-3">Recent Activity</h3>
          <div className="space-y-2 text-[13px] text-text-secondary">
            {["Generated Q3 revenue report", "Connected Salesforce data source", "Invited Karan Bose to workspace", "Updated LLM configuration"].map((a, i) => (
              <div key={i} className="flex justify-between border-b border-border pb-2 last:border-0">
                <span>{a}</span>
                <span className="text-text-tertiary text-[12px]">{["2h", "yesterday", "2 days", "1 week"][i]} ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
