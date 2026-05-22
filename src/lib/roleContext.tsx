import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type ESARole = "super_admin" | "admin" | "analyst" | "researcher" | "viewer";

export interface RoleUser {
  name: string;
  email: string;
  initials: string;
  role: ESARole;
  workspace: string;
  plan: string;
}

const DEFAULT_USER: RoleUser = {
  name: "Arjun Mehta",
  email: "arjun.mehta@acmecorp.com",
  initials: "AM",
  role: "admin",
  workspace: "Acme Strategy Hub",
  plan: "Growth",
};

interface RoleContextType {
  user: RoleUser;
  setUser: (u: RoleUser) => void;
  can: (action: Permission) => boolean;
}

export type Permission =
  | "create_workspace"
  | "invite_users"
  | "assign_roles"
  | "upload_datasets"
  | "run_queries"
  | "configure_llm"
  | "generate_api_keys"
  | "view_audit_logs"
  | "download_reports"
  | "manage_billing"
  | "delete_data_sources"
  | "view_analytics";

const PERMISSIONS: Record<ESARole, Permission[]> = {
  super_admin: [
    "create_workspace","invite_users","assign_roles","upload_datasets","run_queries",
    "configure_llm","generate_api_keys","view_audit_logs","download_reports",
    "manage_billing","delete_data_sources","view_analytics",
  ],
  admin: [
    "invite_users","assign_roles","upload_datasets","run_queries",
    "configure_llm","generate_api_keys","view_audit_logs","download_reports",
    "delete_data_sources","view_analytics",
  ],
  analyst: ["upload_datasets","run_queries","download_reports"],
  researcher: ["run_queries","download_reports"],
  viewer: ["download_reports"],
};

const RoleContext = createContext<RoleContextType>({
  user: DEFAULT_USER,
  setUser: () => {},
  can: () => false,
});

export function RoleProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<RoleUser>(() => {
    try {
      const stored = localStorage.getItem("esa_user");
      return stored ? JSON.parse(stored) : DEFAULT_USER;
    } catch { return DEFAULT_USER; }
  });

  function setUser(u: RoleUser) {
    setUserState(u);
    localStorage.setItem("esa_user", JSON.stringify(u));
  }

  function can(action: Permission): boolean {
    return PERMISSIONS[user.role]?.includes(action) ?? false;
  }

  return <RoleContext.Provider value={{ user, setUser, can }}>{children}</RoleContext.Provider>;
}

export function useRole() {
  return useContext(RoleContext);
}

export const ROLE_LABELS: Record<ESARole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  analyst: "Analyst",
  researcher: "Researcher",
  viewer: "Viewer",
};

export const ROLE_COLORS: Record<ESARole, string> = {
  super_admin: "#DC2626",
  admin: "#4F6EF7",
  analyst: "#0FC4A7",
  researcher: "#F7924A",
  viewer: "#9B72F7",
};
