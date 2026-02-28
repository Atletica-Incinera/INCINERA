# PRD — Atlética INCINERA Sistema de Temas & Configurações

## 1. Project Overview

**Product:** Sistema de Temas (Claro/Escuro) e Menu de Configurações para a Landing page da **Atlética INCINERA**.
**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, GSAP, Framer Motion, next-intl (i18n), Sora font.
**Goal:** Implementar sistema completo de temas com transição suave, garantindo a identidade visual (vermelho fogo) em ambos os temas, e criar um menu de configurações criativo com toggle de tema e seletor de idioma.

---

## 2. Design System Reference

All design tokens are in `src/app/globals.css`. O projeto agora suporta ambos Light e Dark mode.

### Tema Escuro (Dark Mode) - Padrão Original

| Token          | Value                                   | Usage                        |
| -------------- | --------------------------------------- | ---------------------------- |
| `--background` | `oklch(0.08 0 0)`                       | Page background (near-black) |
| `--foreground` | `oklch(0.985 0 0)`                      | Primary text (near-white)    |
| `--primary`    | `oklch(56.776% 0.23238 28.403 / 0.822)` | Brand red — CTAs, accents    |

### Tema Claro (Light Mode) - NOVO

Metodologia de escolha para manter acessibilidade (WCAG AA) e estética:

- Backgrounds escuros → Claros.
- Textos claros → Escuros.
- Vermelho primário → Ajustado para ser mais escuro e visível contra fundos claros sem perder a essência (fogo).

---

## 3. Development Standards (MANDATORY)

These are defined in `.agents/workflows/development-standards.md` and MUST be followed:

### 3.1 Separation of Logic and UI

- **All component logic** must go into a custom hook.
- **Components** are pure renderers.

### 3.2 Internationalization (i18n) First

- **NO hardcoded text.** Every string MUST be added to `pt.json` and `en.json`.
- Use `useTranslations()` hook from `next-intl`.

### 3.3 Accessible & Semantic HTML

- Visible focus states.
- High contrast compliant with WCAG.

### 3.4 Componentization

- Keep components small and focused on a single responsibility.

---

## 4. SISTEMA DE TEMAS

### 4.1 Estrutura de CSS Variables

Todas as variáveis de cor devem ter versão para `:root` (light) e `.dark` (dark mode) em `src/app/globals.css`.

- Transição suave global de `200ms ease` para `background-color`, `color`, `border-color`.
- Ajustes finos de sombras e vermelhos para o tema claro.

### 4.2 Theme Context

- React Context para gerenciar tema global (`ThemeProvider`).
- Sync com LocalStorage e `prefers-color-scheme`.
- Anti-flash script injetado na raiz.

### 4.3 Componentes Afetados

TODOS os componentes devem suportar ambos os temas, substituindo cores hardcoded por CSS variables (ver THEME_TODO.md).

---

## 5. MENU DE CONFIGURAÇÕES NA NAVBAR

### 5.1 Settings Dropdown Component

- Botão "Configurações" com hover abrindo o dropdown usando o padrão **Safe Triangle**.
- Design com glassmorphism e micro-interações criativas (partículas de fogo).

### 5.2 Theme Toggle (Fire-Themed)

- Toggle switch estilizado com gradiente de fogo e indicadores de claro ☀️ / escuro 🌙.
- Animação de chama acompanhando a transição.

### 5.3 Language Selector

- Seletor estilizado (não-nativo) integrando bandeiras e i18n (`pt` e `en`).

---

## 6. Qualidade & Aceitação Final

- [ ] Toggle de tema funciona instantaneamente.
- [ ] Preferência persiste no localStorage.
- [ ] Sem "flash" de tema errado ao recarregar a página.
- [ ] Acessibilidade e contraste garantidos nos dois temas.
- [ ] O Red Brand (tema de fogo) continua atraente no modo claro.
