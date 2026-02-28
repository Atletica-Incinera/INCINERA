---
description: Architectural and Development rules for INCINERA
---

To maintain high code quality and consistency in the INCINERA project, all development must follow these rules:

### 1. Separation of Logic and UI

- **Hooks for Logic**: All component logic, state management, and side effects must be extracted into custom hooks.
- **Pure Components**: Components should be as "dumb" as possible, focusing mainly on rendering and accessibility.
- **Structure**:
  - Component: `src/components/[Category]/[ComponentName]/index.tsx`
  - Hook: `src/components/[Category]/[ComponentName]/use[ComponentName].ts` (or in `src/hooks` if shared).

### 2. Internationalization (i18n) First

// turbo

- **Strict JSON**: No hardcoded text. Every string must be added to `public/locales/[lang].json` or `src/messages/[lang].json` before being used.
- **Key Naming**: Use hierarchical keys (e.g., `Hero.title`, `Common.buttons.cta`).

### 3. Accessible & Semantic HTML

- **Semantic First**: Use proper HTML5 elements (`<nav>`, `<main>`, `<article>`, `<section>`, etc.).
- **Interactive Elements**: All buttons, links, and inputs must have appropriate `aria-` labels if the text isn't descriptive enough.
- **Focus States**: Maintain visible and distinctive focus states (already configured in our Design System via `--ring`).

### 4. Design Standards

- Follow the `frontend-design` skill guidelines: avoid generic aesthetics.
- Use the Design System tokens defined in `src/app/globals.css`.

### 5. Data-Driven Content

- **People data (board members, athletes, teams) must live in dedicated data files** (e.g., `src/data/directory.ts`, `src/data/teams.ts`), NOT inline in components.
- Each entry is a typed object with `name`, `role`, `imagePath`, etc. To change a person, you edit **only the data file** — zero component changes needed.
- Use TypeScript interfaces/types for every data shape (e.g., `Member`, `Athlete`, `Team`).

### 6. Componentization Over Raw HTML

- **Never repeat HTML structures.** If a pattern appears more than once, extract it into a reusable component.
- Map over data arrays to render lists — never copy-paste JSX blocks.
- Keep components small and focused on a single responsibility.

### 7. Compound Component Pattern

- **Avoid monolithic components with many props.** Instead of a single `<Card title={...} subtitle={...} avatar={...} badge={...} />` with 10+ props, use the **Compound Component** pattern:
  ```tsx
  <MemberCard.Root>
    <MemberCard.Avatar src={member.imagePath} alt={member.name} />
    <MemberCard.Name>{member.name}</MemberCard.Name>
    <MemberCard.Role>{member.role}</MemberCard.Role>
  </MemberCard.Root>
  ```
- This gives the consumer full control over layout and composition without prop bloat.
- Group sub-components under a single namespace export (e.g., `MemberCard.Root`, `MemberCard.Avatar`).

### 8. shadcn/ui Component Strategy

- **Search Before Build**: Use shadcn MCP (`search_items_in_registries`) to check if a component exists. Always check examples (`get_item_examples_from_registries`) before implementing.
- **Official Installation**: Install via `npx shadcn@latest add [component]`. Base components live in `src/components/ui/`.
- **Extend, Don't Rebuild**:
  - For customizations, wrap the base component in `src/components/[ComponentName].tsx`.
  - Use Tailwind classes mapping to CSS variables (e.g., `bg-primary`, `text-success`).
  - Use the `cn()` utility for variant/conditional styling.
- **Styleguide First**: Every new or customized component **must** be added to the Styleguide:
  - Showcase page: `src/app/styleguide/components/[name]/page.tsx`.
  - Update: `src/app/styleguide/navigation.ts`.
  - Include: All variants (size, color, state), interactive demo, and usage documentation.
