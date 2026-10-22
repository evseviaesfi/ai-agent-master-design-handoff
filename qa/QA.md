# Design verification

## Editable files and exports

- Seven SVG files parse as XML and contain named layers, native text and editable vector objects. No foreignObject elements are used.
- The complete desktop and mobile sources were opened in a browser. They were rendered to PNG with headless Chromium (Playwright). Opening them in desktop Inkscape has not been verified in this environment.
- Seven SVG files and eight PNG exports are included. The PNG exports of the SVG sources match the SVG dimensions. The dimensions and file details are recorded in `export-dimensions.json`.
- The city photo and foreground are embedded separately. Added page text, tablet labels and the wall sign remain editable.
- Both hands were retouched in the foreground asset. The screen projection and hand mask were checked with the request and Done states.

## Content and assets

- Product name, tagline, all three paragraphs, both CTA destinations, the decoded WhatsApp message and contact links match the supplied content.
- The original brand symbol and city photo match their recorded SHA256 checksums.
- English proofreading is recorded in `ENGLISH_QA.md`. The gallery, documentation and layer names use English.
- All local HTML/CSS dependencies are included in the package. The motion script passes the Node.js syntax check.

## Responsive behaviour and controls

- Final states were checked at widths of 390, 768, 1024 and 1440 px for horizontal overflow (scroll width equals viewport width at all four) and readable copy. The 768 px and 1024 px views are exported as `previews/tablet-768.png` and `previews/desktop-1024.png`.
- At 768 px the wall sign is out of frame; this is recorded in `responsive-and-actions.md`.
- Tall desktop/tablet framing keeps the tablet clear of the description panel. The 1440 × 900 and 390 × 844 reference layouts retain their framing.
- Replay, immediate description reveal, the enlarged tablet view and the automatic Done transition were checked in the local prototype.
- Keyboard focus uses a 3 px #6cf08a outline with a 5 px offset. Component variants are shown in the editable state sheet.
- Reduced-motion handling is implemented in the script; a separate operating-system emulation was not performed.

## Revision v11 checks

- Product name, tagline, all three paragraphs, both CTA URLs, contacts and the WhatsApp message were compared again after the layout change (`package-check.json`).
- The earlier invented anchor `#discuss` no longer appears in the SVG files or the prototype. Products leads to `https://angletheory.studio/#solutions`.
- Start a Project was checked in the browser: it reveals the final state and scrolls to the closing block.

## Contrast

| Pair | Ratio |
| --- | --- |
| Secondary text on background | 11.37:1 |
| Primary text on background | 17.88:1 |
| Primary CTA | 10.63:1 |
| Light green on background | 13.74:1 |

These values refer to the specified solid colours. A separate pixel-by-pixel contrast analysis of the photograph has not been performed. Main page copy is placed on a dense dark panel.

## Scope

This is a design package and local motion demonstration. It does not establish product readiness or confirm a live product interface. The person and office are synthetic; the city is a separate real photograph. No production website deployment or automatic message sending is included.
