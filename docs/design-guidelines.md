# Rau Garhi website — visual direction

## Reference lock

Owner-selected Neyam reference: https://peaceful-madeleine-0e6185.netlify.app/
Preserve #71301f maroon, #fbf6ec parchment and Cormorant Garamond + Google Sans. Correct original execution: 16px body copy, 12–14px controls, restrained heading tracking, no repeated italic word treatment, no decorative seals or slogan ribbon.

Opening: actual owner-supplied 16-second video, muted looping playback attempted on load, with a visible pause/play button and reduced-motion respect. Desktop uses a cinematic maroon-to-footage composition; mobile fills the hero with the portrait film. Posters and history stills are genuine frames extracted from that video. The Maratha portrait remains owner-supplied artwork, labelled as artwork in alt text.

Structure: hero → welcome → menu card → history → architectural detail → gathering invitation → WhatsApp reservation → location.

## Content sources

Owner-supplied history (18 October 2026): founders Sushama Uddhavrao Shinde and Vasundhara Yogesh Deshmukh; three-year build inspired by Tatbandi and Buruj; opening July 2026; Sarola Gaon on Pune–Bengaluru Highway; pure vegetarian. Describe a newly crafted Gadhi inspired by heritage, without implying a centuries-old hotel.

Menu: https://maps.app.goo.gl/W5ZAJZdXSz1KoeCy6 resolves to a Jain menu photo. 25 dishes transcribed without prices, grouped into breakfast, mains, rice and sweets. User also confirms Thalipeeth, Ghavane and Puran Poli. Category tabs support arrow/Home/End navigation; print styles expose all categories. No original priced menu image is published.

Location: https://maps.app.goo.gl/3p2wWa9QgBCq72FS7 owner-provided actual venue listing. Instagram: https://www.instagram.com/rau.garhi/

WhatsApp: +91 92723 03682, owner-confirmed. Reservations are requests until the team replies. Hours remain unverified, so route hours enquiries to team.

Live Refero unavailable due inactive subscription. Owner reference and bundled typography/craft/motion references used. Browser visual QA attempted; Chrome navigation connection times out. Static and functional validation performed separately; do not claim screenshot verification without rendered evidence.

## Marathi-led full-video revision

Owner requested full-screen hero video, Marathi character, all local photos and complete local menu. Hero now fills the viewport; typography uses Marathi first (गढी मराठमोळी. पंगत आपुलकीची.). A full-film dialog preserves the uncropped portrait original. Transparent header overlays the film.

All 10 files from `website photos` are optimized into `dist/assets/gallery` and appear in the visible gallery. `docs/photo-manifest.json` maps every original to its deployed asset. Source folders stay local and are ignored by Git; optimized assets are tracked. Gallery supports full-size viewing, previous/next, keyboard arrows and Escape.

`docs/menu-data.json` records 129 menu lines across 17 original categories from all 10 local menu images (8 unique pages). Site displays 128 legible named lines across 9 browsing groups; one unreadable regional name is withheld rather than guessed. Owner clarified adjacent readable names but did not identify that unclear line. Four transcription notes remain recorded for future owner review. Full menu includes six thalis with contents, regional bhajis, breakfast, sandwiches, soups/starters, Chinese/sizzlers, pizza/pasta, breads/rice/dal, drinks and Jain items. Search matches both English and Marathi, print includes all categories. No prices or priced source images are published.

Motion: staggered hero entrance, observer-based section/photo reveals, slow Marathi welcome ticker with pause button, photo hover zoom, lightweight scroll progress. Reduced motion disables decorative motion and automatic hero playback. Content remains visible if observer support is missing.

## Readability correction

The owner rejected the previous fonts and line spacing. The palette remains; typography changes to Lora 500/600 for English headings and Mukta 400/500/600 for English and Marathi reading/UI text. Locally served WOFF2 font files have verified Marathi and Latin glyph coverage. `dist/typography.css` is the sole screen type authority; 370 competing type declarations were removed from the layout stylesheet. No negative tracking on Devanagari.

Body: 18px desktop, 17px mobile, 1.75–1.8 leading, prose max60ch. English headings: 1.18–1.2 leading. Marathi headings: 1.35–1.4. Menu names: 19–20px Mukta500, Marathi17px below; descriptions16px/1.75. Labels/notes13–16px. Shortened brand tagline avoids narrow-screen overflow. Print rules keep separate compact metrics.

## Owner-selected Google Sans

Google Sans 400/500/600 now owns every text role, including headings, body, Marathi, menu names and controls. Official Google Fonts files are served locally as WOFF2. Font character maps verify Marathi and Latin coverage. The corrected sizes, line heights and spacing remain. Prior Lora/Mukta choices are superseded.
