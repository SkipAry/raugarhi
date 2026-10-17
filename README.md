# Rau Garhi

Marathi-led heritage restaurant website in `dist`, using the owner-selected Neyam maroon/parchment palette. Google Sans is used throughout, including Marathi, and served locally as WOFF2 in weights 400, 500 and 600. Buildless HTML, CSS and JavaScript.

## Preview

Run `python -m http.server 4173 --directory dist` and open http://localhost:4173.

## Content

Full-screen owner-supplied hero video, with pause/play and a full-film viewer preserving its portrait frame. All 10 files from `website photos` appear in the gallery; `docs/photo-manifest.json` maps originals to optimized deployed assets. Gallery supports full-size viewing and keyboard navigation.

All 10 local menu images were inspected (8 unique pages). `docs/menu-data.json` records 129 original menu lines across 17 categories. Website includes 128 legible named entries across 9 browsing groups, English/Marathi search, six thali descriptions and printing. One unreadable regional line remains withheld pending its correct name. No prices or priced menu images appear on the website.

History follows the owner's supplied founder story, three-year build and July 2026 opening in Sarola. Detailed sources and design decisions: `docs/design-guidelines.md`.

## Interactions

WhatsApp enquiries and reservations use the owner-confirmed +91 92723 03682. Visitors send a prepared message themselves; bookings require the team's reply. No customer data is stored by the website.

Motion: hero text entrance, scroll reveals, a pausable Marathi welcome ticker, photo hover movement and scroll progress. Reduced-motion preferences respected, and content remains visible when observers are unavailable.

## Hosting

Deploy `dist` as a static directory. `.openai/hosting.json` retains the existing private Sites identity. Source asset folders remain local and ignored; optimized website assets are tracked.

Typography lives in `dist/typography.css`: 17–18px body, 1.75–1.8 paragraph leading, 1.18–1.2 English heading leading, 1.35–1.4 Marathi heading leading, stacked bilingual menu labels. Previous conflicting screen typography declarations were removed from the layout stylesheet. Print metrics remain separate.
