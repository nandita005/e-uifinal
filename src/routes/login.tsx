import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import { EsaLogo } from "@/components/EsaLogo";
import { useRole, type ESARole, ROLE_LABELS, ROLE_COLORS } from "@/lib/roleContext";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — ESA" }] }),
  component: Login,
});

// Mock users per role for demo
const DEMO_USERS: Record<ESARole, { name: string; email: string; initials: string }> = {
  super_admin: { name: "Arjun Mehta",   email: "arjun@acmecorp.com",  initials: "AM" },
  admin:       { name: "Priya Nair",    email: "priya@acmecorp.com",  initials: "PN" },
  analyst:     { name: "Rohan Sharma",  email: "rohan@acmecorp.com",  initials: "RS" },
  researcher:  { name: "Meera Iyer",    email: "meera@acmecorp.com",  initials: "MI" },
  viewer:      { name: "Karan Bose",    email: "karan@acmecorp.com",  initials: "KB" },
};

function Login() {
  const [agreed, setAgreed] = useState(true);
  const [selectedRole, setSelectedRole] = useState<ESARole>("admin");
  const [roleOpen, setRoleOpen] = useState(false);
  const { setUser } = useRole();
  const nav = useNavigate();

  const handleSSO = () => {
    if (!agreed) return;
    const demo = DEMO_USERS[selectedRole];
    setUser({
      ...demo,
      role: selectedRole,
      workspace: "Acme Strategy Hub",
      plan: "Growth",
    });
    nav({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8"
         style={{ background: "linear-gradient(135deg, #F7F8FC 0%, #EEF1FA 55%, #F0F4FF 100%)", backgroundAttachment: "fixed" }}>
      {/* mesh blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", top: 0, left: 0, width: 600, height: 400, background: "radial-gradient(ellipse 600px 400px at 15% 20%, rgba(79,110,247,0.10) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 500, height: 350, background: "radial-gradient(ellipse 500px 350px at 85% 80%, rgba(247,146,74,0.06) 0%, transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-[440px] bg-white rounded-[20px] border border-[#D6DCF0] p-10"
           style={{ boxShadow: "0 20px 64px rgba(79,110,247,0.14), 0 4px 16px rgba(0,0,0,0.08)" }}>
        <div className="flex justify-center mb-8"><EsaLogo size={36} /></div>
        <h1 className="text-center text-[24px] font-semibold text-[#0F1117] mb-1" style={{ fontFamily: "var(--font-display)" }}>
          Welcome back
        </h1>
        <p className="text-center text-[14px] text-[#4B526B] mb-6">Sign in to your workspace</p>

        {/* Role selector */}
        <div className="mb-5">
          <label className="text-[12px] font-semibold text-[#8A93B0] uppercase tracking-wider mb-2 block">
            Sign in as
          </label>
          <div className="relative">
            <button onClick={() => setRoleOpen(!roleOpen)}
                    className="w-full h-11 px-4 rounded-lg border border-[#D6DCF0] bg-white flex items-center justify-between text-[14px] font-medium text-[#0F1117] hover:border-[#4F6EF7] transition-colors">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: ROLE_COLORS[selectedRole] }} />
                {ROLE_LABELS[selectedRole]}
                <span className="text-[11px] text-[#8A93B0] font-normal">· {DEMO_USERS[selectedRole].name}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#8A93B0] transition-transform ${roleOpen ? "rotate-180" : ""}`} />
            </button>
            {roleOpen && (
              <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-[#D6DCF0] rounded-xl shadow-lg overflow-hidden">
                {(Object.keys(ROLE_LABELS) as ESARole[]).map((r) => (
                  <button key={r} onClick={() => { setSelectedRole(r); setRoleOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F0F2FA] transition-colors text-left">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: ROLE_COLORS[r] }} />
                    <div>
                      <div className="text-[13px] font-medium text-[#0F1117]">{ROLE_LABELS[r]}</div>
                      <div className="text-[11px] text-[#8A93B0]">{DEMO_USERS[r].email}</div>
                    </div>
                    {selectedRole === r && <span className="ml-auto text-[#4F6EF7] text-[12px]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SSO buttons */}
        <button disabled={!agreed} onClick={handleSSO}
                className="w-full h-11 rounded-lg border border-[#D6DCF0] bg-[#F7F8FC] hover:bg-[#F0F2FA] flex items-center justify-center gap-3 text-[14px] font-medium text-[#0F1117] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          <svg width="18" height="18" viewBox="0 0 23 23"><path fill="#f25022" d="M0 0h11v11H0z"/><path fill="#7fba00" d="M12 0h11v11H12z"/><path fill="#00a4ef" d="M0 12h11v11H0z"/><path fill="#ffb900" d="M12 12h11v11H12z"/></svg>
          Continue with Microsoft
        </button>
        <button disabled={!agreed} onClick={handleSSO}
                className="mt-2.5 w-full h-11 rounded-lg border border-[#D6DCF0] bg-[#F7F8FC] hover:bg-[#F0F2FA] flex items-center justify-center gap-3 text-[14px] font-medium text-[#0F1117] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
          Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-[#E4E8F4]" />
          <span className="text-[13px] text-[#8A93B0]">OR</span>
          <div className="flex-1 h-px bg-[#E4E8F4]" />
        </div>
        <button onClick={handleSSO} className="block w-full text-center text-[13px] text-[#4F6EF7] hover:underline">
          Sign in via Enterprise SSO (Okta, SAML)
        </button>

        <label className="mt-5 flex items-start gap-2.5 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 rounded accent-[#4F6EF7]" />
          <span className="text-[12px] text-[#4B526B] leading-[1.5]">
            I agree to the <a href="#" className="text-[#4F6EF7] hover:underline">Terms of Service</a> and <a href="#" className="text-[#4F6EF7] hover:underline">Privacy Policy</a>
          </span>
        </label>

        <p className="mt-6 text-center text-[13px] text-[#4B526B]">
          Don't have an account?{" "}
          <Link to="/onboarding/profile" className="text-[#4F6EF7] hover:underline font-medium">Start free →</Link>
        </p>
      </div>
    </div>
  );
}
