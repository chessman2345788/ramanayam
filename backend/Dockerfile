# Base stage
FROM node:20-bookworm-slim AS base
WORKDIR /usr/src/app

# Install system dependencies (OpenSSL 3 and CA certificates for secure database connections)
RUN apt-get update && \
    apt-get install -y --no-install-recommends openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate

# Build stage
FROM base AS build
RUN npm run build
# Prune dev dependencies
RUN npm prune --omit=dev

# Production stage
FROM node:20-bookworm-slim AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Ensure OpenSSL and CA certificates are present in production runtime
RUN apt-get update && \
    apt-get install -y --no-install-recommends openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma

EXPOSE 5000
CMD ["npm", "run", "start"]
