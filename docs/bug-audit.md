# Full website bug audit — 18 October 2026

## Fixed defects

1. Booking form could fall back to a default GET request when app.js was unavailable. That could place entered details in the current page URL. Submit now starts disabled, is enabled only after the WhatsApp handler attaches, and a no-script direct WhatsApp link is provided. A temporary page with the script omitted confirmed the disabled button and no navigation on Enter; that fixture was removed.
2. A visitor could select a time earlier today. Time minimum now follows the selected date and local clock, and submission validates that the requested date/time is in the future. Date/time changes clear the error so the visitor can correct the request.

## Browser checks

Connected Chrome, local production assets:

- Mobile navigation opens, closes on link selection and supports Escape.
- All nine menu tabs switch to their associated panels; keyboard Home returns to signature thalis.
- English case-insensitive and Marathi searches return matching dishes; no-results state appears; clearing search restores category navigation.
- All ten gallery images load, next moves through all ten and wraps to the first; Escape closes the dialog.
- Yesterday is rejected; an earlier time today is rejected; the same time tomorrow is allowed. No WhatsApp message was sent.
- Full page has no horizontal overflow at320,375,390,768,1100,1440 and1920px responsive viewport widths.
- No browser console errors during tested flows.

## Source and automated checks

- HTML nesting, unique IDs, anchors, image alt attributes and relative asset references pass.
- All18 distinct referenced local HTTP resources returned200. CSS font URLs resolve.
- All128 menu entries,10 album photos, exact Google Maps listing, requested chapter order and removed hero controls remain.
- JavaScript syntax passes node --check.
- Eight booking regression tests execute the actual production handler with DOM mocks: recipient, exact Unicode/character encoding, optional values, whitespace name, past date/time, correction flow, and safe enabling order.
- Print CSS restores every menu category/dish even after filtering; native print-preview output was not exercised.
- Reduced-motion fallback reviewed in source: no HTML autoplay, video remains paused when requested, decorative animation stops and content remains visible.

## Limits

Responsive tests used desktop Chrome. Physical Android/iPhone devices, Safari and OS-level reduced-motion switching were not available. External provider pages may require sign-in; the map and outgoing link targets are retained. The no-script fallback was tested by omitting app.js, not by changing the browser's global JavaScript setting.

No remaining confirmed functional blocker found in this audit. This is a scoped check, not a guarantee against every possible defect.
