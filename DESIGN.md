---
name: GBU GEC019F Course Exhibition
description: A quiet university exhibition catalog for student work.
colors:
  paper: "#f6f3eb"
  ink: "#232b25"
  muted: "#586054"
  line: "#cccfc1"
  accent: "#a13e28"
  olive: "#253b2f"
  folio-highlight: "#d5dbb0"
  folio-copy: "#d6decf"
  folio-border: "#abb99c"
  folio-link: "#e4e9ce"
  folio-divider: "#637360"
  selection: "#dfb6a5"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(50px, 5.1vw, 76px)"
    fontWeight: 450
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "43px"
    fontWeight: 450
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "35px"
    fontWeight: 450
    lineHeight: 1.15
  body:
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "16px"
    lineHeight: 1.65
  label:
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "12px"
    fontWeight: 600
rounded:
  control: "3px"
spacing:
  control-gap: "6px"
  small: "20px"
  medium: "24px"
  large: "30px"
  section: "40px"
  column: "50px"
components:
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "7px 10px"
  filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "7px 10px"
  search:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "9px 0"
  folio-button:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "13px 18px"
  folio-button-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.olive}"
  text-link:
    textColor: "{colors.accent}"
  retry-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "8px 16px"
---

# Design System: GBU GEC019F Course Exhibition

## Overview

**Creative North Star: "Course exhibition"**

A quiet university exhibition catalog: warm paper, generous serif headlines, thin rules and useful links make student work the focus. The deep olive publication folio closes the page with practical guidance. Identity is typographic; no university logo is invented.

This records the implementation in `index.html`, `styles.css` and `app.js`, with font provenance in `assets/fonts/README.md`. It describes the built system rather than the preliminary composition brief. Publication remains subject to instructor or TA review; empty collections are an intentional supported state.

**Key Characteristics:**
- Warm paper and ink with restrained brick-red actions.
- Editorial serif headings paired with system sans interface text.
- Flat, ruled collections and a deep olive publication folio.
- Honest empty states with clear next actions.

## Colors

The palette combines warm paper, green-black ink, brick-red actions and a deep olive close; frontmatter values are normative.

The sidecar's eight-step OKLCH color ramps are synthesized preview metadata, not additional source palette tokens. Its component snippets are documentation previews, not published listings.

### Primary

- **Brick red** (`accent`): title emphasis, project group identifiers, collection links, caret and focus outline.

### Secondary

- **Deep olive** (`olive`): publication folio background and its hovered outline-button text.
- **Pale olive** (`folio-highlight`): folio headline emphasis and ordered-step markers.
- **Folio copy, links, border and divider**: pale text and subdued rules provide hierarchy on the dark background.

### Neutral

- **Warm paper** (`paper`): page, skip-link surface, selected-filter text and folio button hover.
- **Green-black ink** (`ink`): primary text, section rules and selected-filter fill.
- **Muted green-gray** (`muted`): explanatory copy, metadata and search underline.
- **Collection rule** (`line`): row dividers and filter hover borders.
- **Warm selection** (`selection`): selected text background with ink foreground.

**The Action Accent Rule.** Use brick red for actionable links and existing textual emphasis; preserve the olive folio's pale link and focus treatment.

## Typography

**Display Font:** Newsreader, with Georgia and serif fallbacks. The local English subset is a static instance at weight (450), optical size (48), distributed under the SIL Open Font License in `assets/fonts/OFL.txt`. No external font service is requested.

**Body Font:** System UI with platform sans fallbacks. Inline code uses UI monospace, Consolas and monospace at (0.9em).

Newsreader provides editorial warmth; sans text keeps navigation, forms, metadata and instructions direct. Display emphasis uses color rather than italics. The source's project-title request for weight (500) does not establish a second supplied Newsreader weight.

- **Display:** course title uses the frontmatter ramp; at widths up to (1000px) it is (55px), up to (650px) it is (48px), and from (1600px) it is (78px).
- **Headline:** section headings become (37px) at the tablet breakpoint and (36px) on mobile. The folio headline uses `clamp(48px, 5vw, 68px)`, line height (1.03), then (54px) on mobile.
- **Title:** empty-state headline becomes (31px) on mobile. Prepared project rows request (29px); portfolio names use (28px).
- **Body:** base text uses the frontmatter role; supporting copy is generally (14px), with folio intro copy (15px). Mobile supporting copy commonly becomes (13px).
- **Label:** search labels, filters, tags and result metadata use compact text; group and step numbers use tabular numerals. Navigation is (14px), weight (550), then (12px) on mobile.

**The Two Voices Rule.** Use Newsreader for editorial headings and names, and system sans for navigation, instructions, metadata and controls.

## Layout

The centered content container caps at (1328px); its width is viewport minus (112px), changing to minus (64px) at (1000px) and minus (40px) at (650px). The built desktop masthead is at least (114px) high. It becomes a stacked identity and navigation block on mobile.

The introduction uses columns (1.9fr / 1fr), gap (90px), and vertical padding (92px / 90px). Tablet columns become (1.4fr / 1fr) with gap (40px); mobile stacks them with gap (30px). The introduction note caps at (36ch), expanding to (45ch) on mobile.

Gallery headings and search share a row; search has a minimum width (310px), then (270px) on tablet, and full available width on mobile. Group filters wrap at every width. Empty states use columns (1fr / 1.15fr), gap (50px), then stack with gap (17px) on mobile.

Prepared project rows use columns (90px / 1.2fr / 1fr), gap (28px); tablet puts summary below the title in column two; mobile stacks all content. Portfolio rows align a name and link cluster, then stack on mobile. These styles exist, but the current catalog contains no published project or student records.

The full-width folio contains columns (1fr / 1.15fr), gap (100px), reducing to (50px) on tablet and one column with gap (40px) on mobile. Body copy caps at (65ch). Ordered steps preserve their own numbering; it is instruction order rather than section numbering. Footer columns stack on mobile, preserving the authored line breaks.

## Elevation & Depth

No shadows, gradients, elevated cards or overlay layers are used. Depth comes from the paper-to-olive background change, typographic scale, white space and thin rules. Controls change color or border on interaction without movement.

**The Ruled Surface Rule.** Separate collection content with thin rules and spacing; preserve the flat surface treatment.

## Shapes

The main geometry is rectangular and open. Filters, outlined folio action and retry button share gently softened corners from `rounded.control`. Search is an underlined field. Section rules use ink; rows use the lighter collection rule. Inline icons are actual stroked SVGs, generally (20px), stroke width (1.6), with navigation icons (16px) on mobile.

## Components

- **Navigation:** compact text links with an inline arrow on the publication action. Hover takes the global accent; mobile keeps all links visible in a spaced row. The focused skip link moves from offscreen to the top of the page.
- **Search:** a visible associated label, decorative SVG, transparent search input and muted underline. It is disabled until the catalog loads. Typing combines with the active group; the URL receives `q` and `group` query parameters without navigation.
- **Group filters:** real buttons for All groups and G01–G15. `aria-pressed` supplies selection state; selected controls use ink fill and paper text. Hover adds a light rule and ink text. Mobile padding becomes (7px / 9px).
- **Text actions:** inline links with underline offset (0.24em). The introductory action has a brick-red bottom rule and arrow; collection links and prepared project links use the accent.
- **Folio action:** transparent outlined link on the olive background, with a (1px) pale border and arrow. Hover reverses to paper fill and olive text.
- **Collection rows:** ruled, borderless containers. Project rows provide group, title, optional tags, source/demo/submission links and summary; portfolio rows provide display name and personal links. No placeholder published records are inserted.
- **Empty/loading/error:** the empty gallery uses a serif heading and an actionable explanation. No matches offers a clear-search action that resets both controls and focuses search. Loading text precedes data; load failure offers retry and a GitHub records link. Portfolio loading and failure also have explicit copy. No-JavaScript visitors get a GitHub records fallback.

Keyboard focus is a (3px) outline with offset (5px), using the accent on paper and pale folio-link color on olive. Semantic landmarks, labeled sections, decorative `aria-hidden` SVGs, an associated search label, filter `aria-pressed`, and polite live result status are implemented. Smooth anchor scrolling becomes immediate for reduced-motion preferences. These are source-confirmed provisions, not a claim of a full accessibility audit.

## Do's and Don'ts

### Do:

- **Do** retain paper, ink and brick-red hierarchy with the dark olive folio.
- **Do** keep visible keyboard focus and the reduced-motion alternative.
- **Do** preserve wrapping filters, stacked mobile collections and authored footer line breaks.
- **Do** show honest empty, loading and unavailable states with useful actions.

### Don't:

- **Don't** invent a university logo or fabricate published work to fill the gallery.
- **Don't** replace the supplied serif headings with a system display face.
- **Don't** imply extra Newsreader weights are bundled with the static font.

Not canonized or repaired: the source `@font-face` declares weight 200–800 although the supplied asset is static 450. The preliminary brief's 80px masthead is superseded here by the built 114px minimum. Screenshot recapture and the independent finish verdict are outside this documentation pass; no shipping raster assets are present.
