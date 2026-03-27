## 2026-03-27 - Added missing accessibility attributes
**Learning:** Found several icon-only buttons (like menu toggle and close buttons) missing crucial `aria-label` and `aria-expanded` attributes, making them inaccessible to screen readers.
**Action:** Always ensure icon-only buttons have descriptive `aria-label`s and state attributes like `aria-expanded` when they control visibility of other elements.
