import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Download } from "lucide-react";
import { MOCK_AUDIT } from "@/lib/mockData";

export const Route = createFileRoute("/audit")({
  head: () => ({ meta: [{ title: "Audit Logs — ESA" }] }),
  component: Audit,
});

function Audit() {
  return (
    <DashboardLayout title="Audit Logs">
      <div className="p-6 max-w-6xl mx-auto space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <select className="h-9 px-3 rounded-md bg-surface border border-border text-[13px]"><option>All users</option></select>
          <select className="h-9 px-3 rounded-md bg-surface border border-border text-[13px]"><option>All actions</option></select>
          <input type="date" className="h-9 px-3 rounded-md bg-surface border border-border text-[13px]" />
          <button className="ml-auto h-9 px-3 rounded-md border border-border bg-surface text-[13px] flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> Export</button>
          <label className="flex items-center gap-2 text-[12px] text-text-secondary"><input type="checkbox" defaultChecked /> Live feed <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /></label>
        </div>
        <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-l1">
          <table className="w-full text-[13px]">
            <thead><tr className="bg-secondary text-[12px] text-text-secondary text-left">
              {["Timestamp","User","Action","Module","IP","Status"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody>
              {MOCK_AUDIT.map((r, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-4 py-3 text-text-secondary" style={{ fontFamily: "var(--font-mono)" }}>{r.time}</td>
                  <td className="px-4 py-3 text-text-primary">{r.user}</td>
                  <td className="px-4 py-3"><span className="text-[11px] px-2 py-0.5 rounded bg-primary/10 text-primary">{r.action}</span></td>
                  <td className="px-4 py-3 text-text-tertiary">{r.module}</td>
                  <td className="px-4 py-3 text-text-tertiary" style={{ fontFamily: "var(--font-mono)" }}>{r.ip}</td>
                  <td className="px-4 py-3"><span className="text-[11px] px-2 py-0.5 rounded-full bg-success/10 text-success">{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[12px] text-text-tertiary">Logs retained for 90 days · Extendable on Enterprise plan</p>
      </div>
    </DashboardLayout>
  );
}
