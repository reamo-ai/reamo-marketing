# Reamo Marketing Site — Cursor Spec

## Project
Rebuild reamo.ai as a Next.js 14 static marketing site using Tailwind CSS.
Match the visual identity of app.reamo.ai exactly.
Single page. No CMS. No auth.

---

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- next/font/google — Inter
- Static export or Vercel/Railway deployment
- No backend, no API routes

---

## Design Tokens

### globals.css — paste this exactly
```css
:root {
  --color-background: #0a0a0f;
  --color-surface: #14141e;
  --color-input: #1c1c28;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-accent: #00d4a0;
  --color-text-primary: #ffffff;
  --color-text-secondary: #9999aa;
  --font-inter: 'Inter', system-ui, sans-serif;
}

body {
  background-color: var(--color-background);
  color: var(--color-text-primary);
  font-family: var(--font-inter);
}
```

### tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        input: 'var(--color-input)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '0.25': '0.0625rem',
      },
    },
  },
  plugins: [],
}
```

---

## Font Setup (root layout)
```tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

---

## Page Structure (top to bottom)

### 1. Nav
- Left: Reamo logo
- Right: "Login" button → links to https://app.reamo.ai
- Sticky, minimal, dark background

### 2. Hero
- Eyebrow: "Meet The AI Middle Office for Real Estate Agents"
- H1: "Admin handled while you talk on the phone."
- Subhead: "Built for top-producing agents who want to focus on clients, not admin. Reamo is the AI that connects to your existing business phone system and creates real estate-specific notes, calendar updates, and CRM-ready sheets — automatically while you talk. No app to learn. No workflow to change. Make your calls, and everything else happens in the background."
- CTA button: "Apply for an invite" → /request-access
- Below CTA: video embed (placeholder `<video>` tag — src TBD)

### 3. Features Grid
Headline: "All of the admin you already do, and everything you forget to do."
Four cards:
1. **Real Estate Call Notes** — Post-call summaries and running client notes, written automatically and trained on specialized real estate terminology - not generalized.
2. **Calendar Managed** — Appointments created, updated, and protected from double-booking. Reamo handles the logistics so you don't have to.
3. **Life Events Captured** — Job changes, milestones, and moving timelines flagged for follow-up. Nothing said on a call is ever lost or forgotten.
4. **CRM-Ready Sheets** — Quickly export CSV straight from your Reamo dashboard and right into your CRM. No more manual entry.

### 4. How It Works
Section label: "How it works"
- H2: "Talk to your clients. Sell real estate."
- Body: "Connect Reamo to your business phone system, and start talking. You take and make calls like you always do. Reamo listens automatically in the background — no third party apps, no recording buttons, nothing to think about."
- Video embed (placeholder — src TBD)
- H2: "Reamo does the rest."
- Body: "Call summary written. Action items flagged. CRM notes produced. Life events captured. Calendar updated — in seconds, not days."

### 5. Pricing
- Label: "Pricing"
- No headline. Pricing table renders directly below the label.

#### Pricing Table Component
Convert `/components/PricingTable.tsx` from the uploaded `reamo_pricing_table_v5.html`. Full spec:

**Fonts used in the HTML file:** Montserrat (headings/plan names) + DM Sans (body). Both are already loaded in the root layout — do not re-add them.

**Extra CSS tokens needed (add to globals.css):**
```css
--text-muted: #6b6b7a;
--purple: #7c3aed;
--purple-dim: rgba(124, 58, 237, 0.12);
--border-purple: rgba(124, 58, 237, 0.35);
--reamo-green-dim: rgba(0, 212, 160, 0.12);
--border-green: rgba(0, 212, 160, 0.35);
```

**Billing toggle:**
- Monthly / Annual pill toggle
- Annual prices: Agent $63, Team $55, Brokerage $47 (save 20%)
- Monthly prices: Agent $79, Team $69, Brokerage $59
- Toggle appends `?interval=annual` to CTA hrefs when annual is active
- "Save 20% with Annual" label below toggle

**4 plan cards (4-column grid):**

| Plan | Target | Monthly | Annual | CTA |
|---|---|---|---|---|
| Agent | Individual agents | $79/mo | $63/mo | https://app.reamo.ai/signup |
| Team | Up to 25 agents | $69/seat/mo | $55/seat/mo | https://app.reamo.ai/signup/team |
| Brokerage | 26–500 agents | $59/seat/mo | $47/seat/mo | https://app.reamo.ai/signup/team |
| Enterprise | 500+ agents | "Let's talk." | Custom annual contract | mailto:sales@reamo.ai |

**Agent features:** Call Notes, Real-time CRM sheets, Life events flagged, Follow-ups logged, Dotloop integration, Google calendar management, SMS AI agent (100 msg/mo), 30-day data portability

**Team features:** Everything in Agent, SMS AI agent (200 msg/mo), Team leader dashboard, Seat management, Single invoice, Email support

**Brokerage features:** Everything in Team, SMS AI agent (300 msg/mo), Brokerage analytics, Adoption reporting, Dedicated onboarding, Priority support

**Enterprise features:** Everything in Brokerage, Unlimited SMS (fair use), Custom SLA, Quarterly business review, Agent data portability, Dedicated success manager, White-glove onboarding

**Card styling:**
- Standard cards: `--card` background, `--border` border, teal checkmarks (#00d4a0), hover lifts 2px with teal border glow and top-edge gradient line
- Enterprise card: purple gradient background (`linear-gradient(145deg, #1a1428, #14141e)`), purple border, purple checkmarks (#a78bfa), purple hover glow
- All cards: fadeUp animation on load with staggered delay

**Footer below grid:**
"All plans include a 30-day grace period for data portability. SMS overages billed at $0.08/message. Questions? sales@reamo.ai"

### 6. Origin Story
- Label: "Why we built Reamo"
- H2: "From Bespoke to Breakthrough"
- Body: "Reamo was built by Beranguard, an AI venture studio. After 15 years in the trenches with world-class brokers, high-performing agents, and the tech giants that power them, we noticed a recurring problem: most automation feels 'robotic' and misses the mark on the nuance of a real estate deal. In 2025, we began building bespoke AI agents for elite teams. The results were incredible, but the demand was overwhelming. We realized that every agent—not just those with custom dev budgets—deserved an AI that actually speaks the language of the industry. We shifted from one-off builds to create Reamo: a platform that delivers the power of a high-touch, tailored AI assistant but connects to your existing phone system in just a few clicks. We built Reamo because you shouldn't have to choose between advanced technology and a personal touch."
- "Beranguard" links to https://beranguard.com

### 7. Footer
- Left: Reamo logo
- Links: Contact → /contact-us | Privacy Policy → /privacy-policy | Terms of Service → /terms-of-service

---

## Routes Needed
- `/` — main page (this spec)
- `/request-access` — placeholder page (form TBD)
- `/contact-us` — placeholder page
- `/privacy-policy` — placeholder page
- `/terms-of-service` — placeholder page

---

## Notes for Cursor
- Dark theme throughout. Background is #0a0a0f — never use white backgrounds.
- Accent color #00d4a0 (teal) for buttons, highlights, and active states.
- Gradient transition dividers between sections — use a radial or linear gradient fading from surface (#14141e) to background (#0a0a0f).
- Videos: use `<video autoPlay muted loop playsInline>` tags with a placeholder src for now.
- No third-party UI libraries. Tailwind only.
- Mobile responsive. Start desktop, then add responsive breakpoints.
- Keep components in `/components`. Page assembly in `/app/page.tsx`.
