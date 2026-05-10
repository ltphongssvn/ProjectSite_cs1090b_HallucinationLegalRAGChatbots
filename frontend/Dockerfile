# Frontend Dockerfile — Next.js 16.2 + React 19.2
FROM node:22-slim AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
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

ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
EXPOSE 3000
CMD ["sh", "-c", "PORT=${PORT:-3000} node server.js"]
