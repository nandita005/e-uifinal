import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { TrendingUp, TrendingDown, Minus, Download, Plus, RefreshCw, Maximize2, Lock } from "lucide-react";
import { MOCK_METRICS, MOCK_AGENT_USAGE, MOCK_REGION_REVENUE } from "@/lib/mockData";
import { useRole } from "@/lib/roleContext";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics — ESA" }] }),
  component: Analytics,
});

const KPIS = [
  { label: "Total Queries", value: "312", change: "+18%", dir: "up" as const },
  { label: "Reports Generated", value: "47", change: "+12%", dir: "up" as const },
  { label: "Active Users", value: "12", change: "0%", dir: "flat" as const },
  { label: "Avg Response", value: "2.8s", change: "−0.3s", dir: "down" as const },
];

function Kpi({ label, value, change, dir }: typeof KPIS[number]) {
  const Icon = dir === "up" ? TrendingUp : dir === "down" ? TrendingDown : Minus;
  const color = dir === "up" ? "text-success" : dir === "down" ? "text-success" : "text-text-tertiary";
  return (
    <div className="bg-surface border border-border rounded-xl p-5 shadow-l1 hover:-translate-y-0.5 transition-all">
      <div className="text-[12px] text-text-tertiary">{label}</div>
      <div className="text-[32px] font-bold text-text-primary leading-tight mt-1" style={{ fontFamily: "var(--font-display)" }}>{value}</div>
      <div className={`text-[12px] flex items-center gap-1 mt-1 ${color}`}>
        <Icon className="w-3.5 h-3.5" /> {change} vs last month
      </div>
    </div>
  );
}

function Analytics() {
  const trend = MOCK_METRICS.month.queryTrend.map((v, i) => ({ day: `D${i+1}`, queries: v }));
  return (
    <DashboardLayout title="Analytics">
      <div className="border-b border-border h-[52px] px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="h-8 px-3 rounded-full bg-surface border border-border-strong text-[13px] text-text-primary">Last 30 days ▾</button>
          <div className="flex items-center gap-1.5 text-[12px] text-text-tertiary">
            <RefreshCw className="w-3.5 h-3.5" /> Last updated 2 min ago
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-8 px-3 rounded-md border border-border bg-surface text-[13px] flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> Export</button>
          <button className="h-8 px-3 rounded-md bg-primary text-white text-[13px] flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Add Widget</button>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {KPIS.map((k) => <Kpi key={k.label} {...k} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-5 shadow-l1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold text-text-primary">Query Volume — Last 21 Days</h3>
              <div className="flex gap-1 text-text-tertiary"><Maximize2 className="w-3.5 h-3.5" /></div>
            </div>
            <div className="h-[240px]">
              <ResponsiveContainer>
                <AreaChart data={trend}>
                  <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4F6EF7" stopOpacity={0.3} /><stop offset="100%" stopColor="#4F6EF7" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4E8F4" />
                  <XAxis dataKey="day" stroke="#8A93B0" fontSize={11} />
                  <YAxis stroke="#8A93B0" fontSize={11} />
                  <Tooltip contentStyle={{ background: "#fff", border: "0.5px solid #D6DCF0", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="queries" stroke="#4F6EF7" strokeWidth={2} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 shadow-l1">
            <h3 className="text-[14px] font-semibold text-text-primary mb-3">Agent Usage</h3>
            <div className="h-[200px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={MOCK_AGENT_USAGE} dataKey="value" nameKey="agent" innerRadius={50} outerRadius={80} paddingAngle={3}>
                    {MOCK_AGENT_USAGE.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#fff", border: "0.5px solid #D6DCF0", borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 mt-2">
              {MOCK_AGENT_USAGE.map((d) => (
                <div key={d.agent} className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: d.color }} /> {d.agent}</div>
                  <span className="text-text-tertiary">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 shadow-l1">
            <h3 className="text-[14px] font-semibold text-text-primary mb-3">Revenue by Region (₹ Lakhs)</h3>
            <div className="h-[220px]">
              <ResponsiveContainer>
                <BarChart layout="vertical" data={MOCK_REGION_REVENUE}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4E8F4" horizontal={false} />
                  <XAxis type="number" stroke="#8A93B0" fontSize={11} />
                  <YAxis type="category" dataKey="region" stroke="#8A93B0" fontSize={11} width={90} />
                  <Tooltip contentStyle={{ background: "#fff", border: "0.5px solid #D6DCF0", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="value" fill="#4F6EF7" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-5 shadow-l1">
            <h3 className="text-[14px] font-semibold text-text-primary mb-3">Top Queries This Month</h3>
            <table className="w-full text-[13px]">
              <thead className="text-[12px] text-text-secondary">
                <tr className="text-left"><th className="pb-2">Query</th><th className="pb-2">Count</th><th className="pb-2">Agents</th><th className="pb-2">Avg Time</th></tr>
              </thead>
              <tbody>
                {[
                  ["Q3 revenue analysis", 24, "Strategy · Data", "3.4s"],
                  ["Competitor benchmark", 19, "Research", "5.1s"],
                  ["HR leave policy", 17, "Search", "1.2s"],
                  ["GTM strategy FY27", 14, "Strategy", "2.9s"],
                  ["Market size India SaaS", 12, "Research", "4.7s"],
                ].map((r, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="py-2.5 text-text-primary">{r[0]}</td>
                    <td className="py-2.5 text-text-secondary">{r[1]}</td>
                    <td className="py-2.5 text-text-secondary">{r[2]}</td>
                    <td className="py-2.5 text-text-secondary" style={{ fontFamily: "var(--font-mono)" }}>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

void Legend;
