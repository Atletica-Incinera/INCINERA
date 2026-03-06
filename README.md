# 🔥 INCINERA — Atlética CIn UFPE

Site institucional da **Atlética Incinera**, a atlética acadêmica do Centro de Informática (CIn) da Universidade Federal de Pernambuco (UFPE).

> **Produção:** [https://incinera.cin.ufpe.br](https://incinera.cin.ufpe.br)

---

## 📚 Sumário

- [Tech Stack](#-tech-stack)
- [Pré-requisitos](#-pré-requisitos)
- [Rodando Localmente](#-rodando-localmente)
- [Rodando via Docker](#-rodando-via-docker)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Imagens — Cloudinary](#-imagens--cloudinary)
- [Dados — Google Sheets API](#-dados--google-sheets-api)
- [Formulários e App Script](#-formulários-e-app-script)
- [CI/CD — Deploy Automatizado](#-cicd--deploy-automatizado)
- [Padrões de Desenvolvimento](#-padrões-de-desenvolvimento)
- [Estrutura do Projeto](#-estrutura-do-projeto)

---

## 🛠 Tech Stack

| Camada          | Tecnologia                                  |
| --------------- | ------------------------------------------- |
| **Framework**   | Next.js 16 (App Router, Standalone Output)  |
| **Linguagem**   | TypeScript (strict)                         |
| **Estilização** | Tailwind CSS v4, shadcn/ui, Radix UI        |
| **Animações**   | GSAP + Framer Motion                        |
| **Formulários** | React Hook Form + Zod                       |
| **i18n**        | next-intl (pt/en via cookies)               |
| **Imagens**     | Cloudinary (CDN + otimização)               |
| **Dados**       | Google Sheets API (Service Account)         |
| **E-mail**      | Resend                                      |
| **Deploy**      | Docker + Nginx (reverse proxy) na VM do CIn |

---

## 📋 Pré-requisitos

- **Node.js** >= 20
- **npm** >= 10
- **Docker** e **Docker Compose** (apenas para deploy via container)

---

## 🚀 Rodando Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/Atletica-Incinera/INCINERA.git
cd INCINERA
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com os valores reais:

```bash
cp .env.example .env.local
```

> Consulte a seção [Variáveis de Ambiente](#-variáveis-de-ambiente) para detalhes de cada variável.

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O app estará disponível em **[http://localhost:3000](http://localhost:3000)**.

### Outros comandos úteis

| Comando                | Descrição                         |
| ---------------------- | --------------------------------- |
| `npm run build`        | Gera o build de produção          |
| `npm run start`        | Inicia o servidor de produção     |
| `npm run lint`         | Roda o ESLint                     |
| `npm run format`       | Formata o código com Prettier     |
| `npm run format:check` | Verifica a formatação sem alterar |

---

## 🐳 Rodando via Docker

A stack de produção utiliza **dois containers** orquestrados pelo Docker Compose:

1. **`incinera-web`** — Aplicação Next.js (modo standalone, porta `3000` interna)
2. **`incinera-nginx`** — Nginx como reverse proxy (porta `80` externa)

### 1. Configure o `.env`

Na raiz do projeto, crie o arquivo `.env` com as variáveis de produção (veja [Variáveis de Ambiente](#-variáveis-de-ambiente)).

### 2. Suba os containers

```bash
docker compose up -d --build
```

Isso irá:

- Instalar dependências (`npm ci`)
- Gerar o build de produção (`npm run build`)
- Criar a imagem standalone otimizada (multi-stage build)
- Iniciar o Nginx como reverse proxy na porta `80`

### 3. Verifique os containers

```bash
docker compose ps
```

### 4. Visualize os logs

```bash
docker compose logs -f            # todos os containers
docker compose logs -f incinera-web  # apenas o Next.js
docker compose logs -f nginx         # apenas o Nginx
```

### 5. Parar e remover

```bash
docker compose down
```

### Arquitetura Docker

```
┌─────────────────────────────────────────────┐
│                   VM (CIn)                  │
│                                             │
│   :80 ──▶ ┌───────────┐    ┌────────────┐  │
│           │   Nginx    │──▶│  Next.js    │  │
│           │  (Alpine)  │   │ (Standalone)│  │
│           │  Port 80   │   │  Port 3000  │  │
│           └───────────┘    └────────────┘  │
│           incinera-nginx   incinera-web     │
└─────────────────────────────────────────────┘
```

O Nginx cuida de:

- Reverse proxy para o Next.js
- Compressão Gzip
- Cache agressivo para assets estáticos (`/_next/static/`)
- Headers de segurança (`X-Frame-Options`, `X-XSS-Protection`, etc.)
- Redirecionamento de 404 para a home

---

## 🔐 Variáveis de Ambiente

Copie `.env.example` para `.env.local` (local) ou `.env` (produção/Docker). Veja o arquivo [`.env.example`](.env.example) para a referência completa.

| Variável                            | Descrição                                                | Obrigatória |
| ----------------------------------- | -------------------------------------------------------- | :---------: |
| `RESEND_API_KEY`                    | Chave da API do Resend para envio de e-mails             |     ✅      |
| `EMAIL_TO`                          | E-mail de destino dos formulários de contato             |     ✅      |
| `GOOGLE_SHEETS_ID`                  | ID da planilha da Diretoria no Google Drive              |     ✅      |
| `GOOGLE_SHEETS_ATHLETS_ID`          | ID da planilha de Atletas no Google Drive                |     ✅      |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL`      | E-mail da Service Account do Google Cloud                |     ✅      |
| `GOOGLE_SERVICE_ACCOUNT_KEY`        | Chave privada RSA da Service Account (JSON)              |     ✅      |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Nome da cloud no Cloudinary (público, seguro no browser) |     ✅      |
| `CLOUDINARY_API_KEY`                | Chave da API do Cloudinary (server-side)                 |     ✅      |
| `CLOUDINARY_API_SECRET`             | Secret da API do Cloudinary (server-side)                |     ✅      |
| `REVALIDATE_SECRET`                 | Secret para o endpoint de revalidação ISR on-demand      |     ✅      |

---

## 🖼 Imagens — Cloudinary

**Todas as imagens do site são servidas pelo [Cloudinary](https://cloudinary.com/)**, um CDN especializado em mídia que cuida de otimização, redimensionamento e entrega de imagens.

### Como funciona

1. **Armazenamento**: As fotos dos membros da diretoria, atletas, parceiros, galeria, etc., ficam armazenadas no Cloudinary da Incinera.
2. **Entrega**: As imagens são acessadas via URL pública no formato:
   ```
   https://res.cloudinary.com/<CLOUD_NAME>/image/upload/<TRANSFORMATIONS>/<PUBLIC_ID>
   ```
3. **No código**: O componente `AppImage` (em `src/components/ui/AppImage/`) é um wrapper do `next/image` que:
   - Detecta automaticamente URLs do Cloudinary e serve diretamente do CDN (sem dupla otimização pelo Next.js).
   - Possui fallback para um placeholder padrão caso a imagem não carregue.
   - Trata erros de carregamento com graceful degradation (grayscale + blur).

4. **Otimização na URL**: Transformações como qualidade, formato e tamanho são controlados diretamente via parâmetros na URL do Cloudinary, definidos nos data loaders (`src/data/loaders/`).

### Configuração

A variável de ambiente `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` define a cloud utilizada. O domínio `res.cloudinary.com` está configurado como padrão remoto permitido no `next.config.ts`.

---

## 📊 Dados — Google Sheets API

A aplicação **consome dados de duas planilhas do Google Drive** da Incinera como fonte de dados:

### Planilha 1 — Diretoria (`GOOGLE_SHEETS_ID`)

Contém os dados dos membros da diretoria da atlética:

- Nome completo, cargo, área de atuação
- Introdução pessoal (bio)
- Links de redes sociais (Instagram, LinkedIn, etc.)
- ID da foto no Cloudinary

**Loader:** `src/data/loaders/loadDirectory.ts`

### Planilha 2 — Atletas (`GOOGLE_SHEETS_ATHLETS_ID`)

Contém os dados dos atletas da atlética:

- Nome completo, curso
- Esporte e categoria (masculino/feminino)
- Rede social (tipo + link)
- ID da foto no Cloudinary

**Loader:** `src/data/loaders/loadTeams.ts`

### Como funciona a integração

1. Uma **Service Account** do Google Cloud é utilizada para autenticar com a Google Sheets API.
2. A planilha deve ser **compartilhada** com o e-mail da Service Account (permissão de leitura).
3. No build e em runtime, os loaders (`src/data/loaders/`) fazem chamadas à API para buscar as linhas das planilhas.
4. Os dados brutos são parseados e validados com schemas TypeScript definidos em `src/data/schemas/`.
5. Os dados processados alimentam os componentes de Diretoria (`DirectorySection`) e Times (`TeamsList`).

---

## 📝 Formulários e App Script

Os dados dos membros da diretoria e atletas são coletados via **Google Forms** (formulários) que ficam no mesmo Google Drive da Incinera.

### Fluxo de cadastro

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  Membro ou   │      │ Google Form  │      │ Apps Script  │      │  Cloudinary  │
│   Atleta     │─────▶│  (Resposta)  │─────▶│ (Trigger)    │─────▶│  (Upload)    │
│  preenche    │      │  + Upload    │      │  onSubmit()  │      │  foto salva  │
│  o form      │      │  da foto     │      │              │      │  com ID      │
└──────────────┘      └──────────────┘      └──────────────┘      └──────────────┘
                              │
                              ▼
                      ┌──────────────┐
                      │ Google Sheet │
                      │ (Respostas)  │
                      │ + public_id  │
                      │  Cloudinary  │
                      └──────────────┘
```

1. **O membro/atleta preenche o formulário** no Google Forms, incluindo o upload de uma foto.
2. **Uma extensão com Google Apps Script** está vinculada ao formulário. O script possui um trigger `onFormSubmit` que é disparado automaticamente após cada resposta.
3. **O Apps Script pega a foto enviada**, faz o upload para o Cloudinary via API, e **salva o `public_id` retornado** diretamente na planilha de respostas.
4. **O site consome a planilha** via Google Sheets API e utiliza o `public_id` do Cloudinary para montar a URL da imagem.

> **Resultado:** O fluxo é totalmente automatizado — basta o membro preencher o formulário e a foto já fica disponível no site após a próxima revalidação.

---

## ⚙️ CI/CD — Deploy Automatizado

O deploy é automatizado via **GitHub Actions** (`.github/workflows/cd.yml`):

1. O pipeline de **CI** roda na branch `main` (lint, build, etc.).
2. Após o CI passar com sucesso, o workflow de **CD** é disparado automaticamente.
3. O CD conecta via **SSH** na VM do CIn e executa:
   - `git fetch --all && git reset --hard origin/main` — atualiza o código
   - Escreve o `.env` a partir de um secret do GitHub
   - `docker compose up -d --build --remove-orphans` — reconstrói e sobe os containers
   - `docker image prune -f` — limpa imagens antigas

> O deploy também pode ser disparado manualmente via `workflow_dispatch` no GitHub Actions.

---

## 📐 Padrões de Desenvolvimento

O projeto segue regras rigorosas definidas em [`.agents/workflows/development-standards.md`](.agents/workflows/development-standards.md). Abaixo está um resumo:

### 1. Separação de Lógica e UI

- **Hooks para lógica**: Todo estado, side effects e lógica de negócio devem ser extraídos para custom hooks (`use[ComponentName].ts`).
- **Componentes puros**: Componentes focam exclusivamente em renderização e acessibilidade.
- **Estrutura de arquivos**:
  ```
  src/components/[Category]/[ComponentName]/
  ├── index.tsx              # Componente (UI pura)
  └── use[ComponentName].ts  # Hook (lógica)
  ```

### 2. Internacionalização (i18n) First

- **Nenhum texto hardcoded.** Toda string visível ao usuário deve estar em `src/messages/pt.json` ou `src/messages/en.json`.
- Chaves hierárquicas: `Hero.title`, `Common.buttons.cta`, etc.
- A lib utilizada é o `next-intl`, e o idioma é controlado via cookie (sem alterar a URL).

### 3. HTML Semântico e Acessível

- Uso obrigatório de tags HTML5 semânticas (`<nav>`, `<main>`, `<section>`, etc.).
- Elementos interativos devem ter labels `aria-*` quando o texto não for descritivo o suficiente.
- Focus states visíveis e consistentes.

### 4. Data-Driven Content

- Dados de pessoas (diretoria, atletas, times) vivem em **arquivos de dados** (`src/data/`), nunca inline nos componentes.
- Cada entrada é um objeto tipado. Para alterar dados, edita-se **apenas o arquivo de dados** — zero alterações em componentes.

### 5. Componentização e Compound Components

- **Nunca repetir estruturas HTML.** Padrões recorrentes devem virar componentes reutilizáveis.
- Uso do **Compound Component Pattern** para evitar componentes monolíticos:
  ```tsx
  <MemberCard.Root>
    <MemberCard.Avatar src={member.imagePath} alt={member.name} />
    <MemberCard.Name>{member.name}</MemberCard.Name>
    <MemberCard.Role>{member.role}</MemberCard.Role>
  </MemberCard.Root>
  ```

### 6. shadcn/ui

- Componentes base em `src/components/ui/`.
- Instalação via `npx shadcn@latest add [component]`.
- Customizações devem **estender** os componentes base, nunca recriá-los.
- Todo componente novo ou customizado deve ser documentado no Styleguide (`src/app/styleguide/`).

---

## 📁 Estrutura do Projeto

```
INCINERA/
├── .agents/workflows/        # Workflows e regras de desenvolvimento
├── .github/workflows/        # CI/CD (GitHub Actions)
├── nginx/                    # Configuração do Nginx (reverse proxy)
├── public/                   # Assets estáticos
├── src/
│   ├── app/                  # Rotas e páginas (App Router)
│   ├── components/
│   │   ├── sections/         # Seções da página (Hero, Directory, Teams, etc.)
│   │   ├── shared/           # Componentes compartilhados (Navbar, Footer, etc.)
│   │   └── ui/               # Componentes base (shadcn/ui, AppImage, etc.)
│   ├── data/
│   │   ├── loaders/          # Data loaders (Google Sheets API)
│   │   ├── schemas/          # Schemas de validação dos dados
│   │   ├── types/            # TypeScript types/interfaces
│   │   └── utils/            # Utilitários de dados (Cloudinary URLs, etc.)
│   ├── hooks/                # Custom hooks compartilhados
│   ├── i18n/                 # Configuração do next-intl
│   ├── lib/                  # Utilitários (actions, email templates, logger)
│   ├── messages/             # Arquivos de tradução (pt.json, en.json)
│   └── providers/            # React Providers (Theme, etc.)
├── docker-compose.yml        # Orquestração Docker
├── Dockerfile                # Build multi-stage (deps → build → run)
├── next.config.ts            # Configuração do Next.js
└── .env.example              # Template de variáveis de ambiente
```

---

## 📄 Licença

Projeto interno da Atlética Incinera — CIn/UFPE.
