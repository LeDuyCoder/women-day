# Design System

## Direction

Direction A — centered, refined, sweet. A large burgundy "20.10" sits inside a soft blush halo; below it a pink envelope with a wax seal rests on a marble pedestal framed by roses and a satin ribbon. Opening the envelope reveals a paper letter with handwritten greeting and signature. Gifts appear as a four-column row of feathered photo vignettes with round burgundy arrow buttons; the special gift is locked.

## Color tokens

```css
:root {
  --color-bg: oklch(1 0 0);
  --color-surface: oklch(0.975 0.012 350);
  --color-primary: oklch(0.62 0.17 12);
  --color-primary-dark: oklch(0.48 0.16 12);
  --color-ink: oklch(0.27 0.075 12);
  --color-muted: oklch(0.43 0.035 12);
  --color-lilac: oklch(0.72 0.105 305);
  --color-border: oklch(0.88 0.035 12);
}
```

## Typography

- Date display: Playfair Display.
- Headings, nav, letter body: Literata, with Georgia as the local fallback.
- Handwriting (letter greeting, signature, footer): Dancing Script.
- Interface: Be Vietnam Pro, with a system sans-serif fallback.
- Use fluid display sizing and keep long Vietnamese copy comfortably readable.

## Layout and components

- Vite + React; entry point is `src/main.jsx` and page composition is in `src/App.jsx`.
- Keep page sections in `src/components/`; shared visual tokens and styles live in `src/styles/`.
- Motion handles staggered reveals, the letter transition, and falling petals; Lucide supplies interface icons.
- Use the CSS envelope and a native dialog; keep controls and letter copy as semantic HTML.
- Present gift choices as a 4-column grid (2 columns on phones) of selectable cards; keep petals behind content and respect reduced motion.
- Buttons have visible keyboard focus and touch targets of at least 44px.
