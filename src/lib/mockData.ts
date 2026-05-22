// ESA Mock Data Layer
export const AGENT_META = {
  strategy: { name: "Strategy", color: "#4A6CF7", icon: "TrendingUp", desc: "Business strategies, GTM plans, competitive analysis" },
  data: { name: "Data Analyst", color: "#0FC4A7", icon: "BarChart2", desc: "Statistical analysis, pattern detection, charts" },
  search: { name: "Search", color: "#9B72F7", icon: "Search", desc: "Semantic search across internal documents" },
  research: { name: "Research", color: "#F7924A", icon: "Globe", desc: "External market research, competitor benchmarks" },
} as const;

export type AgentKey = keyof typeof AGENT_META;
export type QueryType = "default" | "data" | "strategy" | "research" | "esa" | "search";

export const MOCK_USER = {
  id: "usr_001",
  name: "Arjun Mehta",
  initials: "AM",
  email: "arjun.mehta@acmecorp.com",
  role: "Admin",
  designation: "VP of Strategy",
  industry: "SaaS",
  country: "India",
  plan: "Growth",
  workspace: "Acme Strategy Hub",
  joinedAt: "2024-09-15",
  lastActive: "2026-05-20T14:32:00Z",
  queriesThisMonth: 142,
  reportsGenerated: 28,
  agentsUsed: ["strategy", "data", "search", "research"] as AgentKey[],
};

export const MOCK_TEAM = [
  { id: "usr_001", name: "Arjun Mehta", initials: "AM", email: "arjun.mehta@acmecorp.com", role: "Admin", team: "Strategy", status: "Active", lastActive: "2 min ago" },
  { id: "usr_002", name: "Priya Nair", initials: "PN", email: "priya.nair@acmecorp.com", role: "Analyst", team: "Analytics", status: "Active", lastActive: "1 hour ago" },
  { id: "usr_003", name: "Rohan Sharma", initials: "RS", email: "rohan.sharma@acmecorp.com", role: "Viewer", team: "Finance", status: "Active", lastActive: "yesterday" },
  { id: "usr_004", name: "Meera Iyer", initials: "MI", email: "meera@acmecorp.com", role: "Researcher", team: "Market Intel", status: "Active", lastActive: "3 hours ago" },
  { id: "usr_005", name: "Karan Bose", initials: "KB", email: "karan@acmecorp.com", role: "Analyst", team: "Analytics", status: "Pending", lastActive: "—" },
];

export const MOCK_SESSIONS = [
  { id: "sess_001", title: "Q3 Revenue Analysis & Forecast", time: "10:15 AM", group: "Today", agents: ["strategy", "data"] as AgentKey[], queryType: "default" as QueryType },
  { id: "sess_002", title: "Q4 GTM Strategy — Enterprise Play", time: "Yesterday", group: "Yesterday", agents: ["strategy", "data", "research"] as AgentKey[], queryType: "strategy" as QueryType },
  { id: "sess_003", title: "HR Leave Policy — Remote Work Rules", time: "May 19", group: "Last 7 days", agents: ["search"] as AgentKey[], queryType: "search" as QueryType },
  { id: "sess_004", title: "Deep Research: India SaaS 2027", time: "May 17", group: "Last 7 days", agents: ["research"] as AgentKey[], queryType: "research" as QueryType },
  { id: "sess_005", title: "Churn Drivers Analysis — H1 2026", time: "May 12", group: "Last 7 days", agents: ["data", "strategy"] as AgentKey[], queryType: "data" as QueryType },
  { id: "sess_006", title: "ESA Gap Analysis — Compliance Q2", time: "May 10", group: "Last 7 days", agents: ["strategy", "data", "search", "research"] as AgentKey[], queryType: "esa" as QueryType },
];

export const MOCK_RECENT = MOCK_SESSIONS.slice(0, 5);

export const MOCK_DATA_SOURCES = [
  { id: "ds_1", name: "Q3_Revenue_2026.xlsx", type: "Excel", status: "Active", lastSync: "2 hours ago", size: "2.4 MB" },
  { id: "ds_2", name: "Salesforce CRM", type: "Cloud", status: "Syncing", lastSync: "syncing now", size: "184 MB" },
  { id: "ds_3", name: "HR Policy Drive", type: "Google Drive", status: "Active", lastSync: "1 day ago", size: "42 MB" },
  { id: "ds_4", name: "Snowflake — Analytics DW", type: "Database", status: "Active", lastSync: "5 min ago", size: "1.2 GB" },
  { id: "ds_5", name: "Market_Research_Q2.pdf", type: "PDF", status: "Active", lastSync: "1 week ago", size: "8.1 MB" },
];

export const MOCK_REPORTS = [
  { id: "r1", title: "Q3 Revenue Performance & Q4 Forecast", time: "2 hours ago", type: "PDF", agents: ["strategy", "data"] as AgentKey[] },
  { id: "r2", title: "Competitor Matrix — CRM Vendors", time: "yesterday", type: "PPT", agents: ["research"] as AgentKey[] },
  { id: "r3", title: "Churn Cohort Analysis — H1", time: "3 days ago", type: "PDF", agents: ["data"] as AgentKey[] },
  { id: "r4", title: "Pricing Benchmark — APAC SaaS", time: "1 week ago", type: "PPT", agents: ["research", "strategy"] as AgentKey[] },
  { id: "r5", title: "Customer NPS Trends", time: "2 weeks ago", type: "CSV", agents: ["data"] as AgentKey[] },
];

export const MOCK_METRICS = {
  today: { queries: 18, reports: 4, agents: 3, avg: "2.8s" },
  month: {
    totalQueries: 312, totalReports: 47, activeUsers: 12, avgResponse: "2.8s",
    queryTrend: [22,18,31,27,34,28,40,35,38,29,44,47,42,39,51,46,48,43,55,49,52],
  },
};

export const MOCK_CHART_REVENUE = [
  { month: "Jul", revenue: 48.2, target: 45 },
  { month: "Aug", revenue: 53.7, target: 50 },
  { month: "Sep", revenue: 61.4, target: 58 },
];

export const MOCK_CHART_CHURN = [
  { month: "Jan", churn: 3.2 }, { month: "Feb", churn: 2.8 }, { month: "Mar", churn: 2.5 },
  { month: "Apr", churn: 2.9 }, { month: "May", churn: 2.1 },
];

export const MOCK_AGENT_USAGE = [
  { agent: "Strategy", value: 34, color: "#4A6CF7" },
  { agent: "Data", value: 28, color: "#0FC4A7" },
  { agent: "Research", value: 22, color: "#F7924A" },
  { agent: "Search", value: 16, color: "#9B72F7" },
];

export const MOCK_REGION_REVENUE = [
  { region: "North America", value: 184 },
  { region: "Europe", value: 142 },
  { region: "India", value: 98 },
  { region: "APAC", value: 76 },
  { region: "LATAM", value: 38 },
];

export const MOCK_COMPETITORS = [
  { name: "Acme (You)", price: "$49", users: "Unlimited", api: true, sso: true, nps: 62, isYou: true },
  { name: "Salesforce", price: "$165", users: "Per seat", api: true, sso: true, nps: 41 },
  { name: "HubSpot", price: "$90", users: "Per seat", api: true, sso: true, nps: 54 },
  { name: "Zoho CRM", price: "$35", users: "Per seat", api: true, sso: false, nps: 48 },
  { name: "Pipedrive", price: "$29", users: "Per seat", api: false, sso: false, nps: 51 },
];

export const SUGGESTED_PROMPTS = [
  "Show Q3 revenue trends",
  "Find HR leave policy",
  "Benchmark SaaS pricing",
  "Analyze churn drivers",
  "Forecast Q4 revenue",
  "Summarize last 5 reports",
];

export const MOCK_AUDIT = [
  { time: "2026-05-21 14:32:01", user: "Arjun Mehta", action: "Query", module: "AI Chat", ip: "203.0.113.42", status: "Success" },
  { time: "2026-05-21 14:18:44", user: "Priya Nair", action: "Upload", module: "Data Sources", ip: "203.0.113.18", status: "Success" },
  { time: "2026-05-21 13:55:12", user: "Arjun Mehta", action: "Report Download", module: "Reports", ip: "203.0.113.42", status: "Success" },
  { time: "2026-05-21 12:40:09", user: "Rohan Sharma", action: "Login", module: "Auth", ip: "203.0.113.81", status: "Success" },
  { time: "2026-05-21 11:22:31", user: "Karan Bose", action: "Role Change", module: "Team", ip: "203.0.113.42", status: "Success" },
  { time: "2026-05-21 10:15:00", user: "Arjun Mehta", action: "Config Change", module: "LLM Settings", ip: "203.0.113.42", status: "Success" },
];

export const MOCK_INVOICES = [
  { id: "INV-2026-05", date: "May 1, 2026", plan: "Growth (Annual)", amount: "₹95,990", status: "Paid" },
  { id: "INV-2026-04", date: "Apr 1, 2026", plan: "Growth", amount: "₹9,999", status: "Paid" },
  { id: "INV-2026-03", date: "Mar 1, 2026", plan: "Growth", amount: "₹9,999", status: "Paid" },
];
