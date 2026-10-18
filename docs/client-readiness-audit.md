# Client presentation audit — 18 October 2026

Baseline:55a550911a6517295da97a189e8034eeefa88ada. Final review covers the latest three-reel section and mobile hero placement.

## Confirmed issue fixed

The Google Maps iframe remained blank during live mobile testing despite the directions link working. Replaced the redirecting maps.google.com URL with its observed direct Google embed destination, retaining the same Rau Garhi CID11940498300768388228, and changed loading from lazy to eager. The local production preview then visibly rendered the red Rau Garhi pin. This intentionally starts the map request earlier to prioritize reliable display for the presentation.

## Passed

- Live site and all24 distinct referenced assets returnedHTTP200, including all three MP4 files.
- Latest Pages workflow succeeded; no uncommitted baseline changes before the map fix.
- All9 menu tabs, Marathi search, clearing the search, mobile menu open/close and Escape.
- All10 gallery images load; next cycles through all10 and wraps; Escape closes the dialog.
- Three complete reels decode without errors (H264/AAC/yuv420p,720x1280); first playback verified locally, second/third on the live website. Native mobile controls work; horizontal movement and pause-when-away behavior verified. No automatic reel audio/playback on page load.
- Reels appear immediately after menu. Desktop shows all3; mobile provides horizontal swiping with a next-card preview.
- No page overflow or clipped reel heading at320,375,390,430,768,1100,1440 and1920px widths.
- Mobile body17px, inputs16px; Google Sans loaded. Location line104px below page top/header bottom88px; grouped hero text lower in the frame.
- All8 booking regression tests passed: confirmed recipient, encoded Marathi/special characters, optional values, invalid names, past bookings, corrections and safe handler initialization. No WhatsApp message sent.
- HTML nesting, unique IDs, anchors, asset references and JavaScript syntax passed.
- No browser console errors during the tested flows. Print and reduced-motion behavior reviewed in source.

## Remaining limits

Responsive Chrome was tested, not physical Android/iPhone hardware or Safari. Native print-preview output and OS-level reduced-motion switching were not exercised. Google Maps remains a third-party network dependency; the external directions link is always available.

No remaining confirmed blocking issue found after the map correction.
