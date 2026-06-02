# =============================================================================
# Figa Front (Next.js 14) — imagem de produção multi-stage (output standalone)
# =============================================================================

# ---- 1) Dependências ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ---- 2) Build ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Garante que a pasta public exista mesmo que vazia (git não versiona dir vazio),
# evitando falha no COPY do estágio final.
RUN mkdir -p public
ENV NEXT_TELEMETRY_DISABLED=1
# URL da API embutida no build (NEXT_PUBLIC_* é resolvido em tempo de build).
# Pode ser sobrescrita no build: --build-arg NEXT_PUBLIC_API_URL=...
ARG NEXT_PUBLIC_API_URL=https://amplo-figa-figa-blog--api.gitgpl.easypanel.host/api/v1
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

# ---- 3) Runtime ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Usuário não-root.
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Artefatos do build standalone.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
