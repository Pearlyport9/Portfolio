const fs = require('fs');
const path = require('path');

const INPUT_PATH = path.join(__dirname, 'color-tokens.json');
const OUTPUT_PATH = path.join(__dirname, 'styles', 'color-tokens.css');

// Fixed values not present as a distinct key in color-tokens.json — declared
// in design-tokens.md and not overridden by anything seen in the JSON so far.
const BRAND_TEXT_PRIMARY_LIGHT = '#1A1A1A';
const BRAND_TEXT_MUTED = '#6B6B6B';
const BRAND_BORDER = '#E5E0D8';
const BRAND_LINK_HOVER = '#A8842A';

function resolveKeyColors(data) {
  const { primary, secondary, tertiary } = data.color.key;
  if (!primary || !secondary || !tertiary) {
    throw new Error(
      'color.key.primary/secondary/tertiary must all be present in color-tokens.json to resolve gold/cream/dark-brown brand colors.'
    );
  }
  // primary -> gold accent, secondary -> cream, tertiary -> dark-brown background.
  return { gold: primary, cream: secondary, bgDark: tertiary };
}

function buildRoles({ gold, cream, bgDark }, { background, surface, textPrimary, textOnDark }) {
  return {
    'color-gold': gold,
    'color-cream': cream,
    'color-bg-dark': bgDark,
    'color-background': background,
    'color-surface': surface,
    'color-text-primary': textPrimary,
    'color-text-on-dark': textOnDark,
    'color-text-muted': BRAND_TEXT_MUTED,
    'color-border': BRAND_BORDER,
    'color-link-hover': BRAND_LINK_HOVER,
  };
}

function toCssLines(roles, indent = '  ') {
  return Object.entries(roles)
    .map(([name, value]) => `${indent}--${name}: ${value};`)
    .join('\n');
}

function toCssBlock(selector, roles, indent = '  ') {
  return `${selector} {\n${toCssLines(roles, indent)}\n}`;
}

function generate() {
  const raw = fs.readFileSync(INPUT_PATH, 'utf8');
  const data = JSON.parse(raw);
  const keyColors = resolveKeyColors(data);

  // Light mode → cream background, dark text, gold accent.
  const lightRoles = buildRoles(keyColors, {
    background: keyColors.cream,
    surface: keyColors.cream,
    textPrimary: BRAND_TEXT_PRIMARY_LIGHT,
    textOnDark: keyColors.cream,
  });

  // Dark mode → dark-brown background, cream text, gold accent (unchanged).
  const darkRoles = buildRoles(keyColors, {
    background: keyColors.bgDark,
    surface: keyColors.bgDark,
    textPrimary: keyColors.cream,
    textOnDark: keyColors.cream,
  });

  const css = `/**
 * Auto-generated from color-tokens.json by generate-tokens.js.
 * Do not edit directly — re-run \`node generate-tokens.js\` instead.
 *
 * Gold/cream/dark-brown are sourced directly from color.key.primary/
 * secondary/tertiary in color-tokens.json (not hardcoded here). Text-muted,
 * border, and link-hover are not present in color-tokens.json and are taken
 * from design-tokens.md as declared fallbacks.
 */

${toCssBlock(':root', lightRoles)}

${toCssBlock('[data-theme="dark"]', darkRoles)}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${toCssLines(darkRoles, '    ')}
  }
}
`;

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, css, 'utf8');
  console.log(`[generate-tokens] Wrote ${OUTPUT_PATH}`);
}

generate();
