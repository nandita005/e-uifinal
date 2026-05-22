import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  Send, Paperclip, Mic, MicOff, StopCircle, Sparkles, Bot, User,
  FileText, Upload, HardDrive, Link as LinkIcon, X, Zap,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ToolCallRenderer } from "@/components/GenUI";
import { AGENT_META, type AgentKey } from "@/lib/mockData";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Chat — ESA" }] }),
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  component: ChatPage,
});

// ── Agent status bar — pulses while streaming ─────────────────────────────────
function AgentBar({ streaming }: { streaming: boolean }) {
  const [activeIdx, setActiveIdx] = useState<number[]>([]);

  useEffect(() => {
    if (!streaming) { setActiveIdx([]); return; }
    // Stagger agents lighting up
    const keys = Object.keys(AGENT_META) as AgentKey[];
    const timers: ReturnType<typeof setTimeout>[] = [];
    keys.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveIdx((p) => [...p, i]), i * 400));
    });
    return () => timers.forEach(clearTimeout);
  }, [streaming]);

  return (
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#E4E8F4] overflow-x-auto shrink-0"
         style={{ background: "rgba(247,248,252,0.95)", backdropFilter: "blur(8px)" }}>
      <span className="text-[11px] text-[#8A93B0] font-medium shrink-0 mr-1">Agents</span>
      {(Object.keys(AGENT_META) as AgentKey[]).map((k, i) => {
        const m = AGENT_META[k];
        const isActive = streaming && activeIdx.includes(i);
        return (
          <div key={k}
               className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium shrink-0 transition-all duration-300"
               style={{
                 background: isActive ? m.color + "15" : "#F0F2FA",
                 border: `1px solid ${isActive ? m.color + "55" : "#E4E8F4"}`,
                 color: isActive ? m.color : "#8A93B0",
                 transform: isActive ? "scale(1.05)" : "scale(1)",
               }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0 transition-all"
                  style={{
                    background: isActive ? m.color : "#D6DCF0",
                    boxShadow: isActive ? `0 0 8px ${m.color}` : "none",
                    animation: isActive ? "pulse 1.5s ease-in-out infinite" : "none",
                  }} />
            {m.name}
          </div>
        );
      })}
      {streaming && (
        <div className="ml-auto flex items-center gap-1.5 text-[11px] text-[#4F6EF7] font-medium shrink-0">
          <Zap className="w-3 h-3" />
          Processing
          <span className="flex gap-0.5">
            {[0,1,2].map((d) => (
              <span key={d} className="w-1 h-1 rounded-full bg-[#4F6EF7] animate-bounce"
                    style={{ animationDelay: `${d * 0.15}s` }} />
            ))}
          </span>
        </div>
      )}
    </div>
  );
}

// ── Markdown renderer ─────────────────────────────────────────────────────────
function MdText({ text }: { text: string }) {
  if (!text) return null;
  return (
    <div className="space-y-1 text-[14px] leading-[1.7]">
      {text.split("\n").map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        const html = line
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/`(.*?)`/g, "<code class='px-1.5 py-0.5 rounded-md bg-[#F0F2FA] text-[12px] font-mono text-[#4F6EF7]'>$1</code>");
        if (/^\d+\./.test(line))
          return <div key={i} className="pl-4 text-[#4B526B]" dangerouslySetInnerHTML={{ __html: html }} />;
        if (line.startsWith("- ") || line.startsWith("• "))
          return (
            <div key={i} className="pl-3 flex gap-2 text-[#4B526B]">
              <span className="text-[#4F6EF7] mt-1.5 shrink-0">▸</span>
              <span dangerouslySetInnerHTML={{ __html: html.replace(/^[-•]\s/, "") }} />
            </div>
          );
        if (line.startsWith("# ") || line.startsWith("## "))
          return <div key={i} className="font-semibold text-[#0F1117] text-[15px] mt-2" dangerouslySetInnerHTML={{ __html: html.replace(/^#+\s/, "") }} />;
        return <div key={i} className="text-[#4B526B]" dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </div>
  );
}

function ts() { return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }

// ── File modal ────────────────────────────────────────────────────────────────
function FileModal({ onClose, onAttach }: { onClose: () => void; onAttach: (n: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const opts = [
    { icon: Upload,    label: "Upload from device",  sub: "CSV, Excel, PDF, Word, PPT, JSON", fn: () => ref.current?.click() },
    { icon: HardDrive, label: "Google Drive",         sub: "Browse your Drive files",          fn: () => { onAttach("Google Drive file"); onClose(); } },
    { icon: HardDrive, label: "Dropbox",              sub: "Import from Dropbox",              fn: () => { onAttach("Dropbox file"); onClose(); } },
    { icon: LinkIcon,  label: "Paste a URL",          sub: "Fetch from any public URL",        fn: () => { const u = prompt("Enter URL:"); if (u) { onAttach(u); onClose(); } } },
    { icon: FileText,  label: "Paste text / code",    sub: "Raw text, JSON, or code",          fn: () => { onAttach("Pasted content"); onClose(); } },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative w-full max-w-sm bg-white rounded-2xl border border-[#D6DCF0] overflow-hidden"
           style={{ boxShadow: "0 20px 64px rgba(79,110,247,0.14)" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E4E8F4]">
          <span className="text-[14px] font-semibold text-[#0F1117]">Attach a file</span>
          <button onClick={onClose} className="p-1 hover:bg-[#F0F2FA] rounded-md"><X className="w-4 h-4 text-[#8A93B0]" /></button>
        </div>
        <div className="p-2">
          {opts.map((o) => { const Icon = o.icon; return (
            <button key={o.label} onClick={o.fn} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F0F2FA] transition-colors text-left">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-[#F0F2FA]">
                <Icon className="w-4 h-4 text-[#4F6EF7]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[13px] font-medium text-[#0F1117]">{o.label}</div>
                <div className="text-[11px] text-[#8A93B0]">{o.sub}</div>
              </div>
            </button>
          ); })}
        </div>
        <input ref={ref} type="file" className="hidden" accept=".csv,.xlsx,.xls,.pdf,.doc,.docx,.ppt,.pptx,.json,.txt"
               onChange={(e) => { const f = e.target.files?.[0]; if (f) { onAttach(f.name); onClose(); } }} />
      </div>
    </div>
  );
}

// ── Voice hook ────────────────────────────────────────────────────────────────
function useVoice(onResult: (t: string) => void) {
  const [listening, setListening] = useState(false);
  const rec = useRef<unknown>(null);
  const toggle = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SR) { alert("Voice input not supported. Try Chrome."); return; }
    if (listening) { (rec.current as { stop: () => void })?.stop(); setListening(false); return; }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r = new SR() as any;
    r.lang = "en-US"; r.interimResults = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    r.onresult = (e: any) => onResult(e.results[0][0].transcript);
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    rec.current = r; r.start(); setListening(true);
  }, [listening, onResult]);
  return { listening, toggle };
}

// ── Chat page ─────────────────────────────────────────────────────────────────
function ChatPage() {
  const { q } = Route.useSearch();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [showFile, setShowFile] = useState(false);
  const [sentAt, setSentAt] = useState<Record<string, string>>({});

  const { messages, sendMessage, stop, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onFinish: () => setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50),
  });

  const isStreaming = status === "streaming" || status === "submitted";
  const { listening, toggle: toggleVoice } = useVoice((t) => setInput((p) => p + (p ? " " : "") + t));

  // Auto-send query from dashboard
  useEffect(() => {
    if (q && messages.length === 0) {
      sendMessage({ role: "user", parts: [{ type: "text", text: q }] });
      setSentAt((p) => ({ ...p, auto: ts() }));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  }, [messages.length]);

  function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    const id = Date.now().toString();
    setSentAt((p) => ({ ...p, [id]: ts() }));
    sendMessage({ role: "user", parts: [{ type: "text", text: msg }] });
    setInput("");
    setFiles([]);
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <DashboardLayout title="AI Chat" hideRight>
      <div className="flex flex-col min-h-0" style={{ height: "calc(100vh - 56px)" }}>

        {/* Agent status bar */}
        <AgentBar streaming={isStreaming} />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6"
             style={{ background: "linear-gradient(160deg, #F7F8FC 0%, #EEF1FA 100%)" }}>
          <div className="max-w-3xl mx-auto space-y-6">

            {/* Empty state */}
            {messages.length === 0 && !isStreaming && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl mb-5 flex items-center justify-center"
                     style={{ background: "linear-gradient(135deg,#4F6EF7,#9B72F7)", boxShadow: "0 8px 32px rgba(79,110,247,0.3)" }}>
                  <Sparkles className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-semibold text-[#0F1117] mb-2">Ask ESA anything</h3>
                <p className="text-[14px] text-[#8A93B0] max-w-sm">
                  Strategy · Data Analysis · Market Research · Knowledge Search
                </p>
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  {["Show Q3 revenue trends", "Benchmark SaaS pricing", "Find HR leave policy", "Build GTM strategy"].map((p) => (
                    <button key={p} onClick={() => send(p)}
                            className="px-3.5 py-1.5 rounded-full text-[13px] text-[#4B526B] border border-[#E4E8F4] bg-white hover:border-[#4F6EF7] hover:text-[#4F6EF7] transition-all"
                            style={{ boxShadow: "0 1px 4px rgba(79,110,247,0.08)" }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((m, mi) => (
              <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                   style={{ animation: "fadeSlideIn 0.25s ease-out both" }}>

                {m.role === "assistant" && (
                  <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center mt-0.5"
                       style={{ background: "linear-gradient(135deg,#4F6EF7,#9B72F7)", boxShadow: "0 4px 12px rgba(79,110,247,0.3)" }}>
                    <Bot className="w-4.5 h-4.5 text-white" strokeWidth={1.5} />
                  </div>
                )}

                <div className={`max-w-[85%] min-w-0 ${m.role === "user" ? "" : "flex-1"}`}>
                  <div className={`rounded-2xl px-4 py-3.5 ${
                    m.role === "user"
                      ? "text-white rounded-tr-sm"
                      : "bg-white rounded-tl-sm"
                  }`}
                  style={m.role === "user"
                    ? { background: "linear-gradient(135deg,#4F6EF7,#6B82F7)", boxShadow: "0 4px 16px rgba(79,110,247,0.25)" }
                    : { boxShadow: "0 2px 12px rgba(79,110,247,0.08)", border: "1px solid rgba(79,110,247,0.1)" }}>

                    {m.role === "user" ? (
                      <p className="text-[14px] leading-[1.6]">
                        {m.parts.filter((p) => p.type === "text").map((p) => (p as { type: "text"; text: string }).text).join("")}
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {m.parts.map((part, pi) => {
                          const p = part as Record<string, unknown>;
                          if (p.type === "text") {
                            const text = p.text as string;
                            return text ? <MdText key={pi} text={text} /> : null;
                          }
                          if (typeof p.type === "string" && p.type.startsWith("tool-")) {
                            const toolName = (p.toolName ?? p.title) as string;
                            const state = p.state as string;
                            const result = p.output ?? p.result;
                            return state === "output"
                              ? <ToolCallRenderer key={pi} toolName={toolName} result={result} />
                              : (
                                <div key={pi} className="rounded-xl p-3 flex items-center gap-2.5"
                                     style={{ background: "rgba(79,110,247,0.06)", border: "1px solid rgba(79,110,247,0.15)" }}>
                                  <Sparkles className="w-4 h-4 text-[#4F6EF7] animate-spin shrink-0" />
                                  <span className="text-[13px] text-[#4F6EF7] font-medium">
                                    Generating {String(toolName ?? "").replace("show","").replace(/([A-Z])/g," $1").trim()}…
                                  </span>
                                </div>
                              );
                          }
                          return null;
                        })}
                      </div>
                    )}

                    <div className={`text-[11px] mt-2 ${m.role === "user" ? "text-white/60 text-right" : "text-[#8A93B0]"}`}>
                      {sentAt[m.id] ?? ts()}
                    </div>
                  </div>
                </div>

                {m.role === "user" && (
                  <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center mt-0.5 text-white"
                       style={{ background: "linear-gradient(135deg,#4F6EF7,#9B72F7)" }}>
                    <User className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                )}
              </div>
            ))}

            {/* Streaming indicator */}
            {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-3 justify-start" style={{ animation: "fadeSlideIn 0.2s ease-out both" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                     style={{ background: "linear-gradient(135deg,#4F6EF7,#9B72F7)", boxShadow: "0 4px 12px rgba(79,110,247,0.3)" }}>
                  <Bot className="w-4.5 h-4.5 text-white" strokeWidth={1.5} />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-2"
                     style={{ boxShadow: "0 2px 12px rgba(79,110,247,0.08)", border: "1px solid rgba(79,110,247,0.1)" }}>
                  <span className="text-[13px] text-[#8A93B0]">ESA is thinking</span>
                  {[0,1,2].map((d) => (
                    <span key={d} className="w-1.5 h-1.5 rounded-full bg-[#4F6EF7] animate-bounce"
                          style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input bar */}
        <div className="border-t border-[#E4E8F4] px-4 sm:px-6 py-4 shrink-0"
             style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)" }}>
          <div className="max-w-3xl mx-auto">
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {files.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[12px] font-medium text-[#4F6EF7]"
                        style={{ background: "rgba(79,110,247,0.07)", border: "1px solid rgba(79,110,247,0.2)" }}>
                    <FileText className="w-3 h-3" />
                    {f.length > 28 ? f.slice(0, 25) + "…" : f}
                    <button onClick={() => setFiles((a) => a.filter((_, j) => j !== i))} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            )}

            <div className="rounded-2xl border border-[#D6DCF0] bg-white transition-all"
                 style={{ boxShadow: "0 4px 24px rgba(79,110,247,0.10)" }}>
              <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey}
                placeholder="Ask ESA anything about your business..."
                rows={1} className="w-full resize-none bg-transparent border-0 outline-none text-[15px] text-[#0F1117] placeholder:text-[#8A93B0] px-4 pt-3.5 pb-1 min-h-[52px] max-h-[160px]"
                style={{ fieldSizing: "content" } as React.CSSProperties} />
              <div className="flex items-center justify-between px-3 pb-3">
                <div className="flex items-center gap-1 text-[#8A93B0]">
                  <button type="button" onClick={() => setShowFile(true)}
                          className="p-1.5 hover:bg-[#F0F2FA] rounded-lg transition-colors" title="Attach file">
                    <Paperclip className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <button type="button" onClick={toggleVoice}
                          className={`p-1.5 rounded-lg transition-colors ${listening ? "bg-red-50 text-red-500" : "hover:bg-[#F0F2FA]"}`}
                          title={listening ? "Stop" : "Voice input"}>
                    {listening ? <MicOff className="w-4 h-4" strokeWidth={1.5} /> : <Mic className="w-4 h-4" strokeWidth={1.5} />}
                  </button>
                  {listening && <span className="text-[11px] text-red-500 font-medium animate-pulse ml-1">Listening…</span>}
                  <div className="flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-lg text-[11px] font-medium"
                       style={{ background: "rgba(79,110,247,0.06)", border: "0.5px solid rgba(79,110,247,0.2)" }}>
                    <Sparkles className="w-3 h-3 text-[#4F6EF7]" />
                    <span className="text-[#4F6EF7]">ESA · OpenRouter</span>
                  </div>
                </div>
                {isStreaming
                  ? <button type="button" onClick={stop}
                            className="w-9 h-9 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all"
                            style={{ boxShadow: "0 4px 12px rgba(239,68,68,0.3)" }}>
                      <StopCircle className="w-4 h-4" />
                    </button>
                  : <button type="button" onClick={() => send()} disabled={!input.trim() && files.length === 0}
                            className="w-9 h-9 rounded-xl text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            style={{ background: "linear-gradient(135deg,#4F6EF7,#6B82F7)", boxShadow: "0 4px 12px rgba(79,110,247,0.3)" }}>
                      <Send className="w-4 h-4" />
                    </button>}
              </div>
            </div>
            <p className="text-center text-[11px] text-[#8A93B0] mt-2">
              <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-[#F0F2FA] border border-[#E4E8F4]">Enter</kbd> to send ·{" "}
              <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-[#F0F2FA] border border-[#E4E8F4]">Shift+Enter</kbd> for new line
            </p>
          </div>
        </div>
      </div>

      {showFile && <FileModal onClose={() => setShowFile(false)} onAttach={(n) => setFiles((a) => [...a, n])} />}
    </DashboardLayout>
  );
}
