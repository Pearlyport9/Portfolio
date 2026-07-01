# Structure — Portfolio Website

## Pages

1. **Homepage** (`/`)
2. **Case study pages** (`/work/everiithing`, `/work/bizcore`, `/work/ceembee-footies`, `/work/receiptvault`, `/work/mikhiyah`)
3. **About** (optional standalone — can also live as a homepage section)
4. **Contact** (can be a section, not necessarily a full page)

---

## Homepage section order

### 1. Hero
- Personalized greeting (e.g. "Hi there 👋")
- Name + role pills: Product Designer / UI/UX / Design Engineer
- Cormorant headline statement (short, one line ideally)
- Supporting Switzer subtext (1–2 sentences, what you do / value)
- CTA: "View my work" or scroll cue

### 2. Selected Work
- 6 project cards: Everiithing, BIZCORE, Ceembee Footies, ReceiptVault, Mikhiyah, StackIt
- Each card: project name, one-line description, role tag (Solo / Collaborative / Concept), thumbnail visual
- Click → case study page

### 3. How I Work (process section)
- Differentiator section — designer who also ships
- 3–4 step breakdown (e.g. Discover → Design → Build → Ship) or short narrative on using AI coding agents to build what you design
- Keep this concise, not a full methodology essay

### 4. About
- Short personal note — human, not corporate
- Photo optional
- Light personality (fashion/astrology interests can be a small aside if it fits tone, not mandatory)

### 5. Contact / CTA
- Reuse your standard line: "Got a product to build? Let's talk."
- Email link, LinkedIn, X
- Optional simple contact form (mailto or lightweight JS form, no backend needed for v1)

### Footer
- Name, role, social links, copyright

---

## Case study page template (applies to all 6 projects)

Keep these pages short — a few key screenshots per project, not a full screen-by-screen walkthrough.

1. Title + one-line summary + role tag (Solo/Collaborative/Concept)
2. Hero visual (1 full-width screenshot or mockup)
3. **Problem** — condensed, a few sentences
4. **Solution / Process** — key decisions and approach in brief, tools used (note AI-agent build process where relevant, e.g. Everiithing/BIZCORE)
5. **Outcome** — result, what shipped, live link if available
6. Small visual gallery (3–5 supporting screens max, not exhaustive)
7. Next project link (footer nav between case studies)

Note: Solo vs. collaborative vs. concept framing must be explicit per project:
- Solo: Everiithing, BIZCORE, Ceembee Footies
- Collaborative: ReceiptVault (capstone), Mikhiyah
- Solo (UX Case Study / Concept): StackIt — frame distinctly from shipped/built projects since this is design-stage work, not a deployed product

---

## Navigation

- Sticky/minimal top nav: Logo/name — Work — About — Contact
- **Availability pill** (borrow from Akin): 🟢 Available for New Projects — sits in nav or top of hero
- Mobile: hamburger or simplified bottom-aligned nav
- No nav clutter — 3–4 items max

---

## Build rules reference

See `dev-rules.md` for coding standards (token usage, responsive requirements, commit practice).
