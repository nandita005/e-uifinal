import "./lib/error-capture";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { streamText, stepCountIs } from "ai";
import { tool } from "@ai-sdk/provider-utils";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;
async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), { status: 500, headers: { "content-type": "text/html; charset=utf-8" } });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try { payload = JSON.parse(body); } catch { return false; }
  if (!payload || Array.isArray(payload) || typeof payload !== "object") return false;
  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) return false;
  return fields.unhandled === true && fields.message === "HTTPError" && (fields.status === undefined || fields.status === responseStatus);
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;
  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) return response;
  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

async function handleChatAPI(request: Request): Promise<Response> {
  if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
  try {
    const body = await request.json();
    const rawMessages = body.messages ?? [];
    // Convert UIMessage parts[] format to OpenAI-compatible messages
    const messages = rawMessages.map((m: Record<string, unknown>) => {
      if (Array.isArray(m.parts)) {
        const textContent = (m.parts as Array<Record<string, unknown>>)
          .filter((p) => p.type === "text")
          .map((p) => p.text as string)
          .join("");
        return { role: m.role, content: textContent };
      }
      return { role: m.role, content: m.content ?? "" };
    });
    const tools = {
      showMetricCards: tool({ description: "Display KPI metric cards", inputSchema: z.object({ title: z.string(), metrics: z.array(z.object({ label: z.string(), value: z.string(), trend: z.string().optional(), trendUp: z.boolean().optional(), color: z.string().optional() })) }) }),
      showLineChart: tool({ description: "Display a line chart", inputSchema: z.object({ title: z.string(), xKey: z.string(), lines: z.array(z.object({ key: z.string(), label: z.string(), color: z.string() })), data: z.array(z.record(z.union([z.string(), z.number()]))) }) }),
      showBarChart: tool({ description: "Display a bar chart", inputSchema: z.object({ title: z.string(), xKey: z.string(), bars: z.array(z.object({ key: z.string(), label: z.string(), color: z.string() })), data: z.array(z.record(z.union([z.string(), z.number()]))) }) }),
      showTable: tool({ description: "Display a comparison table", inputSchema: z.object({ title: z.string(), headers: z.array(z.string()), rows: z.array(z.array(z.string())), highlightRow: z.number().optional() }) }),
      showInsightCard: tool({ description: "Display a strategic insight card", inputSchema: z.object({ type: z.enum(["insight", "warning", "opportunity", "action"]), title: z.string(), body: z.string(), actions: z.array(z.string()).optional() }) }),
    };
    const system = `You are ESA (Enterprise Strategy Agent). Use tools to render rich UI: showMetricCards for KPIs, showLineChart/showBarChart for trends, showTable for comparisons, showInsightCard for recommendations. Always use tools to present data visually. Be concise and actionable.`;

    // Use OpenRouter as primary (handles quota automatically across providers)
    const openrouter = createOpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });
    const result = streamText({
      model: openrouter("google/gemini-2.0-flash-001"),
      stopWhen: stepCountIs(3),
      system,
      messages,
      tools,
    });
    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error("[/api/chat]", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500, headers: { "content-type": "application/json" } });
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);
    if (url.pathname === "/api/chat") return handleChatAPI(request);
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
