# Estratégia de Dados Reais v2 — Cards Diferenciados, Formulários e Migração

> Documento de implementação para o **Ralph** executar as mudanças estruturais nos dados, formulários e componentes da Atlética Incinera.

---

## 0. Resumo das Mudanças em Relação ao Plano v1

O plano anterior (v1) definiu a stack tecnológica: **Google Sheets + Cloudinary + Google Forms + ISR**. Essa stack permanece inalterada. O que muda são:

| Aspecto                         | v1                       | v2 (este plano)                                                               |
| ------------------------------- | ------------------------ | ----------------------------------------------------------------------------- |
| **Cards de membros vs atletas** | Cards iguais             | **Membros com cards completos** (hero badge + bio + múltiplos links)          |
| **Links sociais — membros**     | Todos opcionais          | **Múltiplos links** (pode adicionar todos que quiser)                         |
| **Links sociais — atletas**     | Todos opcionais          | **Apenas 1 link** (escolhe qual rede exibir)                                  |
| **Hero Badge**                  | Não existia              | **Novo campo** para membros: área de atuação (ex: "Desenvolvedor Full-Stack") |
| **Bio**                         | Existia como "Bio Curta" | **Campo obrigatório para membros** (200 chars), inexistente para atletas      |
| **Membro que também é atleta**  | Não tratado              | **Card duplicado**: completo na diretoria, simplificado nos times             |

---

## 1. Decisão de Design: Membro que Também é Atleta

### Análise

Quando uma pessoa é **membro da diretoria** E **atleta** de uma equipe, existem duas abordagens:

| Opção                         | Descrição                                           | Prós                                                                     | Contras                                                                                 |
| ----------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| **A) Dois cards separados**   | Card completo na diretoria + card simples nos times | Contexto correto para cada seção; Atletas são vistos como iguais no time | Duplicação visual; precisa cruzar dados                                                 |
| **B) Card completo em ambos** | Card rico em qualquer lugar que aparecer            | Destaque sempre; menos componentes                                       | Quebra a hierarquia visual dos times; cards de membros "engoliriam" os de atletas puros |

### ✅ Decisão: **Opção A — Dois cards, adaptados ao contexto**

**Justificativa:**

1. **Na página de diretoria**, o objetivo é mostrar **quem faz o quê** na organização → card completo com hero badge, bio, múltiplos links.
2. **Na página de times/atletas**, o objetivo é mostrar **o time como unidade** → cards uniformes simples. Se um membro tivesse card expandido ali, criaria desigualdade visual entre colegas de time.
3. **Link de conexão:** Na página de atletas, o card simples do membro pode ter um **badge discreto** (ícone/tooltip) indicando "Também faz parte da diretoria", opcionalmente linkando para o card completo na seção de diretoria.

### Implementação na Google Sheet

- A aba `Diretoria` lista membros com todos os campos completos.
- A aba `Atletas` lista todos os atletas (incluindo membros que jogam).
- O campo `email_cin` é a **chave de cruzamento**: se um atleta tem o mesmo email CIn de um membro, o sistema sabe que é a mesma pessoa e pode exibir o badge "membro da diretoria" no card de atleta.

---

## 2. Modelo de Dados Atualizado

### 2.1 Types TypeScript

```typescript
// src/data/types/index.ts

// ─── Links Sociais ───────────────────────────────────────

/**
 * Links sociais para membros da diretoria.
 * Podem selecionar TODOS os links que quiserem.
 */
export interface MemberSocialLinks {
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  github?: string;
  personalWebsite?: string;
}

/**
 * Link social único para atletas.
 * Cada atleta escolhe UMA rede para exibir.
 */
export interface AthleteSocialLink {
  type:
    | "instagram"
    | "linkedin"
    | "twitter"
    | "github"
    | "personalWebsite"
    | "other";
  url: string;
  label?: string; // Usado quando type === "other" (ex: "Behance", "Dribbble")
}

// ─── Membros da Diretoria (Card Completo) ─────────────

export interface Member {
  id: string;
  name: string;
  role: string; // I18n key: "president", "director", "member", etc.
  roleLiteral?: string; // Fallback ou override literal
  photo: string; // Cloudinary public ID
  photoLarge?: string; // Cloudinary public ID (alta resolução)
  heroBadge: string; // Área de atuação: "Desenvolvedor Full-Stack", "Designer UX/UI", etc.
  bio: string; // Breve introdução (max 200 chars)
  sports: string[]; // I18n keys das modalidades
  course: string; // I18n key: "ec", "cc", "si", "ia"
  directoryId?: string; // FK para qual diretoria
  emailCin: string; // Chave de cruzamento com atletas
  socialLinks: MemberSocialLinks;
}

export interface Directory {
  id: string;
  name: string;
  image: string; // Cloudinary public ID
  director: Member;
  viceDirector?: Member;
  members: Member[];
}

// ─── Atletas (Card Simples) ────────────────────────────

export interface Athlete {
  id: string;
  name: string;
  imagePath: string; // Cloudinary public ID
  course?: string; // I18n key
  sports: string[]; // Array com 1 item (modalidade principal)
  jerseyNumber?: number; // Número da camisa (1-99)
  socialLink?: AthleteSocialLink; // APENAS 1 link social
  emailCin?: string; // Chave de cruzamento com membros
  isDirectoryMember?: boolean; // Flag derivada (calculada no loader, não na sheet)
}

export interface Team {
  id: string;
  sportKey: string;
  sportName?: string;
  athletes: Athlete[];
}

// ─── Patrocinadores/Parceiros ──────────────────────────

export interface PartnerSocialLinks {
  website?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string; // Cloudinary public ID
  descriptionPt: string;
  descriptionEn: string;
  type: "sponsor" | "partner";
  socialLinks: PartnerSocialLinks;
}

// ─── Galeria About ─────────────────────────────────────

export interface GalleryImage {
  src: string; // Cloudinary public ID
  altPt: string;
  altEn: string;
}
```

### 2.2 Zod Schemas

```typescript
// src/data/schemas/member.schema.ts
import { z } from "zod";

export const memberSocialLinksSchema = z.object({
  instagram: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  twitter: z.string().url().optional(),
  email: z.string().email().optional(),
  github: z.string().optional(),
  personalWebsite: z.string().url().optional(),
});

export const memberSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  role: z.enum([
    "president",
    "vicePresident",
    "director",
    "viceDirector",
    "member",
  ]),
  roleLiteral: z.string().optional(),
  photo: z.string(),
  photoLarge: z.string().optional(),
  heroBadge: z.string().min(2).max(60), // "Desenvolvedor Full-Stack", etc.
  bio: z.string().min(10).max(200), // Breve introdução obrigatória
  sports: z.array(z.string()),
  course: z.enum(["ec", "cc", "si", "es"]),
  directoryId: z.string().optional(),
  emailCin: z.string().email(),
  socialLinks: memberSocialLinksSchema,
});
```

```typescript
// src/data/schemas/athlete.schema.ts
import { z } from "zod";

export const athleteSocialLinkSchema = z.object({
  type: z.enum([
    "instagram",
    "linkedin",
    "twitter",
    "github",
    "personalWebsite",
    "other",
  ]),
  url: z.string().url(),
  label: z.string().optional(),
});

export const athleteSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  imagePath: z.string(),
  course: z.enum(["ec", "cc", "si", "es"]).optional(),
  sports: z.array(z.string()).min(1),
  jerseyNumber: z.number().int().min(1).max(99).optional(),
  socialLink: athleteSocialLinkSchema.optional(), // APENAS 1
  emailCin: z.string().email().optional(),
});
```

---

## 3. Estrutura da Google Sheet (Atualizada)

### 3.1 Aba: `Diretoria`

| Coluna | Header           | Tipo   | Exemplo                               | Notas                                                    |
| ------ | ---------------- | ------ | ------------------------------------- | -------------------------------------------------------- |
| A      | `id`             | string | `dir-marketing-1`                     | Gerado automaticamente                                   |
| B      | `nome_completo`  | string | `Maria Oliveira`                      | Obrigatório                                              |
| C      | `nome_preferido` | string | `Maria`                               | Opcional                                                 |
| D      | `email_cin`      | string | `mao@cin.ufpe.br`                     | **Chave de cruzamento** com aba Atletas                  |
| E      | `curso`          | enum   | `EC`                                  | CC, EC, SI, ES                                           |
| F      | `diretoria`      | enum   | `marketing`                           | marketing, esportes, financeiro, eventos, produtos       |
| G      | `cargo`          | enum   | `director`                            | president, vicePresident, director, viceDirector, member |
| H      | `hero_badge`     | string | `Desenvolvedor Full-Stack`            | **NOVO** — Max 60 chars                                  |
| I      | `bio`            | string | `Apaixonada por design e esportes...` | **NOVO** — Max 200 chars                                 |
| J      | `foto_url`       | string | `members/maria-oliveira`              | Cloudinary public ID                                     |
| K      | `foto_large_url` | string | `members/maria-oliveira-hd`           | Opcional                                                 |
| L      | `modalidades`    | string | `volei, natacao`                      | Separado por vírgula                                     |
| M      | `instagram`      | string | `https://instagram.com/maria`         | Opcional                                                 |
| N      | `linkedin`       | string | `https://linkedin.com/in/maria`       | Opcional                                                 |
| O      | `twitter`        | string | `https://x.com/maria`                 | Opcional                                                 |
| P      | `github`         | string | `https://github.com/maria`            | Opcional                                                 |
| Q      | `website`        | string | `https://maria.dev`                   | Opcional                                                 |
| R      | `email_contato`  | string | `maria@gmail.com`                     | Opcional (diferente do CIn)                              |

### 3.2 Aba: `Atletas`

| Coluna | Header          | Tipo   | Exemplo                    | Notas                                      |
| ------ | --------------- | ------ | -------------------------- | ------------------------------------------ |
| A      | `id`            | string | `atl-futsal-m-1`           | Gerado automaticamente                     |
| B      | `nome_completo` | string | `João Pedro`               | Obrigatório                                |
| C      | `email_cin`     | string | `jps@cin.ufpe.br`          | Opcional — se preenchido, cruza com membro |
| D      | `curso`         | enum   | `CC`                       | CC, EC, SI, ES                             |
| E      | `modalidade`    | enum   | `futsal-m`                 | Dropdown com todas as equipes              |
| F      | `numero_camisa` | number | `10`                       | Opcional (1-99)                            |
| G      | `foto_url`      | string | `athletes/joao-pedro`      | Cloudinary public ID                       |
| H      | `link_tipo`     | enum   | `instagram`                | **NOVO** — Qual rede exibir (apenas 1)     |
| I      | `link_url`      | string | `https://instagram.com/jp` | **NOVO** — URL da rede escolhida           |
| J      | `link_label`    | string | `Behance`                  | Apenas se `link_tipo = other`              |

### 3.3 Aba: `Patrocinadores` (sem mudanças significativas)

Mantém a estrutura do v1.

### 3.4 Aba: `Equipes` (sem mudanças)

Mantém a estrutura do v1.

### 3.5 Aba: `Galeria About` (sem mudanças)

Mantém a estrutura do v1.

---

## 4. Especificação dos Formulários (Atualizada)

### 4.1 Formulário 1: Cadastro de Membro da Diretoria

**Plataforma:** Google Forms  
**Frequência:** Anual (troca de gestão)  
**Público:** Diretores e membros da organização  
**Tempo estimado de preenchimento:** ~5 minutos

| Seção                                  | Campo                     | Tipo              | Obrigatório | Validação                                          | Notas                                                                                                                                         |
| -------------------------------------- | ------------------------- | ----------------- | ----------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **📌 Identificação**                   | Nome Completo             | Texto curto       | ✅          | Min 3 chars                                        | —                                                                                                                                             |
|                                        | Nome Preferido (apelido)  | Texto curto       | ❌          | —                                                  | Como quer ser chamado no site                                                                                                                 |
|                                        | E-mail CIn                | Texto curto       | ✅          | Regex: `.*@cin\.ufpe\.br`                          | **Chave de cruzamento**                                                                                                                       |
|                                        | Curso                     | Dropdown          | ✅          | CC, EC, SI, ES                                     | —                                                                                                                                             |
| **🏢 Cargo na Incinera**               | Diretoria                 | Dropdown          | ✅          | Marketing, Esportes, Financeiro, Eventos, Produtos | —                                                                                                                                             |
|                                        | Cargo                     | Dropdown          | ✅          | Presidente, VP, Diretor, Vice-Diretor, Membro      | —                                                                                                                                             |
| **🏅 Hero Badge**                      | Área de Atuação           | Texto curto       | ✅          | Max 60 chars                                       | Ex: "Desenvolvedor Full-Stack", "Engenheira de IA", "Designer UX/UI", "Gestor de Projetos"                                                    |
|                                        | Orientação                | _Texto estático_  | —           | —                                                  | _"Descreva sua principal competência ou área de atuação em poucas palavras. Este texto aparecerá em destaque no seu card no site."_           |
| **📝 Sobre Você**                      | Bio                       | Texto longo       | ✅          | Max 200 chars                                      | Breve apresentação pessoal. Ex: "Estudante de EC apaixonada por IA e design de interfaces. Nas horas vagas, joga vôlei e programa em Python." |
|                                        | Orientação                | _Texto estático_  | —           | —                                                  | _"Escreva uma breve introdução sobre você (máximo 200 caracteres). Dica: mencione seus interesses, hobbies ou o que te motiva!"_              |
| **⚽ Esportes**                        | Modalidades que pratica   | Checkboxes        | ❌          | Multi-select                                       | Futsal, Vôlei, Basquete, Handebol, Natação, Futebol, E-Sports                                                                                 |
| **🔗 Links (adicione quantos quiser)** | Instagram                 | Texto curto       | ❌          | URL ou @usuario                                    | —                                                                                                                                             |
|                                        | LinkedIn                  | URL               | ❌          | URL válida                                         | —                                                                                                                                             |
|                                        | GitHub                    | Texto curto       | ❌          | username ou URL                                    | —                                                                                                                                             |
|                                        | Twitter/X                 | Texto curto       | ❌          | URL ou @usuario                                    | —                                                                                                                                             |
|                                        | Site Pessoal/Portfólio    | URL               | ❌          | URL válida                                         | —                                                                                                                                             |
|                                        | E-mail de contato público | E-mail            | ❌          | Email válido                                       | Diferente do CIn (para exibição pública)                                                                                                      |
| **📸 Foto**                            | Upload de Foto de Perfil  | Upload de arquivo | ✅          | JPG, PNG, WebP — Max 10MB                          | Instruções: "Envie uma foto de boa qualidade, de preferência com rosto centralizado. Será cortada em formato quadrado."                       |
| **📋 Consentimento**                   | Autorização LGPD          | Checkbox          | ✅          | Deve aceitar                                       | "Autorizo o uso do meu nome, foto e redes sociais no site da Atlética Incinera conforme descrito acima."                                      |

### 4.2 Formulário 2: Cadastro de Atleta

**Plataforma:** Google Forms  
**Frequência:** Semestral/anual  
**Público:** Membros de equipes esportivas  
**Tempo estimado de preenchimento:** ~2 minutos

| Seção                   | Campo                     | Tipo              | Obrigatório | Validação                                                   | Notas                                                                     |
| ----------------------- | ------------------------- | ----------------- | ----------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| **📌 Identificação**    | Nome Completo             | Texto curto       | ✅          | Min 3 chars                                                 | —                                                                         |
|                         | E-mail CIn                | Texto curto       | ❌          | Regex: `.*@cin\.ufpe\.br`                                   | Opcional — para cruzar com diretoria                                      |
|                         | Curso                     | Dropdown          | ✅          | CC, EC, SI, ES                                              | —                                                                         |
| **⚽ Dados Esportivos** | Modalidade Principal      | Dropdown          | ✅          | Futsal M, Futsal F, Vôlei M, Vôlei F, Basquete, Handebol    | **Apenas 1**                                                              |
|                         | Número da Camisa          | Número            | ❌          | 1-99                                                        | —                                                                         |
| **🔗 Link (escolha 1)** | Qual rede quer exibir?    | Dropdown          | ❌          | Instagram, LinkedIn, GitHub, Twitter/X, Site Pessoal, Outro | **APENAS 1 opção**                                                        |
|                         | URL / @ do perfil         | Texto curto       | Condicional | URL válida                                                  | Aparece se selecionou uma rede acima                                      |
|                         | Nome da rede (se "Outro") | Texto curto       | Condicional | —                                                           | Aparece se selecionou "Outro" (ex: "Behance")                             |
| **📸 Foto**             | Upload de Foto            | Upload de arquivo | ✅          | JPG, PNG, WebP — Max 10MB                                   | "Envie uma foto de boa qualidade, de preferência com rosto centralizado." |
| **📋 Consentimento**    | Autorização LGPD          | Checkbox          | ✅          | Deve aceitar                                                | Igual ao formulário de diretoria                                          |

### 4.3 Diferenças-Chave entre os Formulários

| Aspecto             | Form Diretoria              | Form Atleta                 |
| ------------------- | --------------------------- | --------------------------- |
| **Hero Badge**      | ✅ Obrigatório              | ❌ Não existe               |
| **Bio (200 chars)** | ✅ Obrigatório              | ❌ Não existe               |
| **Links sociais**   | Múltiplos (todos opcionais) | **Apenas 1** (escolhe qual) |
| **E-mail CIn**      | Obrigatório                 | Opcional                    |
| **Modalidades**     | Multi-select (checkboxes)   | Single-select (dropdown)    |
| **Número camisa**   | ❌ Não existe               | ✅ Opcional                 |
| **Campos totais**   | ~15                         | ~8                          |

---

## 5. Componentes UI — Cards Diferenciados

### 5.1 Card de Membro da Diretoria (Card Completo)

O layout da diretoria **permanece horizontal** (cards verticais dispostos em flex/grid row dentro do `DirectoryAccordion`), igual ao estado atual. A única mudança é o **acréscimo de informações** nos `MemberMiniCard` existentes:

**Layout atual (preservado):**

```
┌── DirectoryAccordion (expandido) ──────────────────────────────────────┐
│                                                                        │
│  Liderança                                                             │
│  ┌──────────────┐  ┌──────────────┐                                    │
│  │   (avatar)   │  │   (avatar)   │                                    │
│  │  Maria O.    │  │  Pedro S.    │    ← Layout horizontal preservado  │
│  │  Diretora    │  │  Vice-Dir.   │                                    │
│  └──────────────┘  └──────────────┘                                    │
│                                                                        │
│  Membros (2)                                                           │
│  ┌──────────────┐  ┌──────────────┐                                    │
│  │   (avatar)   │  │   (avatar)   │                                    │
│  │  Ana Costa   │  │  Leticia A.  │                                    │
│  │  Membro      │  │  Membro      │                                    │
│  └──────────────┘  └──────────────┘                                    │
└────────────────────────────────────────────────────────────────────────┘
```

**O que muda no MemberMiniCard (acréscimos):**

```
┌──────────────────┐
│    (avatar)       │
│    64×64          │
│                   │
│  Maria Oliveira   │  ← Nome (existente)
│  Diretora         │  ← Cargo (existente)
│                   │
│ 🎯 Designer UX   │  ← Hero Badge (NOVO - pill com bg-primary/10)
│                   │
│ 📷 💼 🐙         │  ← Ícones de links (NOVO - múltiplos, small)
└──────────────────┘
```

> **Nota:** A **bio** (200 chars) NÃO aparece no mini card — ela é longa demais para caber. A bio aparece apenas no `MemberDetailModal` quando o usuário clica no card. O mini card ganha apenas o **hero badge** (curto, max 60 chars) e os **ícones de links sociais**.

**Modificações no `MemberMiniCard` (dentro de `DirectoryAccordion.tsx`):**

```tsx
const MemberMiniCard = ({ member, onClick }: MemberMiniCardProps) => {
  const t = useTranslations("Directory");
  return (
    <button onClick={...} className="flex flex-col items-center ...">
      {/* Avatar (existente) */}
      <AppImage src={...} alt={member.name} ... />

      {/* Nome (existente) */}
      <span className="font-semibold ...">{member.name}</span>

      {/* Cargo (existente) */}
      <span className="text-xs ...">{t(`roles.${member.role}`)}</span>

      {/* NOVO: Hero Badge */}
      {member.heroBadge && (
        <MemberCard.HeroBadge className="mt-1 text-[10px]">
          {member.heroBadge}
        </MemberCard.HeroBadge>
      )}

      {/* NOVO: Social Links Icons */}
      {member.socialLinks && (
        <MemberCard.SocialIcons links={member.socialLinks} className="mt-2" size="sm" />
      )}
    </button>
  );
};
```

**Novos sub-componentes para `MemberCard`:**

```tsx
// Compound component expandido
<MemberCard.Root>
  <MemberCard.Avatar src={...} alt={...} />
  <MemberCard.Name>{member.name}</MemberCard.Name>
  <MemberCard.Role>{t(`roles.${member.role}`)}</MemberCard.Role>
  <MemberCard.HeroBadge>{member.heroBadge}</MemberCard.HeroBadge>     {/* NOVO */}
  <MemberCard.Bio>{member.bio}</MemberCard.Bio>                       {/* NOVO (apenas no Modal) */}
  <MemberCard.SocialIcons links={member.socialLinks} />               {/* NOVO */}
</MemberCard.Root>
```

### 5.2 Card de Atleta (Card Simples)

O card de atleta na **seção de times** é minimalista e uniforme:

```
┌──────────────┐
│  ┌────────┐  │
│  │ AVATAR │  │
│  │(96×96) │  │
│  └────────┘  │
│              │
│  João Pedro  │  ← Nome (bold)
│     📷       │  ← 1 ícone de link (se tiver)
│  🏛️          │  ← Badge discreto "Diretoria" (se for membro)
└──────────────┘
```

### 5.3 Componente `HeroBadge`

```tsx
// src/components/ui/MemberCard/HeroBadge.tsx
interface HeroBadgeProps {
  children: React.ReactNode;
  className?: string;
}

const MemberCardHeroBadge = ({ children, className }: HeroBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full",
        "bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider",
        "border border-primary/20",
        className,
      )}
    >
      {/* Ícone opcional: 🎯 ou Lucide icon */}
      {children}
    </span>
  );
};
```

### 5.4 Componente `DirectoryBadge` (para cards de atleta)

Quando um atleta também é membro da diretoria, exibe um badge discreto:

```tsx
// Dentro do card de atleta
{
  athlete.isDirectoryMember && (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Shield className="w-3 h-3" /> {/* Lucide icon */}
      {t("Teams.directoryMember")}
    </span>
  );
}
```

---

## 6. Data Loaders — Lógica de Cruzamento

### 6.1 loadDirectory.ts (atualizado)

```typescript
export async function loadDirectory(): Promise<Directory[]> {
  const sheets = google.sheets({ version: "v4", auth: getAuth() });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Diretoria!A2:R",
  });

  const rows = res.data.values ?? [];
  const members = rows.map(rowToMember).map((m) => memberSchema.parse(m));

  // Agrupar por diretoria
  return groupByDirectory(members);
}

function rowToMember(row: string[]): Member {
  return {
    id: row[0],
    name: row[2] || row[1], // nome_preferido || nome_completo
    role: row[6], // cargo
    photo: row[9], // foto_url
    photoLarge: row[10] || undefined, // foto_large_url
    heroBadge: row[7], // ← NOVO
    bio: row[8], // ← NOVO
    sports: row[11]?.split(",").map((s) => s.trim()) || [],
    course: row[4].toLowerCase(),
    directoryId: row[5],
    emailCin: row[3],
    socialLinks: {
      instagram: row[12] || undefined,
      linkedin: row[13] || undefined,
      twitter: row[14] || undefined,
      github: row[15] || undefined,
      personalWebsite: row[16] || undefined,
      email: row[17] || undefined,
    },
  };
}
```

### 6.2 loadTeams.ts (com cruzamento)

```typescript
export async function loadTeams(): Promise<Team[]> {
  const sheets = google.sheets({ version: "v4", auth: getAuth() });

  // Fetch atletas
  const athleteRes = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Atletas!A2:J",
  });

  // Fetch emails da diretoria (para cruzamento)
  const memberRes = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Diretoria!D2:D", // Coluna de email_cin
  });

  const memberEmails = new Set(
    (memberRes.data.values ?? []).flat().filter(Boolean),
  );

  const rows = athleteRes.data.values ?? [];
  const athletes = rows.map((row) => {
    const athlete = rowToAthlete(row);
    // Cruzamento: verificar se email do atleta está na diretoria
    if (athlete.emailCin && memberEmails.has(athlete.emailCin)) {
      athlete.isDirectoryMember = true;
    }
    return athleteSchema.parse(athlete);
  });

  // Agrupar por equipe
  return groupByTeam(athletes);
}

function rowToAthlete(row: string[]): Athlete {
  const linkType = row[7] as AthleteSocialLink["type"] | undefined;
  const linkUrl = row[8];

  return {
    id: row[0],
    name: row[1],
    emailCin: row[2] || undefined,
    course: row[3]?.toLowerCase(),
    sports: [row[4]], // Apenas 1 modalidade
    jerseyNumber: row[5] ? parseInt(row[5]) : undefined,
    imagePath: row[6],
    socialLink:
      linkType && linkUrl
        ? {
            type: linkType,
            url: linkUrl,
            label: row[9] || undefined, // label se type === "other"
          }
        : undefined,
  };
}
```

---

## 7. MemberDetailModal (Atualizado)

O modal de detalhes do membro agora inclui hero badge e bio:

```tsx
<Modal.Content>
  <div className="flex flex-col md:flex-row gap-8">
    {/* Foto */}
    <div className="w-full md:w-2/5">
      <AppImage src={...} alt={member.name} />
    </div>

    {/* Info */}
    <div className="flex-1">
      <h2>{member.name}</h2>
      <p className="text-primary">{t(`roles.${member.role}`)}</p>

      {/* NOVO: Hero Badge */}
      {member.heroBadge && (
        <MemberCard.HeroBadge>{member.heroBadge}</MemberCard.HeroBadge>
      )}

      {/* NOVO: Bio */}
      {member.bio && (
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
          "{member.bio}"
        </blockquote>
      )}

      {/* Esportes, Curso, Links (existente) */}
      ...
    </div>
  </div>
</Modal.Content>
```

Para atletas, o modal continua simples (sem hero badge, sem bio, com apenas 1 link social).

---

## 8. Plano de Migração (Atualizado)

### Fase 1: Fundação (1-2 dias)

- [ ] Criar conta Cloudinary (free tier)
- [ ] Criar Google Sheet com a estrutura atualizada (seção 3 deste documento)
  - Aba `Diretoria` com colunas para `hero_badge`, `bio`, múltiplos links
  - Aba `Atletas` com colunas para `link_tipo`, `link_url`, `link_label` (1 link)
  - Aba `Patrocinadores` (sem mudanças)
  - Aba `Equipes` (sem mudanças)
  - Aba `Galeria About` (sem mudanças)
- [ ] Centralizar TypeScript types em `src/data/types/index.ts` (conforme seção 2.1)
- [ ] Criar Zod schemas em `src/data/schemas/` (conforme seção 2.2)
- [ ] Configurar env vars

### Fase 2: Data Loaders (2-3 dias)

- [ ] Instalar `googleapis`
- [ ] Implementar `sheets.client.ts` (autenticação Service Account)
- [ ] Implementar `loadDirectory.ts` com campos `heroBadge` e `bio`
- [ ] Implementar `loadTeams.ts` com lógica de cruzamento (seção 6.2)
  - Fetch email dos membros para popular `isDirectoryMember`
- [ ] Implementar `loadPartners.ts`
- [ ] Implementar `loadGallery.ts`
- [ ] Implementar `cloudinary.ts` (URL builder)
- [ ] Configurar ISR (`revalidate: 3600`)
- [ ] Criar API route de revalidação manual

### Fase 3: Componentes UI (1-2 dias)

- [ ] Adicionar `MemberCard.HeroBadge` ao compound component
- [ ] Adicionar `MemberCard.Bio` ao compound component
- [ ] Adicionar `MemberCard.SocialLinks` (renderiza múltiplos ícones)
- [ ] Criar `AthleteCard.SocialLink` (renderiza 1 ícone apenas)
- [ ] Criar `DirectoryBadge` (badge discreto para atletas que são membros)
- [ ] Atualizar `MemberDetailModal` para exibir hero badge e bio
- [ ] Criar `AthleteDetailModal` separado (ou adaptar o existente com condicional)
- [ ] Atualizar `TeamsList` para usar o card simples e mostrar `DirectoryBadge`
- [ ] Documentar novos componentes no Styleguide

### Fase 4: Formulários e Coleta (1 dia)

- [ ] Criar Google Form para Diretoria (conforme seção 4.1)
  - Seções: Identificação, Cargo, Hero Badge, Bio, Esportes, Links (múltiplos), Foto, LGPD
- [ ] Criar Google Form para Atletas (conforme seção 4.2)
  - Seções: Identificação, Dados Esportivos, Link (1 escolha), Foto, LGPD
- [ ] Vincular Forms às abas corretas da Sheet
- [ ] Configurar validações (regex email CIn, max chars, etc.)
- [ ] Testar pipeline completo

### Fase 5: Migração e Cleanup (1-2 dias)

- [ ] Popular Sheets com dados reais
- [ ] Atualizar componentes para receber dados via props
- [ ] Remover arquivos de dados estáticos (`src/data/directory.ts`, etc.)
- [ ] Remover imagens de `public/images/`
- [ ] Limpar histórico Git

### Fase 6: Documentação e Handoff (1 dia)

- [ ] Guia: "Como preencher o formulário de diretoria" (com exemplos de hero badge e bio)
- [ ] Guia: "Como preencher o formulário de atleta"
- [ ] Guia: "Como adicionar/editar membros na Sheet"
- [ ] Guia: "Troubleshooting"
- [ ] FAQ: "O que colocar no Hero Badge?" (lista de exemplos)

**Timeline total estimado: 7-11 dias de desenvolvimento**

---

## 9. Strings i18n Necessárias

```json
// src/messages/pt.json (adições)
{
  "Directory": {
    "common": {
      "heroBadge": "Área de Atuação",
      "bio": "Sobre",
      "social": "Redes Sociais"
    }
  },
  "Teams": {
    "directoryMember": "Membro da Diretoria",
    "socialLink": "Perfil"
  }
}
```

```json
// src/messages/en.json (adições)
{
  "Directory": {
    "common": {
      "heroBadge": "Field of Expertise",
      "bio": "About",
      "social": "Social Media"
    }
  },
  "Teams": {
    "directoryMember": "Board Member",
    "socialLink": "Profile"
  }
}
```

---

## 10. Checklist de Validação Final

Antes de considerar a migração concluída, verificar:

- [ ] Card de membro no site exibe: foto, nome, cargo, **hero badge**, **bio**, **múltiplos links**
- [ ] Card de atleta no site exibe: foto, nome, **único link** (se preenchido)
- [ ] Atleta que é membro mostra badge discreto "Membro da Diretoria" no card simples
- [ ] Modal de membro exibe todas as informações completas (incluindo hero badge e bio)
- [ ] Modal de atleta exibe informações simples (sem hero badge, sem bio)
- [ ] Google Form de diretoria solicita hero badge e bio como campos obrigatórios
- [ ] Google Form de atleta solicita apenas 1 link social
- [ ] Cruzamento membro↔atleta funciona via email CIn
- [ ] ISR revalida dados corretamente
- [ ] Todas as imagens vêm do Cloudinary (não mais do `public/`)
- [ ] Lighthouse Performance ≥ 90
- [ ] Testes de acessibilidade passam (aria-labels, foco, contraste)
