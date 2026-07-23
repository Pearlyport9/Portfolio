# AGENTS.md — Portfolio Website

This file is the entry point for the AI coding agent. Read the referenced files in this order before starting any work, and re-check them whenever starting a new section.

## Project

Personal portfolio website for Olayemi Oluwatominiyi (Pearl) — Product Designer (UI/UX) and Design Engineer. Showcases 5 projects: Everiithing, BIZCORE, Ceembee Footies, ReceiptVault, Mikhiyah.

## Stack

HTML, CSS, JavaScript (vanilla). No framework unless explicitly instructed.

## Token files (manually dropped in by Pearl)

Two JSON files will be placed in the project root before the build starts:

- `color-tokens.json` — all color values
- `typography-tokens.json` — all font families, sizes, weights, line heights

**The agent must read both JSON files before writing any CSS.** All color and typography values in the code must come from these files only — never from `design-tokens.md` directly or from memory. If either JSON file is missing, stop and flag it before proceeding.

## Required reading, in order

1. `design-tokens.md` — colors, typography (Cormorant + Switzer), spacing, breakpoints, "Danii style" direction notes
2. `structure.md` — page/section map, homepage order, case study page template
3. `content.md` — actual copy: hero line, bio, case study narratives (to be added)
4. `dev-rules.md` — coding standards and workflow rules

## Non-negotiables

- Use tokens from `design-tokens.md` — never invent colors, fonts, or spacing values
- Follow `structure.md` section order exactly unless told otherwise
- Use only copy from `content.md` — do not invent project outcomes, metrics, or bio details
- Follow `dev-rules.md` for commit/push practice and responsive checks
- Do not generate or print prompts unless explicitly asked
- Do not alter completed/working sections when building new ones

## Design & UI Work
Read design-tokens.md and dev-rules.md first — those are 
the source of truth for colors, fonts, and spacing.

Color values originate in color-tokens.json and are generated 
into styles/tokens.css via generate-tokens.js — never hardcode 
or hand-edit hex values directly in tokens.css. If a new color 
is needed, add it to color-tokens.json and re-run the generator 
(node generate-tokens.js) before continuing — this step is 
manual, not automatic.

Use UI/UX Pro Max only for layout/structure decisions not 
already covered in structure.md.

Use Magic to generate new components, but always override 
any of its default colors/fonts with what's in the generated 
tokens.css — never Magic's own defaults.

## Local dev server

Run `npm install` once, then `npm run dev` to start `browser-sync` on port 8080 (http://localhost:8080). Leave that terminal running — it serves files straight from disk and auto-reloads the browser on save, so there is never a need to restart it or manually refresh while editing. Do not use `npx serve` or `npx http-server` — those re-resolve the package from the registry on every invocation, which caused crashes/slowness under a previous setup. Do not use `live-server` either — v1.2.2 hardcodes `</svg>` as a script-injection target (`node_modules/live-server/index.js`), which corrupts every SVG served through it and breaks `<img src="*.svg">` rendering across the whole site; `browser-sync` scopes its injection to actual HTML documents and doesn't have this problem. Do not open HTML files directly via `file://`; every page uses root-relative asset paths (e.g. `/styles/main.css`) that only resolve when served over `http://`.

## Current status

Design tokens and structure are finalized. Content (hero copy, case study write-ups) is in progress. Do not begin build until `content.md` is confirmed ready.
