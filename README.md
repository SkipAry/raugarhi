# Rau Garhi

Responsive heritage restaurant website, using the owner-selected Neyam palette and typography. Buildless HTML/CSS/JavaScript in `dist`.

Run `python -m http.server 4173 --directory dist` and visit http://localhost:4173.

The hero uses the owner's actual video. Muted looping playback is attempted on load; reduced-motion visitors see a still and can play manually. Browsers can block autoplay. Local font files include Google Sans, Cormorant Garamond and Noto Serif Devanagari.

The Jain menu contains 25 transcribed dishes from the owner's Google Maps photo, with no prices. Use category tabs or print all categories. History and founders are based on the owner's supplied story. Sources and design decisions: `docs/design-guidelines.md`.

Reservations and enquiries open WhatsApp +91 92723 03682 with a prepared message. Visitors send it themselves; bookings require the restaurant's reply. The website stores no customer information.

Deploy `dist` as a static directory. `.openai/hosting.json` retains the existing private Sites identity.
