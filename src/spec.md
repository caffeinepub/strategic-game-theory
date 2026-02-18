# Specification

## Summary
**Goal:** Remove all “Models/Explore Models” functionality and references, and refocus the site on the Interactive Game Simulator and Learning content.

**Planned changes:**
- Remove “Models/Explore Models” from desktop and mobile navigation and ensure nothing links to `/models`.
- Remove the `/models` route/page and retire the `InteractiveModelsPage` and any related router/import usage.
- Update the homepage to remove any “Explore Models” CTA and present exactly three CTAs: “Play Interactive Game”, “Start Learning”, and “View Case Studies”, while keeping the hero title “Game Theory for Strategic Business Decisions.”
- Remove all internal links, buttons, footer quick links, headings, and copy that mention “Models” or route to `/models` (including Case Studies CTAs).
- Delete/retire model-related React components under `frontend/src/components/models/**` and remove any related imports/usages so the app builds cleanly.
- Refocus site navigation/labels to emphasize only: About Game Theory, Interactive Game Simulator, Case Studies, Learning Resources, and Contact/Feedback (and remove “Quiz” from primary nav if present).
- Audit and remove model-related learning assets/resources (including downloadable items) so the site has zero user-facing references to “Models”.

**User-visible outcome:** The site no longer shows any “Models/Explore Models” pages, links, or wording; users are directed via navigation and homepage CTAs to the Simulator, Learning Resources, and Case Studies without any `/models` route available.
