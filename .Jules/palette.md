
## 2025-03-08 - ARIA Labels on Icon-Only Buttons
**Learning:** Found an accessibility issue pattern specific to this app's components where dynamic icon-only toggles (like the mobile menu) were missing `aria-label` and `aria-expanded` attributes, making them inaccessible for screen readers.
**Action:** Applied `aria-label`s and `aria-expanded` state to icon-only buttons to improve screen reader accessibility and navigation.
