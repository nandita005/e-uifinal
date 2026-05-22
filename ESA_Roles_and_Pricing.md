# ESA — Roles, UI Access & Pricing Reference

---

## 1. The 5 Roles

| Role | Scope |
|---|---|
| **Super Admin** | Organization-wide |
| **Admin** | Workspace / Team |
| **Analyst** | Team |
| **Researcher** | Team |
| **Viewer** | Team |

> **Note:** RBAC is only available on Team plans. Individual plan subscribers get a single user account with no role management.

---

## 2. UI Access by Role

### Super Admin
Full access to everything across the organization.

- Create and manage Workspaces
- Invite users and assign any role
- Configure LLM API keys
- Generate and manage ESA API keys
- View all Audit Logs (all teams, all workspaces)
- Upload datasets and run AI queries
- Download reports
- Manage Billing and subscription plans
- Delete data sources

### Admin
Manages a specific workspace or team. Cannot touch billing.

- Invite users and assign roles (within their workspace)
- Configure LLM API keys
- Generate and manage ESA API keys
- View Audit Logs (team-level)
- Upload datasets and run AI queries
- Configure Data Sources (file uploads, cloud drives, database connectors)
- Delete data sources
- Create teams and assign members
- Download reports
- **Cannot:** Create new Workspaces or manage Billing

### Analyst
Focuses on data analysis tasks. No admin controls.

- Upload datasets (CSV, Excel, JSON, PDF, Word, PPT)
- Run AI queries (all agents)
- Generate reports and download exports (PDF, PPT, CSV, PNG)
- **Cannot:** Invite users, configure LLM keys, generate API keys, view Audit Logs, delete data sources

### Researcher
Focused on market research and external intelligence.

- Run AI queries (all agents, including Research Agent)
- View and export research reports
- Download reports
- **Cannot:** Upload datasets, invite users, configure LLM keys, generate API keys, view Audit Logs

### Viewer
Read-only access. No query or upload capability.

- View shared insights, reports, and charts
- Download reports that have already been generated
- **Cannot:** Run AI queries, upload data, invite users, configure anything

---

## 3. RBAC Permission Matrix

| Action | Super Admin | Admin | Analyst | Researcher | Viewer |
|---|:---:|:---:|:---:|:---:|:---:|
| Create Workspace | ✅ | ❌ | ❌ | ❌ | ❌ |
| Invite Users | ✅ | ✅ | ❌ | ❌ | ❌ |
| Assign Roles | ✅ | ✅ | ❌ | ❌ | ❌ |
| Upload Datasets | ✅ | ✅ | ✅ | ❌ | ❌ |
| Run AI Queries | ✅ | ✅ | ✅ | ✅ | ❌ |
| Configure LLM Keys | ✅ | ✅ | ❌ | ❌ | ❌ |
| Generate API Keys | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Audit Logs | ✅ (all) | ✅ (team) | ❌ | ❌ | ❌ |
| Download Reports | ✅ | ✅ | ✅ | ✅ | ✅ |
| Manage Billing | ✅ | ❌ | ❌ | ❌ | ❌ |
| Delete Data Sources | ✅ | ✅ | ❌ | ❌ | ❌ |

---

## 4. Pricing

### Plan Tiers

| Plan | Target | Key Features | INR / month | USD / month |
|---|---|---|---|---|
| **Starter** | SMBs & Individuals | 1 Workspace, 3 Users, 100 queries/month, 2 data sources, Default LLM only | ₹2,999 | $35 |
| **Growth** | Growing Teams | 3 Workspaces, 25 Users, 1,000 queries/month, 10 data sources, Custom LLM support | ₹9,999 | $119 |
| **Enterprise** | Large Orgs | Unlimited Workspaces, Users & Queries, all integrations, SAML SSO, Priority Support | Custom — Contact Sales | Custom — Contact Sales |
| **Trial** | All new users | 14-day free trial of Growth plan | Free | Free |

### Billing Notes

- Currency is **auto-detected by user location** with a manual INR / USD toggle; preference is saved to account settings.
- **Annual billing** gives a **20% discount** on monthly prices.
- Payment methods: Credit/Debit Card, UPI (INR), Net Banking (INR), Stripe (USD).
- INR invoices include GST details; all invoices are downloadable as PDF.
- Plan changes (upgrade or downgrade) take effect immediately with prorated billing.
- Cancellation retains access until the end of the current billing period.
- RBAC (multi-user roles) is **only available on Growth and Enterprise plans**.
