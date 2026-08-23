# ── Stage 1: Install dependencies and build ────────────────────────────
FROM node:20-bookworm-slim AS build
WORKDIR /usr/src/app

# Install OpenSSL 3 and CA certificates (required by Prisma query engine)
RUN apt-get update && \
    apt-get install -y --no-install-recommends openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Install ALL dependencies (including devDependencies for tsc)
COPY package*.json ./
RUN npm ci --ignore-scripts

# Copy application source and Prisma schema
COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./

# Generate Prisma Client inside the Debian build environment
RUN npx prisma generate

# Compile TypeScript
RUN npx tsc

# Remove devDependencies to shrink node_modules for production
RUN npm prune --omit=dev

# ── Stage 2: Production image ──────────────────────────────────────────
FROM node:20-bookworm-slim AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Install OpenSSL 3 and CA certificates in the production runtime
RUN apt-get update && \
    apt-get install -y --no-install-recommends openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copy only what's needed for production
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/package.json ./package.json

EXPOSE 5000
CMD ["node", "dist/server.js"]
