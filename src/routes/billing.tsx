import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Edit2, Download } from "lucide-react";
import { MOCK_INVOICES, MOCK_USER } from "@/lib/mockData";

export const Route = createFileRoute("/billing")({
  head: () => ({ meta: [{ title: "Billing — ESA" }] }),
  component: Billing,
});

function Billing() {
  return (
    <DashboardLayout title="Plans & Billing">
      <div className="p-6 max-w-5xl mx-auto space-y-5">
        <div className="bg-surface border border-border-strong rounded-2xl p-6 shadow-l1 flex items-center justify-between">
          <div>
            <span className="text-[11px] px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">{MOCK_USER.plan} Plan</span>
            <h2 className="mt-3 text-[20px] font-semibold text-text-primary" style={{ fontFamily: "var(--font-display)" }}>Unlimited queries · 10 seats · Custom LLM</h2>
            <p className="text-[13px] text-text-secondary mt-1">Next billing: June 1, 2026 · ₹9,999</p>
          </div>
          <div className="flex gap-2">
            <button className="h-9 px-4 rounded-md border border-border text-[13px]">Cancel</button>
            <button className="h-9 px-4 rounded-md bg-primary text-white text-[13px] font-medium">Upgrade</button>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 shadow-l1">
          <h3 className="text-[14px] font-semibold text-text-primary mb-3">Payment Method</h3>
          <div className="flex items-center justify-between text-[13px]">
            <div className="text-text-primary">Visa ending in ×××× 4242</div>
            <button className="text-primary text-[12px] flex items-center gap-1"><Edit2 className="w-3.5 h-3.5" /> Change</button>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-l1">
          <div className="px-5 py-3 border-b border-border"><h3 className="text-[14px] font-semibold text-text-primary">Invoice History</h3></div>
          <table className="w-full text-[13px]">
            <thead><tr className="bg-secondary text-[12px] text-text-secondary text-left">
              {["Invoice #","Date","Plan","Amount","Status",""].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody>
              {MOCK_INVOICES.map((i) => (
                <tr key={i.id} className="border-t border-border">
                  <td className="px-4 py-3 text-text-primary" style={{ fontFamily: "var(--font-mono)" }}>{i.id}</td>
                  <td className="px-4 py-3 text-text-secondary">{i.date}</td>
                  <td className="px-4 py-3 text-text-secondary">{i.plan}</td>
                  <td className="px-4 py-3 text-text-primary font-medium">{i.amount}</td>
                  <td className="px-4 py-3"><span className="text-[11px] px-2 py-0.5 rounded-full bg-success/10 text-success">{i.status}</span></td>
                  <td className="px-4 py-3"><button className="text-primary text-[12px] flex items-center gap-1"><Download className="w-3.5 h-3.5" /> PDF</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
