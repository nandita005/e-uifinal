import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function OnboardingSteps({ active }: { active: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: "Profile" },
    { n: 2, label: "Workspace" },
    { n: 3, label: "Dashboard" },
  ];
  return (
    <div className="flex items-center justify-center gap-3 mb-8 text-[13px]">
      {steps.map((s, i) => {
        const isActive = active === s.n;
        const isDone = active > s.n;
        return (
          <div key={s.n} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold",
                isDone ? "bg-success text-white" : isActive ? "bg-primary text-white" : "bg-secondary text-text-tertiary border border-border"
              )}>
                {isDone ? <Check className="w-3.5 h-3.5" /> : s.n}
              </div>
              <span className={cn(isActive || isDone ? "text-text-primary font-medium" : "text-text-tertiary")}>{s.label}</span>
            </div>
            {i < steps.length - 1 && <div className="w-12 h-px bg-border" />}
          </div>
        );
      })}
    </div>
  );
}
