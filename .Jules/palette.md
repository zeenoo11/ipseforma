## 2025-05-15 - Apple-Inspired Design System Implementation

**Learning:** Apple's design language relies on near-invisible UI, photography-first layouts, and strict typographic hierarchy. Key constraints include no shadows on UI elements, 17px body copy, and specific font stack ordering (`system-ui, -apple-system, BlinkMacSystemFont`) to leverage native SF Pro.

**Action:** Implemented a dual-navigation system (44px black global nav + 52px frosted sub-nav), alternating full-bleed product tiles (White, Parchment, Near-Black), and a single Action Blue (#0066cc) accent color. Ensured all interactive elements use the `scale(0.95)` active transform and high accessibility standards (English ARIA labels).
