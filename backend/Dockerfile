# Base stage
FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate

# Development stage
FROM base AS development
ENV NODE_ENV=development
EXPOSE 5000
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS build
RUN npm run build
# Prune dev dependencies
RUN npm prune --production

# Production stage
FROM node:20-alpine AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma

EXPOSE 5000
CMD ["npm", "run", "start"]
