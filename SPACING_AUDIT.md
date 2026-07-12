# Reamo Marketing — Spacing & Cropping Audit

_Audit written before any code changes. Scope: the homepage flow (`app/page.tsx`) and the
components it renders. Secondary pages (pricing, calculator, about-us, contact-us, request-access,
legal) are **not** covered in this pass — see "Out of scope" at the bottom._

---

## 0. How the system is wired today

**Breakpoints** — `tailwind.config.ts` defines no custom `screens`, so Tailwind defaults are in play:

| name | min-width | notes |
|------|-----------|-------|
| (base) | 0 | mobile |
| `sm` | 640px | rarely used here |
| `md` | 768px | primary mobile→desktop switch for padding |
| `lg` | 1024px | primary 1-col→2-col layout switch |
| `xl` | 1280px | hero fine-tuning |
| `2xl` | 1536px | **not used anywhere** |

Extra hand-rolled breakpoints live in `globals.css`: `@media (min-width: 900px)` and stepped
`1024/1280` rules for `.hero-checklist-connector-zone` (that element is not currently rendered).

**Design tokens** that govern spacing (`app/globals.css` `:root`):

```
--page-gutter:        3rem   (48px)   /* horizontal, ≥768 */
--page-gutter-mobile: 2rem   (32px)   /* horizontal, <768 */
--section-pad-y:          100px       /* vertical, used for BOTH top (≥768) and bottom */
--section-pad-y-top-mobile: 24px      /* vertical top, <768 only */
--nav-height:  74px
```

**The two shared utilities** (`globals.css` `@layer components`):

- `.px-page` → `padding-inline: 32px` (<768) / `48px` (≥768). **Only two steps** — no scaling for
  tablet / laptop / wide / ultra-wide.
- `.section-y` → `padding-bottom: 100px` always; `padding-top: 24px` (<768) / `100px` (≥768).
  **Asymmetric on mobile** (24 top / 100 bottom); a fixed `100px` that never scales up on wide or
  down on small.

Content is centered with per-section `max-w-*` wrappers: `1200px` (hero, works, dashboard),
`1100px` (privacy), `1000px` (feature grid), `760px` (quote), `520px`/`400px` (paragraph measures).

---

## 1. Section-by-section inventory (top → bottom of the homepage)

Legend: values are the literal classes/tokens in source. `svh` = small-viewport-height unit.

### 1.1 Hero — `PhoneCallEndsSection` (inside `home-hero-viewport`)
- **Wrapper** (`page.tsx`): `home-hero-viewport` = `min-height: 100svh`, negative top margin to pull
  under the fixed nav, `padding-top: var(--nav-height)`. Horizontal via `.px-page`, capped `max-w-[1200px]`.
- **Section padding**: `pb-10 pt-4  max-md:pb-8 max-md:pt-3  md:pb-12 md:pt-5`
  → top 12/16/20px, bottom 32/40/48px across mobile/tablet/desktop. Small on purpose — the
  `100svh` + `justify-center` does the vertical work.
- **Internal gaps**: eyebrow `mb-10`; headline; sub `mt-4 sm:mt-6`; checklist block `mt-8 sm:mt-10`;
  column gap `gap-10 sm:gap-12 lg:gap-6 xl:gap-16`.
- **Graphic**: `LoopCreatedVignette` wrapped in `-translate-y-5` (hard-coded 20px nudge).
- ⚠️ **Inconsistency**: mixes `pt-4 / pt-3 / pt-5` and `pb-10 / pb-8 / pb-12` — arbitrary values
  outside any scale. The `-translate-y-5` on the vignette is a magic nudge.

### 1.2 "Simple. Powerful." — `WorksHowYouWorkSection` (white, top half)
- **Section**: `min-h-[calc(100svh-var(--nav-height))]`, `justify-start`,
  `pt-[var(--section-pad-y-top-mobile)] md:pt-[var(--section-pad-y)]` (top 24/100). **No bottom
  padding token** — bottom space is whatever `min-h` leftover + the inner `mb-16 md:mb-20`.
- **Internal**: eyebrow block `mb-8 md:mb-10`; feature-grid gap `gap-12 lg:gap-8`; per-card
  `gap-4 md:gap-3`.
- ⚠️ **Inconsistency #1 (biggest rhythm offender)**: this is the only content section forced to
  `min-h-100svh`. On tall desktop viewports it leaves a large dead gap before the dark sub-block;
  on short/wide viewports it crowds. It does **not** use `.section-y`, so its bottom rhythm is
  undefined and differs from every other section.
- ⚠️ Feature boxes use **fixed heights** `h-[227px] sm:h-[245px] md:h-[279px]` with
  `overflow-hidden` — safe today (art is centered) but a fixed-height + overflow-hidden pattern.

### 1.3 "Always a text away." — `WorksHowYouWorkSection` (dark sub-block)
- **Block**: `bg-hero-near-black px-page  pt-[var(--section-pad-y-top-mobile)] pb-[var(--section-pad-y)] md:pt-[var(--section-pad-y)]` (top 24/100, bottom 100). ✅ closest to systematic.
- **Internal**: descriptor `mt-4`; media row `mt-10 max-md:mt-8`; caption row `mt-4 md:mt-5`;
  slides grid gap `gap-5 max-lg:gap-8 lg:gap-5`.
- 🔴 **CROP BUG lives here** — see §2. The two phone mockups (`StoryPhoneGraphic`) are wrapped in
  `MEDIA_BOX_CLASS` (`overflow-hidden` + percentage padding) and shifted with `top-[-30px]` and
  `scale-[0.9975] max-lg:scale-[0.945] max-md:scale-[0.924]`.

### 1.4 "Everything in one place." — `DashboardSection`
- **Section**: `.section-y` (top 24/100, bottom 100). Horizontal gutter comes from the `page.tsx`
  wrapper (`.px-page`, `max-w-[1200px]`). ✅
- **Internal**: descriptor `mt-4`; hero image block `mt-12`; secondary grid `mt-12`, `gap-8`.
- ⚠️ **Absolute-positioned overlap graphic**: `client-detail.png` is
  `absolute left-[calc(100%-245px)] top-[calc(100%-95px)]` over the overview image, and the parent
  reserves space with `lg:pb-[calc(50%*544/1024)]` + `overflow-x-clip`. Width driven by the chained
  magic literal `w-[calc((100%/1.2)*1.2*0.85*1.05*1.05*1.05)]`. Renders fine at desktop but is
  fragile and unreadable; a prime candidate for the "cropped at the wrong point" symptom in the
  `lg` mid-zone (see §2.3).

### 1.5 Quote — `QuoteSection`
- **Section**: `.section-y bg-white px-page` (top 24/100, bottom 100). ✅
- **Internal**: avatar `mb-8 lg:mb-9`; blockquote `mb-9`; rule `mb-4`.
- ⚠️ Blockquote font uses `text-[clamp(11.5px,3vw,37px)] lg:text-[50px]` — the `lg:text-[50px]`
  jumps **above** the clamp ceiling (37px) at exactly 1024px, a visible step. Minor.

### 1.6 Privacy — `PrivacySection`
- **Section**: `.section-y bg-hero-near-black px-page`, `max-w-[1100px]`. ✅
- **Internal**: eyebrow `mb-6`; headline `mb-4`; intro `mb-12`; cards padding `p-10 max-md:p-7`.
- ✅ Cleanest section. `.priv-cards` grid handles 4→2→1 columns via `globals.css` media queries
  (768 / 480). No fixed heights.

### 1.7 CTA — `CtaApply`
- **Section**: `.section-y bg-white px-page`. ✅
- **Internal**: eyebrow `mb-6`; headline `mb-5`; paragraph `mb-12`.

### 1.8 Footer — `Footer`
- `px-page py-5` — 20px vertical, `.px-page` horizontal. Reasonable for a footer.

### Nav — `Nav`
- Fixed pill, `px-4 pt-[var(--nav-float-top)] sm:px-5`, pill `max-w-[1240px]`. Independent of the
  section system (fine).

---

## 2. Cropping / overflow inventory (the highest-visibility bug)

Every place a **fixed height, fixed width, `scale-*`, absolute positioning, or `overflow-hidden`**
touches a graphic:

### 2.1 🔴 `StoryPhoneGraphic` + `MEDIA_BOX_CLASS` (the "text away" phones) — ROOT OF THE CROP BUG
Nested, competing crops stack up:

1. **Inner** (`StoryPhoneGraphic.tsx`): phone lives in `aspect-[388.8/777.6] w-[81%] overflow-hidden`
   positioned `top-[10%]` inside an `aspect-square` box. The frame PNG is `fill object-contain`
   **`scale-[1.6]`** — deliberately zoomed so only the phone's top shows; the rest is clipped by
   `overflow-hidden`. Message bubbles sit in `absolute inset-x-0 bottom-0 top-[18%] overflow-hidden`
   and are clipped at the bottom edge.
2. **Outer** (`WorksHowYouWorkSection.tsx` `MEDIA_BOX_CLASS`): `overflow-hidden rounded-2xl`, with
   percentage padding `px-[max(0px,calc((100%-28.5rem)/2))] … lg:pt-[max(0px,calc((100%-28.5rem)*0.6))]`
   and the inner wrapper nudged `top-[-30px]` and scaled `scale-[0.9975] max-lg:scale-[0.945]
   max-md:scale-[0.924]`.

**Why it crops at the wrong point across viewports:** the visible crop line is the product of at
least six independent numbers — aspect-square height (= card width, which changes fluidly),
`top-[10%]`, `w-[81%]`, `scale-[1.6]`, the outer `top-[-30px]` (a *fixed* 30px against a *fluid*
height), and three breakpoint scales. Because a fixed 30px offset fights a percentage-driven height,
the bottom cut lands at a different place at every width — sometimes just after a complete bubble
(looks intentional), sometimes mid-word (looks broken, confirmed on mobile at 375px: "…created. I
updated" is sliced). **Observed:** left card cuts cleanly after "Done."; right card cuts mid-word.
Verified visually at 375 / 768 / 1440.

### 2.2 🟠 `LoopCreatedVignette` (hero animation) — fixed-height iframe
- `<iframe class="h-[350px] w-full">`; inside, `.viewport { height:350px; overflow:hidden }`.
- Focus line is `font-size: clamp(16px, 5.6vw, 32px)`; at narrow widths it grows via `vw` and wraps
  to 2–3 lines. `.focuswrap` positions it at a fixed `padding: 118px … 0` with `gap: 39px` and the
  headshots are a fixed `130px`. A 3-line focus line can exceed the fixed `350px` and clip.
- Not the primary bug (fit at tested widths) but the fixed pixel height doesn't respond to the
  content or container, and the hero applies a further `-translate-y-5`.

### 2.3 🟠 `DashboardSection` overlap image — absolute + reserved padding
- `client-detail.png`: `absolute left-[calc(100%-245px)] top-[calc(100%-95px)]`, width
  `w-[calc((100%/1.2)*1.2*0.85*1.05*1.05*1.05)]`. Parent reserves height with
  `lg:pb-[calc(50%*544/1024)]` and hides horizontal spill with `overflow-x-clip`.
- Fixed `245/95px` offsets against a fluid 60%-width base mean the overlap sits differently across
  the `lg`→`xl`→wide range; at the low end of `lg` (~1024px) the offset can pull the detail card
  past the intended frame. Fragile, though not visibly broken at 1440.

### 2.4 🟢 Feature boxes (`FEATURE_BOX_CLASS`) — fixed height + overflow-hidden
- `h-[227px] sm:h-[245px] md:h-[279px] overflow-hidden`. Art is centered and smaller than the box,
  so no clip today. Low risk; noted for completeness.

### 2.5 🟢 Nav shine, checkmark pulse — `overflow-hidden` on decorative layers, no content risk.

---

## 3. Inconsistent-scale findings (Step 1 deliverable)

| # | Where | Issue |
|---|-------|-------|
| A | Hero section padding | `pt-3/4/5` + `pb-8/10/12` — off-scale one-offs |
| B | `WorksHowYouWork` white block | Uses `min-h-100svh` instead of `.section-y`; undefined bottom rhythm; only section not on the system |
| C | `--section-pad-y` | Fixed `100px` for all breakpoints ≥768 — no wide / ultra-wide step, no down-step for small tablet |
| D | `.section-y` mobile | Asymmetric `24px` top / `100px` bottom |
| E | `.px-page` | Only 32/48px, two steps — no tablet/laptop/wide/ultra-wide gutter progression |
| F | Vignette / dashboard overlap | Magic pixel nudges (`-translate-y-5`, `top-[-30px]`, `245/95px`, chained `1.05*1.05*1.05`) |
| G | Quote blockquote | `lg:text-[50px]` overshoots its own `clamp(...,37px)` ceiling at 1024 |

---

## 4. Proposed system (Step 2)

**Base unit:** keep Tailwind's 4px base. All spacing should resolve to multiples of 4
(8, 12, 16, 24, 32, 48, 64, 80, 96, 120).

**Vertical section rhythm — make `--section-pad-y` responsive and symmetric.** Replace the fixed
`100px` (and the mobile-only top override) with a stepped scale so top == bottom within a section
and the gap between sections scales with the viewport:

| viewport | proposed section padding (top & bottom) |
|----------|------------------------------------------|
| < 640 (mobile)   | **64px** |
| 640–1023 (tablet/laptop) | **80px** |
| 1024–1439 (desktop) | **96px** |
| ≥ 1440 (wide / ultra-wide) | **120px** |

Implement by making `--section-pad-y` change at breakpoints in `globals.css` and having `.section-y`
use it for **both** top and bottom (drop the asymmetric mobile top). This is close to today's
desktop feel (100→96/120) but fixes findings C and D and gives an intentional rhythm. _Judgment
call, flag for review:_ this changes mobile spacing from 24/100 to 64/64 — tighter top gap on the
first section after a hero, more breathing room elsewhere.

**Horizontal gutters — add intermediate steps to `.px-page`:**

| viewport | gutter |
|----------|--------|
| < 480 | 20px |
| 480–767 | 24px |
| 768–1279 | 48px |
| ≥ 1280 | 64px |

Keeps the 1200px content cap; wide desktops get a touch more edge breathing room instead of the flat
48px. _Judgment call:_ current mobile is 32px; proposal tightens small phones to 20–24px to reduce
the cramped single-column measure. Flag for review.

**Cropped graphics — fix at the root, not per-breakpoint (Step 3):**
- `StoryPhoneGraphic` / `MEDIA_BOX`: collapse the nested crops to a **single, aspect-ratio-driven
  crop**. Remove the fighting `top-[-30px]` fixed offset and the three breakpoint `scale-*` values;
  let one `overflow-hidden` on an aspect-ratio box define a deliberate, identical crop line at every
  width, and ensure the message column's bottom fade/cut lands between bubbles rather than mid-word.
  Preserve the "phone peeking from a white card" look — do not un-zoom or reveal the whole phone.
- `LoopCreatedVignette`: keep the design, but let the iframe height be driven by an aspect ratio /
  `min-height` so a wrapped focus line can't clip; drop the hero's `-translate-y-5` in favor of the
  column alignment.
- `DashboardSection` overlap: replace `245/95px` fixed offsets + chained `1.05` width with
  percentage offsets tied to the 60% base so the overlap holds its relationship through `lg`→wide.

**Sections onto the system (Step 4):** convert the `WorksHowYouWork` white block from `min-h-100svh`
to `.section-y` rhythm (finding B); normalize the hero's off-scale `pt/pb` one-offs to scale values
(finding A); fix the quote `lg:text-[50px]` overshoot (finding G).

---

## 5. Confidence & risk notes for the human

- **Safe / mechanical:** findings A, D, E, G, and the `--section-pad-y` responsive token.
- **Needs your eye (I can only see the rendered result, not the original design intent):**
  - The **phone crop** (§2.1) — the crop is partly *intentional* (phone peeking from a card). I will
    make it consistent and stop mid-word cuts, but where exactly the crop line should sit is a taste
    call. **Verify this one visually.**
  - The **`min-h-100svh` → `.section-y`** change (finding B) alters how much whitespace sits under
    "Simple. Powerful." — a deliberate full-viewport moment may have been intended.
  - The **mobile gutter/padding tightening** in the proposal changes the current 32/24 values.

## 5b. What was actually applied in this pass

**Applied (code changed):**
1. **Phone mockup crop fix** (`WorksHowYouWorkSection.tsx`) — added a percentage-height
   (`h-[34%]`) transparent→white gradient overlay at the bottom of each `MEDIA_BOX`. The phone now
   dissolves into the card at a consistent proportional point at every viewport; the message thread
   fades out instead of hard-cutting mid-word. Verified at 375 / 768 / 1024. Root cause (nested
   `overflow-hidden` + `scale-[1.6]` + fixed `top-[-30px]` fighting a fluid height) is neutralised
   because there is no longer a visible hard cut line to land "at the wrong point."
2. **Responsive, symmetric section rhythm** (`globals.css`) — `--section-pad-y` now steps
   64 → 80 (≥640) → 100 (≥1024) → 120 (≥1440), used for **both** top and bottom. `.section-y`
   simplified to symmetric; mobile asymmetry (was 24 top / 100 bottom) removed (findings C, D).
   The 1024–1439 band stays at 100px so common desktop + unaudited pages are visually unchanged.
   Verified computed padding: 64 @375, 100 @1024-band, 120 @1440.
3. **Token cleanup** (`WorksHowYouWorkSection.tsx`) — dropped the now-redundant
   `--section-pad-y-top-mobile` + `md:` overrides in favor of `pt-[var(--section-pad-y)]` /
   `py-[var(--section-pad-y)]`.

**Deliberately deferred (flagged, not touched):**
- `.px-page` gutter progression — left at 32/48. Used by **every** page including unaudited ones;
  changing it is high blast-radius for marginal gain (content is capped at 1200px anyway). Kept.
- `WorksHowYouWork` white block `min-h-100svh` (finding B) — a possibly-intended full-viewport
  moment; changing it alters deliberate whitespace. **Needs your call.**
- Hero `pt-3/4/5 pb-8/10/12` one-offs (finding A) — inside a `100svh` centered hero, so visually
  negligible; not worth the churn.
- Quote `lg:text-[50px]` clamp overshoot (finding G) — likely an intentional desktop size; retuning
  risks changing the intended look.
- `LoopCreatedVignette` fixed 350px height and `DashboardSection` overlap magic numbers (§2.2, §2.3)
  — render correctly at all tested widths; left as-is to avoid destabilising working graphics.

## 6. Out of scope for this pass
`app/pricing`? (see `components/Pricing.tsx`, `PlanLandingPage.tsx`), `calculator`, `about-us`,
`team`, `agent`, `contact-us`, `request-access`, `unsubscribe`, legal pages, and the many unused
homepage components (`SuperchargedNotes*`, `Integrations*`, `PostCallSection`, `HowItWorks`,
`Stats`, `StoryCarousel`, etc. — gated off by `SHOW_BLOCKS`/`SHOW_INTEGRATIONS = false`). These
share some tokens; the token-level changes above will affect any that use `.section-y` / `.px-page`,
but I have not audited their layouts.
