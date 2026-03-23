# 🎨 HI-FIDELITY DESIGN PROMPT — SEAGAP
### Merged v3 — Duolingo UI Integrated

---

## 🧠 PLAN

Create a **high-fidelity mobile app UI** for **SEAGAP**, an offline-first AI-powered learning platform with strong gamification. The design must feel like a blend of **Duolingo and a modern mobile game interface** — bright, energetic, tactile, and deeply engaging. Every interactive element must feel **physically pressable**, every feedback moment must feel **emotionally weighted**, and every animation must feel **purposeful and layered** — never decorative.

Screens are arranged in a clear, flow-based layout connected by labeled navigation arrows. The app must communicate structure **and** visual intent — color, typography, iconography, component states, mascot expressions, and a Duolingo-caliber motion system. The goal is a **developer-handoff-ready, production-quality UI** optimized for engagement, retention, and low-friction navigation.

### Key Plan Points
- Follow a top-to-bottom, left-to-right user flow across all screens
- Establish and maintain a **cohesive design system** (colors, type scale, spacing, components, mascot)
- Every screen must feel fully designed — not just structured
- All interactive and offline states must be visually distinct and pixel-accurate
- The **3D press interaction is non-negotiable** — every tappable element must have it
- Prioritize **clarity, accessibility, and a tactile game-like learning experience**
- The design should drive **engagement and retention** at every touchpoint

---

## 📏 RULES

### 🎯 Visual Identity

- **Aesthetic Direction:** Duolingo-meets-mobile-game — bright saturated colors, bold rounded shapes, oversized components, celebratory feedback, and a tactile press system on all interactive elements
- **Color Palette** *(SEAGAP's own — do not use Duolingo green)*:
  - **Primary brand color** — vibrant (e.g. electric teal, coral, or golden yellow — team's choice)
  - **Secondary accent** — complementary pop color for CTAs and highlights
  - **Reward color** — warm orange or amber for streaks, XP, and all reward elements
  - **Neutral backgrounds** — off-white `#F7F7F7` or warm light gray (never pure white for screens)
  - **Semantic colors:** Success green, Error red, Warning amber, Disabled gray `#E5E5E5`
  - **Semantic tints** *(backgrounds only)*: Correct tint, Wrong tint, Selected tint, Streak tint — each a light pastel of its semantic color
  - **Color rule (non-negotiable):** Each color means **exactly one thing** — Primary = action, Reward color = streaks/XP/rewards, Green = success/correct, Red = error/wrong. Never use a color for two meanings

- **Typography:**
  - Use a **rounded, friendly sans-serif** — Nunito or Poppins preferred (geometric, approachable, avoids sterile feel of Inter/Roboto)
  - Type is **bold and oversized** by normal app standards — this is a design principle, not a preference

#### Type Scale

| Role | Size | Weight | Tracking | Where Used |
|---|---|---|---|---|
| Celebration Heading | 32px | 800 | -0.5px | Lesson complete, result screens |
| Screen Title | 22px | 800 | -0.3px | Section names, unit headers |
| Question Text | 18px | 700 | 0px | Quiz question prompt |
| Answer Option | 15px | 700 | 0px | Tap options, tiles |
| Body / UI Text | 14px | 400 | 0px | Descriptions, bubbles |
| Secondary / Hint | 13px | 400 | 0px | Hints, sub-labels |
| Micro Label / Badge | 11px | 800 | +1px | ALL CAPS — question type labels, tab labels, system cues |

- **Iconography:** Single consistent icon library (Phosphor or Lucide) — no mixed styles; icons always paired with labels for accessibility

#### Border Radius Scale

| Value | Use Case |
|---|---|
| 4px | Badges, tags, tiny chips |
| 8px | Small info cards, stat areas |
| 12px | Answer options, word bank tiles, module banners |
| 16px | All buttons (every size), lesson cards |
| 24px | Bottom feedback sheets, modal sheets |
| 9999px | Stat pills, league badges — anything pill-shaped |

#### Spacing Scale *(strict — no in-between values)*

| Value | Use Case |
|---|---|
| 4px | Icon-to-label gap, micro spacing |
| 8px | Between pills, answer option gaps |
| 12px | Inside cards, gap between answer options |
| 16px | Screen side padding, card internal padding |
| 20px | Between screen sections |
| 24px | Horizontal padding inside buttons |
| 32px | Between major content blocks |
| 40px | Bottom safe area padding, large section breaks |

- **Elevation & Shadow:** All tappable elements have a **bottom shadow in a darker shade of their background color** (3–5px). Non-tappable elements have no shadow. This is the primary depth signal
- **Grid:** 8pt grid system; 390×844px base frame (iPhone 14); safe areas: 59px top, 34px bottom; content area: 390×751px

---

### 🐾 Mascot Rules *(REQUIRED)*

- A **single consistent vector mascot** acts as SEAGAP's AI guide and emotional anchor across all screens
- Must have a full **expression library** — each a separate pose/illustration, not just a color change

#### Mascot Expression Library

| Pose Label | Where Used |
|---|---|
| `[Mascot: Greeting]` | Splash, welcome, onboarding |
| `[Mascot: Thinking]` | AI Tutor panel, hint state |
| `[Mascot: Celebrating]` | Correct answer, lesson complete |
| `[Mascot: Surprised]` | Wrong answer |
| `[Mascot: Encouraging]` | Streak broken, empty state |
| `[Mascot: Sleeping]` | Offline mode |
| `[Mascot: Urgent]` | Streak at risk, inactivity warning |

- Mascot functions as an **accountability partner**, not decoration — its expressions drive emotional response
- Must work at 3 sizes: large hero (results screen), medium (card/speech bubble), small (HUD icon/assistive button)
- All mascot placements must be labeled: `[Mascot: Celebrating — 600ms bounce + arms-up animation]`

---

### 🧩 Component Rules

#### Buttons *(Duolingo 3D Press — Non-Negotiable)*

- **Large (Primary CTA):** 56px tall · 24px horizontal padding · 16px radius · 4–5px bottom shadow in a darker shade of button color
- **Medium (Secondary):** 48px tall · same padding and radius
- **Small (Ghost/Skip):** 40px tall · transparent background · 2px border in brand color
- **Disabled:** `#E5E5E5` background · `#AFAFAF` text · no shadow
- **Pressed state:** Shadow disappears instantly + button shifts **down by the exact shadow height (4–5px)**. On release, it returns with spring easing. **Never use opacity fade alone — this is the signature tactile interaction**
- **Full-width CTAs** on all lesson, quiz, and onboarding screens
- All components must use real representative content (no Lorem Ipsum), accessible contrast (WCAG AA — 4.5:1), and minimum 44px tap target

#### Answer Options *(5 States Required)*

- Size: 56–64px tall · 14px top/bottom padding · 16px left/right padding
- Border: 2px solid · 12px radius · 3px bottom shadow (in border color shade)

| State | Background | Border | Shadow | Left Indicator |
|---|---|---|---|---|
| Default | White | Gray `#E5E5E5` | Gray | Letter (A/B/C/D) |
| Hover / Focused | Brand light tint | Brand color | Brand | Letter |
| Selected *(pre-submit)* | Brand selected tint | Brand color | Brand | Filled dot |
| Correct *(post-submit)* | Correct tint | Success green | Green | ✓ Checkmark |
| Wrong *(post-submit)* | Wrong tint | Error red | **None** (deflated) | ✗ Mark |

- Gap between options: 8px

#### Progress Bar

- Height: **16px** (intentionally chunky — readable at a glance)
- Track: `#E5E5E5`
- Fill: brand success green for progress, error red on wrong answer flash
- Corner radius: 8px
- Inner gloss detail: 4px-tall white strip at ~40% opacity near top of fill — subtle gloss without a gradient

#### Stat Pills *(Top HUD Bar)*

- Height: 28px · 10–12px horizontal padding · 9999px radius (full pill)
- Font: 12px / weight 800
- Each pill: emoji icon + number, color-coded tint background *(SEAGAP's reward color for streaks, brand tints for others)*
- Pills sit in a horizontal row in the top HUD of all quiz/lesson screens

#### Module Path Nodes *(Zig-Zag Layout)*

- Shape: **perfect circle** (never rounded square)
- Size: 68px diameter
- Bottom shadow: 5px (same color principle as buttons)
- Stars appear **below** the circle as a separate element (not inside), with 14px gap
- Connector: **dashed vertical line** — 2px weight, 4px dash, 4px gap
- **Zig-zag offset:** nodes alternate ±32px left/right of center, 24px vertical gap

| Node State | Color | Shadow | Icon | Stars |
|---|---|---|---|---|
| Complete | Brand success | Success shadow | ✓ Checkmark | 3 filled below |
| Partial | Brand success | Success shadow | Star emoji | 1–2 filled, rest empty |
| Active / Current | Brand primary | Primary shadow | Star emoji + pulsing ring | — |
| Locked | Gray `#E5E5E5` | Gray | 🔒 Lock | None |
| Legendary | Gold gradient | Gold | 👑 Crown | — |

- Tapping a node → bottom sheet slides up (300ms spring): module title, description, XP reward, `[Button: Start]` / `[Button: Review]`

---

### 🔁 State Representation *(REQUIRED — fully styled)*

| State | Visual Treatment |
|---|---|
| `Offline Mode Active` | Amber top banner + cloud-off icon + `[Mascot: Sleeping]` |
| `Locked Content` | Desaturated node/card + lock icon + disabled CTA + tooltip text |
| `Completed` | Green node + filled XP bar + 3 stars |
| `Correct Answer` | Correct tint card + green border + ✓ indicator + feedback sheet slides up |
| `Wrong Answer` | Wrong tint card + red border + ✗ indicator + shake + feedback sheet slides up |
| `Loading` | Skeleton shimmer screens matching layout |
| `Empty State` | `[Mascot: Encouraging]` + friendly text + CTA button |
| `Streak Active` | Flame emoji, warm pill, reward color text, idle pulse loop |
| `Streak Broken` | Gray flame, broken label, `[Mascot: Urgent]`, recovery CTA |

---

### 🧠 Interaction & Motion Rules *(Duolingo-Spec)*

#### The 3D Press *(Most Important Rule)*

Every tappable element — buttons, answer options, nodes, tiles, cards — must have a bottom shadow in a darker shade of its background color (3–5px). On tap: shadow disappears instantly + element shifts down by that exact pixel count. On release: returns with spring easing. **Never replace with opacity fade.**

#### Answer Feedback Timing

| Step | Timing |
|---|---|
| Tap → border color changes | 80ms |
| Background tint fills in | 100ms ease |
| Submit → correct/wrong color swap | 200ms |
| Wrong option shake (left-right × 3, ±5px) | 300ms |
| Pause before sheet | 100ms |
| Feedback sheet slides up | 300ms spring easing |

> Sheet stays behind quiz — quiz screen remains in place. No navigation occurs.

#### Screen Transitions

| Transition | Spec |
|---|---|
| Lesson/quiz start | Slide in from right |
| Next question inside quiz | Cross-fade (200ms) |
| Quiz exit/quit | Slide out to left |
| Tab switches | Cross-fade (200ms) |
| Bottom sheets (feedback, node preview, quick actions) | Slide up with spring easing (300ms) |
| Results screen | Slide up full-screen (400ms) |

#### Celebration *(Lesson / Quiz Complete)*

- Confetti: 20–30 colored pieces fall from top, **800ms duration**
- `[Mascot: Celebrating]`: bounce + arms-up animation, **600ms**
- XP number: **count-up animation, 500ms ease-out**
- Stats stagger in: each element **80ms after the previous**

#### Streak & Reward Pulses

- Streak flame idle: **scale pulse (1.0 → 1.1 → 1.0), 2-second loop**
- Streak increment: **scale burst (1.0 → 1.2 → 1.0) + number slides up, 400ms**
- XP pop: **number floats upward and fades out, 1 second**
- All reward animations: warm colors, **scale outward — never inward**

#### Motion Layering Principle

A color change + position shift + scale pop must happen within **150–300ms of each other**. Stagger them with **30–80ms delays** — never trigger simultaneously. Motion is always layered, never singular.

---

### ♿ Accessibility Rules *(REQUIRED)*

- All text: WCAG AA contrast (4.5:1 body, 3:1 large text)
- All interactive elements: visible focus states
- Icon-only buttons: accessible label annotation `[a11y: aria-label="..."]`
- Minimum tap target: **44×44px**
- Color is **never** the only state differentiator — always pair with icon, label, or shape change
- Font sizes: minimum 14px body, 12px caption
- Offline states communicate meaning through text, not only color

---

## ⚙️ IMPLEMENTATION

Generate a **complete set of hi-fi screens** representing the full SEAGAP user journey. Every screen must feel production-ready — styled, consistent, mascot-integrated, and rich with real UI detail. All screens connected with labeled navigation arrows showing transition type.

---

## 📱 Screens to Implement

---

### 🔐 Authentication Flow

- **Splash Screen**
  - Brand logo + `[Mascot: Greeting — large hero pose]`
  - Animated loading indicator
  - Brand gradient background

- **Welcome Screen**
  - Mascot hero illustration, app tagline
  - `[Button: Get Started — Primary, 56px, 3D shadow]`
  - `[Button: Log In — Ghost, 40px]`

- **Register (Multi-Step)**
  - Step indicator: filled dot progress (e.g. ●●○)
  - Step 1: Name + grade/school — styled inputs with floating labels
  - Step 2: Email + password — real-time strength indicator + inline validation
  - Step 3: Avatar or mascot buddy selection
  - `[Button: Continue — Primary, full-width, 3D press]`

- **Social Login** *(shown on both Login and Register)*
  - `[Button: Continue with Google — white card, Google logo, full-width, 3D press]`
  - `[Button: Continue with Facebook — branded blue, Facebook logo, full-width, 3D press]`
  - Positioned below a horizontal divider labeled "or"

- **Login Screen**
  - Email + password fields with floating labels
  - `[Button: Log In — Primary, full-width]`
  - `[Link: Forgot Password]`
  - Social login buttons below divider
  - `[Link: Create Account]`

- **Confirmation Screen**
  - `[Mascot: Celebrating — large, 600ms bounce + arms-up]`
  - `[Text: "Welcome, [Name]! 🎉" — 32px / 800]`
  - XP onboarding reward count-up animation (500ms)
  - `[Button: Start Learning — Primary, full-width, 3D press]`

---

### 🏠 Main Dashboard

- **Top Bar**
  - Avatar chip (tappable → Profile)
  - `[Text: "Good morning, [Name]!" — 22px / 800]`
  - `[Icon Button: Notifications — bell with unread badge]`

- **Streak Widget**
  - Flame card — `[Text: 🔥 7-day streak]`
  - Weekly dot calendar (filled/empty per day)
  - Idle flame pulse animation (2s loop)
  - `[Button: Keep it going! — secondary]`

- **Hero Card: Continue Learning**
  - Course thumbnail, title, current chapter label
  - Animated 16px progress bar
  - `[Button: Resume — Primary, 3D press]`
  - XP reward preview chip

- **Section: My Courses**
  - Horizontal scroll of `[Card: Course]`
  - Each card: thumbnail, title, progress %, difficulty chip, 3D press on tap

- **Section: Daily Challenges**
  - 3 tap cards with XP reward labels + countdown timer chips

- **Section: Achievements**
  - Badge row — earned: full color; locked: gray + lock icon

- **Bottom Tab Bar** *(SEAGAP's own design)*
  - Icons + labels: Home | Courses | Leaderboard | Profile
  - Active tab: brand color fill + underline indicator

---

### 📚 Course Page + Module Zig-Zag Path

- **Course Header**
  - Full-bleed cover image with gradient overlay
  - Course title (white, 22px/800), instructor avatar + name
  - `[Button: Continue — floating pill, 3D press]`
  - 16px progress bar below header

- **Section/Unit Banner**
  - Full-width brand color background
  - White text: unit title (22px/800) + subtitle (14px/400)

- **Module Zig-Zag Node Path**
  - Nodes alternate ±32px left/right of center
  - Dashed vertical connector (2px, 4px dash, 4px gap)
  - Node: 68px circle, 5px bottom shadow, state-based color
  - Stars 14px below node (per state spec)
  - Active node: pulsing ring animation (2s loop)
  - Tap node → bottom sheet (300ms spring): title, XP, `[Button: Start / Review]`

- **Secondary Tab Bar** *(above path)*
  - Modules | Quizzes | Assignments | Students
  - ALL CAPS, 11px/800 labels; cross-fade (200ms) on switch

- **Quizzes Tab**
  - `[Card: Quiz]` — XP badge, time limit chip, best score if attempted
  - States: Locked / Available / Completed

- **Assignments Tab**
  - `[Card: Assignment]` — due date chip, difficulty label, status badge (Pending / Submitted / Graded)

- **Students Tab**
  - Leaderboard-style peer list with XP scores and rank badges

---

### 🎮 Gamified Quiz / Assignment Screen *(Full Focus Mode — No Bottom Nav Bar)*

- **Top HUD Bar**
  - `[X Button: Exit — ghost, left aligned]` → confirmation sheet ("Are you sure? Progress will be lost")
  - `[Progress Bar: 16px chunky, center — step N of N]`
  - `[Stat Pills: right — 🔥 Streak, ⭐ XP]`
  - No bottom nav bar

- **Question Type Label**
  - ALL CAPS, 11px / 800, muted gray (e.g. "MULTIPLE CHOICE", "DRAG AND DROP")

- **Mascot Speech Bubble**
  - Small mascot avatar + 1-line instruction in a rounded pill
  - `[Mascot: Thinking — small size]`

- **Question Text**
  - 18px / 700, prominent; optional image/diagram support

- **Answer Options**
  - A/B/C/D stacked, 8px gaps
  - All 5 states implemented; 3D press on default and selected states
  - Feedback timing per spec (80ms → 100ms → 200ms → shake → pause → sheet)

- **Feedback Sheet** *(slides up — quiz screen stays behind)*

  **Correct variant:**
  - Correct tint background
  - `[Mascot: Celebrating — small, bounce animation]`
  - `[Text: "✓ Correct!" — 22px / 800, success green]`
  - XP earned pop animation (floats up, 1s)
  - `[Button: Continue — green, full-width, 3D press]`

  **Wrong variant:**
  - Wrong tint background
  - `[Mascot: Surprised — small]`
  - `[Text: "✗ Incorrect" — 22px / 800, error red]`
  - Correct answer revealed with explanation text (14px)
  - `[Button: Got It — red, full-width, 3D press]`

- **Interactive Question Types** *(annotated)*
  - Drag-and-drop: `[Interaction: Drag — elevated shadow, drop zone highlight]`
  - Image tap: `[Interaction: Tap — ripple on image option]`
  - Fill-in-blank: styled text input with focus ring

- **Social Actions**
  - `[Button: Help Teammate — secondary style]`
  - `[Button: Sabotage Opponent — danger accent style]`
  - Displayed as a secondary row below answer options

- **Live Leaderboard Strip**
  - Compact row — top 3 avatars + scores, real-time updates

- **End / Results Screen** *(slides up full-screen, 400ms)*
  - `[Mascot: Celebrating — large, 600ms bounce]` or `[Mascot: Encouraging]` based on score
  - Score ring (animated fill, 500ms ease-out)
  - Confetti: 20–30 pieces, 800ms, falling from top
  - Stats stagger in (80ms each): Score · XP Earned · Accuracy · Time
  - `[Button: Review Answers — secondary]`
  - `[Button: Continue — Primary, full-width, 3D press]`

---

### 🧠 Assistive Touch *(Persistent Across ALL Screens)*

- `[Floating Action Button: AI Assist]`
  - Always visible, draggable to any screen edge
  - Spring snap on release
  - Mascot mini-icon, brand color fill, 5px bottom shadow (3D press)

- **Tap State**
  - Radial menu expands
  - `[Button: 🌐 Change Language]`
  - `[Button: 🤖 AI Tutor]`
  - `[Button: ❓ Hint]`
  - Each with 3D press behavior

- **Long Press (500ms)**
  - Full bottom sheet (300ms spring)
  - `[Quick Action Menu]` — mascot header, icons, labels

- **AI Tutor Panel**
  - Chat-style overlay
  - `[Mascot: Thinking — medium]`
  - `[Input: Ask a question...]`
  - Suggested prompt chips (pill-shaped)

- **Interaction Annotations**
  - `[Interaction: Drag — spring snap to nearest edge, elevated shadow]`
  - `[Interaction: Long Press — 500ms, haptic feedback note]`
  - Safe zone note: button must never overlap HUD bar, CTA buttons, or tab bar

---

### 📥 Offline Mode *(Offline-First)*

- **Amber Banner** *(persistent top strip)*
  - `[Icon: Cloud Off]` + `[Text: You're offline]` + `[Mascot: Sleeping — small]`

- **Available Section**
  - `[Card: Downloaded Module]`
  - `[Badge: Offline Ready — green pill]`, file size label, last synced timestamp
  - Zig-zag path nodes remain tappable and functional

- **Unavailable Section**
  - Grayed-out `[Card: Requires Internet]`
  - Cloud icon + lock overlay + `[Text: Connect to access]`
  - Desaturated node in path, `[Badge: Online Only — gray pill]`

- **Download Manager Screen**
  - Full content list with download status per item
  - `[Button: Download All — Primary, full-width]`
  - Per-item `[Button: Download]` with animated progress pill
  - `[Badge: Downloading — animated progress pill]`

- **Offline-functional features** *(annotate on screen)*
  - Core navigation, downloaded modules, streak tracking, quiz progress

---

### 👤 Profile & Leaderboard

- **Profile Screen**
  - Avatar (large, with edit button overlay)
  - `[Text: User Name — 22px / 800]`, `[Text: School + Grade — 14px / 400]`
  - Stats row (oversized, game-style): `[🔥 Streak]` · `[⭐ Total XP]` · `[🏆 Rank]` · `[📚 Courses Done]`
  - Streak calendar heatmap (7-week GitHub-style grid)
  - Achievements gallery — earned: full color circle; locked: gray circle + lock icon
  - `[Button: Edit Profile — secondary]`
  - `[Button: Settings — ghost]`

- **Leaderboard Screen**
  - Podium layout: top 3 — avatar, name, XP, medal (gold / silver / bronze tint backgrounds)
  - Scrollable ranked list: `[Row: Rank | Avatar | Name | XP | School]`
  - Top 3: warm tint backgrounds; current user row: brand color highlight border
  - Bottom 5 rows: subtle warning tint (demotion zone)
  - `[Tab Bar: School | Regional | National]` — ALL CAPS, 11px/800; cross-fade on switch
  - `[Button: Challenge a Friend — secondary]`

---

## 🔗 Final Requirements

- All screens connected with **labeled directional arrows** showing type: push / modal / tab switch / bottom sheet / slide-up full-screen
- **Component Library Panel:** Buttons (5 states), Answer Options (5 states), Module Nodes (5 states), Stat Pills, Feedback Sheets (correct + wrong), Mascot Poses (all 7), Nav bars, Tab bars, Cards
- **Color & Typography Spec Panel:** All tokens named (`Category/Token` format e.g. `Primary/Brand`, `Semantic/Correct Tint`), all type roles defined
- **Mascot Character Sheet:** All 7 poses at 3 sizes — hero / medium / small
- **Motion Spec Annotations:** Every animation labeled with duration, easing, and trigger condition
- Full visual consistency — same radius scale, shadow system, color tokens, spacing grid, and mascot style throughout
- Design must feel **complete, joyful, tactile, and handoff-ready**

---

## 📋 Changes Log

### v3 — Duolingo UI Integrated

| # | Section | Change |
|---|---|---|
| 1 | Quiz Screen | Bottom nav bar hidden — full focus mode; Exit button added with confirmation sheet |
| 2 | Module Layout | Replaced cards with Duolingo zig-zag node path (68px circles, dashed connector, ±32px offset, 5 node states) |
| 3 | Feedback Behavior | Feedback sheet slides up (300ms spring); quiz screen stays behind — no navigation |
| 4 | Lives/Hearts | Removed entirely — no lives mechanic; HUD shows Streak + XP pills only |
| 5 | 3D Press System | Added as non-negotiable rule across all buttons, nodes, answer options, and cards |
| 6 | Answer Options | Full 5-state spec added with exact sizing, shadow, indicator circle, and deflated wrong state |
| 7 | Feedback Timing | Exact ms values added: 80ms border, 100ms tint, 200ms swap, 300ms shake, 100ms pause, 300ms sheet |
| 8 | Screen Transitions | Full transition spec: slide right (lesson start), cross-fade (next Q), spring sheet (feedback), 400ms full-screen (results) |
| 9 | Celebration | Confetti (800ms), mascot bounce (600ms), XP count-up (500ms), stats stagger (80ms each) |
| 10 | Streak Pulse | Idle loop (2s), increment burst (400ms), XP float (1s) — all with easing specs |
| 11 | Motion Principle | Layering rule added: 30–80ms staggered delays, never simultaneous |
| 12 | Node Bottom Sheet | Tapping a module node opens a 300ms spring bottom sheet with start/review CTA |
| 13 | Type Scale | Full Duolingo-spec table added including Micro Label ALL CAPS convention |
| 14 | Spacing Scale | Strict 8-value scale added (4px–40px), no in-between values |
| 15 | Border Radius Scale | 6-value scale formalized (4px–9999px) |
| 16 | Progress Bar | 16px chunky spec + inner gloss strip detail added |

### v2 — Hi-Fi Upgrade + Social Auth + Mascot

| # | Section | Change |
|---|---|---|
| 1 | Overall Tone | Duolingo + modern game interface added as explicit aesthetic reference |
| 2 | Visual Identity | Bright colors + soft rounded components specified as mandatory direction |
| 3 | Mascot | Consistent mascot defined as persistent AI guide across all screens |
| 4 | Auth Flow | Google and Facebook social login added explicitly |
| 5 | Dashboard | Streaks given their own dedicated visible component |
| 6 | Quiz Screen | Instant feedback + interactive elements added as requirements |
| 7 | Assistive Touch | Explicitly persistent/visible across ALL screens |
| 8 | Offline Mode | Reframed as offline-first — core architecture, not an edge state |
| 9 | Design Goals | Engagement, retention, low-friction navigation added as explicit goals |
| 10 | Accessibility | Explicitly required as a design standard |

---

*SEAGAP Design Prompt — v3 | Last updated: March 2026*
