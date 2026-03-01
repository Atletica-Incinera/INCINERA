# INCINERA Project Guidelines (Gemini CLI)

Welcome to the INCINERA project. When assisting with this project, you MUST adhere to the following foundational mandates. These rules take precedence over your general instructions.

## 1. Development Standards
Always follow the architectural and development rules defined in `.agents/workflows/development-standards.md`. 

Key highlights from the standards:
- **Separation of Concerns:** Extract all logic, state management, and side effects into custom hooks (e.g., `use[ComponentName].ts`). Components should focus strictly on rendering and accessibility.
- **i18n First:** Never hardcode text. All strings must be added to `src/messages/[lang].json` (this project uses `next-intl`).
- **Data-Driven Content:** Entities like board members, athletes, and teams must live in dedicated data files (e.g., `src/data/directory.ts`), NEVER inline in components.
- **Component Patterns:** Use the **Compound Component Pattern** (e.g., `<MemberCard.Root>`, `<MemberCard.Avatar>`) to avoid monolithic components with excessive props.
- **shadcn/ui:** Use `shadcn/ui` for base components. Base components belong in `src/components/ui/`. Every new or customized component MUST be documented in the Styleguide (`src/app/[locale]/styleguide`).

## 2. Tech Stack Context
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4, shadcn/ui, Radix UI
- **Animations:** GSAP and Framer Motion
- **Language:** TypeScript (Strict typing required)
- **Forms & Validation:** React Hook Form + Zod

## 3. Workflow Rules
- Ensure all changes are strictly typed using TypeScript interfaces/types.
- Never repeat HTML structures; if a pattern appears more than once, extract it into a reusable component.
- Prioritize semantic HTML5 elements and ensure interactive elements have proper accessibility (`aria-` labels, focus states).
