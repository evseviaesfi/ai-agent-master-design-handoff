# Responsive layout and actions

## Layout

- Desktop reference: 1440 px wide, with a 900 px opening viewport and a 1765 px complete page.
- Mobile reference: 390 px wide, with an 844 px viewport, a 548.59 px final scene and a 2074 px complete page.
- Header, lower copy and footer share one 1200 px container (left edge at x = 120 px at 1440 px). The two lower cards are 820 px wide inside it. Mobile copy margins: 24 px; header margins: 22 px.
- The description panel starts with a 120 px fade from transparent to #050a07, so the scene no longer ends on a hard edge. Text starts 60 px after the fade; the right padding is max(40 px, (viewport − 1200 px) / 2), which is 120 px at 1440 px, so the text ends where the header button ends.
- At 700 px and below, content uses one column. The opening scene fills the viewport. After Done, it shrinks to 65 svh, with a 480 px minimum, and the description appears underneath.
- Above 700 px, the description enters from the right in a panel occupying 48% of the viewport width. The remaining paragraphs and footer follow below the first screen.
- At 701–980 px, panel side padding is 28 px. MASTER is 54 px, AI AGENT 1.0 is 25 px and the introductory paragraph is 14 px.
- On desktop viewports no higher than 800 px, compact sizing applies: AI AGENT 1.0 is 30 px, MASTER is 70 px, introductory copy is 16 px with 1.65 line height, and the CTA is at least 50 px high. The narrower desktop rule takes precedence for the heading sizes.
- Hero and lower copy use one size: 21 px / 1.75 above 1280 px, 18 px / 1.7 hero and 20 px lower copy from 981 to 1280 px, 15 px hero and 19 px lower copy from 701 to 980 px, and 17 px / 1.75 for both on mobile.
- The header is solid #050a07 at 95% opacity with a #294235 divider, so the brand never sits on window frames.
- Wall sign: 23 px, weight 600, letter-spacing −0.03 em, #eef4ef, skewed 5° to follow the wall, with a local #3ddc5a glow (two soft shadows). Position in the scene: 18 px from the left, 114 px from the top. On mobile it is 27 px at 160 px from the top so it clears the header. The wall is about 190 px wide at 1440 px, which limits how large the sign can be before it meets the lamp strip, the window frame or the person's hair. At 768 px the framing keeps the tablet clear of the panel and the wall is out of frame, so the sign is not visible at that width.
- Sun: a radial gradient (#fff6dc to #ffb45b, fading to transparent) with screen blending, placed between the city photograph and the window frames at 16% from the left and 2% from the top of the scene.
- Lower section: a graphite gradient (#050a07 to #08140d), a 1 px emerald hairline at the top of the container, and two cards with a 1 px #294235 border, a 3 px #3ddc5a left edge and 40 px × 44 px padding (24 px × 20 px on mobile).
- Large headings are capped at 48 px for AI AGENT 1.0 and 102 px for MASTER. Standard panel padding is 110 px at the top, 42 px at the bottom and clamp(36 px, 4.2 vw, 68 px) at the sides.
- The city and foreground scale uniformly. Mobile framing keeps the tablet and hands visible; the right plant may be cropped. The wall sign is hidden in the narrow opening view and appears when the scene shrinks.
- On tall desktop/tablet viewports, horizontal framing keeps the tablet's right edge within 49% of the scene width so that the description panel does not cover it. The 1440 × 900 and 390 × 844 reference compositions are unchanged by this adjustment.

## Colour and type

| Role | Value |
| --- | --- |
| Background | #050a07 |
| Secondary surface | #08140d |
| Primary text | #eef4ef |
| Secondary text | #b9c7be |
| Accent | #3ddc5a |
| Hover and focus | #6cf08a |
| Text on accent | #04110a |
| Dividers | #294235 |

Montserrat Variable, weight range 100–900. Used weights: 400, 500, 600, 650, 700, 750 and 800. Fallbacks: Arial, Helvetica, sans-serif. The font and OFL licence are supplied.

At 1440 × 900: AI AGENT 1.0 is 41.76 px / 0.98 at weight 750; MASTER is 87.12 px / 0.98 at 800; the tagline is 17.856 px / 1.65 at 500; introductory copy is 19.008 px / 1.78 at 400; lower paragraphs are 24 px / 1.7 at 400, with emphasis at 650.

On mobile: AI AGENT 1.0 is 31 px; MASTER is 61.62 px; the tagline is 14 px / 1.65; introductory copy is 16 px / 1.75; lower paragraphs are 18 px / 1.75. Contact text is 16 px on desktop and 14 px on mobile.

## States

- Primary CTA: #3ddc5a fill, #04110a text, 4 px radius, desktop type at 16 px / 700 and a minimum height of 58 px. Hover uses #6cf08a and moves the button up by 1 px. On mobile, the CTA fills its text container, uses 14 px type and is at least 56 px high.
- Start a Project (a button element): transparent fill with a 1 px green border and green text. Hover uses a green fill and dark text. Minimum height: 44 px.
- Products and contact links: secondary text; hover adds green text and an underline. Products has a minimum target height of 44 px. Mobile contact targets are at least 44 px high.
- Keyboard focus: a 3 px #6cf08a outline with a 5 px offset on every link and button.
- The brand symbol and name retain their appearance on hover and use the same keyboard focus treatment as other links.
- `components-and-states.svg/.png` shows the main variants. The SVG objects are editable; the HTML prototype demonstrates the actions.

## Destinations

| Element | Destination |
| --- | --- |
| Header symbol and name | https://angletheory.studio/ |
| Start a Project | Button without a URL. Reveals the final state immediately and scrolls to the closing block (paragraph 3 and the second Discuss Your Business Idea button). No new anchor is introduced |
| Products | https://angletheory.studio/#solutions, the Solutions section that exists in the supplied home page reference. The supplied routes name no separate Products anchor, so this target is listed for approval |
| Both Discuss Your Business Idea buttons | https://wa.me/66984407304?text=Hello%21%20I%20would%20like%20to%20discuss%20AI%20AGENT%201.0%20MASTER%20for%20my%20business. |
| Email AI Business Systems | mailto:b2b.volodymyr.thai@gmail.com |
| Denmark +45 50 27 64 39 | tel:+4550276439 |
| WhatsApp +66 98 440 7304 | https://wa.me/66984407304 |

Prepared WhatsApp message: **Hello! I would like to discuss AI AGENT 1.0 MASTER for my business.** The link prepares the message; it does not send it automatically.

The supplied product route is `/products/ai-agent-master/`. The design package does not deploy that route.

## Motion sequence

1. 0–2 s: the dark tablet display shows one centred request: **I need a plan.**
2. 2–3 s: the request moves upwards.
3. 3–4.25 s: MASTER appears and activates; a pulse travels towards it.
4. 4.25–7.5 s: three illustrative agents appear. Bright pulses and progress indicators show distribution and execution.
5. 7.5–10 s: results return through Master to the original request.
6. 10–10.45 s: the request label changes to Done.
7. From 10.45 s: the desktop description panel enters over 1.05 s. On mobile, the description opens below the scene. The sequence ends at 11.6 s and does not loop automatically.

One restrained reflection moves across the glass. A foreground hand mask sits above the tablet graphics. With reduced motion enabled, the final state is shown immediately. Start a Project also provides an immediate route to the copy.

## Footer logo
- The footer shows the owner-supplied circular AI Business Systems badge (`assets/hero-emblem.webp`, 1254 × 1254 px) without any redrawing or recolouring: 96 px on desktop, 72 px on mobile.
