# Dev Rules — Portfolio Website

Stack: HTML, CSS, JavaScript (vanilla, no framework unless specified otherwise)

## Mockup display rules

All project mockup images are exported from Figma as PNG @2x. Never place mockup images directly on the page background without a container. Always wrap in a container div with `--radius-lg` and appropriate padding.

Two container types depending on the mockup:

**Type A — Mockup has its own background color (e.g. StackIt purple, BIZCORE navy)**
- Wrap in a simple neutral container: padding and `--radius-lg` only
- Do not add a background color to the container — the mockup's own bg is the visual
- No shadow needed

**Type B — Mockup has a white or no background**
- Wrap in a cream container: `background: var(--color-cream)`, `--radius-lg`, `--shadow-soft`
- This ensures white-bg mockups don't float invisibly against the page background

1. **Tokens only.** No hardcoded hex codes, font names, or arbitrary spacing values in markup, inline styles, or component CSS. Always reference `design-tokens.md` custom properties.
2. **Typography discipline.** Cormorant for display/headline moments only. Switzer for everything else (nav, body, buttons, labels). Never mix both fonts within a single line of text.
3. **Responsive by default.** Every section must be checked at mobile, tablet, and desktop breakpoints before being marked done. Mobile-first CSS.
4. **One commit per step.** Explicit, descriptive commit messages. Push after each completed, working step — don't bundle unrelated changes.
5. **Don't break working sections.** When adding a new section or page, never alter the markup/CSS of already-completed sections unless the task explicitly requires it.
6. **Validate before push.** Check the page renders cleanly in browser (no console errors) before considering a step complete.
7. **Asset paths.** Keep images/screenshots in a consistent `/assets/work/[project-name]/` structure — no scattered or ad hoc file placement.
8. **No invented content.** Case study copy, metrics, and project details come only from `content.md` — never improvise or invent project outcomes/numbers.

## Workflow note

Prompts should not be generated or shared unless explicitly requested.
