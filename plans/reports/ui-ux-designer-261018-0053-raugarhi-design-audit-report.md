# Rau Garhi design audit

Reference lock: user-selected Neyam. Preserve parchment, #71301f maroon, Cormorant Garamond, thin rules; replace generic content and split hero composition.

## Findings
- Hero is static `courtyard.webp`. Film appears after story/gallery, lacks autoplay, uses preload none. User expects video as first impression.
- Kitchen has no menu. Three generic placeholders do not help people choose dinner.
- Story is emotional copy, not history. No names, dates or origin evidence.
- Most copy 12–13px; eyebrow 8–9px, form labels 10px. Desktop scale masks poor reading comfort.
- Every heading repeats mixed upright/italic fragments. Decorative seal, stars, ribbon and numbered eyebrows compete with genuine heritage character.
- Current documentation describes painterly artwork; visitor needs real venue evidence, architectural details, food and atmosphere.

## Rebuild direction
1. Hero: full-bleed venue video, muted autoplay loop playsinline, strong authentic still poster, subtle bottom gradient. Header transparent over video; maroon on parchment after scroll. Short statement over video, not paragraph. Visible pause control. Reduced motion uses poster with play control.
2. Typography: keep Neyam family for continuity, use display 400 at clamp(56px,7.5vw,116px), leading .96–1.04, tracking -.02em; body 16–18px/1.65; labels 12–13px; navigation 14px; section titles 48–76px. Limit italic to one intentional accent, not every heading. Use real italic face instead of synthetic skew.
3. Menu: immediately after short introduction. Paper menu page with category navigation, readable 2-column list on desktop and 1-column mobile, serif dish names, short descriptions. No prices. Use verified menu only. Enlarge/download no-price card if actual asset available. Provide WhatsApp menu request as secondary action.
4. Story: titled heritage chapter using confirmed origin and architectural facts, with one large real wada photograph and a smaller detail. Avoid invented ages, ancestry, royalty. When dates unavailable, explain wada architecture and its present restaurant use honestly.
5. Photography: establish one arrival wide shot, one intimate wood/brick detail, one dining atmosphere, one true dish photograph. No generic food stock. Avoid illustrated architecture as evidence of actual venue.
6. Sequence: video → short welcome → menu → heritage story → atmosphere gallery → WhatsApp reservation → practical visit details. Remove generic FAQ and repetitive slogan ribbon if they dilute the story.
7. Motion: brief fade/translate on sections, slow optional video, visible focus/hover; no cursor gimmicks or forced scroll.
8. QA: 320/390/768/1440 widths, playing video observable, menu populated and readable, no clipping, form WhatsApp correct, reduced motion accessible.

Craft basis: Refero typography and craft-details references; source user brief. Live Refero unavailable per existing project documentation.

## Unresolved
- Verified historic dates, owners/origin details.
- Confirmed no-price menu content or original menu card.
- Real venue/food assets versus painterly assets need visual inspection.
