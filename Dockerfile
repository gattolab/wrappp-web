# ── Stage 1: deps ─────────────────────────────────────────────────────────────
# Install production + dev dependencies in a clean layer.
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile


# ── Stage 2: builder ───────────────────────────────────────────────────────────
# Build the Next.js app with standalone output.
FROM node:20-alpine AS builder

WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build


# ── Stage 3: runner ────────────────────────────────────────────────────────────
# Minimal production image using the standalone output.
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

# Upgrade OS packages to pick up any patched CVEs, then strip npm
# (standalone Next.js only needs the node runtime, not a package manager)
RUN apk upgrade --no-cache \
 && apk del --no-cache npm \
 && addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy only what the standalone server needs
COPY --from=builder /app/public ./public

# Set correct ownership on the .next directory before copying
RUN mkdir -p .next
RUN chown nextjs:nodejs .next

# standalone bundles the server + node_modules into .next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# static assets served directly by the standalone server
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:8080/api/health 2>/dev/null || wget -qO- http://localhost:8080/ || exit 1

CMD ["node", "server.js"]
