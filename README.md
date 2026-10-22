# AI AGENT 1.0 MASTER

Product page design for AI Business Systems. The package includes complete desktop and mobile layouts, editable SVG sources, image assets and a local motion prototype.

The tablet sequence illustrates a person setting a goal, Master coordinating agents and a result returning to the original request. It is a conceptual illustration, not a specification of a live product interface.

## View the design

Open `index.html` to browse the layouts, the 1024 and 768 exports and the link map, and to download the corresponding SVG or PNG files.

| Preview | Dimensions | Content |
| --- | --- | --- |
| `previews/desktop.png` | 1440 × 1765 px | Complete desktop page after Done |
| `previews/mobile.png` | 390 × 2074 px | Complete mobile page after Done |
| `previews/desktop-intro.png` | 1440 × 900 px | Desktop opening scene |
| `previews/mobile-intro.png` | 390 × 846 px | Mobile opening layout for a 390 × 844 px viewport |
| `previews/components-and-states.png` | 1440 × 1040 px | Default, hover and keyboard focus states |
| `previews/tablet-storyboard.png` | 1440 × 620 px | Tablet motion sequence |
| `previews/desktop-1024.png` | 1024 × 1622 px | Control export of the prototype at 1024 px, full page after Done |
| `previews/tablet-768.png` | 768 × 1834 px | Control export of the prototype at 768 px, full page after Done |
| `previews/transitions-map.png` | 1440 × 1038 px | Where each button and link leads |

The PNG previews show the complete layouts without review controls. Viewing them does not require an account or an installed font.

## Revision v11

Changes after the first review:

- The wall sign is lighter, set in the wall's perspective and carries a local emerald glow. Its size is limited by the width of the wall between the lamp strip and the first window frame.
- A warm sun glow sits between the city photograph and the window frames.
- The scene fades into the description panel instead of ending on a hard edge. The right plant is covered by the panel on desktop; the plant in the metal vase stays visible.
- The header is solid graphite, so the brand no longer sits on window frames.
- Hero and lower copy use one text size. The lower copy sits in graphite cards aligned to the 1200 px container used by the header and footer.
- Products now leads to `https://angletheory.studio/#solutions`, the section that exists on the home page. Start a Project is a button without a URL: it reveals the final state and scrolls to the closing block. The invented anchor `#discuss` was removed.
- Control exports at 1024 and 768 px and a map of every button and link were added.

## Edit the source files

Format: SVG 1.1 with named Inkscape layers, native text objects and grouped vector controls. The sources are portable and do not require access to a private editor account. A suitable desktop editor is [Inkscape](https://inkscape.org/).

The sources were created programmatically from measured layout geometry. They were parsed as XML, opened in a browser and rendered with Sharp 0.35.5 / librsvg 2.63.2. Opening them in the desktop Inkscape application has not been verified in this environment.

1. Install `fonts-and-licenses/Montserrat-Variable.ttf` if Montserrat is not already available in your editor.
2. Open `sources/desktop.svg` or `sources/mobile.svg`.
3. Open the **Layers and Objects** panel in Inkscape (Ctrl+Shift+L). Named layers separate the city photo, foreground, wall sign, tablet, page copy, header and footer.
4. Use the Text tool to edit the copy. Text is not converted to outlines. Line breaks are fixed as separate text objects; longer edits may require manual reflow within the group.
5. Button labels, fills, outlines and geometry remain editable. See `sources/components-and-states.svg` for the state variants.
6. Use `sources/tablet-storyboard.svg` to edit the tablet cards at a larger scale. On the page layouts, the same labels remain editable text with local perspective transforms.

Embedded images are referenced through SVG symbols. If an editor selects an image as a clone, use **Edit → Clone → Unlink Clone** (Shift+Alt+D) before editing the resulting group or image. The original image files are also supplied in `assets/`.

The foreground is one raster asset containing the person, clothing, chair, office materials, lighting and plants. Those elements are not separate 3D objects. The city photo, wall sign, added interface labels and buttons are separate from that raster. Image assets and the font are embedded in the SVG files so that moving a source file does not break those references.

## Run the motion prototype

Open `prototype/index.html` in a modern browser. If local file access is restricted, start a local server from the package root:

```text
python -m http.server 8000 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8000/prototype/index.html`.

The review controls can replay the animation, enlarge the tablet or show the description immediately. These controls are part of the design viewer, not the product interface.

- Clean animated view: `prototype/index.html?export=1&animate=1`.
- Static final state: `prototype/index.html?export=1`.
- Desktop/mobile review wrapper: `prototype/review.html`.
- When the operating system requests reduced motion, the prototype shows the final state immediately.

## Package contents

| Path | Contents |
| --- | --- |
| `sources/` | Six editable SVG files: two complete pages, two opening states, component states and the tablet sequence |
| `previews/` | Six matching PNG exports |
| `prototype/` | Self-contained HTML/CSS/JS prototype and screen calibration |
| `assets/` | Foreground, real city photo, original brand symbol and favicon |
| `fonts-and-licenses/` | Montserrat, OFL, font metadata and image provenance |
| `responsive-and-actions.md` | Layout parameters, responsive behaviour, states, motion and link destinations |
| `qa/` | Supplied content and routes, content checks, export dimensions and proofreading record |
| `MANIFEST_SHA256.json` | SHA256 checksums of the delivered files |

Page copy and product links follow the supplied `CONTENT_PAGE.json`, `CONTENT_PAGE_EN.txt` and `ROUTES.csv`, included in `qa/`. The background sign reads **iBusiness System**; the brand in the header and footer remains **AI Business Systems**.

## Repository

[evseviaesfi/ai-agent-master-design-test](https://github.com/evseviaesfi/ai-agent-master-design-test)

The repository is private. Reviewers need repository access to open its links. No production website deployment is included in this package.
