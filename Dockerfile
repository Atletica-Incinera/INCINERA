# Usa a versão Alpine do Node 20 por ser leve e segura
FROM node:20-alpine AS base

# 1. Dependências (Apenas para instalar pacotes)
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# 2. Builder (Constrói a aplicação Next.js)
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desativa telemetria do Next.js durante o build (opcional)
ENV NEXT_TELEMETRY_DISABLED=1

# O Next.js precisará de algumas variáveis de ambiente no build (se forem publicas), ou elas podem ser ignoradas dependendo do setup.
RUN npm run build

# 3. Runner (A imagem final que vai para produção)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Define a porta exposta
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Cria um usuário não-root por segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Cria a pasta public e altera as permissões
COPY --from=builder /app/public ./public

# Configura as permissões para o standalone (criado pela config no next.config.ts)
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copia os arquivos gerados no modo "standalone"
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Inicia o servidor através do server.js criado pelo standalone mode
CMD ["node", "server.js"]
