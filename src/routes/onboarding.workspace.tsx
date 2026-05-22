import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, ChevronDown, X } from "lucide-react";
import { OnboardingSteps } from "@/components/OnboardingSteps";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding/workspace")({
  head: () => ({ meta: [{ title: "Set up your workspace — ESA" }] }),
  component: WorkspacePage,
});

const inputClass = "w-full h-10 px-3.5 rounded-md bg-surface border border-border-strong text-[14px] text-text-primary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10";
const USE_CASES = ["Data Analysis", "Strategy", "Research", "Knowledge Search"];

function WorkspacePage() {
  const nav = useNavigate();
  const [selected, setSelected] = useState<string[]>(["Strategy", "Data Analysis"]);
  const [emails, setEmails] = useState<string[]>(["priya.nair@acmecorp.com"]);
  const [email, setEmail] = useState("");
  const [llmOpen, setLlmOpen] = useState(false);

  const toggle = (u: string) => setSelected((s) => s.includes(u) ? s.filter(x => x !== u) : [...s, u]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <OnboardingSteps active={2} />
      <div className="w-[520px] bg-surface rounded-[20px] border border-border-strong shadow-l3 p-12">
        <h1 className="text-[22px] font-semibold text-text-primary" style={{ fontFamily: "var(--font-display)" }}>Set up your workspace</h1>
        <p className="text-[14px] text-text-secondary mt-1 mb-7">Configure ESA for your organization</p>

        <div className="space-y-4">
          <div>
            <label className="text-[13px] font-medium text-text-primary mb-1.5 block">Workspace Name</label>
            <input className={inputClass} defaultValue="Acme Strategy Hub" />
          </div>
          <div>
            <label className="text-[13px] font-medium text-text-primary mb-1.5 block">Industry</label>
            <select className={inputClass}><option>SaaS</option><option>BFSI</option><option>Manufacturing</option></select>
          </div>
          <div>
            <label className="text-[13px] font-medium text-text-primary mb-1.5 block">Team Size</label>
            <select className={inputClass}><option>11–50</option><option>1–10</option><option>51–200</option><option>200+</option></select>
          </div>

          <div>
            <label className="text-[13px] font-medium text-text-primary mb-2 block">What will you mainly use ESA for?</label>
            <div className="flex flex-wrap gap-2">
              {USE_CASES.map((u) => {
                const on = selected.includes(u);
                return (
                  <button key={u} onClick={() => toggle(u)} className={cn(
                    "h-[34px] px-3.5 rounded-md text-[13px] font-medium border transition-colors",
                    on ? "border-primary text-text-primary" : "border-border-strong text-text-secondary bg-secondary",
                  )} style={on ? { background: "rgba(79,110,247,0.10)" } : undefined}>
                    {u}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-[13px] font-medium text-text-primary mb-2 block">Invite teammates (optional)</label>
            <div className="rounded-md border border-border-strong p-2 flex flex-wrap gap-1.5">
              {emails.map((e) => (
                <span key={e} className="inline-flex items-center gap-1 bg-secondary px-2 py-1 rounded text-[12px] text-text-primary">
                  {e}<button onClick={() => setEmails(emails.filter(x => x!==e))}><X className="w-3 h-3" /></button>
                </span>
              ))}
              <input value={email} onChange={(e) => setEmail(e.target.value)}
                     onKeyDown={(e) => { if (e.key === "Enter" && email) { setEmails([...emails, email]); setEmail(""); } }}
                     placeholder="email@company.com" className="flex-1 min-w-[180px] outline-none text-[13px] bg-transparent" />
            </div>
            <button className="mt-2 text-[12px] text-primary flex items-center gap-1"><Plus className="w-3 h-3" /> Add another</button>
          </div>

          <div>
            <label className="text-[13px] font-medium text-text-primary mb-1.5 block">Workspace logo</label>
            <button className="w-full h-[60px] rounded-md border border-dashed border-border-strong text-[12px] text-text-tertiary hover:bg-secondary">
              Upload workspace logo (PNG/SVG/JPG)
            </button>
          </div>

          <button onClick={() => setLlmOpen(!llmOpen)} className="flex items-center gap-1 text-[13px] text-text-secondary hover:text-text-primary">
            <ChevronDown className={cn("w-4 h-4 transition-transform", llmOpen && "rotate-180")} />
            Configure AI provider (optional — you can do this later)
          </button>
          {llmOpen && (
            <div className="rounded-md bg-secondary p-3 space-y-2">
              <select className={inputClass}><option>OpenAI</option><option>Anthropic</option><option>Azure OpenAI</option><option>Gemini</option></select>
              <input className={inputClass} placeholder="API Key" type="password" />
              <button className="text-[12px] text-primary">Test connection</button>
            </div>
          )}
        </div>

        <button onClick={() => nav({ to: "/dashboard" })} className="mt-7 w-full h-11 rounded-md bg-primary text-white font-medium text-[14px] hover:bg-primary-hover">
          Create Workspace →
        </button>
        <div className="text-right mt-3">
          <button onClick={() => nav({ to: "/dashboard" })} className="text-[13px] text-text-secondary hover:text-text-primary">Skip for now →</button>
        </div>
      </div>
    </div>
  );
}
