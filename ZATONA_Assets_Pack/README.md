# ZATONA Website Assets

Brand palette:
- Dark Olive: `#35452D`
- Warm Cream: `#F3EFE4`
- Light Olive: `#78836A`
- Muted Beige: `#DCD4C2`
- Dark Text: `#25291F`

## Important note about the supplied logo
The source `Icon.svg` was a 32×32 brand mark with the olive and cream colors. The mark artwork was preserved and exported into the variants in `branding/` and `favicon/`.
The horizontal lockup files combine the supplied mark with editable `ZATONA` and `BUILD • INNOVATE • GROW` text. Treat these as website lockup compositions, not a replacement for a separately supplied official typography/wordmark master.

## Folder guide

| Folder | Contents | Intended use |
|---|---|---|
| `branding/` | SVG and PNG logo variants | Header, footer, dark/light backgrounds |
| `favicon/` | SVG, ICO, and PNG icons | Browser tab, Apple touch icon, app icons |
| `images/` | Abstract brand visuals | Hero and About sections |
| `services/` | Three abstract square illustrations | Temporary generic visuals; map to real services only after service list is finalized |
| `portfolio/` | Empty placeholder folder | Add real project thumbnails only |
| `social/` | Open Graph preview | Social link previews |
| `fonts/` | Empty optional folder | Self-hosted font files if desired |

## Recommended dimensions
- Logo mark: vector SVG; PNG export 1024×1024.
- Horizontal lockup: SVG; PNG export 1600×480 (10:3).
- Favicon: 16×16, 32×32, 48×48 PNG/ICO.
- Apple touch icon: 180×180 PNG.
- App icons: 192×192 and 512×512 PNG.
- Hero visual: SVG viewBox 1600×1000 (16:10).
- About visual: SVG viewBox 1200×900 (4:3).
- Service visuals: SVG viewBox 640×640 (1:1).
- Open Graph: SVG plus 1200×630 PNG (1.91:1).

## Suggested HTML favicon tags

```html
<link rel="icon" href="./assets/favicon/favicon.svg" type="image/svg+xml">
<link rel="icon" href="./assets/favicon/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="./assets/favicon/apple-touch-icon.png">
```

## Suggested usage
- Header: `branding/zatona-logo-horizontal.svg`
- Footer: `branding/zatona-logo-horizontal.svg`
- Dark section: `branding/zatona-logo-horizontal-light.svg`
- Compact/mobile: `branding/zatona-logo-mark.svg`
- Hero: `images/hero-visual.svg`
- About: `images/about-zatona.svg`
- Services: `services/service-visual-01.svg` through `service-visual-03.svg`
- Social preview: `social/og-image.png`

## Notes
- The abstract illustrations are original brand-colored decorative artwork, not photographs or evidence of completed client work.
- No client names, testimonials, statistics, or portfolio projects have been fabricated.
- Replace or supplement the generic service illustrations after ZATONA's actual service catalog is finalized.
