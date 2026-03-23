# Frontend Dockerfile — Next.js 16.2 + React 19.2
FROM node:22-slim AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production image
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN useradd -m -u 1001 appuser

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 3000
CMD ["node", "server.js"]
