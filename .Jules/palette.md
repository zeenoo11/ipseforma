## 2024-05-24 - Missing ARIA labels and focus states on icon-only buttons
**Learning:** Found that custom icon-only buttons (such as mobile menu toggles and modal close buttons) frequently lack \`aria-label\`s and proper \`focus-visible\` states in this app.
**Action:** Always ensure \`aria-label\` and keyboard accessibility (like \`focus-visible:ring\`) are added when working with icon-only interactive elements.
