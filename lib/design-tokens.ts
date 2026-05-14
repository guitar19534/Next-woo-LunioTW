/**
 * Lunio Design Tokens
 * Source of truth for all design decisions — matches lunio.com.tw CSS exactly.
 * Use these in TypeScript; the CSS variables in globals.css are the runtime source.
 *
 * CSS variable → Tailwind utility mapping (via @theme in globals.css):
 *   --color-lunio-blue   → bg-lunio-blue  / text-lunio-blue
 *   --color-lunio-navy   → bg-lunio-navy  / text-lunio-navy
 *   --color-lunio-gold   → bg-lunio-gold  / text-lunio-gold
 *   … etc.
 */

export const colors = {
  // Brand
  blue:         "#3c7ae4",   // --color-lunio-blue  — buttons, links, active states
  blueHover:    "#6994e2",   // --color-lunio-blue-hover
  navy:         "#17284b",   // --color-lunio-navy  — announcement bar, footer, dark sections
  gold:         "#f0d996",   // --color-lunio-gold  — mark/highlight accent (underline gradient)
  // Text
  ink:          "#212020",   // --color-lunio-ink   — headings, product names
  slate:        "#5F6062",   // --color-lunio-slate — secondary text, meta
  muted:        "#888888",   // --color-lunio-muted — placeholder, labels
  // Background
  bgWhite:      "#FFFFFF",
  bg:           "#F8F8F8",   // --color-lunio-bg      — alternating section bg
  surface:      "#f4f4f4",   // --color-lunio-surface — blockquotes, extended sections
  navyTint:     "rgba(23,40,75,0.06)", // --color-lunio-navy-tint
  // Border / Dividers
  border:       "#E4E4E4",   // --color-lunio-border
  divider:      "#eaeaea",
} as const;

/** Tailwind class names generated from the `lunio-*` color tokens */
export const tw = {
  blue:    { bg: "bg-lunio-blue",  text: "text-lunio-blue"  },
  navy:    { bg: "bg-lunio-navy",  text: "text-lunio-navy"  },
  gold:    { bg: "bg-lunio-gold",  text: "text-lunio-gold"  },
  ink:     { bg: "bg-lunio-ink",   text: "text-lunio-ink"   },
  slate:   { bg: "bg-lunio-slate", text: "text-lunio-slate" },
  muted:   { bg: "bg-lunio-muted", text: "text-lunio-muted" },
  bg:      { bg: "bg-lunio-bg",    text: "text-lunio-bg"    },
  surface: { bg: "bg-lunio-surface" },
  border:  { border: "border-lunio-border" },
} as const;

export const typography = {
  /**
   * Body / UI font — loaded via next/font/google (Noto_Sans_TC)
   * CSS var: --font-sans
   */
  fontSans:    "'Noto Sans TC', 'Noto Sans SC', ui-sans-serif, sans-serif",
  /**
   * Display / heading font — Chiron Goround TC (self-hosted, licensed)
   * CSS var: --font-display
   * Fallback chain: Chiron Goround TC → MiSansTC → Noto Sans TC → system sans
   */
  fontDisplay: "'Chiron Goround TC', 'MiSansTC', 'Noto Sans TC', ui-sans-serif, sans-serif",
  // Scale
  displayXL: "93px",
  display:   "50px",
  h1:        "45px",
  h2:        "36px",
  h3:        "30px",
  h4:        "25px",
  h5:        "20px",
  h6:        "18px",
  body:      "16px",
  sm:        "15px",
  xs:        "12px",
  // Weight
  weightNormal:   400,
  weightMedium:   500,
  weightSemibold: 600,
  weightBold:     700,
  // Line height
  lineHeightBody:    1.8,
  lineHeightCompact: 1.65,
  lineHeightTight:   1.2,
} as const;

export const spacing = {
  containerMaxWidth: "1140px",
  sectionPaddingY:   "80px",
  sectionPaddingYSm: "48px",
  cardRadius:        "8px",
  buttonRadius:      "30px",
} as const;

export const breakpoints = {
  mobile: "544px",
  tablet: "921px",
  desktop: "1200px",
} as const;

export const button = {
  paddingX:      "40px",
  paddingY:      "13px",
  borderRadius:  "30px",
  fontWeight:    500,
  letterSpacing: "2px",
  fontSize:      "0.9em",
} as const;
