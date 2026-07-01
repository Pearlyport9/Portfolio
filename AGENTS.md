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

## Current status

Design tokens and structure are finalized. Content (hero copy, case study write-ups) is in progress. Do not begin build until `content.md` is confirmed ready.
