# Refatoração do Design System — INCINERA

> **Objetivo:** Transformar o código atual em uma arquitetura escalável, otimizada e de fácil manutenção, centralizando estilos repetidos em componentes reutilizáveis e mantendo o Styleguide como fonte da verdade.

---

## Contexto do Projeto

| Item                   | Valor                                                                |
| ---------------------- | -------------------------------------------------------------------- |
| **Framework**          | Next.js 16 + React 19 + TypeScript                                   |
| **Styling**            | Tailwind CSS v4 (via `@tailwindcss/postcss`)                         |
| **UI Base**            | shadcn/ui (instalado via `shadcn` CLI)                               |
| **Animações**          | GSAP + Framer Motion                                                 |
| **i18n**               | `next-intl` (mensagens em `src/messages/`)                           |
| **Imagens**            | Cloudinary (via `AppImage` wrapper)                                  |
| **Dados**              | Arquivos tipados em `src/data/` + loaders Google Sheets              |
| **Styleguide**         | `src/app/[locale]/styleguide/` com sidebar e páginas individuais     |
| **Design Tokens**      | CSS custom properties em `src/app/globals.css` (oklch)               |
| **Padrões Existentes** | Compound Components, Hooks para lógica, `cn()` para merge de classes |

### Regras Vigentes (`.agents/workflows/development-standards.md`)

1. Separação de lógica (hooks) e UI (componentes puros)
2. i18n obrigatório — zero texto hardcoded
3. HTML semântico e acessível
4. Tokens do Design System via `globals.css`
5. Dados em arquivos dedicados (`src/data/`)
6. Componentização sobre HTML repetido
7. Compound Component Pattern
8. shadcn/ui: buscar antes de construir, instalar oficialmente, estender sem reescrever

### Stack Atual de Componentes

```
src/components/
├── ui/                          # Design System base
│   ├── AppImage/index.tsx       # Wrapper de imagens c/ fallback Cloudinary
│   ├── ContactLinkCard/         # Card de link de contato
│   ├── MemberCard/              # Compound: Root, Avatar, Name, Role
│   ├── SectionSeparator/        # Separador entre seções
│   ├── StatCard/                # Card de estatística
│   ├── ValuePillarCard/         # Card de valor/pilar
│   ├── button.tsx               # shadcn Button (CVA)
│   ├── badge.tsx                # shadcn Badge
│   ├── card.tsx                 # shadcn Card
│   ├── input.tsx / textarea.tsx # shadcn Inputs
│   ├── label.tsx                # shadcn Label
│   ├── alert.tsx                # shadcn Alert
│   └── radio-group.tsx          # shadcn RadioGroup
├── sections/                    # Seções da landing page
│   ├── Hero/
│   ├── AboutSection/
│   ├── TeamsList/
│   ├── DirectorySection/
│   ├── PartnersSection/
│   ├── ContactSection/
│   ├── MapSection/
│   └── SponsorPage/
└── layout/                      # Layout global
    ├── Navbar/
    ├── Footer/
    └── SettingsDropdown/
```

---

## Fase 1: Auditoria e Inventário

### Tarefa 1.1 — Inventário do Design System Atual

Analisar todos os tokens e componentes existentes:

**Fontes de verdade a auditar:**

- `src/app/globals.css` — tokens visuais (cores, radius, Keyframes)
- `src/app/[locale]/styleguide/` — documentação existente
- `src/app/[locale]/styleguide/navigation.ts` — itens documentados
- `src/components/ui/` — componentes base já criados

**Entrega:** `docs/DESIGN_SYSTEM_INVENTORY.md`

```markdown
# Inventário do Design System

## Tokens de Design

- Cores: primary, secondary, muted, accent, destructive, card, popover, border...
- Radius: sm, md, lg, xl, 2xl, 3xl, 4xl
- Tipografia: font-sora (sans), font-geist-mono (mono)
- Keyframes: fire-pulse, float-spark

## Componentes UI Registrados (shadcn)

- Button (variantes: default, destructive, outline, secondary, ghost, link)
- Badge, Card, Input, Textarea, Label, Alert, RadioGroup

## Componentes Custom Registrados

- AppImage, MemberCard (compound), ContactLinkCard, StatCard, ValuePillarCard, SectionSeparator

## Componentes NÃO Documentados no Styleguide

- AppImage (criado recentemente, sem página)
- SponsorDetailModal / MemberDetailModal (modais)
- SectionSeparator (sem página)

## Padrões Visuais Documentados

- Section Headers
- Partners Grid
```

### Tarefa 1.2 — Auditoria de Classes Repetidas

Escanear **todos** os arquivos `.tsx` em `src/components/` e `src/app/` buscando:

1. **Padrões de classe repetidos** (mesma combinação Tailwind usada 3+ vezes)
2. **Componentes implícitos** — blocos de JSX+estilos idênticos que deveriam ser componentes
3. **Inconsistências** — mesmo elemento visual com classes diferentes entre arquivos

**Metodologia:**

```bash
# Encontrar padrões de texto/tipografia repetidos
grep -rn "text-[0-9]xl.*font-" src/components/ src/app/[locale]/

# Encontrar padrões de container/card repetidos
grep -rn "rounded-.*border.*bg-" src/components/ src/app/[locale]/

# Classes de transição/hover repetidas
grep -rn "transition-.*hover:" src/components/ src/app/[locale]/

# Padrões de espaçamento repetidos
grep -rn "space-y-\|gap-\|py-\|px-" src/components/ src/app/[locale]/
```

**Entrega:** `docs/CURRENT_STATE_AUDIT.md`

```markdown
# Auditoria do Estado Atual

## Padrões Repetidos (candidatos a componente/abstração)

### Alta Frequência (5+ ocorrências)

| Padrão                                                                     | Ocorrências | Solução Proposta                     |
| -------------------------------------------------------------------------- | ----------- | ------------------------------------ |
| `text-5xl md:text-7xl font-black uppercase tracking-tighter`               | ~6x         | Componente `SectionTitle`            |
| `text-xl md:text-2xl text-primary font-bold italic`                        | ~5x         | Componente `SectionSubtitle`         |
| `rounded-2xl bg-card border border-border`                                 | ~10x        | Variante de `Card`                   |
| `transition-all duration-300 hover:-translate-y-1 hover:border-primary/50` | ~8x         | Util `interactiveCard` via `cn()`    |
| `relative w-full aspect-[...] rounded-2xl overflow-hidden`                 | ~6x         | AppImage `containerClassName` preset |

### Média Frequência (3-4 ocorrências)

| Padrão                              | Ocorrências | Solução Proposta              |
| ----------------------------------- | ----------- | ----------------------------- |
| `text-muted-foreground font-medium` | ~4x         | Componente `Text` c/ variante |
| Modal overlay + backdrop            | ~3x         | Componente `Modal` base       |

## Componentes Implícitos (JSX repetido sem componente)

1. **Modal Base** — `MemberDetailModal` e `SponsorDetailModal` 80% idênticos
2. **Section Header** — título + subtítulo usado em todas as seções
3. **Social Links Row** — renderização de ícones sociais idêntica nos dois modais

## Inconsistências Encontradas

- [listar após auditoria real]
```

---

## Fase 2: Planejamento da Arquitetura

### Tarefa 2.1 — Estrutura de Componentes Proposta

```
src/components/
├── ui/                            # Design System base (reutilizável em qualquer projeto)
│   ├── AppImage/index.tsx         # ✅ Existe — manter
│   ├── MemberCard/index.tsx       # ✅ Existe — manter (compound)
│   ├── ContactLinkCard/           # ✅ Existe — manter
│   ├── StatCard/                  # ✅ Existe — manter
│   ├── ValuePillarCard/           # ✅ Existe — manter
│   ├── SectionSeparator/          # ✅ Existe — manter
│   │
│   ├── typography/                # 🆕 CRIAR
│   │   ├── SectionTitle.tsx       # h2 de seção (text-5xl+ font-black uppercase)
│   │   ├── SectionSubtitle.tsx    # Subtítulo da seção (text-xl primary italic)
│   │   └── index.ts
│   │
│   ├── Modal/                     # 🆕 CRIAR — base reutilizável
│   │   ├── index.tsx              # Compound: Root, Overlay, Content, Close
│   │   └── useModal.ts            # Hook com lock de scroll, escape, click-outside
│   │
│   ├── SocialLinksRow/            # 🆕 CRIAR — linha de ícones sociais
│   │   └── index.tsx
│   │
│   ├── button.tsx                 # ✅ shadcn — manter
│   ├── badge.tsx                  # ✅ shadcn — manter
│   ├── card.tsx                   # ✅ shadcn — manter
│   ├── input.tsx                  # ✅ shadcn — manter
│   ├── textarea.tsx               # ✅ shadcn — manter
│   ├── label.tsx                  # ✅ shadcn — manter
│   ├── alert.tsx                  # ✅ shadcn — manter
│   └── radio-group.tsx            # ✅ shadcn — manter
│
├── sections/                      # Seções específicas da landing page
│   └── [mantém estrutura atual]
│
└── layout/                        # Layout global
    └── [mantém estrutura atual]
```

### Tarefa 2.2 — Lista de Componentes a Criar/Refatorar

**Entrega:** `docs/COMPONENTS_TODO.md`

```markdown
# Componentes — Checklist

## 🆕 Novos Componentes

### Tipografia

- [ ] `SectionTitle` — Título principal de seção
  - Props: `children`, `className?`
  - Estilo base: `text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground`
  - Usado em: Hero, AboutSection, DirectorySection, PartnersSection, ContactSection, TeamsList
  - Semântica: `<h2>` por padrão

- [ ] `SectionSubtitle` — Subtítulo de seção
  - Props: `children`, `className?`
  - Estilo base: `text-xl md:text-2xl text-primary font-bold italic`
  - Usado em: AboutSection, DirectorySection, PartnersSection, ContactSection

### Layout

- [ ] `Modal` — Componente base de modal (compound)
  - Sub-componentes: `Root`, `Overlay`, `Content`, `Header`, `Close`
  - Hook: `useModal.ts` (scroll lock, Escape, click outside, AnimatePresence)
  - Refatorar: `MemberDetailModal`, `SponsorDetailModal` passam a usar este base
  - Padrão: Framer Motion para animações de entrada/saída

### Feedback & Social

- [ ] `SocialLinksRow` — Linha de ícones de redes sociais
  - Props: `links: SocialLinks`, `className?`
  - Renderiza ícones condicionalmente baseado nas keys presentes
  - Usado em: `MemberDetailModal`, `SponsorDetailModal`, `Footer`

### Documentação (Styleguide)

- [ ] Página do `AppImage` no Styleguide — componente existe, falta página
- [ ] Página do `SectionSeparator` no Styleguide
- [ ] Página do `Modal` no Styleguide (após criação)
- [ ] Página do `SocialLinksRow` no Styleguide (após criação)
- [ ] Atualizar `navigation.ts` com novos itens

## 🔄 Refatorações em Componentes Existentes

- [ ] `MemberDetailModal` → Extrair para usar `Modal` base + `SocialLinksRow`
- [ ] `SponsorDetailModal` → Idem
- [ ] Seções (About, Directory, Partners, Contact, Teams) → Usar `SectionTitle` + `SectionSubtitle`
- [ ] `Hero` → Verificar se título pode usar componente de tipografia ou se é exceção (animação GSAP)

## 📊 Estatísticas Estimadas

- Novos componentes: ~4
- Componentes a refatorar: ~8
- Arquivos a atualizar: ~12
- Páginas de Styleguide a criar/atualizar: ~5
```

---

## Fase 3: Implementação do Design System

### Regras de Implementação

> ⚠️ **NÃO use `@apply` para criar componentes.** Componentes React são sempre preferíveis.
> Use `@apply` apenas em `globals.css` para estilos de base layer extremamente genéricos (como `body`, `*`).

#### 3.1 — Princípios de cada componente

Todo componente novo deve seguir:

1. **TypeScript estrito** — props tipadas com interfaces
2. **`cn()` para merge de classes** — nunca concatenação manual de strings
3. **`className` como escape hatch** — toda raiz aceita `className?` para personalização
4. **JSDoc** — documentação inline explicando uso
5. **Compound pattern** quando > 3 variações internas
6. **Semântica HTML** — tags corretas (não `<div>` para tudo)

#### 3.2 — Template de componente

```tsx
// src/components/ui/typography/SectionTitle.tsx
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  /** Classes adicionais para personalização */
  className?: string;
  /** Tag HTML para SEO */
  as?: "h1" | "h2" | "h3";
}

/**
 * Título de seção padronizado do Design System.
 *
 * @example
 * <SectionTitle>DIRETORIA</SectionTitle>
 * <SectionTitle as="h3" className="text-3xl">Subtítulo menor</SectionTitle>
 */
export function SectionTitle({
  children,
  className,
  as: Tag = "h2",
}: SectionTitleProps) {
  return (
    <Tag
      className={cn(
        "text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
```

#### 3.3 — Atualizar Styleguide

Para **cada** componente novo ou significativamente alterado:

1. Criar página: `src/app/[locale]/styleguide/components/[nome]/page.tsx`
2. Adicionar em: `src/app/[locale]/styleguide/navigation.ts`
3. Incluir: todas as variantes, demo interativa, código de uso

---

## Fase 4: Refatoração do Código Existente

### Tarefa 4.1 — Master Checklist de Refatoração

**Entrega:** `docs/REFACTORING_TODO.md`

```markdown
# Refatoração Completa — Checklist

## Progresso Geral

- [ ] Componentes novos criados: 0/4
- [ ] Seções refatoradas: 0/8
- [ ] Styleguide atualizado: 0/5
- [ ] Modais unificados: 0/2

## Seções da Landing Page

### Hero (`src/components/sections/Hero/`)

- [ ] Avaliar: título usa GSAP, pode não ser candidato a `SectionTitle`
- Status: Pendente

### AboutSection (`src/components/sections/AboutSection/`)

- [ ] Substituir título por `SectionTitle`
- [ ] Substituir subtítulo por `SectionSubtitle`
- Status: Pendente

### DirectorySection (`src/components/sections/DirectorySection/`)

- [ ] Substituir título por `SectionTitle`
- [ ] Substituir subtítulo por `SectionSubtitle`
- [ ] Refatorar `MemberDetailModal` para usar `Modal` base
- [ ] Extrair `SocialLinksRow` do modal
- Status: Pendente

### PartnersSection (`src/components/sections/PartnersSection/`)

- [ ] Substituir título por `SectionTitle`
- [ ] Substituir subtítulo por `SectionSubtitle`
- [ ] Refatorar `SponsorDetailModal` para usar `Modal` base
- [ ] Extrair `SocialLinksRow` do modal
- Status: Pendente

### TeamsList (`src/components/sections/TeamsList/`)

- [ ] Verificar necessidade de `SectionTitle` (usa estilo diferente?)
- Status: Pendente

### ContactSection (`src/components/sections/ContactSection/`)

- [ ] Substituir título por `SectionTitle`
- [ ] Substituir subtítulo por `SectionSubtitle`
- Status: Pendente

### MapSection (`src/components/sections/MapSection/`)

- [ ] Verificar cabeçalho
- Status: Pendente

## Layout Global

### Navbar (`src/components/layout/Navbar/`)

- [ ] Já usa componentes — revisar consistência
- Status: Pendente

### Footer (`src/components/layout/Footer/`)

- [ ] Verificar se `SocialLinksRow` se aplica
- Status: Pendente

## Páginas Avulsas

### SponsorPage (`src/components/sections/SponsorPage/`)

- [ ] Auditar uso de classes
- Status: Pendente

### Equipes Page (`src/app/[locale]/equipes/`)

- [ ] Auditar
- Status: Pendente

### Seja Patrocinador (`src/app/[locale]/seja-patrocinador/`)

- [ ] Auditar
- Status: Pendente
```

### Tarefa 4.2 — Workflow de Refatoração (por arquivo)

Para cada item do checklist:

1. **Abrir** o arquivo
2. **Identificar** padrões a substituir (antes/depois)
3. **Importar** componentes novos
4. **Refatorar** o JSX
5. **Validar** visualmente (sem quebrar layout)
6. **Marcar** ✅ no checklist

> **Regra:** Nunca mudar comportamento visual. A refatoração é interna — o resultado final deve ser pixel-perfect idêntico.

### Tarefa 4.3 — Progresso Incremental

A cada 5 arquivos refatorados:

- Atualizar estatísticas no checklist
- Listar próximos arquivos por prioridade
- Anotar inconsistências descobertas durante o processo

---

## Fase 5: Validação e Documentação Final

### Tarefa 5.1 — Documentação do Design System

**Entrega:** `docs/DESIGN_SYSTEM.md`

```markdown
# Design System — INCINERA

## Filosofia

"A chama que não se apaga: agressividade esportiva aliada à excelência técnica do CIn."

## Como Usar

### Imagens

Sempre use `AppImage` em vez de `next/image`:
\`\`\`tsx
import { AppImage } from "@/components/ui/AppImage";
<AppImage src={memberPhotoUrl(id)} alt="..." fill />
\`\`\`

### Títulos de Seção

\`\`\`tsx
import { SectionTitle, SectionSubtitle } from "@/components/ui/typography";
<SectionTitle>DIRETORIA</SectionTitle>
<SectionSubtitle>Quem faz acontecer</SectionSubtitle>
\`\`\`

### Modais

\`\`\`tsx
import { Modal } from "@/components/ui/Modal";
<Modal.Root isOpen={isOpen} onClose={close}>
<Modal.Overlay />
<Modal.Content>
<Modal.Header>
<Modal.Close />
</Modal.Header>
{/_ conteúdo _/}
</Modal.Content>
</Modal.Root>
\`\`\`

### Cards de Membro (Compound)

\`\`\`tsx
<MemberCard.Root>
<MemberCard.Avatar src={url} alt={name} />
<MemberCard.Name>{name}</MemberCard.Name>
<MemberCard.Role>{role}</MemberCard.Role>
</MemberCard.Root>
\`\`\`

## Quando Criar um Novo Componente

1. Padrão visual aparece 3+ vezes
2. Comportamento interativo se repete (modal, accordion, tooltip)
3. Bloco de JSX > 10 linhas é copiado entre arquivos

## Quando NÃO Criar um Componente

1. Uso único com estilo muito específico (ex: Hero)
2. Elemento simples que `cn()` + classes resolve
3. Variação tão grande que o componente teria 10+ props
```

### Tarefa 5.2 — Checklist Final de Conclusão

```markdown
# Checklist de Conclusão

## Design System

- [ ] Todos os componentes novos criados e tipados
- [ ] Styleguide atualizado com páginas para cada componente
- [ ] `navigation.ts` reflete estado real dos componentes
- [ ] `globals.css` limpo e organizado (sem classes órfãs)
- [ ] Documentação `DESIGN_SYSTEM.md` completa

## Refatoração

- [ ] Todas as seções usando componentes do DS
- [ ] Zero blocos de JSX+estilo duplicados
- [ ] Modais unificados com `Modal` base
- [ ] `SocialLinksRow` extraído e reutilizado
- [ ] `SectionTitle` / `SectionSubtitle` em todas as seções aplicáveis

## Qualidade

- [ ] Build Next.js sem erros (`npm run build`)
- [ ] Sem warnings de TypeScript
- [ ] Sem imports não utilizados
- [ ] Visual pixel-perfect comparado ao estado anterior
- [ ] Todos os temas (light/dark) funcionando
- [ ] Responsividade preservada em todos os breakpoints

## Documentação

- [ ] `docs/DESIGN_SYSTEM_INVENTORY.md` ✅
- [ ] `docs/CURRENT_STATE_AUDIT.md` ✅
- [ ] `docs/COMPONENTS_TODO.md` ✅
- [ ] `docs/REFACTORING_TODO.md` ✅
- [ ] `docs/DESIGN_SYSTEM.md` ✅
```

---

## Instruções de Execução

### Ordem de execução

1. **Fase 1** → Auditar e inventariar (análise pura, zero código)
2. **Fase 2** → Planejar arquitetura (documentos de planejamento)
3. **Fase 3** → Criar componentes novos + páginas de Styleguide
4. **Fase 4** → Refatorar arquivo por arquivo (pixel-perfect)
5. **Fase 5** → Validar build, documentar, fechar checklist

### Regras Inegociáveis

| ✅ FAÇA                                   | ❌ NÃO FAÇA                                     |
| ----------------------------------------- | ----------------------------------------------- |
| Priorize componentes React sobre `@apply` | Não use `@apply` para criar "componentes CSS"   |
| Use `cn()` de `@/lib/utils` para merge    | Não concatene strings de classes manualmente    |
| Siga o Compound Component Pattern         | Não crie componentes com 10+ props              |
| Mantenha hooks separados da UI            | Não coloque lógica nos componentes              |
| Documente com JSDoc                       | Não deixe componente sem documentação           |
| Atualize o Styleguide                     | Não crie componente sem página no Styleguide    |
| Use tokens do `globals.css`               | Não use cores hardcoded (`#ff0000`, `rgb(...)`) |
| Teste visual após cada refatoração        | Não assuma que "vai funcionar"                  |
| Use `AppImage` para qualquer imagem       | Não use `next/image` diretamente                |
| Siga `development-standards.md`           | Não quebre nenhuma regra existente              |

### Respondendo às perguntas pré-execução

| Pergunta                                       | Resposta                                                                   |
| ---------------------------------------------- | -------------------------------------------------------------------------- |
| **Caminho do Styleguide?**                     | `src/app/[locale]/styleguide/`                                             |
| **Bibliotecas de UI instaladas?**              | shadcn/ui (CLI), Radix UI (via shadcn), CVA, Framer Motion, GSAP           |
| **Componentes que NÃO devem ser refatorados?** | shadcn base (`button.tsx`, `card.tsx`, etc.) — apenas estender via wrapper |
| **Prioridade?**                                | Qualidade > velocidade. Cada mudança deve ser sólida.                      |
| **Pode instalar dependências?**                | Sim, desde que justificadas. CVA já está instalado.                        |

---

## Perguntas Prévias

Antes de iniciar a execução, considerar:

1. O `Hero` usa GSAP com refs diretos nos elementos — deve permanecer como exceção ao `SectionTitle`?
2. Existem planos para adicionar novas seções à landing page que impactariam a decisão dos componentes?
3. O Footer usa `ContactLinkCard` para links sociais — unificar com `SocialLinksRow` ou manter separado?
4. Deseja manter os arquivos `.md` de planejamento dentro de `docs/` ou em `.agents/tasks/`?

---

> **🚀 Iniciar pela Fase 1, Tarefa 1.1**: Auditar `globals.css`, `styleguide/`, e todos os componentes em `src/components/ui/` para criar o inventário completo.
