# Mobile and typography audit — 18 October 2026

Reviewed the complete page and interactions using Chrome at 320, 375, 390, 768 and 1440px viewport widths. The narrowest viewport has a 305px content area because this desktop browser displays a scrollbar.

## Fixes

- Removed a late brand subtitle font override that crowded the small-screen header; restored compact 10px supporting text, flexible brand layout and a stable menu trigger.
- Stacked reservation date/time and guest/occasion fields at 480px and below. Inputs retain 16px type to avoid iOS focus zoom.
- Hid the fixed WhatsApp link while the hero is visible so it cannot cover the film controls. Enquiries remain available through the hero reservation CTA and form.
- Added Escape-to-close and focus restoration for mobile navigation.
- Added Marathi language metadata to the hero CTA, hero footer and history caption.
- Added safe-area spacing for floating controls, touch-action hints and contained modal overscroll.
- Made the mobile history image proportional instead of forcing 520px height.
- Versioned CSS/JS URLs so returning visitors receive the corrected styles.

## Verified

- No horizontal page overflow at all five viewport widths.
- Google Sans loaded correctly; mobile body 17px/29.75px; body paragraphs use 1.8 leading, Marathi headings use 1.4 leading; consistent 64px section padding and 24px gutters (20px at 375px and below).
- Hero → Marathi strip → history order, 20-second strip animation, no strip pause button, selected welcome copy preserved.
- Mobile navigation opens, Escape closes and link navigation works.
- Marathi menu search finds Puran Poli, empty search state works, clearing restores categories, Jain tab opens.
- All ten photos retained without grid captions. Full-size viewer opens, next photo and count work, close works.
- All six booking fields are full-width on phones and use 16px type. Minimum booking date follows local date. WhatsApp links target the confirmed business number.
- No browser console errors during tested interactions. JavaScript syntax check passed.

## Limits

Chrome responsive viewports were tested; physical iPhone/Android hardware and Safari were not available. No WhatsApp message was sent. Hero text contrast varies with the film; the owner-requested 30% overlay is retained. The owner-requested strip has no visible pause control; reduced-motion preferences still stop its animation.

Review references: [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md), [GitHub Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
