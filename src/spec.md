# Specification

## Summary
**Goal:** Add a visually distinct, full-width creator credit banner at the very top of the Home page ("/"), above the existing hero section.

**Planned changes:**
- Update `HomePage.tsx` to render a full-width banner before the hero section with the exact creator credit text and line breaks provided.
- Style the banner to be responsive (readable on mobile/desktop, no horizontal overflow, edge-to-edge across the viewport) and ensure it appears only on the Home route.

**User-visible outcome:** On the Home page, users see a new full-width creator credit banner above the hero section; other pages remain unchanged.
