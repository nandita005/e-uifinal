# ESA — Enterprise Strategy Agent
## Complete Lovable.dev UI Design Prompt
### Version 1.0 | Full-Stack Specification

---

## 🧠 MASTER BRIEF

Build a **production-grade, multi-page enterprise SaaS web application** called **ESA (Enterprise Strategy Agent)** — an AI-first business intelligence platform. The app lets enterprise users query business data, internal knowledge, and external market research through a single conversational interface powered by 4 specialized AI agents.

This prompt covers **every page, every component, every interaction state** of the application. Build each screen with pixel-level precision. Do not invent components not listed. Do not omit any component listed.

---

## 🎨 DESIGN SYSTEM — GLOBAL

### Typography
- **Primary Font:** Inter (Google Fonts)
- **Display Font:** Cal Sans or Sora — used for hero headlines and large titles only
- **Mono Font:** JetBrains Mono — used for API keys, code snippets, log timestamps
- **Base size:** 14px body, 13px secondary, 12px captions
- **Weight scale:** 400 regular · 500 medium · 600 semibold · 700 bold
- **Line height:** 1.6 for body, 1.2 for headings
- **Letter spacing:** −0.02em for headings, 0 for body

### Color Palette

#### Light Theme (Primary — Default)
```
Background Primary:     #F7F8FC   (soft white, main canvas — use gradient: linear-gradient(135deg, #F7F8FC 0%, #EEF1FA 50%, #F0F4FF 100%))
Background Secondary:   #FFFFFF   (card surfaces — pure white with subtle shadow)
Background Tertiary:    #F0F2FA   (elevated surfaces, modals — very light blue-white)
Background Hover:       #E8ECFA   (interactive hover state)
Border Subtle:          #E4E8F4   (0.5px dividers)
Border Default:         #D6DCF0   (cards, inputs)
Border Emphasis:        #A0AEDE   (focused states)

Text Primary:           #0F1117   (headings, labels)
Text Secondary:         #4B526B   (descriptions, muted)
Text Tertiary:          #8A93B0   (placeholders, hints)

Accent Blue:            #4F6EF7   (primary CTAs, links)
Accent Blue Hover:      #3D5BE8   (CTA hover)
Accent Blue Glow:       rgba(79, 110, 247, 0.12)  (glow/shadow on CTA)

Agent Strategy (Navy):  #4A6CF7   (Strategy Agent identity)
Agent Data (Teal):      #0FC4A7   (Data Analyst Agent)
Agent Search (Purple):  #9B72F7   (Search Agent)
Agent Research (Amber): #F7924A   (Research Agent)

Success:                #16A34A
Warning:                #D97706
Danger:                 #DC2626
Info:                   #0284C7
```

**Global Background Rule:** Every page canvas uses `background: linear-gradient(135deg, #F7F8FC 0%, #EEF1FA 55%, #F0F4FF 100%)` as the base. This gradient is fixed/non-scrolling (`background-attachment: fixed`). Cards and panels sit on top as white (`#FFFFFF`) or near-white (`#F0F2FA`) surfaces with `box-shadow` for depth — never solid dark fills.

#### Dark Theme (Secondary — Toggle available)
```
Background Primary:     #0A0B0E
Background Secondary:   #111318
Background Tertiary:    #1A1D24
Border Default:         #2A2F3E
Text Primary:           #F0F2F8
Text Secondary:         #8B93A8
Accent Blue:            #4F6EF7
```

### Texture & Depth System
- **Glass morphism cards:** `background: rgba(255,255,255,0.72); backdrop-filter: blur(16px); border: 0.5px solid rgba(255,255,255,0.9); box-shadow: 0 2px 20px rgba(79,110,247,0.06);`
- **Glow halos on active agent chips:** `box-shadow: 0 0 14px rgba([agent-color], 0.25)`
- **Subtle mesh gradient on hero:** Use a radial gradient with 2 accent color blobs — Accent Blue at 8% opacity top-left and Agent Research Amber at 5% opacity bottom-right, layered over the light gradient canvas
- **Card depth levels (light theme):**
  - Level 0 (flat): No shadow, `border: 0.5px solid #D6DCF0` only, bg `#FFFFFF`
  - Level 1 (raised): `background: #FFFFFF; box-shadow: 0 1px 6px rgba(79,110,247,0.07), 0 0 0 0.5px #E4E8F4`
  - Level 2 (floating): `background: #FFFFFF; box-shadow: 0 4px 24px rgba(79,110,247,0.10), 0 1px 4px rgba(0,0,0,0.06)`
  - Level 3 (modal): `background: #FFFFFF; box-shadow: 0 20px 64px rgba(79,110,247,0.14), 0 4px 16px rgba(0,0,0,0.08)`

### Spacing Scale
4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96px

### Border Radius Scale
- Inputs, small chips: `6px`
- Buttons, badges: `8px`
- Cards: `12px`
- Large cards, panels: `16px`
- Modals: `20px`
- Pills, toggles: `999px`

### Motion & Animation
- **Transition default:** `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`
- **Card hover lift:** `transform: translateY(-3px); box-shadow: 0 12px 36px rgba(79,110,247,0.13)` — smooth spring feel
- **Card entry (on mount/scroll-into-view):** `opacity(0→1) + translateY(16px→0)` at 300ms ease-out. Use `IntersectionObserver` to trigger on scroll. Stagger sibling cards by 60ms each.
- **CTA pulse:** Keyframe `box-shadow` pulse on primary CTA at 3s intervals — expands from `0 0 0 0 rgba(79,110,247,0.3)` to `0 0 0 12px rgba(79,110,247,0)` 
- **Agent badge entry:** `fadeIn + scale(0.88→1)` at 100ms stagger per badge, with a slight `translateY(4px→0)` for bounce feel
- **Processing dots:** Three dots with staggered `scale(1→1.4→1) + opacity` keyframes (0.28s each, offset 0.1s)
- **Skeleton loading:** Shimmer animation left-to-right at 1.4s using light gradient: `linear-gradient(90deg, #F0F2FA 25%, #E4E8F7 50%, #F0F2FA 75%)`
- **Modal open:** `scale(0.95→1) + opacity(0→1)` at 220ms cubic-bezier(0.34, 1.56, 0.64, 1) (slight overshoot spring)
- **Modal backdrop:** `opacity(0→1)` at 180ms
- **Page transitions:** `opacity(0→1) + translateY(8px→0)` at 200ms ease-out on route change
- **Sidebar collapse/expand:** `width` transition at 260ms cubic-bezier(0.4, 0, 0.2, 1); icon labels `opacity(1→0)` at 120ms
- **Input focus expand:** On textarea focus in chat, box softly grows `min-height: 48px → 72px` at 180ms ease
- **Suggested prompt chips hover:** `translateY(-1px) + border-color` shift at 140ms
- **Chat message entry:** User bubble `slideIn from right + fadeIn` at 180ms; ESA response `fadeIn + translateY(6px→0)` at 240ms
- **Generative UI component reveal:** Each component block fades in sequentially — `opacity(0→1) + translateY(12px→0)` at 280ms, staggered 150ms apart as agents complete
- **Right panel agent pulse:** Active agent row pulses with `box-shadow: 0 0 0 0 → 0 0 0 6px rgba([color],0)` ring animation, 1.8s loop
- **Scroll-linked nav bar:** On scroll > 40px, nav bar `background` transitions from fully transparent to `rgba(247,248,252,0.92)` with `backdrop-filter: blur(20px)` and a soft bottom border — smooth 200ms crossfade
- **Responsive layout shift:** All 3-to-1 column collapses (cards, panels, grids) animate with `gap` and `padding` transitions at 240ms so the reflow feels intentional, not jarring

### Iconography
Use **Lucide React** icon set exclusively. Size 16px inline, 20px standalone, 24px feature icons. Stroke width 1.5. Never filled variants.

---

## 📄 PAGE 1 — LANDING PAGE

### URL: `/`
### Layout: Full-width, scroll-based sections

---

### SECTION 1.1 — TOP NAVIGATION BAR
**Position:** Fixed top, full-width, z-index 100
**Height:** 60px
**Background:** `rgba(247,248,252,0.0)` on load (transparent), transitions to `rgba(247,248,252,0.92)` with `backdrop-filter: blur(20px)` and `border-bottom: 0.5px solid #E4E8F4` after 40px scroll (scroll-linked animation, 200ms crossfade)

**Left:** ESA logomark (abstract neural/spark SVG icon in Accent Blue) + wordmark "ESA" in Cal Sans 600 20px Text Primary

**Center:** Navigation links — `Home` · `Features` · `Pricing` · `Docs` · `Login`
- Style: 14px Inter 400, Text Secondary (`#4B526B`)
- Hover: Text Primary (`#0F1117`), transition 150ms
- Active: Text Primary + 2px Accent Blue underline
- Gap between links: 32px

**Right:**
- `Log In` button — ghost style: `border: 0.5px solid #D6DCF0`, transparent bg, Text Secondary, hover bg `#F0F2FA`, 36px height, 14px, border-radius 8px, px 16px
- `Start Free Trial` button — filled: `background: #4F6EF7`, Text white, 36px height, 14px 500, border-radius 8px, px 20px. Add glow: `box-shadow: 0 0 20px rgba(79,110,247,0.22)`. Hover: bg #3D5BE8, glow intensifies
- Gap: 12px between buttons

**Mobile (< 768px):** Hamburger menu icon replaces center nav. Slide-down drawer.

---

### SECTION 1.2 — HERO
**Height:** 100vh minimum, vertically centered content
**Background:** `linear-gradient(135deg, #F7F8FC 0%, #EEF1FA 55%, #F0F4FF 100%)` fixed. Mesh overlay: two radial blobs — Accent Blue at 10% opacity top-left (`radial-gradient(ellipse 600px 400px at 15% 20%, rgba(79,110,247,0.10) 0%, transparent 70%)`), Agent Research Amber at 6% opacity bottom-right (`radial-gradient(ellipse 500px 350px at 85% 80%, rgba(247,146,74,0.06) 0%, transparent 70%)`). Both layered via `background` shorthand or pseudo-elements.

**Content (max-width 760px, centered):**

**Pre-headline badge:** Small pill chip — `background: rgba(79,110,247,0.1); border: 0.5px solid rgba(79,110,247,0.3)` — text: "✦ AI-First Enterprise Intelligence" in 12px Accent Blue 500

**Main Headline (H1):**
```
AI-powered enterprise
intelligence, one interface
```
Font: Cal Sans or Sora, 64px desktop / 40px mobile, weight 700, Text Primary (`#0F1117`), line-height 1.1, letter-spacing −0.03em. Word "intelligence" has gradient text: `background: linear-gradient(135deg, #4F6EF7, #0FC4A7); -webkit-background-clip: text; color: transparent`

**Subheadline:**
"Strategy. Data. Research. Search. All in one query."
Font: Inter 400, 20px desktop / 16px mobile, Text Secondary, line-height 1.5. Max-width 560px.

**CTA Row (gap 12px, centered):**
1. `Launch / Trial Now` — Primary CTA button, height 48px, px 28px, bg #4F6EF7, white text, 16px 500, border-radius 10px. Pulsing glow keyframe animation. Icon: `<ArrowRight>` 16px right-aligned.
2. `Watch Demo` — Ghost button, height 48px, px 24px, border `0.5px solid #D6DCF0`, Text Primary, 15px 400, border-radius 10px. Hover: bg `#F0F2FA`. Icon: `<Play>` 16px filled-circle style left.

**Social trust row (margin-top 40px):**
Small avatars (5 circles, 28px, overlapping by −8px, placeholder gradient fills) + text "Trusted by 500+ enterprise teams" in 13px Text Secondary

**Hero Visual — Architecture Flow Diagram (Adya-style, Full Section):**

Below the CTA row, render a full-width architecture visualization that shows the ESA platform as a live orchestration diagram — inspired by the reference design. This is NOT a simple illustration; it is a 3-column interactive graphic that communicates the platform architecture at a glance.

**Layout:** 3 equal-width columns, gap 0, max-width 1100px, centered, padding-top 56px. Each column is a card with `background: rgba(255,255,255,0.72); backdrop-filter: blur(16px); border: 0.5px solid rgba(255,255,255,0.9); box-shadow: 0 2px 20px rgba(79,110,247,0.06)`. Column border-radius 16px (outer columns) and 0 (middle column to flow into neighbors as one unit).

**Column 1 — "Your Brief" (Input side):**
- Header: "Your Brief" — 18px 600 Cal Sans Text Primary, centered, padding 20px
- Body: A mock chat input card — `background: rgba(79,110,247,0.06); border: 0.5px solid rgba(79,110,247,0.18); border-radius: 12px; padding: 14px 16px`
  - Blinking cursor + typing animation cycling through 3 example briefs every 4s:
    - "Build me a fraud-detection agent for our bank"
    - "Benchmark our SaaS pricing against competitors"
    - "Analyze Q3 revenue and forecast Q4"
  - Text: 14px Text Primary, typing speed: 45ms per character with CSS keyframe
- Footer label: "PLAIN ENGLISH — OR CODE" in 10px Inter 600 Text Tertiary letter-spacing 0.1em, centered, padding-bottom 20px
- ESA logomark SVG (colorful triangular mark, same as nav) centered between text and footer
- Animated dashed connector arrow exits right edge → connecting to middle column, color `#4F6EF7`, `stroke-dasharray: 6 4`, `stroke-dashoffset` animated at 800ms

**Column 2 — "ESA Platform" (Center orchestration hub):**
- Header: "ESA Platform" — same style, centered, padding 20px
- Top hero chip: Large rounded rectangle `background: linear-gradient(135deg, #0A0B1E 0%, #1a1040 50%, #2d0a3e 100%); border: 1px solid rgba(79,110,247,0.4); border-radius: 14px; padding: 20px; margin 0 16px`
  - "SAI" in 48px Cal Sans 700 gradient text (`linear-gradient(135deg, #4F6EF7, #9B72F7, #F7924A)`)
  - "SUPERAGENT AI" label 11px mono letter-spacing 0.15em in rgba(255,255,255,0.5), centered below
- Section label: "5 STUDIOS" — 10px Text Tertiary letter-spacing 0.12em, centered, margin 16px 0 8px
- Studios grid (2×2 + 1 bottom, padding 0 16px, gap 8px):
  - Agent Studio (Accent Blue bg tint) · App Studio (Purple bg tint) · **Model Studio** (Amber bg tint — `border: 1px solid #F7924A` highlighted as active)
  - Cloud Studio (dark tint) · Marketplace — publish & purchase (purple tint)
  - Each studio chip: `border-radius: 10px; padding: 10px 14px; font-size: 13px 500`
- Section label: "CORE IP" — same label style, margin 16px 0 8px
- Core IP row (3 chips horizontal, gap 8px, padding 0 16px 16px):
  - AGP / GOVERNANCE · MAN / MULTI-AGENT · ESM / MEMORY
  - Style: `background: rgba(15,17,23,0.85); border: 0.5px solid #2A2F3E; color: rgba(255,255,255,0.8); border-radius: 8px; padding: 10px 14px; font-size: 11px 600`
- Animated dashed connector arrow exits right edge → right column

**Column 3 — "150+ LLMs / Data" (Output side):**
- Header: "150+ LLMs" — same style, centered, padding 20px
- Subheader: "300+ MCPs" — 11px Text Tertiary, centered, margin-top -12px
- LLM Logo Grid: 3×3 grid of provider icon chips — `background: rgba(79,110,247,0.07); border: 0.5px solid rgba(79,110,247,0.15); border-radius: 10px; width: 52px; height: 52px; display: flex; align-items: center; justify-content: center`. Use colored Lucide placeholders (Brain, Zap, Star, Cpu, Bot, Globe, Layers, Database, Code) in respective brand colors. Gap 8px, centered.
- Divider 0.5px
- Two output buttons: `Custom Models` · `Fine-Tuned Models` — full-width within column, `background: #F0F2FA; border: 0.5px solid #D6DCF0; border-radius: 8px; padding: 10px 16px; font-size: 13px 500; margin 0 16px 8px`

**Bottom strip (spans full 3-column width):**
- `background: rgba(79,110,247,0.05); border-top: 0.5px solid rgba(79,110,247,0.12); border-radius: 0 0 16px 16px; padding: 14px 32px`
- 3 trust chips in a row, centered, gap 32px:
  - `<Layers>` "Model-agnostic" · `<Cloud>` "Multi-cloud / on-prem / BYO" · `<Shield>` "Your data stays yours"
  - Style: 13px Text Secondary, icon 16px Text Tertiary, flex align-center gap 8px

**Animated flow lines (SVG overlay):**
- Continuous animated dashed lines flow left→right across the diagram: Column1 → Column2 → Column3
- Use SVG `<path>` with `stroke-dashoffset` animation at 1.2s ease loop
- Line color: Accent Blue `#4F6EF7` at 40% opacity
- Small animated dot (4px circle) travels along each path at 2s loop using `animateMotion`

**Below the architecture diagram (tabs strip):**
Horizontal tab strip — 6 tabs: **Plan · Research · Build & Test · Deploy · Govern · Scale**
- Active tab: `background: #4F6EF7; color: #FFFFFF; border-radius: 999px; padding: 6px 20px`
- Inactive: Text Secondary, hover Text Primary, 140ms transition
- Below tabs: a second mockup panel (640px wide, centered, `background: rgba(255,255,255,0.72); backdrop-filter: blur(16px); border-radius: 16px; border: 0.5px solid rgba(255,255,255,0.9); overflow: hidden; box-shadow: Level 2`) showing a live preview of the ESA internal interface:
  - Top browser chrome: 3 traffic light dots (red/amber/green 10px each) + "• live" green pill 10px — `background: #F0F2FA; padding: 8px 16px; border-bottom: 0.5px solid #E4E8F4`
  - Inner: small replica of the chat interface (ESA logo, "What should we build today?" headline 20px, 2 action buttons, 4 suggested prompt chips, 1 mock message in progress with agent transparency bar visible)
  - This inner panel is purely decorative CSS/HTML — not interactive

---

### SECTION 1.3 — FEATURE CARDS (4 Agent Cards)
**Background:** `#F0F2FA` (soft lavender-white, distinct from hero without being jarring)
**Padding:** 80px vertical

**Section label:** "WHAT ESA CAN DO" — 11px Inter 600, Accent Blue, letter-spacing 0.1em, centered, margin-bottom 16px

**Section title:** "One query. Four agents. Infinite insight." — 36px Cal Sans 700, Text Primary, centered

**Grid:** 4 cards, 2-column on tablet, 1-column on mobile. Gap 20px. Max-width 1100px, centered.

**Each Card:**
- Background: `#FFFFFF` (Level 2 card)
- Border: `0.5px solid #D6DCF0`
- Border-radius: 16px
- Padding: 28px
- Hover: lift animation (`translateY(-3px)`) + left border gets agent color: `border-left: 2px solid [agent-color]` + `box-shadow: 0 8px 32px rgba(79,110,247,0.10)`
- Entry animation: On scroll-into-view, each card fades in with `opacity(0→1) + translateY(16px→0)` at 300ms, staggered 80ms per card
- Top-left: Agent icon in 44px circle — bg `rgba([agent-color], 0.10)`, icon in agent color (Lucide: `<TrendingUp>` Strategy · `<BarChart2>` Data · `<Search>` Search · `<Globe>` Research)
- Agent name: 16px 600 Text Primary, margin-top 16px
- Description: 14px Text Secondary, line-height 1.6, margin-top 8px
- Trigger keywords row at bottom: small muted chips (`background: #F0F2FA; border: 0.5px solid #D6DCF0`) with 12px Text Tertiary — show 3 keyword chips per card

**Card contents:**
1. **Strategy Agent** (Navy #4A6CF7): "Business strategies, GTM plans, competitive analysis, decision support" · keywords: strategy · GTM · growth
2. **Data Analyst Agent** (Teal #0FC4A7): "Statistical analysis, pattern detection, chart generation from your data" · keywords: analyze · trends · visualize
3. **Search Agent** (Purple #9B72F7): "Semantic search across internal documents, policies, reports" · keywords: find · policy · document
4. **Research Agent** (Amber #F7924A): "External market research, competitor benchmarking, industry trends" · keywords: market · benchmark · competitor

---

### SECTION 1.4 — PRICING SECTION
**Background:** `linear-gradient(135deg, #F7F8FC 0%, #EEF1FA 100%)`
**Padding:** 80px vertical

**Section label:** "PRICING" — same style as above

**Section title:** "Simple, transparent pricing" — 36px

**Currency Toggle (INR / USD):**
Pill toggle switch centered below title — two options "₹ INR" and "$ USD"
- Active: `background: #FFFFFF; border: 0.5px solid #4F6EF7; color: #0F1117`
- Inactive: Text Tertiary
- Toggle background: `#F0F2FA; border: 0.5px solid #D6DCF0; border-radius: 999px; padding: 4px`
- Auto-detect location to default (India = INR, rest = USD)
- Persists to account settings on login

**Billing Cycle Toggle:**
"Monthly / Annual" toggle — Annual shows badge: `−20% OFF` in Success green

**Plan Cards Grid (3 cards + 1 trial banner):**
Max-width 1000px, centered, gap 20px

**Each Plan Card:**
- Background: `#FFFFFF`
- Border-radius: 16px
- Padding: 32px
- Border: `0.5px solid #D6DCF0`
- Hover: `translateY(-2px)`, shadow lifts to Level 2
- **Growth plan has:** `border: 1.5px solid #4F6EF7` + top badge "Most Popular" in Accent Blue bg with white text 11px 600, border-radius 999px, centered above card

**Card anatomy:**
- Plan name: 13px 600 Text Secondary, letter-spacing 0.08em, uppercase
- Price: 40px 700 Cal Sans Text Primary. Show INR or USD based on toggle
  - Starter: ₹2,999/mo or $35/mo
  - Growth: ₹9,999/mo or $119/mo
  - Enterprise: "Custom"
- Price subtext: "/month, billed monthly" — 13px Text Tertiary
- CTA Button:
  - Starter/Growth: `Start Free Trial` — Primary style
  - Enterprise: `Contact Sales` — Ghost style
- Divider: 0.5px border #E4E8F4
- Feature list: Lucide `<Check>` 14px Success green + 14px Text Secondary feature text, gap 10px between items. Show all features from BRD for each plan.
- Unavailable features: `<X>` 14px Text Tertiary + strikethrough text

**14-Day Trial Banner (below cards):**
Full-width strip — `background: rgba(79,110,247,0.07); border: 0.5px solid rgba(79,110,247,0.2); border-radius: 12px; padding: 20px 32px`
Text: "🎉 Start with a 14-day free trial of the Growth plan — no credit card required"
CTA: `Get Started Free →` inline link in Accent Blue

---

### SECTION 1.5 — SOCIAL PROOF (Optional — render if data available)
**Background:** `#F0F2FA`
**Padding:** 64px vertical

Logo strip — 6 enterprise customer placeholder logos in grayscale, 40px height, opacity 0.4, gap 48px, centered row. `filter: grayscale(1)` with hover `opacity: 0.8` transition.

Subtext: "Trusted by forward-thinking teams worldwide" — 14px Text Tertiary, centered

---

### SECTION 1.6 — FOOTER
**Background:** `#F0F2FA`
**Border-top:** `0.5px solid #D6DCF0`
**Padding:** 48px vertical

**4-column layout:**
1. Brand column: ESA logo + 1-line tagline + social icons (LinkedIn, Twitter/X, GitHub) 20px each
2. Product: Features · Pricing · Docs · Changelog · Status
3. Company: About · Blog · Careers · Press
4. Legal: Terms of Service · Privacy Policy · Cookie Policy · Security

**Bottom row:** "© 2026 ESA. All rights reserved." — 13px Text Tertiary

---

## 📄 PAGE 2 — AUTHENTICATION (SSO LOGIN)

### URL: `/login`
### Layout: Full-screen centered card, no navigation bar

**Background:** `linear-gradient(135deg, #F7F8FC 0%, #EEF1FA 55%, #F0F4FF 100%)` fixed + same radial mesh gradient blobs as hero (Accent Blue 8% top-left, Amber 5% bottom-right)

**Card:**
- Width: 440px centered
- Background: `#FFFFFF`
- Border: `0.5px solid #D6DCF0`
- Border-radius: 20px
- Padding: 48px 40px
- Level 3 shadow

**Card contents (top to bottom):**

1. **ESA Logo** (centered): Logomark 40px + "ESA" wordmark 24px Cal Sans 600. Margin-bottom 32px.

2. **Title:** "Welcome back" — 24px Cal Sans 600 Text Primary, centered
3. **Subtitle:** "Sign in to your workspace" — 14px Text Secondary, centered. Margin-bottom 32px.

4. **Microsoft SSO Button:**
   - Full-width, height 44px, border-radius 8px
   - Background: `#F7F8FC`, border: `0.5px solid #D6DCF0`
   - Left: Microsoft logo SVG (4-color squares, 20px)
   - Text: "Continue with Microsoft" — 14px 500 Text Primary
   - Hover: bg `#F0F2FA`

5. **Gap:** 10px

6. **Google SSO Button:**
   - Same style as Microsoft
   - Left: Google logo SVG (colored G, 20px)
   - Text: "Continue with Google"

7. **Divider row:** `OR` — thin lines left/right with text centered, 13px Text Tertiary. Margin 20px vertical.

8. **SAML/Okta Text Link:** "Sign in via Enterprise SSO (Okta, SAML)" — 13px Accent Blue, centered, underline on hover

9. **Terms row:** Checkbox + text "I agree to the Terms of Service and Privacy Policy" — 12px Text Secondary with hyperlinks in Accent Blue. Required before SSO buttons become active. When unchecked, SSO buttons show 50% opacity with `cursor: not-allowed`.

10. **Error Alert (conditional, shown on auth failure):**
    - Full-width below buttons
    - Background: `rgba(239,68,68,0.08)`, border: `0.5px solid rgba(239,68,68,0.3)`, border-radius: 8px, padding: 12px 16px
    - Icon: `<AlertCircle>` 16px Danger red + text "Authentication failed — please try again" 13px Danger

11. **Footer text:** "Don't have an account? Start free →" — 13px Text Secondary + Accent Blue link

---

## 📄 PAGE 3 — PROFILE CREATION

### URL: `/onboarding/profile`
### Layout: Centered card, progress indicator at top

**Progress Indicator (top of page, outside card):**
3 steps: `● Profile  ●— Workspace  ○— Dashboard` — active = Accent Blue filled dot, completed = checkmark, pending = empty circle. 13px Text Secondary labels. Full horizontal step line.

**Card:** Same card style as login, width 520px

**Card contents:**

1. **Title:** "Create your profile" — 22px Cal Sans 600
2. **Subtitle:** "Tell us about you — takes 60 seconds" — 14px Text Secondary. Margin-bottom 28px.

3. **Profile Photo Upload (optional):**
   - 72px circle with dashed border `1px dashed #D6DCF0`
   - Center: `<Camera>` icon 20px Text Tertiary + "Add photo" 12px Text Tertiary below
   - On upload: shows image with cropping modal (1:1 ratio)
   - Fallback: shows initials avatar in `#F0F2FA` bg

4. **Form Fields (vertical stack, gap 16px):**

   Each field anatomy:
   - Label: 13px 500 Text Primary + red asterisk for required + `<Info>` 14px Text Tertiary icon with tooltip on hover
   - Input: height 40px, background `#FFFFFF`, border `0.5px solid #D6DCF0`, border-radius 8px, 14px Text Primary, padding 0 14px
   - Pre-filled from SSO: shows `<Lock>` 14px icon inside input right side + border color `#D6DCF0` (still editable)
   - Focus state: border `0.5px solid #4F6EF7`, `box-shadow: 0 0 0 3px rgba(79,110,247,0.08)`
   - Error state: border Danger, error message 12px Danger below

   Fields in order:
   a. **Full Name** — Text input, placeholder "John Smith", pre-filled if SSO, lock icon if pre-filled
   b. **Organization** — Text input, placeholder "Acme Corp", pre-filled if SSO domain available
   c. **Role / Designation** — Dropdown: CEO · VP · Director · Manager · Analyst · Other
   d. **Industry** — Dropdown: BFSI · SaaS · Manufacturing · Healthcare · Retail · Other
   e. **Country** — Searchable dropdown, all countries, default to detected location
   f. **Workspace Name** — Text input, default value `"[Org] Strategy Hub"`, editable. Sub-label: "This is your team workspace name" 12px Text Tertiary

5. **Mandatory field note:** "* Required fields" — 12px Text Tertiary, left-aligned below form

6. **CTA Button:** "Create Profile →" — Primary full-width, height 44px

7. **Back link:** "← Back to login" — 13px Text Secondary, centered

---

## 📄 PAGE 4 — WORKSPACE SETUP

### URL: `/onboarding/workspace`
### Layout: Same progress indicator (step 2 active), centered card 520px

**Card contents:**

1. **Title:** "Set up your workspace" — 22px Cal Sans 600
2. **Subtitle:** "Configure ESA for your organization" — 14px Text Secondary. Margin-bottom 28px.

3. **Form Fields:**

   a. **Workspace Name** — Pre-filled from profile step, editable. Validate uniqueness on blur. Error: "Workspace name already exists — please choose another"
   b. **Industry** — Dropdown (same options), used for agent context tuning
   c. **Team Size** — Dropdown: 1–10 · 11–50 · 51–200 · 200+

4. **Primary Use Case (multi-select chips):**
   Label: "What will you mainly use ESA for?" — 13px 500 Text Primary
   4 chips in a flex-wrap row: `Data Analysis` · `Strategy` · `Research` · `Knowledge Search`
   - Default: all unselected
   - Selected chip: `background: rgba(79,110,247,0.10); border: 0.5px solid #4F6EF7; color: #0F1117`
   - Unselected: `background: #F0F2FA; border: 0.5px solid #D6DCF0; color: #4B526B`
   - Chip height: 34px, border-radius 8px, padding 0 14px, 13px 500

5. **Invite Team Members (optional):**
   Label: "Invite teammates (optional)" — 13px 500
   Multi-email input: tag-style input where emails become pill tags with × to remove
   Role dropdown per invite: `Analyst | Researcher | Viewer | Admin`
   Add button: `+ Add another`

6. **Logo Upload:**
   Small zone — 120×60px dashed rectangle, "Upload workspace logo" 12px Text Tertiary, accepts PNG/SVG/JPG. Preview shows inside zone.

7. **LLM Key (optional collapsible section):**
   Collapsible row: `<ChevronDown>` + "Configure AI provider (optional — you can do this later)" 13px Text Secondary
   On expand shows: Provider dropdown + API key masked input + Test Connection button (covered in full in Settings)

8. **CTA:** "Create Workspace →" full-width primary button

9. **Skip link:** "Skip for now →" 13px Text Secondary link, right-aligned

---

## 📄 PAGE 5 — MAIN DASHBOARD

### URL: `/dashboard`
### Layout: 3-panel fixed layout, full viewport height, no scroll on outer shell

---

### PANEL A — LEFT SIDEBAR (20% width, min 220px, max 260px)

**Background:** `#FFFFFF`
**Border-right:** `0.5px solid #E4E8F4`
**Position:** Fixed left, full height
**Overflow:** auto (for very tall screens)

**Top section:**
- ESA Logomark (24px) + "ESA" wordmark 16px Cal Sans 600, Text Primary. Margin: 20px 20px 8px
- Workspace name below: 12px Text Secondary with `<ChevronDown>` 14px (workspace switcher trigger)
- Divider: 0.5px #E4E8F4

**Navigation Items (vertical list, padding 8px 12px):**
Each nav item:
- Height: 36px, border-radius: 8px, padding 0 12px, display flex align-center gap 10px
- Icon: Lucide 16px
- Label: 14px Inter
- Default: Text Secondary (`#4B526B`)
- Hover: bg `#F0F2FA`, Text Primary (`#0F1117`)
- Active: bg `rgba(79,110,247,0.08)`, text Accent Blue, left border `2px solid #4F6EF7`

Nav items (in order):
1. `<LayoutDashboard>` Dashboard
2. `<MessageSquare>` AI Chat (primary — likely most-used)
3. `<BarChart2>` Analytics (BI Dashboard)
4. `<Database>` Data Sources
5. `<FileText>` Reports
6. `<Users>` Team
7. `<Settings>` Settings
8. `<CreditCard>` Billing
9. `<ClipboardList>` Audit Logs

**Divider** between main nav and bottom section

**Bottom section (pinned to bottom):**
- User avatar (32px circle, initials gradient) + name 13px Text Primary + role badge 11px (e.g. "Admin" in `rgba(79,110,247,0.15)` bg) + `<ChevronDown>` for profile menu
- On click: dropdown menu — Profile & Activity (`/profile`) · Preferences · Security · Appearance · Log Out
- Clicking the avatar itself navigates to `/profile` — the enriched full-page profile surface

**Collapse toggle (CLOSABLE — left sidebar):**
Two collapse modes:
1. **Icon-only collapse (56px):** `<PanelLeftClose>` icon at bottom of sidebar. On click: sidebar collapses to 56px icon-only mode at 260ms cubic-bezier(0.4,0,0.2,1). Icon labels `opacity: 1→0` at 120ms. Tooltips appear on icon hover. Same icon becomes `<PanelLeftOpen>`.
2. **Full close (0px / hidden):** On second click when already icon-only, sidebar fully hides (`width: 0; overflow: hidden`). A floating `<PanelLeftOpen>` trigger tab appears at the left edge (16px wide, 48px tall, `background: #FFFFFF; border: 0.5px solid #E4E8F4; border-radius: 0 8px 8px 0; box-shadow: 2px 0 12px rgba(79,110,247,0.08)`) — click to re-expand. This gives users a fully distraction-free single-column chat experience.

---

### PANEL B — MAIN CONTENT (60% width)

**Background:** `linear-gradient(160deg, #F7F8FC 0%, #EEF1FA 100%)` fixed
**Overflow-y:** auto

#### Sub-section B1 — TOP BAR
Height 56px, border-bottom `0.5px solid #E4E8F4`, padding 0 24px, background `rgba(255,255,255,0.80)` with `backdrop-filter: blur(12px)`
- Left: Page title "Dashboard" 16px 600 Text Primary
- Right: `<Bell>` notification icon 20px · `<Search>` global search 20px · User avatar 32px

#### Sub-section B2 — AI QUERY INPUT (Hero input — Base44-style Single Chat Interface)
Padding: 24px 24px 0

**Single Chat Interface Layout (Base44-inspired):**
The dashboard and chat pages share a unified, single-pane conversational interface. The query input is always the primary focal element — fixed at bottom of the content area on chat pages, and prominently centered on the dashboard. The interface does NOT have separate "sections" above the input that feel disconnected; instead, the input anchors the experience and all context (suggestions, recent activity, agent status) flows naturally around it in a single scroll column.

**Prominent query box:**
- Background: `#FFFFFF`
- Border: `0.5px solid #D6DCF0`
- Border-radius: 16px
- Padding: 18px 20px 14px
- Box-shadow: `0 2px 16px rgba(79,110,247,0.07)` (always visible, gives floating feel)
- Top: multi-line `<textarea>` placeholder "Ask ESA anything about your business..." 15px, color `#8A93B0`, background transparent, no border, full width, resize: none, min-height 56px auto-grow
- Bottom action bar (flex row, align-center, justify-between):
  - Left: `<Paperclip>` attach dataset button (20px, `#8A93B0`, hover `#0F1117`) · `<FileText>` attach document · `<Mic>` voice input — each 32px hit target, gap 4px
  - Right: `<Send>` submit button — 36px circle, bg Accent Blue `#4F6EF7`, white icon 16px. Active/hover: `#3D5BE8`. Disabled: 30% opacity when input empty.
- On focus: border becomes `0.5px solid #A0AEDE`, `box-shadow: 0 0 0 4px rgba(79,110,247,0.08), 0 4px 20px rgba(79,110,247,0.10)`. The box gently scales up: `transform: scale(1.005)` at 180ms.

**Suggested Prompts row (below query box, gap 8px):**
3 pill chips, contextual to user role/recent activity:
- Example: "Show Q3 revenue trends" · "Find HR leave policy" · "Benchmark SaaS pricing"
- Style: `background: #FFFFFF; border: 0.5px solid #D6DCF0; border-radius: 999px; padding: 6px 14px; font-size: 13px; color: #4B526B; box-shadow: 0 1px 4px rgba(0,0,0,0.04)`
- Hover: `border-color: #4F6EF7`, Text Primary, `translateY(-1px)`, shadow deepens — 140ms transition
- Click: populates query input with smooth `focus` + cursor-end animation

#### Sub-section B3 — RECENT INSIGHTS FEED
Label: "Recent Activity" — 13px 600 Text Secondary, padding 20px 24px 12px

**5 insight cards (vertical list, gap 8px, padding 0 24px):**
Each card:
- Background: `#FFFFFF`
- Border: `0.5px solid #E4E8F4`
- Border-radius: 12px
- Padding: 14px 16px
- Box-shadow: Level 1 (always visible, soft)
- Hover: `border-color: #A0AEDE`, `translateY(-2px)`, shadow lifts to Level 2 — 180ms transition

Card anatomy:
- Top row: Query text (14px Text Primary, truncate at 1 line) + timestamp (12px Text Tertiary, right-aligned)
- Middle row: Agent badges strip (see Agent Badges component below)
- Bottom row: `<RotateCcw>` "Re-run" button (12px Text Secondary) + `<Download>` quick download (12px Text Secondary) — text links with icon, gap 16px

**Agent Badges Component:**
Inline chip tags, one per activated agent:
- Height: 20px, border-radius: 999px, padding: 0 8px, font-size: 11px, font-weight: 500
- Strategy: `background: rgba(74,108,247,0.15); color: #4A6CF7; border: 0.5px solid rgba(74,108,247,0.3)`
- Data: `background: rgba(15,196,167,0.12); color: #0FC4A7; border: 0.5px solid rgba(15,196,167,0.25)`
- Search: `background: rgba(155,114,247,0.12); color: #9B72F7; border: 0.5px solid rgba(155,114,247,0.25)`
- Research: `background: rgba(247,146,74,0.12); color: #F7924A; border: 0.5px solid rgba(247,146,74,0.25)`
- Entry animation: fadeIn + scale 0.9→1 at 120ms stagger per badge

---

### PANEL C — RIGHT PANEL (20% width, min 220px, max 280px) — CLOSABLE

**Background:** `#FFFFFF`
**Border-left:** `0.5px solid #E4E8F4`
**Padding:** 20px 16px
**Overflow-y:** auto

**Collapse toggle (CLOSABLE — right panel):**
`<PanelRightClose>` icon at top-right corner of the right panel (inside panel header row, 16px, Text Tertiary, hover Text Primary). On click: panel slides out to the right (`transform: translateX(100%)` at 260ms cubic-bezier(0.4,0,0.2,1); main content area width expands to fill). A floating `<PanelRightOpen>` tab appears at the right edge (same style as left edge trigger) — click to re-open. When both sidebars are closed, the main chat interface occupies the full viewport width — a full-screen, distraction-free mode like a premium AI assistant (Claude/GPT style).

**Panel top bar (always visible, 40px, border-bottom 0.5px #E4E8F4):**
Flex row, align-center, justify-between, padding 0 16px:
- Left: "Workspace" 13px 600 Text Primary
- Right: `<PanelRightClose>` 16px Text Tertiary

#### Section C1 — AGENT ACTIVITY FEED
Label: "Agents" — 11px 600 Text Tertiary uppercase, letter-spacing 0.08em

4 agent rows (vertical, gap 6px):
Each row — flex align-center gap 10px:
- 8px circle in agent color (pulse animation when active: `box-shadow: 0 0 0 4px rgba([color],0.2)` keyframe)
- Agent name: 13px Text Primary
- Status badge: "Ready" (green pill) or "Active" (agent-color pill, pulsing) or last execution time "2.1s" Text Tertiary

#### Divider

#### Section C2 — ACTIVE DATA SOURCES
Label: "Data Sources" — same label style

Compact list (gap 6px):
Each source row:
- File/DB icon `<FileSpreadsheet>` or `<Database>` 16px Text Tertiary
- Source name: 13px Text Primary, truncate at 180px
- Status dot: `<Circle fill>` 6px — green=Active, amber=Syncing (spin animation), red=Error

`+ Add Source` link at bottom — 13px Accent Blue

#### Divider

#### Section C3 — QUICK STATS
Label: "Today" — same label style

2x2 grid of metric cards:
Each metric card: `background: #F0F2FA; border: 0.5px solid #E4E8F4; border-radius: 10px; padding: 12px 14px`
- Label: 12px Text Tertiary
- Value: 22px 600 Cal Sans Text Primary
Stats: Queries · Reports · Agents Used · Avg Response

---

### STEPWISE PROMPTER (First-session overlay)
Appears only on first login. Overlay system with 6 steps.

**Backdrop:** `rgba(0,0,0,0.4)` over entire page
**Spotlight:** Highlighted area around target element using `box-shadow: 0 0 0 9999px rgba(0,0,0,0.6)` cut-out effect

**Tooltip card:**
- 240px wide, `#FFFFFF` bg, `0.5px solid #D6DCF0` border, 12px radius, 16px padding, box-shadow Level 2
- Step indicator: "Step 1 of 6" — 11px Text Tertiary
- Title: 14px 600 Text Primary
- Body: 13px Text Secondary, line-height 1.5
- Animated pointer: Lucide `<MousePointerClick>` 18px Accent Blue with bounce animation pointing at target element
- Button row: `Skip tour` (text link, Text Tertiary) + `Next →` (primary small button)
- Progress dots: 6 dots below, active = Accent Blue filled

**6 steps:**
1. AI Chat Input — "Start here — ask ESA anything about your business"
2. Data Upload Button — "Upload a dataset to unlock data analysis"
3. Agent Activity Panel — "See which AI agents are working on your query"
4. Download Report Button — "Download your insights as PDF, docs or PPT"
5. Team Management — "Invite your team to collaborate"
6. Settings > LLM Config — "Bring your own LLM API key for custom AI"

**Floating Explainer Video Button (always visible, bottom-right):**
56px circle, `background: #FFFFFF; border: 0.5px solid #D6DCF0`, `box-shadow: 0 4px 20px rgba(79,110,247,0.10)`
Icon: `<PlayCircle>` 24px Accent Blue. Hover: scale(1.05). On click: opens 60-second demo video modal.

---

## 📄 PAGE 6 — AI CHAT INTERFACE

### URL: `/chat` or `/chat/[session-id]`
### Layout: Full viewport, 2-panel (history sidebar + main chat)

---

### PANEL A — CHAT HISTORY SIDEBAR (240px)
**Background:** `#FFFFFF`
**Border-right:** `0.5px solid #E4E8F4`

**Top:**
- `New Chat` button — full-width minus padding, height 36px, bg `#F0F2FA`, border `0.5px solid #D6DCF0`, icon `<Plus>` 14px + text "New Chat" 13px 500, border-radius 8px. Hover: bg `#E8ECFA`, border Accent Blue.
- Search sessions: input 34px, `background: #F7F8FC`, border `0.5px solid #E4E8F4`, border-radius 8px, placeholder "Search chats..." 13px Text Tertiary, `<Search>` 14px left icon. Focus: border Accent Blue.

**Session list (scrollable):**
Group headers: "Today" / "Yesterday" / "Last 7 days" — 11px Text Tertiary, uppercase, letter-spacing 0.05em, padding 8px 12px

Each session item:
- Height: 56px, padding 0 12px, border-radius 8px
- Primary text: Query text, 13px Text Primary, truncate 1 line
- Secondary: Timestamp + agent badges strip (compact, 16px height chips)
- Hover: bg `#F0F2FA`
- Active: bg `rgba(79,110,247,0.07)`, left border `2px solid #4F6EF7`
- On hover: show `<MoreHorizontal>` options icon (rename, delete)

---

### PANEL B — MAIN CHAT AREA

**Background:** `linear-gradient(160deg, #F7F8FC 0%, #EEF1FA 100%)` fixed

**Single Chat Interface (Base44-style):**
The entire chat area is a single unified scroll column — no isolated sub-panels or hard-divided regions. The conversation history scrolls naturally from top to bottom; the input bar is sticky at the bottom, always visible. The overall feel is one continuous chat thread, like a premium AI assistant interface. There is no visual "mode switch" between thinking and response — it all flows in the same thread. All generative UI components (charts, strategy cards, tables) appear inline within this single thread as rich message blocks, not in separate panels.

#### Sub-section: Top bar
Height 52px, border-bottom `0.5px solid #E4E8F4`, padding 0 20px, `background: rgba(255,255,255,0.80)` with `backdrop-filter: blur(12px)`
- Left: `<ArrowLeft>` back to dashboard + current session title (editable on click) 15px 500 Text Primary
- Right: `<Share2>` share · `<Download>` download session · `<MoreHorizontal>` options

#### Sub-section: Messages area (scrollable, padding 20px 20px 0)

**Empty state (new chat):**
Centered vertically in space:
- ESA agent illustration (simple SVG hexagon + sparkle) 64px
- Text: "What would you like to know?" 20px 500 Text Primary
- 3 suggested prompt chips (same style as dashboard)

**User message bubble:**
- Right-aligned, max-width 70%
- Background: `rgba(79,110,247,0.08)`, border: `0.5px solid rgba(79,110,247,0.18)`, border-radius: `14px 14px 4px 14px`, padding 12px 16px
- Text: 14px Text Primary (`#0F1117`), line-height 1.6
- Entry animation: `slideIn from right (translateX 12px→0) + opacity(0→1)` at 180ms ease-out
- If attachment: show file pill below text — `<FileIcon>` 14px + filename 13px + file size 11px Text Tertiary

**AGENT TRANSPARENCY BAR — Persistent Global Strip (Always Visible):**

A fixed horizontal bar sits directly below the top navigation bar (not inside the chat thread) at all times — even when no query is running. This is the primary always-on agent status surface. It communicates system readiness and live activity at a glance without requiring the user to scroll.

- **Position:** Fixed, full-width, `top: 60px` (directly below nav), z-index 90
- **Height:** 36px
- **Background:** `rgba(247,248,252,0.92)` with `backdrop-filter: blur(12px)`
- **Border-bottom:** `0.5px solid #E4E8F4`
- **Layout:** Flex row, align-center, padding 0 24px, gap 16px, justify-between

**Left section — Agent Status Pills (4 pills, always visible):**
Each pill: 26px height, border-radius 999px, padding 0 10px, flex align-center gap 6px. Morphs color based on state:

- **Idle (default, no query running):**
  `background: #F0F2FA; border: 0.5px solid #D6DCF0; color: #8A93B0`
  Icon: 10px Lucide at 40% opacity + agent name 11px 400

- **Active / In-use (agent is processing current query) — HIGHLIGHTED:**
  `background: rgba([agent-color], 0.13); border: 1px solid [agent-color]; color: [agent-color]; font-weight: 600`
  + Full-color icon at 100% opacity
  + Shimmer sweep: `linear-gradient(90deg, transparent, rgba([agent-color], 0.18), transparent)` moving left→right at 1.1s loop
  + Glow ring pulse: `box-shadow: 0 0 10px rgba([agent-color], 0.28)` + expanding ring at 1.5s
  + The active pill visually "lights up" — unmistakably highlighted versus idle siblings
  + Appended label inside pill: "· working..." in 10px mono, fading in at 150ms

- **Done (stays green for 3s, then returns to Idle):**
  `background: rgba(22,163,74,0.08); border: 0.5px solid rgba(22,163,74,0.3); color: #16A34A`
  + `<CheckCircle>` 10px left + elapsed "· Xms" in 10px mono right

- **Error:** `background: rgba(220,38,38,0.07); border: 0.5px solid rgba(220,38,38,0.25); color: #DC2626` + `<AlertCircle>` 10px

Agent pills order: `<TrendingUp>` Strategy (Navy) · `<BarChart2>` Data (Teal) · `<Search>` Search (Purple) · `<Globe>` Research (Amber)

**Right section of persistent bar:**
- If query running: live elapsed timer "3.2s" 12px mono Text Tertiary, ticking every 100ms + animated 3-dot indicator
- If idle: "All agents ready" 11px Text Tertiary + green 6px dot
- `<ChevronDown>` 12px Text Tertiary — on click: expands bar downward into detailed breakdown panel

---

**Processing state (ESA thinking — Inline Agent Transparency Block):**

This secondary block renders INLINE in the chat thread immediately after query submission. It provides per-message detail complementing the persistent bar. It is NOT a simple spinner.

Container:
- Background: `#FFFFFF`
- Border: `0.5px solid #D6DCF0`
- Border-radius: 14px
- Padding: 16px 20px
- Margin: 8px 0
- Box-shadow: Level 1
- Entry animation: `opacity(0→1) + translateY(8px→0)` at 200ms ease-out

**Row 1 — Header bar (flex, align-center, justify-between):**
- Left: ESA logomark 16px + "ESA is working on this..." 13px 500 Text Primary
- Right: Elapsed timer — live ticking "0.0s → 1.4s → 3.2s..." in 12px mono Text Tertiary (`JetBrains Mono`), updates every 100ms

**Row 2 — Agent Pipeline (flex row, gap 10px, margin-top 12px):**
4 agent stage pills in left-to-right pipeline order. Each pill:
- Width: auto, height: 28px, border-radius: 999px, padding: 0 12px
- Icon: 12px Lucide icon in agent color + agent name 12px 500
- States:
  - **Pending:** `background: #F0F2FA; border: 0.5px solid #D6DCF0; color: #8A93B0` — visibly dim/gray
  - **Active (running) — HIGHLIGHTED:** `background: rgba([agent-color], 0.10); border: 0.5px solid [agent-color]; color: [agent-color]` + shimmer sweep + pulsing ring. **Active pill is fully saturated color; pending siblings remain gray. The contrast must be obvious.**
  - **Done:** `background: rgba(22,163,74,0.08); border: 0.5px solid rgba(22,163,74,0.3); color: #16A34A` + `<CheckCircle>` 12px + elapsed "1.2s" 11px mono
  - **Error:** `background: rgba(220,38,38,0.07); border: 0.5px solid rgba(220,38,38,0.25); color: #DC2626` + `<AlertCircle>` 12px
- Connecting dots between pills: `···` 10px Text Tertiary, 4px spacing

**Row 3 — Live Status Lines (vertical stack, margin-top 12px, gap 6px):**
Each line fades in (`opacity 0→1` at 160ms) when that agent starts. One line per active agent:
- Left: 6px filled circle in agent color (pulse animation when running; static when done)
- Agent label: 12px 600 in agent color
- Status text: 12px Text Secondary — live messages:
  - Running: "Retrieving documents from 3 sources..." / "Generating chart from uploaded dataset..." / "Analyzing Q3 revenue data..." / "Scanning competitor benchmarks..."
  - Done: "Found 8 relevant documents · 1.2s" / "Chart ready · 0.8s" — shifts to Text Tertiary
- Right: per-agent elapsed time 11px mono Text Tertiary, live-ticking while running

**Row 4 — Sources being accessed (appears after Search/Research agent activates, margin-top 10px):**
Label: "Accessing:" 11px Text Tertiary
Horizontal scroll row of source pills: `background: #F7F8FC; border: 0.5px solid #E4E8F4; border-radius: 6px; padding: 3px 8px; font-size: 11px; color: #4B526B`
Each pill: `<FileText>` or `<Database>` 10px + source name truncated at 120px. Staggered fade-in 80ms per pill.

**Completion transition:**
When all agents finish:
- Header text → "Done · Response ready" with `<CheckCircle>` 14px Success green
- All agent pills show Done state simultaneously
- After 600ms pause: container collapses `max-height → 0; opacity → 0` at 300ms ease-in, ESA response fades in below
- Persistent transparency bar simultaneously flashes all active pills Done→green, then returns to Idle after 3s

**ESA response block:**
Full-width, padding 16px 0, border-bottom `0.5px solid #E4E8F4`
Entry animation: `opacity(0→1) + translateY(8px→0)` at 240ms ease-out, triggered as stream begins

**Response anatomy (top to bottom):**

1. **Agent Badge Strip:**
   Flex row, gap 6px, margin-bottom 12px
   - Each badge: see Agent Badges Component above
   - Entry animation: staggered fadeIn per badge
   - "Agents Used:" label 12px Text Tertiary before badges

2. **Labeled Agent Sections:**
   Each section has a subtle header:
   - `[agent-color]-left-border-2px` + agent name label 12px 600 in agent color, margin-bottom 8px
   - Content below: 14px Text Primary, line-height 1.7

3. **Generative UI Component Blocks (see dedicated section below)**

4. **Execution Time Footer:**
   `<Clock>` 12px Text Tertiary + "Response in 3.4s · 3 agents" 12px Text Tertiary, margin-top 12px

5. **Response Actions Row:**
   Flex row, gap 16px, margin-top 12px:
   - `<ThumbsUp>` / `<ThumbsDown>` feedback — on click: color fills, optional comment textarea appears
   - `<Copy>` Copy — on click: icon flashes to `<Check>` for 1.5s + toast "Copied to clipboard"
   - `<Download>` Download — dropdown: PDF · PPT
   - `<Share2>` Share — generates read-only link, copies to clipboard, shows "Link valid for 7 days" toast
   - `<RefreshCw>` Regenerate — re-submits query

6. **Contextual Next-Action Chips (Generative UI):**
   2–3 chips below response, generated by agent:
   - Example after chart: "Drill down by product" · "Compare with Q2" · "Export this"
   - Style: same as suggested prompts. Click sends as new follow-up query.

#### Sub-section: Input area (sticky bottom — always visible, Base44-style)
**Background:** `rgba(255,255,255,0.88)` with `backdrop-filter: blur(16px)`
**Border-top:** `0.5px solid #E4E8F4`
**Padding:** 16px 20px

Input box (same Base44-style as dashboard query input):
- Background `#FFFFFF`, border `0.5px solid #D6DCF0`, border-radius 14px, box-shadow Level 1
- Multi-line textarea, auto-grows up to 200px, then scrolls. Focus ring: `0 0 0 3px rgba(79,110,247,0.08)`, border `#A0AEDE`, gentle `scale(1.003)` at 180ms
- Attachment pills shown above textarea if files attached — light pill: `background: #F0F2FA; border: 0.5px solid #D6DCF0`
- Below textarea: character count (right, 11px Text Tertiary) + keyboard hint "↵ Send · ⇧↵ New line" (right, 11px `#8A93B0`)

---

## 📄 PAGE 6B — GENERATIVE UI COMPONENTS (rendered inside chat responses)

These components render dynamically inside the chat response area based on agent output type.

---

### Component: INTERACTIVE CHART
Triggered when Data Analyst Agent returns visualization data.

Container:
- Background: `#FFFFFF`
- Border: `0.5px solid #D6DCF0`
- Border-radius: 12px
- Padding: 20px
- Margin: 12px 0
- Box-shadow: Level 1
- Entry animation: `opacity(0→1) + translateY(10px→0)` at 280ms ease-out, triggered as agent stream completes

Header row:
- Auto-generated title 14px 600 Text Primary (left)
- Actions (right): `<ZoomIn>` / `<ZoomOut>` · `<Maximize2>` fullscreen · `<Download>` PNG · `<Table2>` CSV · `<Sun/Moon>` chart theme toggle

Chart area:
- Height: 260px minimum
- Chart type auto-selected (Bar/Line/Pie/Scatter/Heatmap/Funnel) by agent
- Color scheme adapted to light background (custom palette: Accent Blue `#4F6EF7` · Teal `#0FC4A7` · Purple `#9B72F7` · Amber `#F7924A` · Success `#16A34A`) — all colors have sufficient contrast on white backgrounds
- Auto-generated axis labels and chart title
- Click data point: annotation tooltip appears — input field for text annotation + `<Check>` save

Fullscreen modal: opens chart in 90vw × 80vh modal, same controls, close on `×` or ESC

---

### Component: STRATEGY FRAMEWORK CARD
Triggered when Strategy Agent returns structured plan.

Container: `background: #FFFFFF; border: 0.5px solid #D6DCF0; border-radius: 12px; padding: 24px; box-shadow: Level 1`
Entry animation: `opacity(0→1) + translateY(10px→0)` at 280ms ease-out

Section header: "Strategy Recommendations" — 14px 600, Agent Strategy color, with `<ChevronDown>` toggle

**6 collapsible sections (each):**
- Trigger row: section name (Situation / Objectives / Strategy / Tactics / KPIs / Risks) 13px 600 Text Primary + `<ChevronDown>` right
- Expanded content: 14px Text Secondary, line-height 1.7
- Sections start collapsed. First one open by default.
- Left border: `2px solid rgba(74,108,247,0.4)` when expanded

**Action Plan Table (below sections):**
- Table: `width: 100%; border-collapse: collapse`
- Header row: `background: #F0F2FA`, 12px 600 Text Secondary, padding 10px 14px
- Columns: Step · Owner · Timeline · Priority · Status
- Body rows: 13px Text Primary, `border-bottom: 0.5px solid #E4E8F4`, padding 10px 14px
- Priority cell: colored badge (High=Danger, Medium=Warning, Low=Info)
- Status cell: `<Circle fill>` dot + text
- Editable cells: click to edit inline — input appears in place

**Export row (bottom):** `<FileDown>` PDF button · `<Presentation>` PPT button — ghost small buttons

**Edit & Iterate:** On text hover, a subtle `<Pen>` icon appears right-side. Click: inline prompt bar appears below the section — "Ask ESA to refine this section..." with send button.

---

### Component: COMPETITIVE MATRIX TABLE
Triggered when Research Agent returns comparison data.

Container: `background: #FFFFFF; border: 0.5px solid #D6DCF0; border-radius: 12px; box-shadow: Level 1; overflow-x: auto`
Entry animation: `opacity(0→1) + translateY(10px→0)` at 280ms ease-out

Table:
- First column (competitor names): sticky left, `background: #FFFFFF`, 13px 600 Text Primary
- Header row: feature/dimension names, 12px 600 Text Secondary, bg `#F0F2FA`
- Cells: `<Check>` (Success) or `<X>` (Danger) for binary, text for values
- Sortable headers: `<ArrowUpDown>` 12px on hover of column header
- Border: `0.5px solid #E4E8F4` between cells
- Your company row: highlighted with `background: rgba(79,110,247,0.04)`

Export row: `<Download>` CSV button

---

### Component: DOCUMENT EXCERPT CARD
Triggered when Search Agent returns document match.

Container: `background: #FFFFFF; border: 0.5px solid #D6DCF0; border-radius: 12px; padding: 16px 20px; box-shadow: Level 1`
Entry animation: `opacity(0→1) + translateY(8px→0)` at 260ms ease-out

Header row: Source badge (file type icon + source name 12px Text Tertiary) + Relevance score "94% match" in Success green + `<ExternalLink>` 14px

Document title: 15px 600 Text Primary, margin-top 8px

Excerpt text: 13px Text Secondary, line-height 1.6. Matching keywords highlighted: `background: rgba(79,110,247,0.12); border-radius: 2px; color: #0F1117`

Action row: `<Eye>` Preview · `<Download>` Download — small ghost buttons

**Preview side panel:** Slides in from right (`transform: translateX(100%→0)` at 240ms cubic-bezier(0.4,0,0.2,1)), 440px wide, background `#FFFFFF`, border-left `0.5px solid #D6DCF0`, box-shadow `−8px 0 32px rgba(79,110,247,0.06)`. Shows full document content with scrolling.

---

### Component: AGENT ORCHESTRATION FLOWBUILDER
Triggered on every multi-agent query. Rendered **open by default** (not collapsed) — agent transparency is a core ESA value, not a hidden detail. User can collapse it with `<ChevronUp>` toggle after viewing.

Container:
- Background: `#FFFFFF`
- Border: `0.5px solid #D6DCF0`
- Border-radius: 12px
- Padding: 16px 20px
- Margin: 12px 0
- Box-shadow: Level 1

Header row (flex, align-center, justify-between):
- Left: `<GitBranch>` 14px Text Tertiary + "Agent Orchestration" 13px 600 Text Primary
- Right: total execution time "Total: 3.4s" 12px mono Text Tertiary + `<ChevronUp>` collapse toggle 14px

SVG/Canvas visualization (height: 120px):
- Central "Query" node: 40px circle, `background: #F0F2FA; border: 1px solid #D6DCF0`, "Q" label 12px 600 Text Secondary — left side
- 4 agent nodes (color-coded circles, 36px each) on the right, connected by animated dashed arrows from the Query node
- Active agents: filled agent-color background + white label + glow halo `box-shadow: 0 0 10px rgba([agent-color],0.25)` + "✓" badge (12px, white, bottom-right of circle)
- Inactive agents: `background: #F7F8FC; border: 0.5px solid #E4E8F4`, dim (40% opacity)
- Connecting arrows: SVG `<path>` with `stroke-dasharray` + `stroke-dashoffset` animation — flows from Query node to each active agent node at 800ms ease
- Execution time label on each arrow: "340ms" 10px mono `#8A93B0`, centered on the path
- Arrow color: matches agent color for active, `#D6DCF0` for inactive

Below visualization — Agent breakdown table (4 rows, gap 4px):
Each row: flex, align-center, gap 10px, height 28px
- 8px dot in agent color
- Agent name 12px 600 Text Primary (e.g. "Strategy Agent")
- Status: "Used" (agent-color pill) or "Not used" (Text Tertiary, no pill)
- Task summary 12px Text Tertiary (e.g. "Generated GTM framework" / "Not needed for this query")
- Execution time (right-aligned): 11px mono Text Tertiary e.g. "1.2s" or "—"

---

## 📄 PAGE 7 — DATA SOURCES

### URL: `/data`

**Page title:** "Data Sources" + `+ Connect Source` primary button (top right)

**Upload Zone (top section):**
Large drag-and-drop area:
- Background: `rgba(79,110,247,0.03)`
- Border: `1.5px dashed rgba(79,110,247,0.22)`
- Border-radius: 16px
- Height: 180px
- Center content: `<Upload>` 32px Accent Blue + "Drop files here or click to browse" 15px Text Primary + "CSV, Excel, JSON, PDF, Word, PPT · Max 50MB" 13px Text Tertiary
- Drag-over state: border solid Accent Blue, bg `rgba(79,110,247,0.05)`, gentle `scale(1.01)` at 200ms
- After upload: progress bar fills in Accent Blue, then transitions to indexed state

**Manual Upload Button:** below zone — `<FolderOpen>` icon + "Browse files" text, ghost style

---

**Connect Cloud Sources (section below):**
Label: "Cloud & Database Connectors" — 13px 600 Text Secondary

Grid (3 cols): connector cards

Each connector card:
- Background `#FFFFFF`, border `0.5px solid #D6DCF0`, border-radius 12px, padding 20px, box-shadow Level 1
- Hover: `translateY(-2px)`, shadow deepens — 180ms
- Logo/icon (32px) + connector name 14px 600 + description 12px Text Tertiary
- CTA button: "Connect" primary small OR "Connected ✓" success state
- Connectors: Google Drive (OAuth) · SharePoint (OAuth) · AWS S3 (ARN keys) · PostgreSQL · MySQL · BigQuery · Snowflake · Notion · HubSpot · Salesforce

**Database Connector Form (modal on click):**
Modal with:
- Host text input
- Port number input
- Database name input
- Username input
- Password masked input
- Test Connection button
- Cancel / Connect buttons

---

**Active Data Sources Table (bottom section):**
Label: "Connected Sources"

Table columns: Name · Type · Status · Last Synced · Size · Actions

Each row:
- Type icon: `<FileSpreadsheet>` for CSV/Excel, `<Database>` for DB, `<Cloud>` for cloud
- Status badge: Active (Success green pill) / Syncing (amber, animated spinner) / Error (Danger red pill + retry button)
- Actions: `<Eye>` Preview · `<RefreshCw>` Sync · `<Edit2>` Rename · `<Trash2>` Delete (requires Admin; shows confirmation dialog)

**Data Preview Panel (on Preview click):**
Full-page modal OR side panel:
- Shows first 50 rows in a data table
- Column headers with detected type (Text/Number/Date/Boolean) badge
- Row count, column count at top
- Scrollable both directions

---

## 📄 PAGE 8 — REPORTS

### URL: `/reports`

**Top bar:** "Reports" title + `<Search>` input (filter by name) + type filter dropdown (PDF/PPT/CSV/PNG) + date range picker

**Report History Table:**
Table columns: Title · Generated · Type · Agents · Download · Share

Each row:
- Title: 14px Text Primary
- Generated: relative timestamp (e.g. "2 hours ago") 13px Text Tertiary
- Type badge: PDF/PPT/CSV/PNG — colored badge
- Agents: inline badges strip (compact)
- Download: `<Download>` icon + format label
- Share: `<Link2>` copy shareable link

**Generate Report Modal** (appears when "Generate Report" clicked from chat):
Full overlay modal, width 560px:
- Title: "Generate Report" 20px 600
- Report Title input: pre-filled from query text, editable
- Section selector (checkbox grid):
  - Charts & Visualizations `<BarChart2>`
  - Recommendations `<Lightbulb>`
  - Sources & Citations `<BookOpen>`
  - Action Plan Table `<CheckSquare>`
  - Raw Data Tables `<Table>`
- Workspace Logo toggle: "Include branding" — default ON if logo uploaded
- Export format tabs: PDF · PPT · CSV · PNG — one selectable at a time, OR multi-select
- Share Link option: "Generate shareable link (valid 7 days)" toggle
- Generate button: primary, shows progress spinner during generation (up to 10s)

---

## 📄 PAGE 9 — ENTERPRISE SEARCH

### URL: `/search`

**Top:** Full-width semantic search bar
- Height: 52px, background `#FFFFFF`, border `0.5px solid #D6DCF0`, border-radius 14px, padding 0 20px, box-shadow Level 1
- `<Search>` icon 20px Text Tertiary left + input 15px Text Primary + keyboard hint `⌘K` 11px Text Tertiary right
- Focus: border `#A0AEDE`, `box-shadow: 0 0 0 3px rgba(79,110,247,0.08)`, gentle `scale(1.002)` at 180ms
- Autocomplete dropdown: `#FFFFFF` bg, border `0.5px solid #D6DCF0`, shadow Level 2. Items: 36px each, `<Clock>` recent / `<FileText>` document suggestions

**Filter row (below search, gap 10px):**
- Source dropdown: "All sources" default + list of connected sources
- File type: "All types" + PDF/Word/Excel/CSV options
- Date range picker: date input range
- Team filter (Admin: all teams · Analyst: own team only)
- `<X>` clear filters button (visible when any filter active)

**Search Results (card list):**
Each result card:
- Background `#FFFFFF`, border `0.5px solid #E4E8F4`, border-radius 12px, padding 16px 20px, box-shadow Level 1
- Hover: `border-color: #A0AEDE`, `translateY(-2px)`, shadow Level 2 — 180ms transition
- Source badge: file type icon + source name 11px Text Tertiary (top-left)
- Relevance score: "94%" in Success green (top-right)
- Document title: 15px 600 Text Primary
- Excerpt: 13px Text Secondary, 2 lines. Keyword highlights in `rgba(79,110,247,0.12)` bg, `border-radius: 3px`
- Action row: `<Eye>` Preview · `<Download>` Download · `<ExternalLink>` Open source

**Preview Side Panel:**
Slides in from right (`transform: translateX(100%→0)` at 240ms cubic-bezier(0.4,0,0.2,1)), 440px, background `#FFFFFF`, padding 24px, border-left `0.5px solid #D6DCF0`, box-shadow `−8px 0 32px rgba(79,110,247,0.06)`
Header: document title + `<X>` close + `<Download>` download
Body: full document text, scrollable, same text style as excerpt
Close: click X or click outside panel

---

## 📄 PAGE 10 — TEAM MANAGEMENT

### URL: `/team`

**Top bar:** "Team" title + `+ Invite Member` primary button

**Tabs:** Members · Teams · Pending Invites
- Tab style: underline-style, 14px, active = Accent Blue underline + Text Primary, inactive = Text Tertiary

---

**Tab: Members**

Filter row: search by name/email + role filter dropdown + team filter

Table:
Columns: Member (avatar+name+email) · Role · Team · Last Active · Status · Actions

Each row:
- Avatar: 32px circle, initials or photo
- Name: 14px Text Primary, email: 12px Text Tertiary below
- Role: inline dropdown (editable by Admin, no re-login needed on change) — options: Super Admin / Admin / Analyst / Researcher / Viewer. Each has colored badge.
- Status: Active (Success pill) / Pending (Warning pill)
- Last Active: relative time 13px Text Tertiary
- Actions: `<UserMinus>` Remove (confirmation dialog: "Revoke access? Data remains.") · `<MoreHorizontal>` menu

---

**Tab: Teams**

`+ Create Team` button. Grid of team cards (3 cols):
Each card: Background `#FFFFFF`, border `0.5px solid #D6DCF0`, radius 12px, padding 20px, box-shadow Level 1
- Hover: `translateY(-2px)`, shadow Level 2 — 180ms
- Team name 15px 600 + member count 13px Text Tertiary
- Member avatars row (stacked, max 5 shown)
- Permission summary chips
- `<Edit2>` rename · `<Trash2>` delete · `<Settings>` permissions

**Team Permissions Grid (modal on Settings click):**
Matrix table: rows = features, columns = on/off toggle per feature
Features: Upload Datasets · Run AI Queries · View Reports · Download Reports · Configure LLM · Manage Data Sources · View Audit Logs

---

**Tab: Pending Invites**

Table: Email · Role · Invited By · Date Sent · Actions (`<RefreshCw>` Resend · `<X>` Cancel)

---

**Invite Member Modal:**
Modal 480px:
- Email input (multi-tag: add multiple emails, comma-separated, become pills)
- Role selector: radio cards — 5 roles with description of permissions per role
- Team assignment: dropdown (optional)
- Message field: optional personal message (optional)
- Send Invite button (primary)
- Shows count "Sending 3 invites" if multiple emails

---

---

## 📄 PAGE 10B — BI ANALYTICS DASHBOARD

### URL: `/analytics`

This page is the dedicated Business Intelligence dashboard. It uses the same 3-panel layout as the main dashboard but replaces the chat input area with a rich, multi-widget BI surface — inspired by enterprise BI tools (Tableau, Looker, Power BI). All data is populated from `MOCK_BI_PANELS` and `MOCK_DASHBOARD_METRICS` in the mock data layer.

**Page title (in left sidebar active state):** `<BarChart2>` Analytics

---

### BI DASHBOARD — TOP CONTROL BAR (height 52px)

Full-width, border-bottom `0.5px solid #E4E8F4`, padding 0 24px, flex row, align-center, justify-between.

**Left:**
- Page title "Analytics" 16px 600 Text Primary
- Date range picker: pill dropdown — "Last 30 days ▾" options: Today · Last 7 days · Last 30 days · This Quarter · Custom Range
- `<RefreshCw>` 16px Text Tertiary with "Last updated 2 min ago" 12px Text Tertiary

**Right:**
- `<Download>` Export — dropdown: Export PDF · Export CSV
- `<Plus>` Add Widget — opens widget picker modal

---

### BI DASHBOARD — KPI METRIC STRIP (4 cards, 1-row grid)

Below the control bar, padding 20px 24px 0:
4 equal-width metric cards in a horizontal row, gap 16px.

Each KPI card:
- Background: `#FFFFFF`, border `0.5px solid #E4E8F4`, border-radius 12px, padding 16px 20px, box-shadow Level 1
- Hover: `translateY(-2px)`, shadow Level 2
- **Metric value:** 32px Cal Sans 700 Text Primary
- **Label:** 12px Text Tertiary above value
- **Change indicator:** `<TrendingUp>` or `<TrendingDown>` 14px + percentage badge: Success green (up) or Danger red (down), 12px 500

KPI cards (from `MOCK_DASHBOARD_METRICS.thisMonth`):
1. **Total Queries** — "312" · ↑ 18% vs last month
2. **Reports Generated** — "47" · ↑ 12%
3. **Active Users** — "12" · → same
4. **Avg Response Time** — "2.8s" · ↓ 0.3s improved

---

### BI DASHBOARD — WIDGET GRID

Below KPI strip, padding 20px 24px. CSS Grid: `grid-template-columns: repeat(3, 1fr)`, gap 16px. Widgets span columns as specified.

**Widget 1 — Query Volume Trend (spans 2 cols):**
- Title: "Query Volume — Last 21 Days" 14px 600 Text Primary
- Chart type: Line chart with area fill (Recharts `<AreaChart>`)
- Data: `MOCK_DASHBOARD_METRICS.thisMonth.queryTrend` (21 data points)
- Area fill: `linear-gradient(180deg, rgba(79,110,247,0.15) 0%, rgba(79,110,247,0.0) 100%)`
- Line stroke: `#4F6EF7`, stroke-width 2
- Hover tooltip: date + query count in `#FFFFFF` card with shadow
- Chart controls (top-right): `<Maximize2>` fullscreen · `<Download>` PNG

**Widget 2 — Agent Usage Distribution (1 col):**
- Title: "Agent Usage" 14px 600
- Chart type: Donut/Pie chart (Recharts `<PieChart>`)
- Data: `MOCK_CHARTS.chart_agent_usage`
- Colors: agent colors (Navy, Teal, Purple, Amber)
- Center label: "4 Agents" 14px 600 inside donut hole
- Legend below: 4 rows, agent name + % + colored dot

**Widget 3 — Revenue by Region (1 col):**
- Title: "Revenue by Region — MTD (₹ Lakhs)" 14px 600
- Chart type: Horizontal bar chart
- Data: `MOCK_BI_PANELS.revenueByRegion.data`
- Bar color: Accent Blue gradient fill
- Value labels on right end of each bar: 12px Text Primary

**Widget 4 — Agent Performance Table (spans 2 cols):**
- Title: "Agent Performance Summary" 14px 600
- Table using TanStack Table, sortable by all columns
- Data: `MOCK_BI_PANELS.agentPerformance.rows`
- Columns: Agent · Queries Handled · Avg Response Time · Success Rate · Trend sparkline
- Trend sparkline (last 7 days): 80px inline SVG mini line chart per row in Accent Blue
- Row hover: bg `#F7F8FC`
- Agent cell: colored dot 8px + name 13px

**Widget 5 — Report Type Distribution (1 col):**
- Title: "Reports by Format" 14px 600
- Chart type: Grouped bar chart (PDF / PPT / DOCX)
- Data: `MOCK_DASHBOARD_METRICS.thisMonth.reportsByType`
- Colors: Danger (PDF) · Purple (PPT) · Teal (DOCX)

**Widget 6 — Top Queries (spans 3 cols, full-width):**
- Title: "Most Frequent Queries — This Month" 14px 600
- Layout: Horizontal tag cloud OR ranked list (5 rows)
- Data: `MOCK_DASHBOARD_METRICS.thisMonth.topQueries`
- Each row: rank number 12px Text Tertiary · query text 14px Text Primary · bar fill showing relative frequency · `<RotateCcw>` re-run button (14px Accent Blue, appears on hover)

**Widget Add/Remove:**
- Each widget has a top-right `<MoreHorizontal>` menu: Expand fullscreen · Download · Remove from dashboard
- Widget grid is draggable (react-grid-layout or similar). Drag handle: `<GripVertical>` 14px Text Tertiary, appears on widget hover top-left corner.

---

## 📄 PAGE 10C — USER PROFILE (Enriched)

### URL: `/profile`

A dedicated full-page profile surface. NOT a modal. Accessed via left sidebar bottom user chip → "Profile Settings". The page uses the standard 3-panel shell but replaces main content with the profile layout.

---

### PROFILE — HEADER CARD (full-width, margin-bottom 24px)

`background: linear-gradient(135deg, rgba(79,110,247,0.06) 0%, rgba(15,196,167,0.04) 100%); border: 0.5px solid #E4E8F4; border-radius: 16px; padding: 32px; position: relative`

**Left section (flex row, gap 20px, align-center):**
- **Avatar:** 80px circle. If photo uploaded: image with `object-fit: cover`. If no photo: initials in 28px Cal Sans 600, bg `linear-gradient(135deg, #4F6EF7 0%, #9B72F7 100%)`, text white. Hover overlay: `<Camera>` icon 20px white with semi-transparent bg — on click: opens photo crop upload modal.
- **Identity block:**
  - Full name: 22px Cal Sans 600 Text Primary
  - Designation + Org: "VP of Strategy · Acme Corp" 14px Text Secondary
  - `<MapPin>` 14px Text Tertiary + Country: "India" 13px Text Tertiary
  - Tag row: Plan badge "Growth Plan" in Accent Blue pill + Member since "Sep 2024" 12px Text Tertiary

**Right section (top-right of card, flex row gap 8px):**
- `<Edit2>` "Edit Profile" — ghost button 36px
- `<Shield>` "Security" — ghost button 36px

**Stats strip (below identity block, border-top 0.5px #E4E8F4, margin-top 20px, padding-top 16px):**
4 stat chips in a row, gap 24px:
- `<MessageSquare>` 312 Queries this month
- `<FileText>` 47 Reports generated
- `<Zap>` 4 Agents used
- `<Calendar>` Last active: Today, 2:32 PM

---

### PROFILE — TAB NAVIGATION

5 tabs below header card: **Overview · Activity · Reports · Preferences · Security**
- Active: bottom `2px solid #4F6EF7` underline + Text Primary
- Inactive: Text Secondary, hover Text Primary

---

### Tab: OVERVIEW

**2-column layout (60% left / 40% right), gap 20px:**

**Left column:**

*Personal Information section:*
Card (Level 1), padding 24px, border-radius 12px, title "Personal Information" 15px 600 + `<Edit2>` icon button top-right
Fields (read-only view, 2-col grid, gap 16px):
- Full Name · Email · Phone (optional) · Role/Designation · Department · Manager
- Each field: label 12px Text Tertiary + value 14px Text Primary below
- `<Lock>` 12px Text Tertiary next to SSO-locked fields

*Organization section:*
Same card style — Workspace Name · Industry · Team Size · Location · Timezone
All editable on click (inline edit: click field → input appears in place with Save/Cancel)

**Right column:**

*Agent Preferences card:*
Title: "Preferred Agents" 15px 600
4 agent toggle rows: each row `flex align-center justify-between gap 12px`:
- Agent color dot 8px + name 14px + description 12px Text Tertiary
- Toggle switch: on/off. Agents enabled by default. Off = excluded from queries by default (user can still override per query)

*Usage Summary mini-chart:*
Title: "My Query Volume — Last 7 Days" 14px 600
Inline sparkline bar chart (7 bars, Accent Blue, height 80px, rounded bars `border-radius: 4px`)
Data from `MOCK_DASHBOARD_METRICS`

---

### Tab: ACTIVITY

Full-width scrollable log of the current user's actions:
- Filter bar: Action type dropdown · Date range picker · `<Download>` Export CSV
- Activity table (same style as Audit Log table but filtered to current user):
  Columns: Timestamp · Action · Module · Session/Query preview · Duration
  - Timestamp: mono 13px
  - Action: badge colored by type (Query = Accent Blue · Upload = Teal · Download = Purple · Login = gray)
  - Session preview: first 40 chars of query text, truncated, 13px Text Secondary
  - Duration: mono 12px Text Tertiary

Pagination below table.

---

### Tab: REPORTS

Grid of reports generated by this user (same layout as `/reports` page but scoped to current user).
Filter: format · date range.

---

### Tab: PREFERENCES

**Notification Preferences:**
Card, title "Notifications" 15px 600. Toggle list (each row: label 14px + description 12px Text Tertiary + toggle switch right):
- Query complete notification · Report ready alert · Team activity digest (weekly) · Product updates

**Default Language:** Dropdown — English (default) · Hindi · Tamil · others

**Default Currency:** INR / USD pill toggle

**Default Export Format:** PDF / PPT / CSV radio group

**AI Behavior Preferences:**
- Response verbosity: Concise · Balanced · Detailed — 3 pill options
- Always show Agent Orchestration diagram: toggle (default ON)
- Auto-suggest follow-up prompts: toggle (default ON)

---

### Tab: SECURITY

**Password / SSO Status:**
Card — "Your account uses Microsoft SSO — no password to manage" with `<Shield>` 20px Success green icon

**Active Sessions table:**
Columns: Device · Browser · Location · Last Active · `<LogOut>` Revoke
Rows from mock: MacBook Chrome India (current · "This session" green badge) · iPhone Safari India · Windows Chrome India

**Two-Factor Authentication:**
Toggle row: "Enable 2FA" + description "Adds an extra layer of security" + toggle switch (default OFF)
On enable: shows QR code + backup codes flow

**API Keys (for developer-role users only):**
Table: Key name · Created · Last used · Scope · `<Copy>` · `<Trash2>` Revoke
`+ Generate New Key` button — opens modal with name input + scope checkboxes

---

### URL: `/settings`

**Layout:** 2-panel — settings navigation list (left 220px) + settings content area (right remainder)

**Left panel settings nav (vertical list):**
Items with icons and labels:
1. `<User>` Profile
2. `<Building2>` Workspace
3. `<Bot>` LLM Configuration
4. `<Database>` Data Sources
5. `<Bell>` Notifications
6. `<Shield>` Security
7. `<Key>` API Keys
8. `<CreditCard>` Plans & Billing
9. `<Palette>` Appearance
10. `<BookOpen>` Explainer Resources

Same nav item style as sidebar. Clicking updates right panel content.

---

### Settings: LLM CONFIGURATION

**Section title:** "LLM Configuration" + "Configure AI providers for your workspace" — 14px Text Secondary

**Current config card:** shows active provider + model + masked key last 4 chars + green "Connected" badge

**Add / Edit Config form:**

1. **LLM Provider dropdown:** OpenAI · Anthropic · Azure OpenAI · Google Gemini · Custom
   Each option shows provider logo in dropdown

2. **API Key input:**
   - Password-masked field, height 40px
   - Right side: `<Eye>` toggle visibility · `<Copy>` copy
   - Label: "API Key" + `<Info>` tooltip: "Where to find your API key" with link to provider docs
   - Below: "Stored encrypted (AES-256). Never logged." 12px Text Tertiary

3. **Model Selection dropdown:** Dynamic based on provider
   - OpenAI: gpt-4o · gpt-4-turbo · gpt-3.5-turbo
   - Anthropic: claude-3-5-sonnet · claude-3-opus · claude-3-haiku
   - Gemini: gemini-1.5-pro · gemini-1.5-flash
   - Azure: manual entry

4. **Azure Endpoint URL** (conditional — shown only when Azure selected):
   Text input, placeholder "https://your-resource.openai.azure.com/"

5. **Temperature slider:**
   - Range 0.0 to 1.0, step 0.1
   - Custom styled track: `background: linear-gradient(to right, #4F6EF7, #F7924A)`
   - Thumb: 18px circle `#4F6EF7` bg, white border 2px
   - Live value label right of slider
   - Below: "Creative ← → Precise" labels at ends

6. **Max Tokens input:** Number input, range 100–32000, placeholder 4096

7. **Test Connection button:**
   - Ghost style with `<Zap>` icon
   - On click: spinner → shows "Connection successful ✓" green or "Failed — Invalid API key" red inline below button

8. **Fallback to Default toggle:**
   - Toggle switch: 32px track, 18px thumb
   - On: Success green track
   - Off: bg `#D6DCF0`
   - Label: "Fall back to ESA default LLM if custom key fails"

9. **Save button:** Primary, full-width, "Save Configuration"

---

### Settings: API KEY GENERATION

**Active Keys table:**
Columns: Name · Scope · Created · Last Used · Status · Actions (Revoke)
Each status: Active (green) / Revoked (red strikethrough)

**Generate New Key button** (top-right of section):

Modal:
- Key Name input: placeholder "Zapier Integration"
- Permission Scope multi-select checkboxes: `[Read]` `[Query]` `[Write]`
- Expiry Date picker: optional, date input
- Generate button

**Key reveal state (after generation):**
- Full-width code block: monospace font, shows full key
- Warning banner: `<AlertTriangle>` amber + "Save this key now — it won't be shown again"
- Copy button next to key: icon flashes to check on click
- Done button

---

### Settings: PLANS & BILLING

**Current Plan card:**
- Left: plan name badge + plan features summary
- Right: next billing date + amount + `Upgrade` button (primary) + `Cancel` text link

**Currency Toggle + Billing Cycle Toggle** (same as landing page pricing)

**Plan comparison cards** (same as landing page but within settings layout)

**Payment Method section:**
- Current method: card ending in ×××× 4242 + `<Edit2>` change
- Add method: form — Card (Stripe) / UPI / Net Banking
- GST details form for INR billing: GSTIN input

**Invoice History table:**
Columns: Invoice # · Date · Plan · Amount · Status · Download PDF
Pagination below

---

### Settings: AUDIT LOGS

**Filter bar (top):**
- User search dropdown
- Action multi-select: Login · Upload · Query · Role Change · API Call · Report Download · Config Change
- Team dropdown
- Date range picker: start + end date
- `Export` button — dropdown: CSV / PDF
- `Live feed` toggle with pulse indicator when active

**Log table:**
Columns: Timestamp · User (avatar+name) · Action · Module · IP Address · Status
- Timestamp: mono font 13px
- User: 32px avatar + name
- Action: action-type badge (colored by category)
- Module: 12px Text Tertiary
- IP: mono 12px Text Tertiary
- Status: Success (green) / Fail (red)

Immutable: no edit/delete controls. Pagination. Retention note at bottom: "Logs retained for 90 days · Extendable on Enterprise plan"

---

### Settings: APPEARANCE

**Theme section:**
3 theme option cards (grid):
- Light (default) · Dark · System
- Each: preview thumbnail (small screenshot of UI) + label + `<Check>` if selected
- Active: `border: 1.5px solid #4F6EF7`

**Chart Color Theme:**
5 preset swatches (pill of 4 colors each):
- Default (ESA) · Blue Ocean · Warm Earth · Monochrome · High Contrast
- Click to select, preview updates chart on page if visible

**Font Size:**
Toggle: Default (14px) · Compact (13px) · Large (16px)

---

## 📄 PAGE 12 — PLANS & BILLING (Full Page)

### URL: `/billing`

Same content as Settings > Plans & Billing but in a dedicated full page.
Adds: **Plan Comparison full table** showing all features across all tiers in a detailed scrollable comparison table.

---

## 🔔 GLOBAL UI COMPONENTS

### Toast Notifications
Position: bottom-right, stack vertically (gap 8px), z-index 9999
Size: auto width (max 360px), height auto, min 48px
Background: `#FFFFFF`, border: `0.5px solid #D6DCF0`, border-radius: 10px, padding: 12px 16px, shadow Level 2
Content: icon 16px + title 14px 500 Text Primary + optional description 13px Text Secondary
Types: Success (green `<CheckCircle>`) / Error (red `<XCircle>`) / Warning (amber `<AlertTriangle>`) / Info (blue `<Info>`)
Auto-dismiss: 4 seconds. `<X>` manual dismiss.
Enter animation: slide-up + fade from bottom-right. Exit: slide-right + fade.

### Modals
Backdrop: `rgba(15,17,23,0.45)`, click-outside to close
Container: centered, width varies per modal (defined per use case), max 640px, bg `#FFFFFF`, border `0.5px solid #D6DCF0`, radius 20px, shadow Level 3
Header: title 18px 600 Text Primary + `<X>` close button top-right
Body: scrollable if content > 70vh
Footer: action buttons right-aligned (secondary cancel + primary confirm), divider above
Open/close animation: `scale(0.95→1) + opacity(0→1)` at 220ms cubic-bezier(0.34, 1.56, 0.64, 1)

### Confirmation Dialog
Small modal 360px for destructive actions (delete, revoke, remove)
Icon: `<AlertTriangle>` 24px Warning center
Title: "Are you sure?" 16px 600 Text Primary
Body: consequence description 14px Text Secondary
Buttons: `Cancel` (ghost) + `[Action]` (Danger bg: `#EF4444`, white)

### Empty States
Each empty section has:
- Illustration: simple SVG icon 64px, opacity 0.4
- Title: 16px 500 Text Primary
- Description: 14px Text Secondary
- CTA button if applicable

### Loading Skeleton
For list/table rows: animated shimmer bars (border-radius 4px, bg `#F0F2FA` with shimmer overlay)
Shimmer: `background: linear-gradient(90deg, #F0F2FA 25%, #E4E8F7 50%, #F0F2FA 75%)` with `background-size: 200% 100%` keyframe at 1.4s loop

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px – 1199px
- Desktop: ≥ 1200px

**Responsiveness is first-class — not an afterthought.** Every layout must be fluid. Use CSS Grid and Flexbox with `min()`, `clamp()`, and `auto-fill` so components resize gracefully before breakpoints are hit.

**Mobile adaptations (< 768px):**
- Left sidebar: hidden by default (`transform: translateX(-100%)`), slides in as overlay on hamburger tap at 260ms cubic-bezier(0.4,0,0.2,1). Backdrop overlay `rgba(15,17,23,0.3)` behind drawer.
- 3-panel dashboard: single column stack (sidebar → content → right panel, each full-width)
- Right panel: accessible via a bottom sheet (slide-up from bottom, 75vh max, draggable handle at top)
- Query input: always full-width at bottom, `position: fixed; bottom: 0; left: 0; right: 0`, safe-area-inset padding for iOS home bar
- Agent badges: horizontal scroll overflow with `overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none`
- Feature cards (landing): single column, full-width, gap 16px
- Pricing cards: single column stack
- Navigation links: replaced by slide-down drawer at 260px wide, opened by hamburger icon
- Chat history sidebar: hidden by default, accessible via `<PanelLeft>` icon toggle in top bar
- Generative UI components (charts, tables): `overflow-x: auto` wrappers with minimum content width preserved; touch-scrollable

**Tablet adaptations (768px–1199px):**
- Left sidebar: collapsed to 56px icon-only mode by default; expandable on hover or tap
- Right panel: hidden by default; accessible via toggle icon in top bar
- Feature cards: 2-column grid
- Dashboard 3-panel: left sidebar (56px) + main content (full remaining) — right panel slides in as drawer
- Pricing cards: 2-column (Starter + Growth side by side, Enterprise full-width below)

**Desktop (≥ 1200px):**
- Full 3-panel layout as specified per page
- All panels visible simultaneously
- Hover interactions fully active

---

## ⚡ TECHNICAL NOTES FOR IMPLEMENTATION

1. **State management:** Use Zustand or React Context for: auth state · workspace context · chat sessions · agent status · theme
2. **Real-time:** WebSocket connection for agent processing states, audit log live feed, data source sync status
3. **Streaming:** AI responses stream token-by-token. Each Generative UI component appears progressively as its agent completes (not waiting for all agents)
4. **Charts:** Use Recharts or Visx. Custom dark theme variables to match design system
5. **Tables:** Use TanStack Table for sortable, filterable, paginated tables
6. **Form validation:** React Hook Form + Zod schema validation
7. **File uploads:** React Dropzone with progress tracking
8. **Code splitting:** Lazy-load each route/page. Preload dashboard after auth
9. **Performance targets:** Dashboard load < 2s · First query response < 8s P95
10. **Accessibility:** WCAG 2.1 AA. All interactive elements keyboard-navigable. ARIA labels on icon-only buttons.

---

## 🗄️ MOCK DATA LAYER — Complete Seed Dataset for Testing

All mock data below must be used to populate every page, component, and state in the application during development and demo mode. The mock layer must be importable from a single `mockData.ts` file and consumed everywhere real API calls would occur. Use a `DEMO_MODE = true` flag that can be toggled to swap real API calls for mock responses.

---

### Mock Users

```ts
const MOCK_USERS = [
  {
    id: "usr_001",
    name: "Arjun Mehta",
    email: "arjun.mehta@acmecorp.com",
    role: "Admin",
    designation: "VP of Strategy",
    industry: "SaaS",
    country: "India",
    avatar: null, // render initials "AM"
    plan: "Growth",
    workspace: "Acme Strategy Hub",
    joinedAt: "2024-09-15",
    lastActive: "2026-05-20T14:32:00Z",
    queriesThisMonth: 142,
    reportsGenerated: 28,
    agentsUsed: ["strategy", "data", "search", "research"],
    preferredCurrency: "INR",
    theme: "light",
  },
  {
    id: "usr_002",
    name: "Priya Nair",
    email: "priya.nair@acmecorp.com",
    role: "Analyst",
    designation: "Senior Business Analyst",
    industry: "SaaS",
    country: "India",
    avatar: null, // initials "PN"
    plan: "Growth",
    workspace: "Acme Strategy Hub",
    joinedAt: "2024-11-02",
    lastActive: "2026-05-21T09:14:00Z",
    queriesThisMonth: 87,
    reportsGenerated: 14,
    agentsUsed: ["data", "search"],
    preferredCurrency: "INR",
    theme: "light",
  },
  {
    id: "usr_003",
    name: "Rohan Sharma",
    email: "rohan.sharma@acmecorp.com",
    role: "Viewer",
    designation: "Finance Manager",
    country: "India",
    joinedAt: "2025-01-10",
    lastActive: "2026-05-19T17:45:00Z",
    queriesThisMonth: 23,
    reportsGenerated: 4,
  },
];
```

---

### Mock Chat Sessions

```ts
const MOCK_SESSIONS = [
  {
    id: "sess_001",
    title: "Q3 Revenue Analysis & Forecast",
    createdAt: "2026-05-21T10:15:00Z",
    agentsUsed: ["strategy", "data"],
    messages: [
      {
        role: "user",
        content: "Analyze our Q3 revenue performance and forecast Q4 based on current trends.",
        timestamp: "2026-05-21T10:15:22Z",
      },
      {
        role: "assistant",
        agentsUsed: ["strategy", "data"],
        executionTime: "3.4s",
        content: "Based on your uploaded Q3 data and historical patterns, here is the full analysis...",
        generativeComponents: ["chart_revenue_q3", "strategy_framework_q4"],
        timestamp: "2026-05-21T10:15:26Z",
      },
    ],
  },
  {
    id: "sess_002",
    title: "Competitor Benchmarking — CRM SaaS",
    createdAt: "2026-05-20T14:30:00Z",
    agentsUsed: ["research", "search"],
    messages: [
      {
        role: "user",
        content: "Benchmark our CRM product against Salesforce, HubSpot, and Zoho on pricing, features, and NPS.",
        timestamp: "2026-05-20T14:30:10Z",
      },
      {
        role: "assistant",
        agentsUsed: ["research", "search"],
        executionTime: "5.1s",
        content: "Here is the competitive benchmarking report across Salesforce, HubSpot, and Zoho...",
        generativeComponents: ["competitive_matrix_crm"],
        timestamp: "2026-05-20T14:30:15Z",
      },
    ],
  },
  {
    id: "sess_003",
    title: "HR Leave Policy — Remote Work Rules",
    createdAt: "2026-05-19T11:00:00Z",
    agentsUsed: ["search"],
    messages: [
      {
        role: "user",
        content: "Find our HR policy on remote work leave entitlements for employees in Tier 2 cities.",
        timestamp: "2026-05-19T11:00:05Z",
      },
      {
        role: "assistant",
        agentsUsed: ["search"],
        executionTime: "1.2s",
        content: "I found 3 relevant documents in your HR knowledge base...",
        generativeComponents: ["document_excerpt_hr"],
        timestamp: "2026-05-19T11:00:06Z",
      },
    ],
  },
];
```

---

### Mock Chart Data (for Data Analyst Agent responses)

```ts
const MOCK_CHARTS = {
  chart_revenue_q3: {
    type: "bar",
    title: "Q3 Monthly Revenue (₹ Lakhs)",
    data: [
      { month: "Jul", revenue: 48.2, target: 45 },
      { month: "Aug", revenue: 53.7, target: 50 },
      { month: "Sep", revenue: 61.4, target: 58 },
    ],
    insight: "September exceeded target by 5.8% — driven by enterprise tier upgrades.",
  },
  chart_churn_trend: {
    type: "line",
    title: "Monthly Churn Rate (%)",
    data: [
      { month: "Jan", churn: 3.2 }, { month: "Feb", churn: 2.8 },
      { month: "Mar", churn: 2.5 }, { month: "Apr", churn: 2.9 },
      { month: "May", churn: 2.1 },
    ],
    insight: "Churn reduced 34% YTD. Onboarding improvements drove May low.",
  },
  chart_agent_usage: {
    type: "pie",
    title: "Agent Usage Distribution",
    data: [
      { agent: "Strategy", usage: 34 },
      { agent: "Data", usage: 28 },
      { agent: "Research", usage: 22 },
      { agent: "Search", usage: 16 },
    ],
  },
};
```

---

### Mock BI Dashboard Data

```ts
const MOCK_DASHBOARD_METRICS = {
  today: {
    queries: 18,
    reports: 4,
    agentsUsed: 3,
    avgResponse: "2.8s",
  },
  thisMonth: {
    totalQueries: 312,
    totalReports: 47,
    activeUsers: 12,
    topAgent: "Strategy",
    queryTrend: [22, 18, 31, 27, 34, 28, 40, 35, 38, 29, 44, 47, 42, 39, 51, 46, 48, 43, 55, 49, 52],
    reportsByType: { pdf: 21, ppt: 14, docx: 12 },
    topQueries: [
      "Q3 revenue analysis",
      "Competitor benchmark",
      "HR leave policy",
      "GTM strategy FY27",
      "Market size India SaaS",
    ],
  },
  dataSources: {
    connected: 5,
    syncing: 1,
    error: 0,
  },
};

const MOCK_BI_PANELS = {
  revenueByRegion: {
    type: "bar",
    title: "Revenue by Region — MTD",
    data: [
      { region: "North", value: 38.4 },
      { region: "South", value: 27.1 },
      { region: "West", value: 45.8 },
      { region: "East", value: 19.3 },
    ],
  },
  queryVolumeHeatmap: {
    type: "heatmap",
    title: "Query Volume by Hour × Day",
    description: "Peak usage: Mon–Wed, 10 AM–2 PM IST",
  },
  agentPerformance: {
    type: "table",
    title: "Agent Performance Summary",
    rows: [
      { agent: "Strategy", queries: 107, avgTime: "3.1s", successRate: "98.1%" },
      { agent: "Data", queries: 87, avgTime: "2.4s", successRate: "99.3%" },
      { agent: "Research", queries: 69, avgTime: "4.7s", successRate: "96.5%" },
      { agent: "Search", queries: 49, avgTime: "1.1s", successRate: "99.8%" },
    ],
  },
};
```

---

### Mock Data Sources

```ts
const MOCK_DATA_SOURCES = [
  { id: "ds_001", name: "Q3 Sales Report.xlsx", type: "spreadsheet", status: "active", lastSync: "2026-05-21T08:00:00Z", rows: 4820 },
  { id: "ds_002", name: "HR Policies v4.pdf", type: "pdf", status: "active", lastSync: "2026-05-18T10:30:00Z", pages: 64 },
  { id: "ds_003", name: "Acme Postgres (Prod)", type: "database", status: "syncing", lastSync: "2026-05-21T14:00:00Z", tables: 38 },
  { id: "ds_004", name: "Marketing Campaigns.csv", type: "csv", status: "active", lastSync: "2026-05-20T16:45:00Z", rows: 1230 },
  { id: "ds_005", name: "Competitor Research Pack.docx", type: "document", status: "active", lastSync: "2026-05-17T12:00:00Z", wordCount: 12400 },
];
```

---

### Mock Audit Logs

```ts
const MOCK_AUDIT_LOGS = [
  { id: "log_001", timestamp: "2026-05-21T14:32:11Z", user: "Arjun Mehta", action: "Query", module: "AI Chat", ip: "103.45.12.88", status: "Success" },
  { id: "log_002", timestamp: "2026-05-21T13:58:44Z", user: "Priya Nair", action: "Upload", module: "Data Sources", ip: "103.45.12.91", status: "Success" },
  { id: "log_003", timestamp: "2026-05-21T12:11:02Z", user: "Arjun Mehta", action: "Report Download", module: "Reports", ip: "103.45.12.88", status: "Success" },
  { id: "log_004", timestamp: "2026-05-20T17:45:30Z", user: "Rohan Sharma", action: "Login", module: "Auth", ip: "182.73.4.22", status: "Success" },
  { id: "log_005", timestamp: "2026-05-20T15:22:09Z", user: "Priya Nair", action: "API Call", module: "LLM Config", ip: "103.45.12.91", status: "Fail" },
];
```

---

### Mock Agent Orchestration States (for transparency bar simulation)

```ts
const MOCK_AGENT_RUNS = {
  multiAgent: {
    query: "Analyze Q3 performance and benchmark against top 3 competitors",
    stages: [
      { agent: "strategy", status: "active", startMs: 0, endMs: 1200, message: "Generating GTM framework..." },
      { agent: "data", status: "pending→active", startMs: 400, endMs: 2100, message: "Analyzing Q3 revenue data..." },
      { agent: "research", status: "pending→active", startMs: 800, endMs: 3400, message: "Scanning competitor benchmarks..." },
      { agent: "search", status: "skipped", message: "Not needed for this query" },
    ],
    totalMs: 3400,
  },
  singleAgent: {
    query: "Find our remote work leave policy",
    stages: [
      { agent: "search", status: "active", startMs: 0, endMs: 1150, message: "Retrieving documents from 3 sources..." },
    ],
    totalMs: 1150,
  },
};
```

---
*End of ESA Lovable UI Design Prompt — v3.0*
*Total modules covered: 22 | Total pages: 14 | Total components: 250+*
*v3 additions: Persistent Agent Transparency Bar · Active Agent Color Highlighting · Full Mock Data Layer · Adya-style Architecture Flow Hero · Closable Left & Right Sidebars · BI Analytics Dashboard · Enriched User Profile (5 tabs)*
