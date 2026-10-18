# Rau Garhi

Marathi-led heritage restaurant website in `dist`, using the owner-selected Neyam maroon/parchment palette. Google Sans is used throughout, including Marathi, and served locally as WOFF2 in weights 400, 500 and 600. Buildless HTML, CSS and JavaScript.

## Preview

Run `python -m http.server 4173 --directory dist` and open http://localhost:4173.

## Content

Full-screen owner-supplied hero video, with a clean, control-free hero and reduced-motion poster fallback. All 10 files from `website photos` appear in the gallery; `docs/photo-manifest.json` maps originals to optimized deployed assets. Gallery supports full-size viewing and keyboard navigation.

All 10 local menu images were inspected (8 unique pages). `docs/menu-data.json` records 129 original menu lines across 17 categories. Website includes 128 legible named entries across 9 browsing groups, English/Marathi search, six thali descriptions and printing. One unreadable regional line remains withheld pending its correct name. No prices or priced menu images appear on the website.

History follows the owner's supplied founder story, three-year build and July 2026 opening in Sarola. Detailed sources and design decisions: `docs/design-guidelines.md`.

## Interactions

WhatsApp enquiries and reservations use the owner-confirmed +91 92723 03682. Visitors send a prepared message themselves; bookings require the team's reply. No customer data is stored by the website.

Motion: hero text entrance, scroll reveals, a moving Marathi menu strip, photo hover movement and scroll progress. Reduced-motion preferences respected, and content remains visible when observers are unavailable.

## Hosting

Deploy `dist` as a static directory. `.openai/hosting.json` retains the existing private Sites identity. Source asset folders remain local and ignored; optimized website assets are tracked.

Typography lives in `dist/typography.css`: 17–18px body, 1.75–1.8 paragraph leading, 1.18–1.2 English heading leading, 1.35–1.4 Marathi heading leading, stacked bilingual menu labels. Previous conflicting screen typography declarations were removed from the layout stylesheet. Print metrics remain separate.

## GitHub Pages

Repository: https://github.com/SkipAry/raugarhi

The Pages workflow in `.github/workflows/pages.yml` publishes `dist` on pushes to `main`. All site assets use relative paths for the `/raugarhi/` project URL. Mobile audit findings and validation: `docs/mobile-audit.md`.

The visit section embeds the exact Rau Garhi Google Maps listing from the owner-provided link (CID 11940498300768388228), with a mobile-friendly frame and external directions link.

The visitor story flows from Maratha heritage and the founders’ dream through the gates, to the pangat, a walk around the Gadhi, shared memories and a visit. The hero tagline follows its subtitle in normal document flow to avoid a viewport-sized internal gap.

Three owner-supplied portrait reels appear directly after the menu in a swipeable slider. Optimized H.264/AAC videos and WebP preview frames are in `dist/assets/reels`; full source recordings remain local in the ignored `reels` directory. Desktop shows all three side by side; mobile swipes between them. Native controls, on-demand playback and pause-when-away behavior support mobile use.
